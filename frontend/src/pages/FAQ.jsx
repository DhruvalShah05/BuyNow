import React from "react";

const FAQ = () => {
  return (
    <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-10 my-12">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">
        Frequently Asked Questions
      </h1>

      <section className="space-y-8 text-gray-700 text-base leading-relaxed">
        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">How do I place an order?</h2>
          <p>
            Browse our products, add items to your cart, and complete checkout to place an order.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">What payment methods do you accept?</h2>
          <p>We accept cash on delivery and credit/debit card payments.</p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Can I cancel or change my order?</h2>
          <p>
            You may cancel or modify orders only before they are shipped.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">How can I track my order?</h2>
          <p>
            After shipment, a tracking number will be sent to your email or phone.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">What is your return policy?</h2>
          <p>
            Returns accepted within 7 days for damaged or defective products. Contact support for assistance.
          </p>
        </div>
      </section>
    </main>
  );
};

export default FAQ;