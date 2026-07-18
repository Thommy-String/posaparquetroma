export const gtagReportConversion = ({ sendTo, value = 1.0, currency = 'EUR', redirectUrl }) => {
  const navigate = () => {
    if (!redirectUrl) return;
    window.location.href = redirectUrl;
  };

  if (!sendTo) {
    navigate();
    return;
  }

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
      send_to: sendTo,
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