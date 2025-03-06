import api from './api';

export interface Notification {
  id: number;
  type: 'delivery' | 'revision' | 'deadline' | 'completion' | 'reminder';
  title: string;
  message: string;
  orderId: number;
  createdAt: string;
  read: boolean;
}

// Get all notifications for the current user
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get('/notifications');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: number): Promise<boolean> => {
  try {
    await api.patch(`/notifications/${notificationId}/read`);
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  try {
    await api.patch('/notifications/read-all');
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};

// Create a delivery notification
export const createDeliveryNotification = async (
  orderId: number,
  deliverableId: number
): Promise<boolean> => {
  try {
    await api.post('/notifications', {
      type: 'delivery',
      order_id: orderId,
      deliverable_id: deliverableId,
    });
    return true;
  } catch (error) {
    console.error('Error creating delivery notification:', error);
    return false;
  }
};

// Create a revision request notification
export const createRevisionNotification = async (
  orderId: number,
  deliverableId: number,
  feedback: string
): Promise<boolean> => {
  try {
    await api.post('/notifications', {
      type: 'revision',
      order_id: orderId,
      deliverable_id: deliverableId,
      metadata: { feedback },
    });
    return true;
  } catch (error) {
    console.error('Error creating revision notification:', error);
    return false;
  }
};

// Create a deadline notification
export const createDeadlineNotification = async (
  orderId: number,
  milestoneId: number,
  daysRemaining: number
): Promise<boolean> => {
  try {
    await api.post('/notifications', {
      type: 'deadline',
      order_id: orderId,
      milestone_id: milestoneId,
      metadata: { days_remaining: daysRemaining },
    });
    return true;
  } catch (error) {
    console.error('Error creating deadline notification:', error);
    return false;
  }
};

// Create a completion notification
export const createCompletionNotification = async (
  orderId: number
): Promise<boolean> => {
  try {
    await api.post('/notifications', {
      type: 'completion',
      order_id: orderId,
    });
    return true;
  } catch (error) {
    console.error('Error creating completion notification:', error);
    return false;
  }
};

// Create a reminder notification
export const createReminderNotification = async (
  orderId: number,
  message: string
): Promise<boolean> => {
  try {
    await api.post('/notifications', {
      type: 'reminder',
      order_id: orderId,
      metadata: { message },
    });
    return true;
  } catch (error) {
    console.error('Error creating reminder notification:', error);
    return false;
  }
};

// Check for upcoming deadlines and create notifications if needed
export const checkDeadlines = async (): Promise<void> => {
  try {
    await api.post('/notifications/check-deadlines');
  } catch (error) {
    console.error('Error checking deadlines:', error);
  }
};

// Schedule automated reminders for upcoming deadlines
export const scheduleReminders = async (
  milestoneId: number,
  reminderDays: number[]
): Promise<boolean> => {
  try {
    await api.post(`/milestones/${milestoneId}/reminders`, {
      reminder_days: reminderDays,
    });
    return true;
  } catch (error) {
    console.error('Error scheduling reminders:', error);
    return false;
  }
};

// Get unread notification count
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await api.get('/notifications/unread-count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
};

// Mock functions for local development and testing
export const getMockNotifications = (): Notification[] => {
  return [
    {
      id: 1,
      type: 'delivery',
      title: 'New Delivery Received',
      message: 'The seller has submitted a new delivery for your order #1234.',
      orderId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      type: 'revision',
      title: 'Revision Requested',
      message: 'The buyer has requested revisions for your delivery on order #1234.',
      orderId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true,
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Deadline Approaching',
      message: 'You have a milestone deadline in 2 days for order #1234.',
      orderId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      read: false,
    },
    {
      id: 4,
      type: 'completion',
      title: 'Order Completed',
      message: 'Your order #1234 has been marked as completed. Thank you for using our platform!',
      orderId: 2,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      read: false,
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Delivery Reminder',
      message: 'Don\'t forget to submit your work for order #1234. The deadline is approaching!',
      orderId: 3,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      read: true,
    },
  ];
};

// Export the notification service
const notificationService = {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  createDeliveryNotification,
  createRevisionNotification,
  createDeadlineNotification,
  createCompletionNotification,
  createReminderNotification,
  checkDeadlines,
  scheduleReminders,
  getUnreadCount,
  getMockNotifications
};

export default notificationService; 