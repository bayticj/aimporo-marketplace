<?php

namespace App\Http\Controllers;

use App\Models\DigitalProduct;
use App\Models\DigitalProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DigitalProductController extends Controller
{
    /**
     * Display a listing of the digital products.
     */
    public function index(Request $request)
    {
        $query = DigitalProduct::with(['user', 'categories'])
            ->where('status', 'published');

        // Filter by category if provided
        if ($request->has('category')) {
            $categorySlug = $request->input('category');
            $category = DigitalProductCategory::where('slug', $categorySlug)->first();
            
            if ($category) {
                $query->whereHas('categories', function ($q) use ($category) {
                    $q->where('digital_product_categories.id', $category->id);
                });
            }
        }

        // Filter by search term if provided
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Sort by price
        if ($request->has('sort_price')) {
            $direction = $request->input('sort_price') === 'asc' ? 'asc' : 'desc';
            $query->orderBy('price', $direction);
        } else {
            // Default sort by newest
            $query->latest();
        }

        // Filter by featured
        if ($request->has('featured') && $request->input('featured') === 'true') {
            $query->where('is_featured', true);
        }

        $perPage = $request->input('per_page', 12);
        $digitalProducts = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $digitalProducts,
        ]);
    }

    /**
     * Store a newly created digital product.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'file' => 'required|file|max:102400', // 100MB max
            'preview' => 'nullable|file|max:10240', // 10MB max
            'categories' => 'nullable|array',
            'categories.*' => 'exists:digital_product_categories,id',
            'download_limit' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Handle file upload
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $fileType = $file->getMimeType();
        $filePath = $file->store('digital_products');

        // Handle preview upload if provided
        $previewPath = null;
        if ($request->hasFile('preview')) {
            $preview = $request->file('preview');
            $previewPath = $preview->store('digital_products/previews');
        }

        // Create digital product
        $digitalProduct = DigitalProduct::create([
            'user_id' => auth()->id(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_size' => $fileSize,
            'file_type' => $fileType,
            'preview_path' => $previewPath,
            'download_limit' => $request->input('download_limit'),
            'status' => 'draft',
        ]);

        // Attach categories if provided
        if ($request->has('categories')) {
            $digitalProduct->categories()->attach($request->input('categories'));
        }

        return response()->json([
            'success' => true,
            'message' => 'Digital product created successfully',
            'data' => $digitalProduct->load('categories'),
        ], 201);
    }

    /**
     * Display the specified digital product.
     */
    public function show(DigitalProduct $digitalProduct)
    {
        // Check if the product is published or if the user is the owner
        if ($digitalProduct->status !== 'published' && auth()->id() !== $digitalProduct->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Digital product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $digitalProduct->load(['user', 'categories']),
        ]);
    }

    /**
     * Update the specified digital product.
     */
    public function update(Request $request, DigitalProduct $digitalProduct)
    {
        // Check if the user is the owner
        if (auth()->id() !== $digitalProduct->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'file' => 'nullable|file|max:102400', // 100MB max
            'preview' => 'nullable|file|max:10240', // 10MB max
            'categories' => 'nullable|array',
            'categories.*' => 'exists:digital_product_categories,id',
            'download_limit' => 'nullable|integer|min:0',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->only([
            'title',
            'description',
            'price',
            'download_limit',
            'status',
        ]);

        // Handle file upload if provided
        if ($request->hasFile('file')) {
            // Delete old file
            if ($digitalProduct->file_path) {
                Storage::delete($digitalProduct->file_path);
            }

            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileSize = $file->getSize();
            $fileType = $file->getMimeType();
            $filePath = $file->store('digital_products');

            $data['file_path'] = $filePath;
            $data['file_name'] = $fileName;
            $data['file_size'] = $fileSize;
            $data['file_type'] = $fileType;
        }

        // Handle preview upload if provided
        if ($request->hasFile('preview')) {
            // Delete old preview
            if ($digitalProduct->preview_path) {
                Storage::delete($digitalProduct->preview_path);
            }

            $preview = $request->file('preview');
            $previewPath = $preview->store('digital_products/previews');
            $data['preview_path'] = $previewPath;
        }

        // Update digital product
        $digitalProduct->update($data);

        // Sync categories if provided
        if ($request->has('categories')) {
            $digitalProduct->categories()->sync($request->input('categories'));
        }

        return response()->json([
            'success' => true,
            'message' => 'Digital product updated successfully',
            'data' => $digitalProduct->load('categories'),
        ]);
    }

    /**
     * Remove the specified digital product.
     */
    public function destroy(DigitalProduct $digitalProduct)
    {
        // Check if the user is the owner
        if (auth()->id() !== $digitalProduct->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Delete files
        if ($digitalProduct->file_path) {
            Storage::delete($digitalProduct->file_path);
        }

        if ($digitalProduct->preview_path) {
            Storage::delete($digitalProduct->preview_path);
        }

        // Delete digital product
        $digitalProduct->delete();

        return response()->json([
            'success' => true,
            'message' => 'Digital product deleted successfully',
        ]);
    }

    /**
     * Publish the specified digital product.
     */
    public function publish(DigitalProduct $digitalProduct)
    {
        // Check if the user is the owner
        if (auth()->id() !== $digitalProduct->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $digitalProduct->update(['status' => 'published']);

        return response()->json([
            'success' => true,
            'message' => 'Digital product published successfully',
            'data' => $digitalProduct,
        ]);
    }

    /**
     * Archive the specified digital product.
     */
    public function archive(DigitalProduct $digitalProduct)
    {
        // Check if the user is the owner
        if (auth()->id() !== $digitalProduct->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $digitalProduct->update(['status' => 'archived']);

        return response()->json([
            'success' => true,
            'message' => 'Digital product archived successfully',
            'data' => $digitalProduct,
        ]);
    }

    /**
     * Get the digital products created by the authenticated user.
     */
    public function myDigitalProducts(Request $request)
    {
        $query = DigitalProduct::with('categories')
            ->where('user_id', auth()->id());

        // Filter by status if provided
        if ($request->has('status')) {
            $status = $request->input('status');
            $query->where('status', $status);
        }

        $digitalProducts = $query->latest()->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $digitalProducts,
        ]);
    }
} 