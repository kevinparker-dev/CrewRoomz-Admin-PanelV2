import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">CREWROOMZ, LLC LEGAL DOCUMENTATION</h1>

      <hr className="my-6 border-gray-300" />

      <section>
        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Effective Date:</strong> June 19, 2025 <br />
          <strong>Last Updated:</strong> June 19, 2025
        </p>

        <p className="mb-4">
          This Privacy Policy describes how <strong>CREWROOMZ, LLC</strong> (“Company,” “we,” “us,” or “our”)
          collects, uses, discloses, and protects your personal information when you access or use our
          mobile application, website, and associated services (collectively, the “Platform”).
          By using the Platform, you consent to the practices described herein.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>

            <h4 className="font-medium">a. Information You Provide:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>Full name, email address, and telephone number</li>
              <li>Employment role within aviation (e.g., pilot, flight attendant, mechanic)</li>
              <li>Payment credentials (processed via third-party payment gateways)</li>
              <li>Crashpad listing details (for Hosts)</li>
              <li>Communication and booking history</li>
            </ul>

            <h4 className="font-medium mt-4">b. Automatically Collected Information:</h4>
            <ul className="list-disc list-inside ml-4">
              <li>IP address, browser and device information</li>
              <li>Operating system, session identifiers, and usage activity</li>
              <li>Location data (subject to permission)</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Use of Information</h3>
            <p>We use your information for purposes including but not limited to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Operating, maintaining, and improving the Platform</li>
              <li>Processing bookings and payments</li>
              <li>Ensuring security and fraud prevention</li>
              <li>Complying with applicable legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Sharing of Information</h3>
            <p>Your information may be disclosed to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Authorized third-party vendors (e.g., payment and background screening processors)</li>
              <li>Regulatory or legal authorities upon valid request</li>
              <li>Our corporate affiliates and service providers, subject to confidentiality obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Data Retention</h3>
            <p>
              We retain your data for as long as necessary to fulfill the purpose for which it was collected,
              or as required by applicable law. You may request deletion of your data by contacting us.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. User Rights</h3>
            <p>Subject to applicable laws, you may:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Request access, correction, or deletion of your data</li>
              <li>Object to processing or withdraw consent</li>
              <li>File complaints with supervisory authorities</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Data Security</h3>
            <p>
              We implement commercially reasonable administrative, physical, and technical safeguards to
              protect data integrity and confidentiality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">7. Children’s Privacy</h3>
            <p>
              The Platform is not directed to individuals under 18. We do not knowingly collect information from minors.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">8. International Transfers</h3>
            <p>
              Your data may be processed and stored in jurisdictions outside of your country of residence.
              Appropriate safeguards will be used where legally required.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">9. Changes</h3>
            <p>
              We may revise this Privacy Policy at our discretion. Continued use constitutes acceptance of changes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">10. Contact Information</h3>
            <p>
              <strong>CREWROOMZ, LLC</strong><br />
              Email: <a href="mailto:info@crewroomz.com" className="text-blue-600 underline">info@crewroomz.com</a><br />
              Mailing Address: 1317 Edgewater Dr #5293, Orlando, FL 32804
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
