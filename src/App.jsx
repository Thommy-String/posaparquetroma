import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { servicesData } from './utils/servicesData'

const StickyGlassFooter = lazy(() => import('./components/StickyGlassFooter'))

function App() {
  const location = useLocation();
  const [showDeferredChrome, setShowDeferredChrome] = useState(false);

  const conversionId = useMemo(() => {
    const match = location.pathname.match(/^\/servizi\/([^/]+)/);
    if (!match) return null;

    const slug = decodeURIComponent(match[1]);
    return servicesData[slug]?.conversionId ?? null;
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (showDeferredChrome) return;

    const reveal = () => setShowDeferredChrome(true);

    if (location.pathname === '/') {
      if (window.scrollY > 24) {
        reveal();
        return;
      }

      window.addEventListener('scroll', reveal, { passive: true, once: true });
      window.addEventListener('pointerdown', reveal, { passive: true, once: true });
      window.addEventListener('keydown', reveal, { passive: true, once: true });

      return () => {
        window.removeEventListener('scroll', reveal);
        window.removeEventListener('pointerdown', reveal);
        window.removeEventListener('keydown', reveal);
      };
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(reveal, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = setTimeout(reveal, 1800);
    return () => clearTimeout(timer);
  }, [location.pathname, showDeferredChrome]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Header conversionId={conversionId}></Header>
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer conversionId={conversionId} />
     
      {showDeferredChrome && (
        <Suspense fallback={null}>
          <StickyGlassFooter conversionId={conversionId} />
        </Suspense>
      )}
      
    </div>
  )
}

export default App
