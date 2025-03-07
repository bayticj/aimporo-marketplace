# AppSumo-like Software Marketplace Reference

## Overview
This document provides a reference for implementing an AppSumo-like software marketplace where customers can purchase access plans to SaaS products, and the system automatically provisions accounts on partner platforms or provides redemption codes. This approach focuses on web-based SaaS products rather than traditional downloadable software with license keys.

## Core Components

### 1. Account Provisioning System

#### Database Schema
```sql
-- Partners table
CREATE TABLE partners (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    api_key VARCHAR(64) NOT NULL UNIQUE,
    webhook_url VARCHAR(255) NULL,
    integration_type ENUM('api', 'redemption') NOT NULL DEFAULT 'redemption',
    api_endpoint VARCHAR(255) NULL,
    redemption_url VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Products table
CREATE TABLE products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    partner_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    version VARCHAR(50) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE
);

-- Plans table
CREATE TABLE plans (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_days INT NULL, -- NULL for lifetime
    features JSON NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Purchases table
CREATE TABLE purchases (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    plan_id BIGINT UNSIGNED NOT NULL,
    status ENUM('pending', 'active', 'redeemed', 'failed', 'expired') NOT NULL DEFAULT 'pending',
    redemption_code VARCHAR(255) NULL UNIQUE,
    redemption_url VARCHAR(255) NULL,
    external_account_id VARCHAR(255) NULL,
    external_username VARCHAR(255) NULL,
    external_password VARCHAR(255) NULL,
    purchased_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    redeemed_at TIMESTAMP NULL DEFAULT NULL,
    expires_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);
```

#### Redemption Code Generation
```php
/**
 * Generate a secure redemption code
 */
function generateRedemptionCode($purchase) {
    $prefix = strtoupper(substr(str_replace(' ', '', $purchase->product->name), 0, 3));
    $uniqueId = strtoupper(substr(md5($purchase->id . $purchase->user_id . time()), 0, 8));
    
    return $prefix . '-' . $uniqueId;
}
```

### 2. Partner Integration System

#### API-Based Integration
For partners with existing APIs, the system will:
1. Register the partner with their API endpoint and authentication details
2. When a purchase is made:
   - Call the partner's API to create a user account
   - Apply the appropriate plan/tier to the account
   - Store the external account details (ID, username, password if provided)
   - Send the account credentials to the customer

#### Redemption Code System
For partners without APIs, the system will:
1. Generate a unique redemption code for each purchase
2. Provide the redemption code and URL to the customer
3. Offer a simple JavaScript snippet that partners can add to their websites to:
   - Verify redemption codes against your marketplace
   - Create user accounts based on verified purchases
   - Apply the appropriate plan/tier to the account

### 3. Integration Architecture

#### System Components
1. **Account Provisioner**: Creates accounts on partner platforms via API
2. **Redemption Code Generator**: Creates and manages redemption codes
3. **Redemption Verifier**: Verifies redemption codes and returns purchase details
4. **User Notifier**: Sends account credentials or redemption instructions to users
5. **Purchase Tracker**: Tracks the status of all purchases and redemptions

#### Communication Flow
```
┌─────────────────┐                 ┌─────────────────┐
│                 │                 │                 │
│  Partner System │◄────────────────┤  Marketplace    │
│                 │                 │                 │
│                 │────────────────►│                 │
└─────────────────┘                 └─────────────────┘
       ▲                                    ▲
       │                                    │
       │                                    │
       │                                    │
       ▼                                    ▼
┌─────────────────┐                 ┌─────────────────┐
│                 │                 │                 │
│      User       │                 │   Payment       │
│                 │                 │   System        │
└─────────────────┘                 └─────────────────┘
```

## Implementation Details

### 1. API Endpoints

#### Account Provisioning (For Partners with APIs)
```
POST /api/partners/{partnerId}/provision
{
  "user_id": "123",
  "product_id": "456",
  "plan_id": "789"
}

Response:
{
  "success": true,
  "purchase_id": "purchase-123",
  "status": "active",
  "account": {
    "external_id": "ext-456",
    "username": "john@example.com",
    "password": "temp-password-123" // Only included for initial provisioning
  }
}
```

#### Redemption Code Verification
```
POST /api/redemption/verify
{
  "redemption_code": "PRO-12AB34CD",
  "partner_api_key": "partner-api-key-123"
}

Response:
{
  "valid": true,
  "purchase_id": "purchase-123",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "plan": {
    "name": "Professional",
    "features": ["feature1", "feature2", "feature3"]
  }
}
```

### 2. Partner Integration Code

