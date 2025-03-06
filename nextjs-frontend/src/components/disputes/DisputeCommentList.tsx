'use client';

import React from 'react';
import { Avatar, Card, CardBody, Divider, Textarea, Button } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import { FaPaperPlane } from 'react-icons/fa';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  is_admin_comment: boolean;
  is_system_comment: boolean;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}

interface DisputeCommentListProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
  isLoading?: boolean;
  disputeStatus: 'open' | 'under_review' | 'resolved' | 'closed';
}

const DisputeCommentList: React.FC<DisputeCommentListProps> = ({
  comments,
  onAddComment,
  isLoading = false,
  disputeStatus,
}) => {
  const [newComment, setNewComment] = React.useState('');
  const isDisputeActive = disputeStatus === 'open' || disputeStatus === 'under_review';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Discussion</h3>
      
      {isDisputeActive && (
        <form onSubmit={handleSubmit} className="mb-6">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            minRows={2}
            maxRows={5}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              isDisabled={!newComment.trim() || isLoading}
              isLoading={isLoading}
              startContent={<FaPaperPlane />}
            >
              Send Comment
            </Button>
          </div>
        </form>
      )}
      
      {!isDisputeActive && (
        <div className="text-center p-4 bg-default-100 rounded-lg mb-6">
          <p className="text-default-500">This dispute is {disputeStatus}. No new comments can be added.</p>
        </div>
      )}
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center p-6 bg-default-50 rounded-lg">
            <p className="text-default-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className={comment.is_system_comment ? 'bg-default-50' : ''}>
              <CardBody>
                {comment.is_system_comment ? (
                  <div className="text-center text-default-500">
                    <p>{comment.comment}</p>
                    <p className="text-tiny mt-1">{formatDate(comment.created_at)}</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Avatar
                      src={comment.user.avatar || `/images/profiles/avatar-${(comment.user.id % 8) + 1}.png`}
                      name={comment.user.name}
                      size="sm"
                      className={comment.is_admin_comment ? 'ring-2 ring-primary' : ''}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">
                          {comment.user.name}
                          {comment.is_admin_comment && (
                            <span className="ml-2 text-tiny bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                              Admin
                            </span>
                          )}
                        </span>
                        <span className="text-tiny text-default-400">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-default-700">{comment.comment}</p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DisputeCommentList; 