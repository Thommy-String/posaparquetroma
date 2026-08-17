// =============================================================================
// ParquettistiSocialProof — Social proof "dietro questo contenuto"
// Design ultra-minimale: foto piccola + una riga di testo, ampio whitespace.
// Posizionato SOPRA l'H1, in cima alla pagina.
// =============================================================================

import duoImg from '../assets/images/andrea-oni-parquettisti.webp';

export default function ParquettistiSocialProof({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-4 pt-8 sm:py-12 ${className}`}>
      {/* Foto di coppia — piccola, pulita, senza bordi pesanti */}
      <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-200 shrink-0">
        <img
          src={duoImg}
          alt="Andrea e Oni, parquettisti a Roma"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Una sola riga, sottile e discreta */}
      <p className="text-[13px] sm:text-sm text-gray-400 leading-snug">
        Scritto da{' '}
        <span className="font-semibold text-gray-600">Andrea & Oni</span>, parquettisti a Roma
      </p>
    </div>
  );
}