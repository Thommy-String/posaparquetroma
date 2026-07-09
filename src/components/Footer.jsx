import { Link } from 'react-router-dom';
import { COMPANY_NAME, PHONE_NUMBER } from '../utils/constants';
import { serviceNavLinks } from '../utils/serviceNavLinks';
import logoImage from '../assets/logo/logo-96-white-bands.webp';

const serviceLinks = serviceNavLinks
  .filter((s) => s.slug && s.navLabel)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((s) => ({
    slug: s.slug,
    label: s.navLabel,
  }));

function Footer() {
  return (
    <footer
      id="contatti"
      className="border-t border-gray-200 bg-white/90 backdrop-blur"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 text-center sm:text-left md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <img
                src={logoImage}
                alt={COMPANY_NAME}
                className="h-16 w-16 object-contain"
                loading="eager"
                decoding="async"
                width="96"
                height="96"
              />
            </div>
            <p className="text-sm text-gray-500">
               specializzati in parquet prefinito, SPC, LVT, laminato e scale su misura.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Servizi
            </p>
            <ul className="flex flex-col items-center gap-2 text-sm text-gray-500 sm:items-start">
              {serviceLinks.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    to={`/servizi/${slug}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p className="font-semibold text-gray-600">
              Sede legale
            </p>
            <p>
              Via Daturi 5 29121<br />
              Piacenza (PC)
            </p>
            <p className="pt-1 text-xs uppercase tracking-[0.25em] text-gray-600">
              P.IVA 01914870330
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                if (typeof window.gtag_report_conversion === 'function') {
                  window.gtag_report_conversion();
                }
              }}
              className="rounded-full border border-blue-100 bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
            >
              {PHONE_NUMBER}
            </a>
            <p className="text-xs text-gray-600">
              Disponibili 7/7 dalle 7:00 alle 20:00
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-600 sm:flex sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. Tutti i diritti riservati.
          </p>
          <p className="mt-2 sm:mt-0">
            Servizio clienti dedicato e consulenza materiali su richiesta.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
