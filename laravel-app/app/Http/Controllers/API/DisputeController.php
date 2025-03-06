<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dispute;
use App\Models\DisputeComment;
use App\Models\DisputeEvidence;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DisputeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Get all disputes for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $status = $request->query('status');
        $type = $request->query('type');
        $perPage = $request->query('per_page', 10);
        
        $query = Dispute::with(['order', 'user', 'evidence', 'comments'])
            ->where('user_id', $user->id);
            
        if ($status) {
            $query->where('status', $status);
        }
        
        if ($type) {
            $query->where('type', $type);
        }
        
        $disputes = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $disputes
        ]);
    }
    
    /**
     * Get all disputes for admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function adminIndex(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $status = $request->query('status');
        $type = $request->query('type');
        $perPage = $request->query('per_page', 10);
        
        $query = Dispute::with(['order', 'user', 'evidence', 'comments']);
            
        if ($status) {
            $query->where('status', $status);
        }
        
        if ($type) {
            $query->where('type', $type);
        }
        
        $disputes = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $disputes
        ]);
    }

    /**
     * Store a newly created dispute in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'type' => 'required|in:refund,quality,delivery,communication,other',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'evidence' => 'nullable|array',
            'evidence.*.file' => 'nullable|file|max:10240', // 10MB max
            'evidence.*.description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $order = Order::findOrFail($request->order_id);
        
        // Check if the user is either the buyer or seller of the order
        if ($order->buyer_id !== $user->id && $order->seller_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to create a dispute for this order'
            ], 403);
        }
        
        // Check if there's already an active dispute for this order
        $existingDispute = Dispute::where('order_id', $order->id)
            ->whereIn('status', ['open', 'under_review'])
            ->first();
            
        if ($existingDispute) {
            return response()->json([
                'success' => false,
                'message' => 'There is already an active dispute for this order'
            ], 400);
        }

        DB::beginTransaction();
        
        try {
            // Create the dispute
            $dispute = Dispute::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'status' => 'open',
                'type' => $request->type,
                'title' => $request->title,
                'description' => $request->description,
            ]);
            
            // Add a system comment
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $user->id,
                'comment' => 'Dispute created',
                'is_system_comment' => true,
            ]);
            
            // Upload evidence files if provided
            if ($request->hasFile('evidence')) {
                foreach ($request->file('evidence') as $index => $file) {
                    $path = $file->store('dispute-evidence', 'public');
                    
                    DisputeEvidence::create([
                        'dispute_id' => $dispute->id,
                        'user_id' => $user->id,
                        'file_path' => $path,
                        'file_name' => $file->getClientOriginalName(),
                        'file_type' => $file->getClientMimeType(),
                        'description' => $request->input("evidence.{$index}.description"),
                    ]);
                }
            }
            
            // Update order status
            $order->update(['status' => 'disputed']);
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Dispute created successfully',
                'data' => $dispute->load(['evidence', 'comments'])
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create dispute',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified dispute.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        $dispute = Dispute::with(['order', 'user', 'evidence', 'comments.user'])->findOrFail($id);
        
        // Check if the user is authorized to view this dispute
        if ($dispute->user_id !== $user->id && 
            $dispute->order->buyer_id !== $user->id && 
            $dispute->order->seller_id !== $user->id && 
            !$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to view this dispute'
            ], 403);
        }
        
        return response()->json([
            'success' => true,
            'data' => $dispute
        ]);
    }

    /**
     * Add a comment to a dispute.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addComment(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $dispute = Dispute::findOrFail($id);
        
        // Check if the user is authorized to comment on this dispute
        if ($dispute->user_id !== $user->id && 
            $dispute->order->buyer_id !== $user->id && 
            $dispute->order->seller_id !== $user->id && 
            !$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to comment on this dispute'
            ], 403);
        }
        
        // Check if the dispute is still open for comments
        if (!in_array($dispute->status, ['open', 'under_review'])) {
            return response()->json([
                'success' => false,
                'message' => 'This dispute is no longer open for comments'
            ], 400);
        }
        
        $comment = DisputeComment::create([
            'dispute_id' => $dispute->id,
            'user_id' => $user->id,
            'comment' => $request->comment,
            'is_admin_comment' => $user->hasRole('admin'),
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => $comment->load('user')
        ], 201);
    }

    /**
     * Add evidence to a dispute.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addEvidence(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|max:10240', // 10MB max
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $dispute = Dispute::findOrFail($id);
        
        // Check if the user is authorized to add evidence to this dispute
        if ($dispute->user_id !== $user->id && 
            $dispute->order->buyer_id !== $user->id && 
            $dispute->order->seller_id !== $user->id && 
            !$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to add evidence to this dispute'
            ], 403);
        }
        
        // Check if the dispute is still open for evidence
        if (!in_array($dispute->status, ['open', 'under_review'])) {
            return response()->json([
                'success' => false,
                'message' => 'This dispute is no longer open for evidence'
            ], 400);
        }
        
        $file = $request->file('file');
        $path = $file->store('dispute-evidence', 'public');
        
        $evidence = DisputeEvidence::create([
            'dispute_id' => $dispute->id,
            'user_id' => $user->id,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_type' => $file->getClientMimeType(),
            'description' => $request->description,
        ]);
        
        // Add a system comment about the evidence
        DisputeComment::create([
            'dispute_id' => $dispute->id,
            'user_id' => $user->id,
            'comment' => 'Evidence added: ' . $file->getClientOriginalName(),
            'is_system_comment' => true,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Evidence added successfully',
            'data' => $evidence
        ], 201);
    }

    /**
     * Update the dispute status (admin only).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:open,under_review,resolved,closed',
            'resolution_notes' => 'nullable|string',
            'refund_amount' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        // Only admins can update dispute status
        if (!$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Only administrators can update dispute status'
            ], 403);
        }
        
        $dispute = Dispute::findOrFail($id);
        $oldStatus = $dispute->status;
        $newStatus = $request->status;
        
        DB::beginTransaction();
        
        try {
            $updateData = [
                'status' => $newStatus,
            ];
            
            // If resolving the dispute
            if ($newStatus === 'resolved' && in_array($oldStatus, ['open', 'under_review'])) {
                $updateData['resolved_by'] = $user->id;
                $updateData['resolved_at'] = now();
                $updateData['resolution_notes'] = $request->resolution_notes;
                
                // Process refund if specified
                if ($request->has('refund_amount') && $request->refund_amount > 0) {
                    $updateData['refund_amount'] = $request->refund_amount;
                    
                    // Create refund transaction
                    $order = $dispute->order;
                    
                    Transaction::create([
                        'order_id' => $order->id,
                        'buyer_id' => $order->buyer_id,
                        'seller_id' => $order->seller_id,
                        'amount' => $request->refund_amount,
                        'type' => 'refund',
                        'status' => 'completed',
                        'description' => 'Refund for dispute #' . $dispute->id,
                    ]);
                }
            }
            
            $dispute->update($updateData);
            
            // Add a system comment about the status change
            $statusChangeComment = 'Dispute status changed from ' . $oldStatus . ' to ' . $newStatus;
            if ($newStatus === 'resolved') {
                $statusChangeComment .= ' by ' . $user->name;
            }
            
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $user->id,
                'comment' => $statusChangeComment,
                'is_system_comment' => true,
                'is_admin_comment' => true,
            ]);
            
            // If the dispute is resolved or closed, update the order status
            if (in_array($newStatus, ['resolved', 'closed'])) {
                $order = $dispute->order;
                
                // If there was a full refund, mark the order as cancelled
                if ($newStatus === 'resolved' && $request->has('refund_amount') && $request->refund_amount >= $order->total_amount) {
                    $order->update(['status' => 'cancelled']);
                } else {
                    // Otherwise, revert to the previous status or mark as completed
                    $order->update(['status' => 'completed']);
                }
            }
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Dispute status updated successfully',
                'data' => $dispute->fresh()->load(['order', 'user', 'evidence', 'comments'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update dispute status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Escalate a dispute (for users).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function escalate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $dispute = Dispute::findOrFail($id);
        
        // Check if the user is authorized to escalate this dispute
        if ($dispute->user_id !== $user->id && 
            $dispute->order->buyer_id !== $user->id && 
            $dispute->order->seller_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to escalate this dispute'
            ], 403);
        }
        
        // Check if the dispute can be escalated
        if (!in_array($dispute->status, ['open']) || $dispute->is_escalated) {
            return response()->json([
                'success' => false,
                'message' => 'This dispute cannot be escalated'
            ], 400);
        }
        
        $dispute->update([
            'is_escalated' => true,
            'status' => 'under_review',
        ]);
        
        // Add a system comment about the escalation
        DisputeComment::create([
            'dispute_id' => $dispute->id,
            'user_id' => $user->id,
            'comment' => 'Dispute escalated to admin review. Reason: ' . $request->reason,
            'is_system_comment' => true,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Dispute escalated successfully',
            'data' => $dispute->fresh()->load(['order', 'user', 'evidence', 'comments'])
        ]);
    }

    /**
     * Get dispute statistics (admin only).
     *
     * @return \Illuminate\Http\Response
     */
    public function statistics()
    {
        $user = Auth::user();
        
        if (!$user->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $stats = [
            'total' => Dispute::count(),
            'open' => Dispute::where('status', 'open')->count(),
            'under_review' => Dispute::where('status', 'under_review')->count(),
            'resolved' => Dispute::where('status', 'resolved')->count(),
            'closed' => Dispute::where('status', 'closed')->count(),
            'escalated' => Dispute::where('is_escalated', true)->count(),
            'by_type' => [
                'refund' => Dispute::where('type', 'refund')->count(),
                'quality' => Dispute::where('type', 'quality')->count(),
                'delivery' => Dispute::where('type', 'delivery')->count(),
                'communication' => Dispute::where('type', 'communication')->count(),
                'other' => Dispute::where('type', 'other')->count(),
            ],
            'avg_resolution_time' => DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_hours'),
        ];
        
        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
} 