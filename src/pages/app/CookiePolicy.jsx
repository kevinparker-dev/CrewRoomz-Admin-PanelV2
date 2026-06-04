import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>

      <p className="text-sm text-gray-600 mb-6">
        <strong>Effective Date:</strong> June 19, 2025
      </p>

      <p className="mb-6">
        This Cookie Policy explains how <strong>CREWROOMZ, LLC</strong> (“we,” “our,” or “us”) uses cookies 
        and similar tracking technologies on our Platform.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. What Are Cookies?</h2>
          <p>
            Cookies are small data files placed on your device that help us improve functionality, performance,
            and user experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Types of Cookies We Use</h2>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Essential Cookies:</strong> Enable core functionality like security and user login.</li>
            <li><strong>Analytics Cookies:</strong> Track usage to improve features and content.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
            <li><strong>Marketing Cookies:</strong> May be used with consent for advertising and promotions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Managing Cookies</h2>
          <p>
            You may modify your browser settings to reject cookies, but this may affect certain features of the Platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
          <p>
            Email: <a href="mailto:info@crewroomz.com" className="text-blue-600 underline">info@crewroomz.com</a>
          </p>
        </div>
      </div>

      <hr className="my-10 border-gray-300" />

      <div className="space-y-10">
        {/* Terms for Consultation Services */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Terms for Consultation Services</h2>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Effective Date:</strong> June 19, 2025
          </p>
          <p className="mb-4">
            By booking a consultation with <strong>CREWROOMZ, LLC</strong>, you agree to the following terms:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Fees are due in full upon scheduling.</li>
            <li>Cancellations made less than 24 hours in advance are subject to a 50% cancellation fee.</li>
            <li>No warranties are expressed or implied. Information is general in nature and should not be construed as legal or professional advice.</li>
          </ul>
        </section>

        {/* Payment Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Payments Terms</h2>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Effective Date:</strong> June 19, 2025
          </p>
          <p className="mb-4">
            These Payments Terms govern all payment-related activities conducted through the CrewRoomz Platform.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Payments are processed by secure, third-party providers.</li>
            <li>All fees (subscription, booking, and service) are displayed prior to confirmation.</li>
            <li>Listers are responsible for any applicable taxes.</li>
            <li>Chargebacks or failed transactions may result in account suspension.</li>
          </ul>
        </section>

        {/* Rebooking & Refund Policy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Rebooking & Refund Policy</h2>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Effective Date:</strong> June 19, 2025
          </p>
          <p className="mb-4">
            Refunds or rebooking credits may be issued under the following conditions:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4">
            <li>
              <strong>Material Misrepresentation:</strong> If the listing significantly differs from its description 
              (e.g., safety, cleanliness, or accessibility issues), with documented proof provided within 24 hours of check-in.
            </li>
            <li>
              <strong>Seeker Violations:</strong> If a Seeker violates Lister’s rules, no refund will be given.
            </li>
            <li>
              <strong>Credit Policy:</strong> If a refund is not granted, a CrewRoomz credit will be issued valid for 12 months.
            </li>
          </ul>
          <p>
            All refund requests must be sent to <a href="mailto:info@crewroomz.com" className="text-blue-600 underline">info@crewroomz.com</a> with supporting documentation.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
