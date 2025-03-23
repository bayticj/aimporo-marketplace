'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

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
  
  // Add state for questionnaire responses
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{[key: string]: string | string[]}>({});
  
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
  
  // Modify the handleSubmit function to validate all requirements at once
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
      
      // Redirect to thank you page
      router.push(`/gigs/requirements/thank-you`);
    } catch (err) {
      console.error('Error submitting requirements:', err);
      setError('Failed to submit requirements. Please try again.');
    } finally {
      setLoading(false);
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
          
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Submit Requirements</h1>
          <p className="text-gray-600">
            Let's get started with your order <span className="font-medium text-orange-600">#{orderId}</span>. Please provide the information requested below.
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 p-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">
                          <strong>Please complete all required information</strong> to help your seller understand your needs. 
                          Questions marked with an asterisk (<span className="text-red-500">*</span>) are required.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Questionnaire Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mr-3">1</span>
                      Seller Questions
                    </h3>
                    
                    <div className="space-y-8">
                      {questions.map((question, index) => (
                        <div key={question.id} className="border border-gray-200 rounded-lg p-5 transition-all hover:border-orange-200 hover:shadow-sm">
                          <div className="flex items-center mb-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-medium mr-3">
                              {index + 1}
                            </span>
                            <label className="block text-sm font-medium text-gray-900">
                              {question.title} {question.required && <span className="text-red-500">*</span>}
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

                  {/* Additional Info Section */}
                  <div className="pt-6 border-t border-gray-200 mt-10 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mr-3">2</span>
                      Additional Information
                    </h3>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Additional Requirements or Details
                      </label>
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
                      <div className="mt-1 flex justify-between">
                        <span className="text-xs text-gray-500">{requirements.length > 0 ? `${requirements.length} characters` : 'No text added yet'}</span>
                        <button 
                          type="button" 
                          onClick={() => setShowTips(!showTips)}
                          className="text-xs text-orange-500 hover:text-orange-600"
                        >
                          {showTips ? 'Hide tips' : 'Show writing tips'}
                        </button>
                      </div>
                      
                      {showTips && (
                        <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                          <p className="font-medium text-gray-900 mb-2">Tips for detailed requirements:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Be specific about what you want to achieve with this project</li>
                            <li>Include examples of designs or sites you like</li>
                            <li>Mention your preferences and priorities</li>
                            <li>List any specific technologies or tools you'd like used</li>
                            <li>Include details about your target audience and brand</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Attachments (optional)
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 ${
                          dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                        } transition-all`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className="text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            Drag and drop files here, or{' '}
                            <label className="text-orange-500 hover:text-orange-600 cursor-pointer">
                              browse
                              <input 
                                type="file" 
                                multiple 
                                onChange={handleFileChange} 
                                className="hidden" 
                              />
                            </label>
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Supported formats: JPEG, PNG, PDF, ZIP (max 10MB each)
                          </p>
                        </div>
                      </div>

                      {attachments.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">Uploaded files ({attachments.length})</h4>
                            {attachments.length > 1 && (
                              <button 
                                type="button"
                                onClick={() => setAttachments([])}
                                className="text-xs text-red-500 hover:text-red-600"
                              >
                                Remove all
                              </button>
                            )}
                          </div>
                          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-gray-50">
                            {attachments.map((file, index) => (
                              <li key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                                <div className="flex items-center max-w-[80%]">
                                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-200 rounded mr-3">
                                    {file.type.includes('image') ? (
                                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    ) : file.type.includes('pdf') ? (
                                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                    ) : (
                                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm truncate font-medium text-gray-700">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                  </div>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700 rounded-full p-1 hover:bg-red-50"
                                  aria-label="Remove file"
                                >
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                </div>
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Submission Timeline</h3>
                </div>
                <div className="p-6">
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                    
                    <ol className="space-y-8 relative">
                      <li className="ml-10">
                        <div className="flex items-center">
                          <div className={`absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-medium text-sm z-10`}>
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-base">Project Requirements</h4>
                            <p className="text-sm text-gray-600 mt-1">Answer questions and provide details</p>
                            <span className="inline-block mt-2 text-xs font-medium text-orange-500">Current Step</span>
                          </div>
                        </div>
                      </li>
                      
                      <li className="ml-10">
                        <div className="flex items-center">
                          <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-medium text-sm z-10">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-base">Seller Works on Order</h4>
                            <p className="text-sm text-gray-600 mt-1">Your project is being created</p>
                          </div>
                        </div>
                      </li>
                      
                      <li className="ml-10">
                        <div className="flex items-center">
                          <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-medium text-sm z-10">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-base">Order Delivery</h4>
                            <p className="text-sm text-gray-600 mt-1">Seller completes and delivers your project</p>
                          </div>
                        </div>
                      </li>
                      
                      <li className="ml-10">
                        <div className="flex items-center">
                          <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-medium text-sm z-10">
                            4
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-base">Order Approval</h4>
                            <p className="text-sm text-gray-600 mt-1">Review and approve the completed work</p>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                      <div className="flex-shrink-0 text-blue-500 mt-1">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-blue-800">4-Step Order Process</h5>
                        <p className="text-sm text-blue-700 mt-1">
                          After submitting your requirements, you'll receive updates as the seller creates and delivers your order. The final step will be your review and approval of the completed work.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Order Progress</span>
                        <span className="font-medium text-gray-700">25%</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-orange-500 h-2.5 rounded-full" 
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 