import React from 'react';

function RefundPolicy() {
  return (
    <div className="p-6">
      <div className="text-2xl text-center mb-4 font-semibold">Cancellation and Refund Policy</div>
      <div className="max-w-4xl mx-auto text-justify">
        <p className="mb-4">
          <strong>Effective Date:</strong> <span className="font-bold">January 15, 2025</span>
        </p>
        
        <p className="mb-4">
          Thank you for using our <strong>Movie Booking System</strong>. This policy outlines the terms for refunds and cancellations. By purchasing tickets through our Service, you agree to these terms.
        </p>
        
        <p className="mb-4">
          In this policy, "Company," "We," "Us," or "Our" refers to <strong>Sanchit Wadehra and the Movie Booking System platform</strong>. "You" refers to the user of our Service. "Tickets" refer to movie tickets purchased, and "Bookings" are your requests to purchase them.
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-3">Cancellation Rights and Refund Eligibility</h3>
          <p className="mb-4">
            We understand that plans can change. You are entitled to cancel your movie ticket booking and receive a refund under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Your cancellation request must be made at least <strong>2 hours before</strong> the scheduled show time.</li>
            <li className="text-red-600 font-bold">Cancellations made within the 2-hour window leading up to the show time, or after the movie has started, are not eligible for a refund.</li>
            <li>In the event that a show is cancelled by the cinema due to technical problems or other unforeseen circumstances, a full refund will be provided to all affected ticket holders.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">How to Cancel and Refund Processing</h3>
          <p className="mb-3">
            To initiate a cancellation, you can cancel a confirmed booking directly from your transaction history screen. This action will make your seats available again[cite: 48, 49]. You can also contact our customer support through the application for assistance.
          </p>
          <p className="mb-4">
            Once a valid cancellation request is received, we will process your refund within <strong>5-7 business days</strong>. The refund will be credited to the original payment method used for the booking. Please note that any applicable processing fees will be deducted from the refund amount as per our terms.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>
            If you have any questions about our Cancellation and Refund Policy, please do not hesitate to reach out to our customer support team through the application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;