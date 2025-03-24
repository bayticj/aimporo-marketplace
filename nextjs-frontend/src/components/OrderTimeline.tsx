"use client";

import React from "react";

export type OrderStep = "requirements" | "in_progress" | "delivered" | "completed";

interface OrderTimelineProps {
  currentStep: OrderStep;
  progress?: number;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ 
  currentStep = "requirements",
  progress = 25
}) => {
  const steps = [
    { 
      id: "requirements", 
      number: 1, 
      title: "Project Requirements", 
      description: "Answer questions and provide details", 
      active: currentStep === "requirements" 
    },
    { 
      id: "in_progress", 
      number: 2, 
      title: "Seller Works on Order", 
      description: "Your project is being created", 
      active: currentStep === "in_progress" 
    },
    { 
      id: "delivered", 
      number: 3, 
      title: "Order Delivery", 
      description: "Seller completes and delivers your project", 
      active: currentStep === "delivered" 
    },
    { 
      id: "completed", 
      number: 4, 
      title: "Order Approval", 
      description: "Review and approve the completed work", 
      active: currentStep === "completed" 
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Submission Timeline</h3>
      
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start">
            <div 
              className={`flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full mr-3 ${
                step.active 
                  ? "bg-orange-500 text-white" 
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="text-sm font-medium">{step.number}</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
              <p className="text-xs text-gray-500">{step.description}</p>
              {step.active && <p className="text-xs text-orange-500 font-medium mt-1">Current Step</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
        <div className="flex items-start">
          <div className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium mb-1">4-Step Order Process</p>
            <p className="text-xs">
              After submitting your requirements, you'll receive updates as the seller creates and delivers your order. The final step will be your review and approval of the completed work.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Order Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-orange-500 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-600">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline; 