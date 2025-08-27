import React, { useEffect, createElement } from "react";
export function Support() {
  // Add Freshdesk widget
  useEffect(() => {
    // Create and add the Freshdesk widget settings script
    const settingsScript = document.createElement("script");
    settingsScript.innerHTML = `
      window.fwSettings={
        'widget_id':47000006737
      };
      !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
    `;
    document.head.appendChild(settingsScript);
    // Create and add the Freshdesk widget script
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://widget.freshworks.com/widgets/47000006737.js";
    widgetScript.async = true;
    widgetScript.defer = true;
    document.head.appendChild(widgetScript);
    // Cleanup function
    return () => {
      document.head.removeChild(settingsScript);
      if (document.head.contains(widgetScript)) {
        document.head.removeChild(widgetScript);
      }
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Support</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Contact Support
        </h2>
        <p className="text-gray-600 mb-6">
          Need help? Our support team is here to assist you. You can use the
          chat widget in the bottom right corner to start a conversation with
          our support team, or browse our knowledge base for answers to common
          questions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Chat Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Click the chat icon in the bottom right corner to start a
              conversation with our support team.
            </p>
            <p className="text-sm text-gray-500">
              Available Monday-Friday, 9am-5pm EST
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@technetworks.org"
              className="text-primary hover:text-primary/90 text-sm font-medium"
            >
              support@technetworks.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
