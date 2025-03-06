<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Order::with(['gig', 'seller', 'buyer']);
        
        // Filter by role (buyer or seller)
        if ($request->has('role') && $request->role === 'buyer') {
            $query->where('buyer_id', $user->id);
        } elseif ($request->has('role') && $request->role === 'seller') {
            $query->where('seller_id', $user->id);
        } else {
            // If no role specified, show both buyer and seller orders
            $query->where(function($q) use ($user) {
                $q->where('buyer_id', $user->id)
                  ->orWhere('seller_id', $user->id);
            });
        }
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Sort orders
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);
        
        $orders = $query->paginate(10);
        
        return response()->json([
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gig_id' => 'required|exists:gigs,id',
            'details' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Get the gig
        $gig = Gig::findOrFail($request->gig_id);
        
        // Calculate total price
        $totalPrice = $gig->price * $request->quantity;
        
        // Create the order
        $order = new Order();
        $order->gig_id = $gig->id;
        $order->seller_id = $gig->user_id;
        $order->buyer_id = Auth::id();
        $order->details = $request->details;
        $order->quantity = $request->quantity;
        $order->price = $gig->price;
        $order->total_price = $totalPrice;
        $order->status = 'pending';
        $order->delivery_date = now()->addDays($gig->delivery_time);
        $order->save();

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load(['gig', 'seller', 'buyer'])
        ], 201);
    }

    /**
     * Display the specified order.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Order $order)
    {
        // Check if the authenticated user is the buyer or seller
        if (Auth::id() !== $order->buyer_id && Auth::id() !== $order->seller_id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $order->load(['gig', 'seller', 'buyer', 'deliverables', 'messages']);
        
        return response()->json([
            'order' => $order
        ]);
    }

    /**
     * Update the specified order status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, Order $order)
    {
        // Check if the authenticated user is the buyer or seller
        if (Auth::id() !== $order->buyer_id && Auth::id() !== $order->seller_id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,in_progress,delivered,completed,cancelled,revision_requested',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if the status change is allowed
        $allowedTransitions = [
            'pending' => ['in_progress', 'cancelled'],
            'in_progress' => ['delivered', 'cancelled'],
            'delivered' => ['completed', 'revision_requested'],
            'revision_requested' => ['in_progress', 'delivered', 'cancelled'],
            'completed' => [],
            'cancelled' => [],
        ];

        if (!in_array($request->status, $allowedTransitions[$order->status])) {
            return response()->json([
                'message' => 'Invalid status transition'
            ], 422);
        }

        // Check if the user is allowed to make this status change
        $sellerOnlyTransitions = ['in_progress', 'delivered'];
        $buyerOnlyTransitions = ['completed', 'revision_requested'];

        if (in_array($request->status, $sellerOnlyTransitions) && Auth::id() !== $order->seller_id) {
            return response()->json([
                'message' => 'Only the seller can change to this status'
            ], 403);
        }

        if (in_array($request->status, $buyerOnlyTransitions) && Auth::id() !== $order->buyer_id) {
            return response()->json([
                'message' => 'Only the buyer can change to this status'
            ], 403);
        }

        // Update the order status
        $order->status = $request->status;
        
        // If the order is completed, set the completion date
        if ($request->status === 'completed') {
            $order->completed_at = now();
        }
        
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order->load(['gig', 'seller', 'buyer'])
        ]);
    }

    /**
     * Cancel an order.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancel(Order $order)
    {
        // Check if the authenticated user is the buyer or seller
        if (Auth::id() !== $order->buyer_id && Auth::id() !== $order->seller_id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        // Check if the order can be cancelled
        if (!in_array($order->status, ['pending', 'in_progress'])) {
            return response()->json([
                'message' => 'This order cannot be cancelled'
            ], 422);
        }

        // Update the order status
        $order->status = 'cancelled';
        $order->cancelled_at = now();
        $order->cancelled_by = Auth::id();
        $order->save();

        return response()->json([
            'message' => 'Order cancelled successfully',
            'order' => $order->load(['gig', 'seller', 'buyer'])
        ]);
    }
}

