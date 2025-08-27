import React, { useEffect, createElement } from "react";
export function useFreshdeskWidget() {
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
}
