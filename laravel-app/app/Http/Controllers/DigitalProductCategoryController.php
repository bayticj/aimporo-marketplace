<?php

namespace App\Http\Controllers;

use App\Models\DigitalProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DigitalProductCategoryController extends Controller
{
    /**
     * Display a listing of the digital product categories.
     */
    public function index()
    {
        $categories = DigitalProductCategory::active()->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Store a newly created digital product category.
     */
    public function store(Request $request)
    {
        // Check if user has admin role
        if (!auth()->user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:digital_product_categories',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = DigitalProductCategory::create([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            'icon' => $request->input('icon'),
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Digital product category created successfully',
            'data' => $category,
        ], 201);
    }

    /**
     * Display the specified digital product category.
     */
    public function show(DigitalProductCategory $category)
    {
        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    /**
     * Update the specified digital product category.
     */
    public function update(Request $request, DigitalProductCategory $category)
    {
        // Check if user has admin role
        if (!auth()->user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255|unique:digital_product_categories,name,' . $category->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->only([
            'description',
            'icon',
            'is_active',
        ]);

        // Update slug if name is provided
        if ($request->has('name')) {
            $data['name'] = $request->input('name');
            $data['slug'] = Str::slug($request->input('name'));
        }

        $category->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Digital product category updated successfully',
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified digital product category.
     */
    public function destroy(DigitalProductCategory $category)
    {
        // Check if user has admin role
        if (!auth()->user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Check if category has digital products
        if ($category->digitalProducts()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with digital products',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Digital product category deleted successfully',
        ]);
    }
} 