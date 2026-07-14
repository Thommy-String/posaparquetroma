// src/components/DescrizioneMainCategories.jsx

const DescrizioneMainCategories = () => {
    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* 1. L'H2 Esatto (dalla Categoria Secondaria GBP) */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Ditta specializzata in pavimentazioni
                </h2>

                {/* 2. Il Testo con Menzioni Locali (come da video) */}
                <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
                    <p>
                        Come <strong>ditta specializzata in pavimentazioni a roma</strong>, la nostra competenza non si ferma solo al parquet. Per rispondere a ogni esigenza, ci siamo specializzati anche nelle soluzioni tecniche più moderne e richieste, come i pavimenti in <strong>SPC</strong>, <strong>LVT</strong> e <strong>laminato</strong>.
                    </p>
                    <p>
                        Ogni edificio romano ha esigenze specifiche. Che si tratti di una boutique a <strong>Trastevere</strong> che necessita di un pavimento resistente, di un appartamento d'epoca ai <strong>Parioli</strong> dove occorre intervenire senza demolizioni o di un attico contemporaneo in zona <strong>EUR</strong> che cerca un look moderno e impermeabile, studiamo sempre il sistema più adatto.
                    </p>
                    <p>
                        Oltre alla posa di parquet prefinito siamo specializzati nelle soluzioni più innovative come
                        i pavimenti <strong>SPC</strong> e <strong>LVT</strong>. Questi materiali sono ideali per la loro resistenza e
                        versatilità in contesti ad alto calpestio, come uno showroom in <strong>Via del Corso</strong>.
                        Gestiamo inoltre la posa di laminato per attività commerciali e abitazioni
                        in tutta <strong>Roma</strong>, garantendo una finitura impeccabile e duratura.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default DescrizioneMainCategories;
