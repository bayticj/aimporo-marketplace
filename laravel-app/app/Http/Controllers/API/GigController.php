<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class GigController extends Controller
{
    /**
     * Display a listing of gigs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Gig::query()->with('user')->where('is_active', true);
        
        // Apply filters if provided
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('tags', 'like', "%{$search}%");
            });
        }
        
        // Apply sorting
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);
        
        $gigs = $query->paginate(12);
        
        return response()->json([
            'gigs' => $gigs,
        ]);
    }

    /**
     * Store a newly created gig.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|string',
            'subcategory' => 'nullable|string',
            'price' => 'required|numeric|min:1',
            'delivery_time' => 'required|integer|min:1',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
            'tags' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle thumbnail upload
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('gigs/thumbnails', 'public');
        }

        // Handle multiple image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('gigs/images', 'public');
            }
        }

        // Parse tags from JSON string if provided
        $tags = [];
        if ($request->has('tags')) {
            $tags = json_decode($request->tags, true) ?? [];
        }

        // Create the gig
        $gig = new Gig();
        $gig->user_id = Auth::id();
        $gig->title = $request->title;
        $gig->description = $request->description;
        $gig->category_id = $request->category_id;
        $gig->subcategory = $request->subcategory;
        $gig->price = $request->price;
        $gig->delivery_time = $request->delivery_time;
        $gig->requirements = $request->requirements;
        $gig->location = $request->location;
        $gig->thumbnail = $thumbnailPath;
        $gig->images = $imagePaths;
        $gig->tags = $tags;
        $gig->is_active = true;
        $gig->is_featured = false;
        $gig->average_rating = 0;
        $gig->rating = 0;
        $gig->reviews_count = 0;
        $gig->save();

        return response()->json([
            'message' => 'Gig created successfully',
            'gig' => $gig
        ], 201);
    }

    /**
     * Display the specified gig.
     *
     * @param  \App\Models\Gig  $gig
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Gig $gig)
    {
        $gig->load('user');
        
        return response()->json([
            'gig' => $gig
        ]);
    }

    /**
     * Update the specified gig.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gig  $gig
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Gig $gig)
    {
        // Check if the authenticated user owns the gig
        if ($gig->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|string',
            'subcategory' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:1',
            'delivery_time' => 'sometimes|required|integer|min:1',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
            'thumbnail' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
            'tags' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle thumbnail upload if provided
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($gig->thumbnail) {
                Storage::disk('public')->delete($gig->thumbnail);
            }
            $gig->thumbnail = $request->file('thumbnail')->store('gigs/thumbnails', 'public');
        }

        // Handle multiple image uploads if provided
        if ($request->hasFile('images')) {
            // Delete old images if exists
            if (!empty($gig->images)) {
                foreach ($gig->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }
            
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('gigs/images', 'public');
            }
            $gig->images = $imagePaths;
        }

        // Parse tags from JSON string if provided
        if ($request->has('tags')) {
            $gig->tags = json_decode($request->tags, true) ?? [];
        }

        // Update other fields
        if ($request->has('title')) $gig->title = $request->title;
        if ($request->has('description')) $gig->description = $request->description;
        if ($request->has('category_id')) $gig->category_id = $request->category_id;
        if ($request->has('subcategory')) $gig->subcategory = $request->subcategory;
        if ($request->has('price')) $gig->price = $request->price;
        if ($request->has('delivery_time')) $gig->delivery_time = $request->delivery_time;
        if ($request->has('requirements')) $gig->requirements = $request->requirements;
        if ($request->has('location')) $gig->location = $request->location;
        if ($request->has('is_active')) $gig->is_active = $request->is_active;

        $gig->save();

        return response()->json([
            'message' => 'Gig updated successfully',
            'gig' => $gig
        ]);
    }

    /**
     * Remove the specified gig.
     *
     * @param  \App\Models\Gig  $gig
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Gig $gig)
    {
        // Check if the authenticated user owns the gig
        if ($gig->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        // Delete associated files
        if ($gig->thumbnail) {
            Storage::disk('public')->delete($gig->thumbnail);
        }
        
        if (!empty($gig->images)) {
            foreach ($gig->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $gig->delete();

        return response()->json([
            'message' => 'Gig deleted successfully'
        ]);
    }
}
