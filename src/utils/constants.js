// Dati Aziendali (DEVONO CORRISPONDERE AL TUO GBP)
export const COMPANY_NAME = "Posa Parquet Roma"; // Il tuo nome commerciale
export const MAIN_CATEGORY = "Servizio di posa pavimenti in legno";
export const PRIMARY_CITY = "Roma";

// Usa il numero di telefono REALE che hai sul GBP
export const PHONE_NUMBER = "334 222 1212"; 
export const EMAIL_ADDRESS = "info@posaparquetroma.it"; 
export const WEBSITE_URL = "https://www.posaparquetroma.it";
// Questo è l'indirizzo di REGISTRAZIONE (es. casa tua)
// Serve per lo Schema Markup, anche se è NASCOSTO sul GBP
export const SCHEMA_ADDRESS = {
  streetAddress: "Via Jacopo Sansovino 9",
  addressLocality: "Tivoli",
  addressRegion: "RM",
  postalCode: "00019",
  addressCountry: "IT"
};


// Coordinate GPS di Roma (per lo Schema)
export const SCHEMA_GEO = {
  latitude: 41.9028,
  longitude: 12.4964
};

// Queste DEVONO corrispondere alle Categorie Secondarie del tuo GBP
export const GBP_CATEGORIES = [
  "Posa parquet prefinito",
  "Posa parquet prefinito flottante",
  "Posa parquet a spina",
  "Posa parquet laminato",
  "Posa battiscopa",
  "Rivestimento scale in parquet",
  "Posa SPC",
];

// Queste sono le AREE DI SERVIZIO che hai inserito nel GBP
export const SERVICE_AREAS = [
  { name: "roma", slug: "roma" },
  { name: "Sesto San Giovanni", slug: "Sesto San Giovanni" },
  { name: "Monza", slug: "Monza" },
  { name: "Cinisello Balsamo", slug: "Cinisello Balsamo" },
  { name: "Cologno Monzese", slug: "Cologno Monzese" },
  { name: "Rho", slug: "Rho" },
  { name: "Legnano", slug: "Legnano" },
];
