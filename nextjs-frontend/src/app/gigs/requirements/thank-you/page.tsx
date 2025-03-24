"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import OrderTimeline from "../../../../../src/components/OrderTimeline";

const RequirementsThankYouPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Trigger confetti effect when page loads
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Requirements Submitted</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            Return Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Order Timeline */}
          <div className="md:col-span-1">
            <OrderTimeline 
              currentStep="in_progress" 
              progress={50} 
            />
          </div>

          {/* Right column - Success content */}
          <div className="md:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Thanks for submitting your requirements!
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Your requirements have been submitted successfully. The seller has been notified and will review them shortly.
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-medium mr-3">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Seller reviews your requirements</p>
                        <p className="text-gray-500 text-sm">The seller will review your requirements and may contact you if they need any clarification.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-medium mr-3">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Work in progress</p>
                        <p className="text-gray-500 text-sm">The seller will update you on the progress of your order.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-medium mr-3">
                        3
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Delivery</p>
                        <p className="text-gray-500 text-sm">The seller will deliver the completed order for your review and approval.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <Link 
                href="/dashboard/orders" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Your Orders
              </Link>
              <Link 
                href="/gigs/marketplace" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequirementsThankYouPage;