#### JavaScript Redemption Verifier
```javascript
/**
 * AppSumo-like Redemption Code Verifier
 * Add this to your registration/upgrade page
 */
class RedemptionVerifier {
  constructor(partnerApiKey, verificationEndpoint) {
    this.partnerApiKey = partnerApiKey;
    this.verificationEndpoint = verificationEndpoint || 'https://your-marketplace.com/api/redemption/verify';
  }
  
  /**
   * Verify a redemption code
   */
  async verifyCode(redemptionCode) {
    try {
      const response = await fetch(this.verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redemption_code: redemptionCode,
          partner_api_key: this.partnerApiKey
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        // Code is valid, provision account
        return {
          valid: true,
          user: data.user,
          plan: data.plan,
          purchaseId: data.purchase_id
        };
      }
      
      return {
        valid: false,
        message: data.message || 'Invalid redemption code'
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Error verifying code: ' + error.message
      };
    }
  }
  
  /**
   * Create a redemption form
   */
  createRedemptionForm(containerId, onSuccess, onError) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create form HTML
    container.innerHTML = `
      <div class="redemption-form">
        <h3>Redeem Your Purchase</h3>
        <p>Enter your redemption code from the marketplace</p>
        <div class="form-group">
          <input type="text" id="redemption-code" placeholder="Enter redemption code" class="form-control">
        </div>
        <div class="form-group">
          <button id="verify-btn" class="btn btn-primary">Verify & Activate</button>
        </div>
        <div id="redemption-message"></div>
      </div>
    `;
    
    // Add event listener
    document.getElementById('verify-btn').addEventListener('click', async () => {
      const codeInput = document.getElementById('redemption-code');
      const messageDiv = document.getElementById('redemption-message');
      
      if (!codeInput.value) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Please enter a redemption code</div>';
        return;
      }
      
      messageDiv.innerHTML = '<div class="alert alert-info">Verifying code...</div>';
      
      const result = await this.verifyCode(codeInput.value);
      
      if (result.valid) {
        messageDiv.innerHTML = '<div class="alert alert-success">Code verified successfully!</div>';
        if (typeof onSuccess === 'function') {
          onSuccess(result);
        }
      } else {
        messageDiv.innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
        if (typeof onError === 'function') {
          onError(result);
        }
      }
    });
  }
}
```

#### PHP Integration Example
```php
<?php
/**
 * AppSumo-like Redemption Verifier for PHP Applications
 */
class RedemptionVerifier
{
    private $partnerApiKey;
    private $verificationEndpoint;
    
    public function __construct($partnerApiKey, $verificationEndpoint = null)
    {
        $this->partnerApiKey = $partnerApiKey;
        $this->verificationEndpoint = $verificationEndpoint ?: 'https://your-marketplace.com/api/redemption/verify';
    }
    
    /**
     * Verify a redemption code
     */
    public function verifyCode($redemptionCode)
    {
        $data = [
            'redemption_code' => $redemptionCode,
            'partner_api_key' => $this->partnerApiKey
        ];
        
        $ch = curl_init($this->verificationEndpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        
        $response = curl_exec($ch);
        $error = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($error) {
            return [
                'valid' => false,
                'message' => 'Connection error: ' . $error
            ];
        }
        
        $data = json_decode($response, true);
        
        if ($httpCode === 200 && isset($data['valid']) && $data['valid']) {
            return [
                'valid' => true,
                'user' => $data['user'],
                'plan' => $data['plan'],
                'purchaseId' => $data['purchase_id']
            ];
        }
        
        return [
            'valid' => false,
            'message' => $data['message'] ?? 'Invalid redemption code'
        ];
    }
    
    /**
     * Provision user account based on verified redemption
     */
    public function provisionAccount($verificationResult)
    {
        if (!$verificationResult['valid']) {
            return false;
        }
        
        // Example implementation - customize based on your user system
        $user = $verificationResult['user'];
        $plan = $verificationResult['plan'];
        
        // Check if user exists
        $existingUser = $this->findUserByEmail($user['email']);
        
        if ($existingUser) {
            // Upgrade existing user
            $this->upgradeUserPlan($existingUser['id'], $plan['name']);
            return [
                'success' => true,
                'user_id' => $existingUser['id'],
                'is_new' => false
            ];
        } else {
            // Create new user
            $userId = $this->createUser($user['name'], $user['email'], $plan['name']);
            return [
                'success' => true,
                'user_id' => $userId,
                'is_new' => true
            ];
        }
    }
    
    /**
     * Example method to find user by email
     */
    private function findUserByEmail($email)
    {
        // Implement based on your database/ORM
        // return $user ?: null;
    }
    
    /**
     * Example method to create a new user
     */
    private function createUser($name, $email, $planName)
    {
        // Implement based on your database/ORM
        // return $userId;
    }
    
    /**
     * Example method to upgrade user plan
     */
    private function upgradeUserPlan($userId, $planName)
    {
        // Implement based on your database/ORM
    }
}
```

## User Flows

### 1. Customer Purchase Flow
1. Customer browses available software products on the marketplace
2. Customer selects a product and chooses a plan
3. Customer completes checkout process
4. System automatically:
   - For API-integrated partners:
     - Creates user account on partner platform
     - Applies the purchased plan
     - Sends account credentials via email
   - For redemption-based partners:
     - Generates redemption code
     - Sends redemption instructions via email
5. Customer accesses their purchase dashboard to view all purchases

