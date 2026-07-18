export const gtagReportConversion = ({ sendTo, value = 1.0, currency = 'EUR', redirectUrl }) => {
  if (!sendTo) {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
    return;
  }

  const callback = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value,
      currency,
      event_callback: callback,
    });
  } else {
    callback();
  }
};