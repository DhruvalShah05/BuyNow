import React from "react";

const TermsOfUse = () => {
  return (
    <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-10 my-12">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">
        Terms of Use
      </h1>

      <section className="space-y-6 text-gray-700 text-base leading-relaxed">
        <p>
          By accessing this website, you agree to the following terms. Please read carefully.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Use of Website
        </h2>
        <p>
          You agree to use this website legally and respectfully.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Intellectual Property
        </h2>
        <p>
          All content on this site is owned or licensed by us and protected by copyright laws.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Limitation of Liability
        </h2>
        <p>
          We are not liable for damages arising from use or inability to use the website.
        </p>

        <h2 className="text-xl font-semibold border-l-4 border-red-500 pl-3">
          Changes to Terms
        </h2>
        <p>
          We reserve the right to update terms at any time without prior notice.
        </p>

        <p className="text-sm text-gray-400 text-right mt-10 italic">
          Last updated: March 2026
        </p>
      </section>
    </main>
  );
};

export default TermsOfUse;