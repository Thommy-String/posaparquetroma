import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

import HomePage from './pages/HomePage.jsx'
import ServicePage from './pages/servizi/[slug].jsx'
const PosaParquetPage = lazy(() => import('./pages/PosaParquetPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'))
const TitleVariantsSPC = lazy(() => import('./pages/TitleVariantsSPC.jsx'))
const SPCInfoPage = lazy(() => import('./pages/SPCInfoPage.jsx'))

// Skeleton di caricamento per le pagine lazy — evita il flash bianco
const PageSkeleton = () => (
  <div className="min-h-screen bg-white animate-pulse">
    <div className="max-w-md mx-auto px-4 pt-12 space-y-4">
      <div className="h-6 w-48 bg-gray-100 rounded-full mx-auto" />
      <div className="h-8 w-full bg-gray-100 rounded-lg" />
      <div className="h-8 w-3/4 bg-gray-100 rounded-lg" />
      <div className="h-4 w-full bg-gray-50 rounded mt-4" />
      <div className="h-4 w-2/3 bg-gray-50 rounded" />
      <div className="h-64 w-full bg-gray-100 rounded-2xl mt-6" />
      <div className="flex gap-4 mt-6">
        <div className="h-14 flex-1 bg-gray-100 rounded-xl" />
        <div className="h-14 flex-1 bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
)

const waitForCriticalCss = () => {
  const cssReady = typeof window !== 'undefined' && window.__appCssReady
    ? window.__appCssReady
    : Promise.resolve();

  return Promise.race([
    Promise.resolve(cssReady),
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]);
};

waitForCriticalCss().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Assicurati che in App.jsx ci sia un <Outlet /> */}
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              
              {/* Questa è la rotta dinamica corretta */}
              <Route path="servizi/:slug" element={<ServicePage />} />
              
              {/* Landing page standalone per campagne Google Ads — posa parquet prefinito */}
              <Route path="posaparquet" element={<Suspense fallback={<PageSkeleton />}><PosaParquetPage /></Suspense>} />
              
              <Route path="privacy-policy" element={<Suspense fallback={<PageSkeleton />}><PrivacyPolicyPage /></Suspense>} />
              <Route path="title-variants-spc" element={<Suspense fallback={<PageSkeleton />}><TitleVariantsSPC /></Suspense>} />
              <Route path="spcinfo" element={<Suspense fallback={<PageSkeleton />}><SPCInfoPage /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>,
  )
})