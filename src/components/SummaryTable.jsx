import React from 'react';
import { ArrowRight, Info } from 'lucide-react';

// Import immagini
import rovereNaturale from '../assets/images/parquet/rovereNaturale.webp';
import rovereSpina from '../assets/images/parquet/rovereNaturaleSpinaItaliana.webp';
import parquetLaminato from '../assets/images/parquet/parquetLaminato.webp';
import parquetSPC from '../assets/images/parquet/parquetSPC.webp';
import battiscopa5cm from '../assets/images/parquet/battiscopa5cm.webp';

const THUMBNAILS = { default: rovereNaturale };

const getImageForService = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes('battiscopa')) return battiscopa5cm;
    if (name.includes('laminato')) return parquetLaminato;
    if (name.includes('spc')) return parquetSPC;
    if (name.includes('spina')) return rovereSpina;
    return rovereNaturale;
};

function SummaryTable({ data, onRowClick }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mb-16 animate-fadeIn">
            {/* Intestazione invariata... */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <ul className="divide-y divide-gray-100 pl-4">

                    {data.map((service) => {
                        const isExtra = service.isExtra === true;
                        const imageSrc = !isExtra ? getImageForService(service.name) : null;
                        const cleanPrice = service.price.replace('€', '').trim();

                        let unitLabel = 'mq';
                        if (service.unit) unitLabel = service.unit;
                        else if (service.name.toLowerCase().includes('battiscopa')) unitLabel = 'ml';

                        // ORA TUTTI SONO CLICCABILI
                        const rowClass = 'cursor-pointer hover:bg-gray-50 transition-colors';

                        return (
                            <li
                                key={service.id}
                                onClick={() => onRowClick && onRowClick(service)}
                                className={`group flex items-center justify-between py-4 pr-4 -ml-4 pl-4 ${rowClass}`}
                            >
                                {/* SINISTRA */}
                                <div className="flex items-center gap-4">
                                    <div className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${!isExtra ? 'overflow-hidden border border-gray-100 shadow-sm' : 'bg-gray-100 border border-transparent'}
                  `}>
                                        {!isExtra ? (
                                            <img src={imageSrc} alt={service.name} className="w-full h-full object-cover" />
                                        ) : (
                                            service.icon
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <span className={`text-sm font-bold leading-tight ${isExtra ? 'text-gray-700' : 'text-gray-900'}`}>
                                            {service.name}
                                        </span>
                                        {/* Visualizziamo "Tocca per info" se è extra, per far capire che è cliccabile */}
                                        {isExtra && (
                                            <span className="text-[10px] text-blue-500 font-medium hidden sm:block">
                                                Tocca per info e dettagli
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* DESTRA */}
                                <div className="flex items-center gap-3">
                                    <div className="text-right flex flex-col items-end">
                                        <span className={`text-base font-bold leading-none ${isExtra ? 'text-gray-600' : 'text-blue-600'}`}>
                                            {cleanPrice}<span className="text-sm font-normal text-gray-600">€</span>
                                        </span>
                                        <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide mt-0.5">
                                            {unitLabel.length > 3 ? `a ${unitLabel}` : `al ${unitLabel}`}
                                        </span>
                                    </div>

                                    <div className="w-4 flex justify-center">
                                        {!isExtra ? (
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                        ) : (
                                            // Icona Info per gli extra
                                            <Info className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <p className="text-center text-[10px] text-gray-600 mt-3 px-4">
                * Clicca su una voce per i dettagli.
            </p>
        </div>
    );
}

export default SummaryTable;