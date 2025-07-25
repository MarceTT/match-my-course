export function sendGTMEvent(event: string, params: Record<string, any> = {}) {
    if (typeof window === "undefined" || !window.dataLayer) return;
  
    const payload = {
      event,
      event_parameters: params, // GA4 espera que los datos vayan aquí
      page_path: window.location.pathname,
      page_title: document.title,
    };
  
    window.dataLayer.push(payload);
  
    console.log(`[GTM] Event sent: ${event}`, payload);
  }
  