import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="p-6">
      <div className="text-2xl text-center font-semibold mb-4">Privacy Policy</div>
      <div className="text-justify max-w-4xl mx-auto space-y-4">
        <p><strong>Last Updated:</strong> <span className="font-bold">January 15, 2025</span></p>
        <p>
          This Privacy Policy explains how <strong>Sanchit Wadehra and the Movie Booking System platform</strong> ("We", "Us") collects, uses, and discloses your information when you use our Service. By using our platform, you consent to the practices described in this policy.
        </p>

        <div>
            <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
            <p className="mb-4">
              To provide and improve our movie booking service, we collect certain information. This includes Personal Data you provide, such as your full name, email address, phone number, seat preferences, and booking history. Your payment information is processed securely by our third-party payment partners and is not stored by us. We also automatically collect Usage Data, which may include your IP address, browser type, pages visited, and the time and date of your visit.
            </p>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-3">How We Use and Share Your Data</h3>
            <p className="mb-4">
              Your data is used to provide and maintain our Service, manage your account, process your ticket purchases, and communicate with you about your bookings or important updates. We also analyze this data to enhance user experience and improve our offerings.
            </p>
            <p className="mb-4">
              We may share your information with trusted third parties to perform essential functions. This includes sharing payment details with <strong>Payment Processors</strong>, booking information with <strong>Cinema Partners</strong> for ticket validation, and contact details with <strong>Communication Services</strong> to send confirmations. In the event of a merger or acquisition, your data may be transferred as part of our business assets. We will not share your information for any other purpose without your explicit consent, unless required by law.
            </p>
        </div>
        
        <div>
            <h3 className="text-xl font-semibold mb-3">Data Security and Your Rights</h3>
            <p className="mb-4">
              The security of your data is important to us, and we implement reasonable measures to protect it. However, no online transmission is 100% secure. We retain your data only as long as necessary for operational purposes and legal compliance. You have the right to request access to, correction of, or deletion of your personal data by contacting us, subject to any legal obligations to retain certain information.
            </p>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-3">Policy Updates and Contact</h3>
            <p>
              We may update this policy periodically. Any changes will be posted on this page with an updated revision date. If you have questions about this Privacy Policy, please contact us through our customer support system within the application.
            </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;