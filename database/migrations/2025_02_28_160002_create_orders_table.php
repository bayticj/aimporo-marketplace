use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('gig_id')->constrained()->onDelete('cascade');
            $table->text('requirements');
            $table->decimal('price', 10, 2);
            $table->integer('delivery_time');
            $table->enum('status', ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'])->default('pending');
            $table->text('delivery_message')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
}; 