<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Use Meilisearch if search parameter is provided
        if ($request->has('search')) {
            $search = $request->search;
            $gigs = Gig::search($search)->paginate(10);
            return response()->json($gigs);
        }
        
        // Otherwise use traditional query
        $query = Gig::query();
        
        // Filter by category if provided
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        
        // Sort by price or created date
        if ($request->has('sort')) {
            $sortField = $request->sort === 'price' ? 'price' : 'created_at';
            $sortDirection = $request->has('direction') && $request->direction === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('created_at', 'desc');
        }
        
        $gigs = $query->with('user')->paginate(10);
        
        return response()->json($gigs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'delivery_time' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $gig = Gig::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'delivery_time' => $request->delivery_time,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Gig created successfully',
            'gig' => $gig
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $gig = Gig::with(['user', 'category', 'reviews'])->findOrFail($id);
        
        return response()->json($gig);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $gig = Gig::findOrFail($id);
        
        // Check if the authenticated user is the owner of the gig
        if ($gig->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'delivery_time' => 'sometimes|required|integer|min:1',
            'status' => 'sometimes|required|in:active,paused',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $gig->update($request->all());

        return response()->json([
            'message' => 'Gig updated successfully',
            'gig' => $gig
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gig = Gig::findOrFail($id);
        
        // Check if the authenticated user is the owner of the gig
        if ($gig->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $gig->delete();
        
        return response()->json([
            'message' => 'Gig deleted successfully'
        ]);
    }

    /**
     * Advanced search for gigs using Meilisearch.
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:2',
            'category_id' => 'sometimes|exists:categories,id',
            'min_price' => 'sometimes|numeric|min:0',
            'max_price' => 'sometimes|numeric|min:0',
            'sort' => 'sometimes|in:price,created_at',
            'direction' => 'sometimes|in:asc,desc',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $searchQuery = $request->query('query');
        
        // Build search options
        $options = [];
        
        // Add filters if provided
        $filters = [];
        
        if ($request->has('category_id')) {
            $filters[] = "category_id = {$request->category_id}";
        }
        
        if ($request->has('min_price')) {
            $filters[] = "price >= {$request->min_price}";
        }
        
        if ($request->has('max_price')) {
            $filters[] = "price <= {$request->max_price}";
        }
        
        if (!empty($filters)) {
            $options['filter'] = implode(' AND ', $filters);
        }
        
        // Add sorting if provided
        if ($request->has('sort')) {
            $sortField = $request->sort;
            $sortDirection = $request->has('direction') ? $request->direction : 'asc';
            $options['sort'] = ["{$sortField}:{$sortDirection}"];
        }
        
        // Perform the search
        $results = Gig::search($searchQuery, $options)->paginate(10);
        
        return response()->json($results);
    }
} 