### 2. Account Activation Flow
1. For API-integrated partners:
   - Customer receives email with account credentials
   - Customer logs in to partner platform using provided credentials
   - Customer has immediate access to the purchased plan features

2. For redemption-based partners:
   - Customer receives email with redemption code and instructions
   - Customer visits partner's redemption page
   - Customer enters redemption code
   - Partner's system verifies code with marketplace
   - Partner's system creates/upgrades account based on purchase details
   - Customer gains access to purchased plan features

### 3. Partner Onboarding Flow
1. Partner registers on marketplace
2. Partner provides product details and integration preferences
3. System generates API key for partner
4. For partners with APIs:
   - Partner configures webhook URL
   - Partner implements API endpoints for account creation
5. For partners without APIs:
   - Partner adds redemption verification code to their website
   - Partner configures how accounts are created upon verification

## Security Considerations

### 1. Redemption Code Security
- Use strong algorithms for generating unique redemption codes
- Implement one-time use for redemption codes
- Add expiration dates to redemption codes
- Rate limit verification attempts

### 2. API Security
- Use API keys for authentication
- Implement rate limiting
- Use HTTPS for all communications
- Validate all inputs
- Implement IP whitelisting for partner API calls

### 3. Account Credential Security
- Generate strong temporary passwords
- Force password change on first login
- Encrypt sensitive data in transit and at rest
- Implement secure password reset flows

## Monitoring and Analytics

### 1. Purchase Monitoring
- Track purchase completion rates
- Monitor redemption rates
- Alert on unusual patterns
- Track failed account provisions

### 2. Partner Performance
- Track sales by partner
- Monitor redemption success rates
- Analyze customer satisfaction by product
- Track support ticket volume by partner

### 3. Customer Insights
- Analyze plan popularity
- Track upgrade/downgrade patterns
- Monitor account usage patterns
- Identify churn risk factors

## Email Templates

### 1. API-Provisioned Account Email
```
Subject: Your [Product Name] Account is Ready!

Dear [Customer Name],

Thank you for your purchase of [Product Name] - [Plan Name]!

Your account has been automatically created and is ready to use:

Account Details:
- URL: [Partner Platform URL]
- Username: [Generated Username/Email]
- Password: [Temporary Password]
- Plan: [Plan Name]

Important: Please change your password after your first login.

You can access all your purchases at any time from your dashboard:
[Dashboard Link]

If you have any questions, please contact our support team.

Thank you,
[Your Company Name]
```

### 2. Redemption Code Email
```
Subject: Your [Product Name] Redemption Code

Dear [Customer Name],

Thank you for your purchase of [Product Name] - [Plan Name]!

To activate your purchase, please follow these steps:

1. Visit the redemption page: [Redemption URL]
2. Enter your redemption code: [Redemption Code]
3. Create your account or sign in to your existing account
4. Your purchased plan will be automatically applied

Your purchase details:
- Product: [Product Name]
- Plan: [Plan Name]
- Redemption Code: [Redemption Code]

You can access all your purchases at any time from your dashboard:
[Dashboard Link]

If you have any questions, please contact our support team.

Thank you,
[Your Company Name]
```

## Dashboard Mockups

### 1. Customer Purchase Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ My Purchases                                                │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Professional Logo Design Tool - Professional Plan       │ │
│ │                                                         │ │
│ │ Status: Active                                          │ │
│ │ Account: john@example.com                               │ │
│ │ Purchased: March 7, 2025                                │ │
│ │ Access: Lifetime                                        │ │
│ │                                                         │ │
│ │ [Access Account]  [View Invoice]  [Get Support]         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Website Builder Pro - Enterprise Plan                   │ │
│ │                                                         │ │
│ │ Status: Pending Redemption                              │ │
│ │ Redemption Code: WEB-5678EFGH                           │ │
│ │ Purchased: March 7, 2025                                │ │
│ │ Access: Lifetime                                        │ │
│ │                                                         │ │
│ │ [Redeem Now]  [View Invoice]  [Get Support]             │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2. Partner Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ Partner Dashboard                                           │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│ │ Total Sales     │ │ Active Accounts │ │ Revenue         │ │
│ │                 │ │                 │ │                 │ │
│ │ 1,245           │ │ 987             │ │ $24,890         │ │
│ │ ▲ 12% this month│ │ ▲ 8% this month │ │ ▲ 15% this month│ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│                                                             │
│ Products                                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Professional Logo Design Tool                           │ │
│ │                                                         │ │
│ │ Sales: 789       Active Accounts: 654   Revenue: $15,780  │ │
│ │ [Manage Product]  [View Analytics]  [Update Details]    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Website Builder Pro                                     │ │
│ │                                                         │ │
│ │ Sales: 456       Active Accounts: 333   Revenue: $9,110   │ │
│ │ [Manage Product]  [View Analytics]  [Update Details]    │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Conclusion
This reference document provides a comprehensive guide for implementing an AppSumo-like software marketplace with support for both API-integrated partners and partners using a redemption code system. The implementation focuses on SaaS products and account provisioning rather than traditional license keys, making it easier for partners with limited technical resources to integrate with your platform. 