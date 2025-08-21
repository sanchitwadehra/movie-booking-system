import React from 'react';

function TermsAndConditions() {
  return (
    <div className="p-6">
      <div className="text-2xl text-center font-semibold mb-4">Terms and Conditions</div>
      <div className="text-justify max-w-4xl mx-auto space-y-4">
        <p><strong>Effective Date:</strong> <span className="font-bold">January 15, 2025</span></p>
        <p>
          Welcome to the <strong>Movie Booking System</strong>. These Terms and Conditions ("Terms") govern your use of our website and services ("Service"), provided by Sanchit Wadehra ("Owner", "We"). By accessing our Service, you ("User", "You") agree to be bound by these Terms, our Privacy Policy, and any other referenced policies. If you do not agree, please do not use our Service. You must be at least 13 years old to use this platform.
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-3">Service and User Obligations</h3>
          <p className="mb-4">
            Our Website is an online platform for booking movie tickets. We grant you a limited, non-transferable, revocable license to use our Service for personal, non-commercial purposes. All content and intellectual property on this site are owned by us, and you agree not to reproduce or distribute it without permission.
          </p>
          <p className="mb-4">
            As a user, you may be required to register an account. You are responsible for providing accurate information and maintaining the confidentiality of your login credentials. You agree to pay all fees for purchases made through your account. Providing false information or using the Service for fraudulent activity is grounds for immediate termination of your account.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Acceptable Use</h3>
          <p className="mb-4">
            You agree not to use the Service for any unlawful purpose. This includes, but is not limited to, harassing others, violating intellectual property rights, disseminating malware, perpetrating fraud, or distributing obscene or discriminatory material. You are prohibited from using automated means like scraping or crawling to collect information and from interfering with the security features of the Service. We reserve the right to terminate access for any user who violates these terms.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Disclaimers and Limitation of Liability</h3>
          <p className="mb-4">
            The Service is provided on an "As Is" and "As Available" basis. We disclaim all warranties, express or implied, including fitness for a particular purpose. We do not guarantee that the Service will be uninterrupted, error-free, or secure. Your use of the Service is at your own risk.
          </p>
          <p className="mb-4">
            To the fullest extent permitted by law, the Owner shall not be liable for any direct, indirect, consequential, or punitive damages arising from your use of the Service. Our maximum liability for any claim is limited to the amount you paid us in the last six months or Rs. 1000, whichever is lesser. You agree to indemnify and hold us harmless from any legal claims arising from your misuse of the Service.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">General Provisions</h3>
          <p>
            These Terms constitute the entire agreement between you and the Owner. We may modify these Terms at any time by posting the updated version on this page. Your continued use of the Service signifies your acceptance of the changes. These Terms shall be governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts at Sangrur, Punjab. For questions, please contact us via the application's customer support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;