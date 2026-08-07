import { Ruler, ThumbsUp, Euro } from 'lucide-react';
import teamPhoto from '../assets/images/andrea-oni-parquettisti.webp';
import andreaPhoto from '../assets/images/primaDopoLavori/barbaraPrimaSPC.webp';
import oniPhoto from '../assets/images/Oni/onisim-parquettista.webp';
import teamVideo from '../assets/videos/andreaPosaSPC.webm';

const members = [
  {
    name: 'Andrea',
    role: 'Posatore Esperto',
    photo: andreaPhoto,
    objectPosition: 'center',
    description:
      '11+ anni di lavoro in Germania del nord. Porta precisione, ordine e puntualità.',
  },
  {
    name: 'Oni',
    role: 'Maestro',
    photo: oniPhoto,
    objectPosition: 'center',
    description:
      'Ha lavorato più di 16 anni in tutta Europa per case di pregio e progetti esclusivi.',
  },
];

const guarantees = [
  { icon: Ruler, label: 'Subito pronto' },
  { icon: ThumbsUp, label: 'Garanzia 100% soddisfatti' },
  { icon: Euro, label: 'Prezzi fissi' },
];

const GoogleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
  </svg>
);

export default function Temparquettisti() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Foto a cerchio grande in alto */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-200 shadow-md">
            <img
              src={teamPhoto}
              alt="Andrea & Oni - Parquettisti"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em] mb-2">
            I tuoi parquettisti
          </p>
          <h2 className="text-[26px] md:text-[32px] font-bold text-slate-900 tracking-tight leading-[1.05]">
            Andrea <span className="text-slate-300 mx-1.5 font-light">&</span> Oni
          </h2>
        </div>

        {/* Video con overlay Google + benefits */}
        <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-100 bg-slate-900">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-[4/3] md:aspect-[16/7] object-cover"
            poster={teamPhoto}
          >
            <source src={teamVideo} type="video/webm" />
          </video>

          {/* Label in alto a destra */}
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-medium text-white/40 drop-shadow-sm">
              Andrea <span className="text-white/30">-</span> posa SPC
            </span>
          </div>

          {/* Overlay in basso */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              {/* Google */}
              <div className="flex items-center gap-2 shrink-0">
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-bold text-white">4.9</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-3 h-3 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-white/70">467+ installazioni</p>
                </div>
              </div>
              {/* Divider */}
              <div className="hidden sm:block w-px h-7 bg-white/20" />
              {/* Benefits */}
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {guarantees.map((g) => (
                  <div key={g.label} className="flex items-center gap-1">
                    <g.icon className="w-3.5 h-3.5 text-white/80 shrink-0" />
                    <span className="text-[12px] font-medium text-white/90">{g.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Andrea e Oni — foto grande 1/3, testo 2/3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((m) => (
            <div
              key={m.name}
              className="flex rounded-xl border border-slate-200 bg-white overflow-hidden h-36"
            >
              <div className="w-1/3 shrink-0 overflow-hidden bg-slate-100 self-stretch relative">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: m.objectPosition }}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 tracking-tight flex items-center gap-1.5 mb-1">
                  {m.name}
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 shrink-0">
                    <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-white">
                      <path d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z" />
                    </svg>
                  </span>
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
                  {m.role}
                </p>
                <p className="mt-0.5 text-[12px] md:text-[13px] italic text-slate-500 leading-snug mt-2">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}