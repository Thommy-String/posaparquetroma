const GLOBAL_CONVERSION_ID = 'AW-18310459317/JQxpCKv_y9IcELXfjZtE';

export const gtagReportConversion = ({ value = 1.0, currency = 'EUR', redirectUrl }) => {
  const navigate = () => {
    if (!redirectUrl) return;
    window.location.href = redirectUrl;
  };

  let hasNavigated = false;
  const navigateOnce = () => {
    if (hasNavigated) return;
    hasNavigated = true;
    navigate();
  };

  // Fallback di sicurezza: se gtag/event_callback non risponde,
  // la CTA deve comunque restare cliccabile e aprire tel/WhatsApp.
  const fallbackTimer = window.setTimeout(navigateOnce, 900);

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GLOBAL_CONVERSION_ID,
      value,
      currency,
      event_callback: () => {
        window.clearTimeout(fallbackTimer);
        navigateOnce();
      },
    });
  } else {
    window.clearTimeout(fallbackTimer);
    navigateOnce();
  }
};