<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Order::query();
        
        // Filter orders based on user role (buyer or seller)
        if ($request->has('type') && $request->type === 'selling') {
            // Get orders where the user is the seller (gig owner)
            $query->whereHas('gig', function($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        } else {
            // Default: Get orders where the user is the buyer
            $query->where('user_id', $user->id);
        }
        
        // Filter by status if provided
        if ($request->has('status') && in_array($request->status, ['pending', 'in_progress', 'completed', 'cancelled'])) {
            $query->where('status', $request->status);
        }
        
        $orders = $query->with(['gig', 'gig.user'])->orderBy('created_at', 'desc')->paginate(10);
        
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gig_id' => 'required|exists:gigs,id',
            'requirements' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the gig to calculate the price and check availability
        $gig = Gig::findOrFail($request->gig_id);
        
        // Check if the gig is active
        if ($gig->status !== 'active') {
            return response()->json(['message' => 'This gig is currently unavailable'], 400);
        }
        
        // Prevent users from ordering their own gigs
        if ($gig->user_id === Auth::id()) {
            return response()->json(['message' => 'You cannot order your own gig'], 400);
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'gig_id' => $request->gig_id,
            'requirements' => $request->requirements,
            'price' => $gig->price,
            'delivery_time' => $gig->delivery_time,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['gig', 'gig.user', 'user'])->findOrFail($id);
        
        // Check if the authenticated user is either the buyer or the seller
        $user = Auth::user();
        if ($order->user_id !== $user->id && $order->gig->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        $user = Auth::user();
        
        // Validate the request based on the action
        $validator = Validator::make($request->all(), [
            'action' => 'required|in:accept,deliver,complete,cancel',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Handle different actions based on user role and order status
        switch ($request->action) {
            case 'accept':
                // Only the seller can accept an order
                if ($order->gig->user_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                
                if ($order->status !== 'pending') {
                    return response()->json(['message' => 'Order can only be accepted when pending'], 400);
                }
                
                $order->status = 'in_progress';
                break;
                
            case 'deliver':
                // Only the seller can deliver an order
                if ($order->gig->user_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                
                if ($order->status !== 'in_progress') {
                    return response()->json(['message' => 'Order can only be delivered when in progress'], 400);
                }
                
                $validator = Validator::make($request->all(), [
                    'delivery_message' => 'required|string',
                ]);
                
                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }
                
                $order->delivery_message = $request->delivery_message;
                $order->delivered_at = now();
                $order->status = 'delivered';
                break;
                
            case 'complete':
                // Only the buyer can complete an order
                if ($order->user_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                
                if ($order->status !== 'delivered') {
                    return response()->json(['message' => 'Order can only be completed when delivered'], 400);
                }
                
                $order->completed_at = now();
                $order->status = 'completed';
                break;
                
            case 'cancel':
                // Both buyer and seller can cancel, but with different conditions
                if ($order->user_id !== $user->id && $order->gig->user_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                
                if (!in_array($order->status, ['pending', 'in_progress'])) {
                    return response()->json(['message' => 'Order can only be cancelled when pending or in progress'], 400);
                }
                
                $validator = Validator::make($request->all(), [
                    'cancellation_reason' => 'required|string',
                ]);
                
                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }
                
                $order->cancellation_reason = $request->cancellation_reason;
                $order->cancelled_at = now();
                $order->status = 'cancelled';
                break;
        }
        
        $order->save();
        
        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // We don't allow deleting orders, only cancelling them
        return response()->json([
            'message' => 'Orders cannot be deleted. Please use the cancel action instead.'
        ], 400);
    }
} 