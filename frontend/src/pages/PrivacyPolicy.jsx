import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-10 my-12">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">
        Privacy Policy
      </h1>

      <section className="space-y-6 text-gray-700 text-base leading-relaxed">
        <p>
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Information We Collect
        </h2>
        <p>
          We collect personal details such as name, email, phone number, and payment information to provide our services.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Process your orders and payments.</li>
          <li>Communicate important updates and support.</li>
          <li>Improve our website and services.</li>
        </ul>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Data Security
        </h2>
        <p>
          We implement strong security measures to protect your data.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Your Rights
        </h2>
        <p>
          You have the right to access, update, or delete your personal information anytime.
        </p>

        <p className="text-sm text-gray-400 text-right mt-10 italic">
          Last updated: March 2026
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;