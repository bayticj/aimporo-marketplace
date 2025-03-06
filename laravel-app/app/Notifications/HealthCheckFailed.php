<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class HealthCheckFailed extends Notification implements ShouldQueue
{
    use Queueable;

    protected $results;
    protected $overallStatus;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $results, string $overallStatus)
    {
        $this->results = $results;
        $this->overallStatus = $overallStatus;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'slack'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mailMessage = (new MailMessage)
            ->subject('Health Check Failed - ' . config('app.name'))
            ->greeting('Health Check Alert')
            ->line('One or more health checks have failed for ' . config('app.name') . '.')
            ->line('Overall Status: ' . $this->overallStatus);

        foreach ($this->results as $component => $status) {
            $mailMessage->line($component . ': ' . $status);
        }

        $mailMessage->action('View Application', url('/'))
            ->line('Please investigate this issue as soon as possible.');

        return $mailMessage;
    }

    /**
     * Get the Slack representation of the notification.
     */
    public function toSlack(object $notifiable): SlackMessage
    {
        $slackMessage = (new SlackMessage)
            ->error()
            ->content('Health Check Failed - ' . config('app.name'))
            ->attachment(function ($attachment) {
                $attachment->title('Health Check Results')
                    ->fields([
                        'Overall Status' => $this->overallStatus,
                        'Environment' => config('app.env'),
                        'Time' => now()->toDateTimeString(),
                    ]);

                foreach ($this->results as $component => $status) {
                    $attachment->field($component, $status);
                }
            });

        return $slackMessage;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'overall_status' => $this->overallStatus,
            'results' => $this->results,
            'timestamp' => now()->toDateTimeString(),
            'environment' => config('app.env'),
        ];
    }
} 