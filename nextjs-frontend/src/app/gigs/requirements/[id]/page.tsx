'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import OrderTimeline, { OrderStep } from '../../../../../src/components/OrderTimeline';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
  thumbnail?: string;
}

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
  required: boolean;
  options?: QuestionOption[];
  placeholder?: string;
}

// Modify the OrderRequirementsPage component to include questionnaire state
export default function OrderRequirementsPage() {
  const { id: orderId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [requirements, setRequirements] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gig, setGig] = useState<Gig | null>(null);
  const [loadingGig, setLoadingGig] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [showTips, setShowTips] = useState(false);
  
  // Add state for questionnaire responses and current step
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{[key: string]: string | string[]}>({});
  const [currentStep, setCurrentStep] = useState<OrderStep>('requirements');
  const [orderProgress, setOrderProgress] = useState(25);
  
  useEffect(() => {
    // Fetch gig details for this order - mocked for now
    const fetchGigData = async () => {
      setLoadingGig(true);
      try {
        // Mock data
        const mockGig: Gig = {
          id: 1,
          title: 'Professional Website Development',
          description: 'Complete website development with responsive design',
          price: 149.99,
          delivery_time: 7,
          thumbnail: '/assets/img/banner-img.png'
        };
        
        // Mock questionnaire data
        const mockQuestions: Question[] = [
          {
            id: 'q1',
            title: 'What type of website do you need?',
            type: 'select',
            required: true,
            options: [
              { id: 'op1', text: 'Business/Corporate' },
              { id: 'op2', text: 'E-commerce' },
              { id: 'op3', text: 'Portfolio' },
              { id: 'op4', text: 'Blog' },
              { id: 'op5', text: 'Landing Page' },
              { id: 'op6', text: 'Other (please specify)' }
            ]
          },
          {
            id: 'q2',
            title: 'Do you have a design or mockup ready?',
            type: 'radio',
            required: true,
            options: [
              { id: 'op1', text: 'Yes, I have a complete design' },
              { id: 'op2', text: 'I have some design elements but need help' },
              { id: 'op3', text: 'No, I need a design from scratch' }
            ]
          },
          {
            id: 'q3',
            title: 'Which features do you need for your website?',
            type: 'checkbox',
            required: true,
            options: [
              { id: 'op1', text: 'Contact Form' },
              { id: 'op2', text: 'Image Gallery' },
              { id: 'op3', text: 'Blog Section' },
              { id: 'op4', text: 'User Authentication' },
              { id: 'op5', text: 'Payment Integration' },
              { id: 'op6', text: 'Social Media Integration' },
              { id: 'op7', text: 'Newsletter Subscription' }
            ]
          },
          {
            id: 'q4',
            title: 'What is your target audience?',
            type: 'textarea',
            required: true,
            placeholder: 'Please describe your target audience, including age range, interests, and what they would be looking for on your website.'
          },
          {
            id: 'q5',
            title: 'Do you have any specific color preferences for your website?',
            type: 'text',
            required: false,
            placeholder: 'e.g., company colors, specific color palette, etc.'
          },
        ];
        
        setGig(mockGig);
        setQuestions(mockQuestions);
        
        // Initialize responses object with empty values
        const initialResponses: {[key: string]: string | string[]} = {};
        mockQuestions.forEach(q => {
          initialResponses[q.id] = q.type === 'checkbox' ? [] : '';
        });
        setResponses(initialResponses);
        
      } catch (error) {
        console.error('Error fetching gig data:', error);
      } finally {
        setLoadingGig(false);
      }
    };
    
    fetchGigData();
  }, [orderId]);

  // Add this function to handle questionnaire responses
  const handleResponseChange = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Modify the handleSubmit function to update the step instead of redirecting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required questions
    const unansweredQuestions = questions
      .filter(q => q.required)
      .filter(q => {
        const response = responses[q.id];
        if (Array.isArray(response)) {
          return response.length === 0;
        }
        return !response;
      });
    
    if (unansweredQuestions.length > 0) {
      setError(`Please answer all required questions. Missing: ${unansweredQuestions.map(q => q.title).join(', ')}`);
      return;
    }
    
    // Validate additional requirements
    if (!requirements.trim()) {
      setError('Please provide additional requirements or details in the second section');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to save requirements
      console.log('Submitting requirements:', {
        orderId,
        questionnaireResponses: responses,
        additionalRequirements: requirements,
        attachments: attachments.map(file => file.name)
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Requirements submitted successfully!');
      
      // Instead of redirecting, update the current step
      setCurrentStep('in_progress');
      setOrderProgress(50);
    } catch (err) {
      console.error('Error submitting requirements:', err);
      setError('Failed to submit requirements. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a function to go back to the previous step
  const handleGoBack = () => {
    if (currentStep === 'in_progress') {
      setCurrentStep('requirements');
      setOrderProgress(25);
    }
  };

  // Add file handling functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      validateAndAddFiles(newFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      validateAndAddFiles(newFiles);
    }
  };

  const validateAndAddFiles = (newFiles: File[]) => {
    // Check file type and size
    const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const invalidFiles = newFiles.filter(file => 
      !validFileTypes.includes(file.type) || file.size > maxSize
    );
    
    if (invalidFiles.length > 0) {
      setError('Some files were not added. Only JPEG, PNG, PDF, and ZIP files under 10MB are allowed.');
      
      // Filter out invalid files
      newFiles = newFiles.filter(file => 
        validFileTypes.includes(file.type) && file.size <= maxSize
      );
    }
    
    setAttachments(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle select change
  const handleSelectChange = (questionId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    handleResponseChange(questionId, e.target.value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (questionId: string, optionId: string, checked: boolean) => {
    setResponses(prev => {
      const currentValues = prev[questionId] as string[] || [];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValues, optionId]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentValues.filter(id => id !== optionId)
        };
      }
    });
  };

  if (loadingGig) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/gigs/${gig?.id}`} className="text-orange-500 hover:text-orange-600 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gig
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            {currentStep === 'requirements' ? 'Submit Requirements' : 'Order in Progress'}
          </h1>
          <p className="text-gray-600">
            {currentStep === 'requirements' 
              ? `Let's get started with your order #${orderId}. Please provide the information requested below.`
              : `Your order #${orderId} is now being processed by the seller.`
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-600 px-4 py-3 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Order Timeline */}
          <div className="md:col-span-1">
            <OrderTimeline 
              currentStep={currentStep} 
              progress={orderProgress} 
            />
          </div>

          {/* Right column - Main content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  {gig?.thumbnail && (
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={gig.thumbnail}
                        alt={gig.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{gig?.title}</h2>
                    <p className="text-gray-600">Delivery in {gig?.delivery_time} days</p>
                  </div>
                </div>
              </div>

              {currentStep === 'requirements' ? (
                // Requirements form - show when in requirements step
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Questionnaire section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Questions</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Please answer the following questions from the seller. Questions marked with an asterisk (*) are required.
                      </p>
                      
                      <div className="space-y-6">
                        {questions.map(question => (
                          <div key={question.id} className="border-b border-gray-100 pb-6">
                            <div className="mb-2 flex">
                              <label htmlFor={question.id} className="block text-sm font-medium text-gray-900">
                                {question.title}
                                {question.required && <span className="text-red-500 ml-1">*</span>}
                              </label>
                            </div>
                            
                            {question.type === 'select' && (
                              <div className="mt-2">
                                <select
                                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                  value={responses[question.id] as string}
                                  onChange={(e) => handleSelectChange(question.id, e)}
                                >
                                  <option value="">-- Please select --</option>
                                  {question.options?.map(option => (
                                    <option key={option.id} value={option.id}>
                                      {option.text}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {question.type === 'radio' && (
                              <div className="mt-2 space-y-3">
                                {question.options?.map(option => (
                                  <div key={option.id} className="flex items-center">
                                    <input
                                      type="radio"
                                      id={`${question.id}-${option.id}`}
                                      name={question.id}
                                      value={option.id}
                                      checked={(responses[question.id] as string) === option.id}
                                      onChange={() => handleResponseChange(question.id, option.id)}
                                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                                    />
                                    <label htmlFor={`${question.id}-${option.id}`} className="ml-2 block text-sm text-gray-700">
                                      {option.text}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === 'checkbox' && (
                              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options?.map(option => (
                                  <div key={option.id} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id={`${question.id}-${option.id}`}
                                      checked={(responses[question.id] as string[])?.includes(option.id)}
                                      onChange={(e) => handleCheckboxChange(question.id, option.id, e.target.checked)}
                                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`${question.id}-${option.id}`} className="ml-2 block text-sm text-gray-700">
                                      {option.text}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === 'text' && (
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={responses[question.id] as string}
                                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                  placeholder={question.placeholder}
                                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                              </div>
                            )}

                            {question.type === 'textarea' && (
                              <div className="mt-2">
                                <textarea
                                  value={responses[question.id] as string}
                                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                  placeholder={question.placeholder}
                                  rows={4}
                                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                                <div className="mt-1 text-xs text-gray-500 text-right">
                                  {(responses[question.id] as string || '').length} characters
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional info section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Info</h3>
                      
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <label htmlFor="requirements" className="block text-sm font-medium text-gray-900">
                            Additional Requirements <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowTips(!showTips)}
                            className="text-xs text-orange-500 hover:text-orange-600"
                          >
                            {showTips ? 'Hide Tips' : 'Show Tips'}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <textarea
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            rows={6}
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Add any additional information that might help the seller understand your needs better."
                          ></textarea>
                          <div className="absolute right-2 bottom-2">
                            <button 
                              type="button" 
                              onClick={() => setShowTips(!showTips)}
                              className="text-gray-500 hover:text-orange-500"
                              aria-label="Show tips"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                      <Link 
                        href={`/gigs/${gig?.id}`} 
                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                          loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Requirements
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // Order in progress content - show after requirements submitted
                <div className="p-6">
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Requirements submitted successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your requirements have been sent to the seller. They will start working on your order soon.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
                  
                  <ol className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-800 mr-3">
                        <span className="text-xs font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Seller Review</h4>
                        <p className="text-sm text-gray-600">
                          The seller will review your requirements and may contact you for clarification if needed.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-800 mr-3">
                        <span className="text-xs font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Work in Progress</h4>
                        <p className="text-sm text-gray-600">
                          You'll receive updates as the seller works on your order. You can check back here for progress.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-800 mr-3">
                        <span className="text-xs font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Final Delivery</h4>
                        <p className="text-sm text-gray-600">
                          When the work is complete, you'll receive a notification to review and approve the delivery.
                        </p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={handleGoBack}
                      className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      Go Back to Requirements
                    </button>
                    <Link 
                      href="/dashboard/orders"
                      className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      View My Orders
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 