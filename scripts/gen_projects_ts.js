// Generate src/lib/projects.ts from /tmp/local_manifest.json
const fs = require('fs');
const manifest = require('/tmp/local_manifest.json');

const META = {
  "ATAKLTI": { year: "2024", location: "Addis Ababa, ET", scale: "Residential Tower" },
  "DSL BOLE": { year: "2024", location: "Bole, Addis Ababa", scale: "Residential — Aerial Animation" },
  "ESKNDER APT": { year: "2024", location: "Addis Ababa, ET", scale: "Apartment Interior" },
  "HUGO": { year: "2024", location: "Addis Ababa, ET", scale: "Apartment Interior" },
  "JAMBO": { year: "2024", location: "Addis Ababa, ET", scale: "Apartment Exterior" },
  "MULE APT": { year: "2024", location: "Addis Ababa, ET", scale: "Apartment — Aerial Comparison" },
  "YAHHAR REAL ESTATE": { year: "2024", location: "Addis Ababa, ET", scale: "Real Estate Masterplan" },
  "MNRC": { year: "2024", location: "Addis Ababa, ET", scale: "Mixed-Use Development" },
  "OMAR": { year: "2024", location: "Addis Ababa, ET", scale: "Mixed-Use — Full Visualization Set" },
  "SYNERGY": { year: "2023", location: "Competition", scale: "Concept Design" },
  "AKE HOTEL RESORT": { year: "2024", location: "Resort", scale: "Hotel & Resort Animation" },
  "MNRC MALL": { year: "2024", location: "Addis Ababa, ET", scale: "Retail Mall Animation" },
  "YEKA": { year: "2024", location: "Addis Ababa, ET", scale: "Mall — Aerial & Walkthrough" },
  "alliance": { year: "2024", location: "Addis Ababa, ET", scale: "Office Tower" },
  "birhan insurance": { year: "2024", location: "Addis Ababa, ET", scale: "Insurance HQ" },
  "dugda": { year: "2024", location: "Ethiopia", scale: "Office Complex" },
  "MNRC OFFICE": { year: "2024", location: "Addis Ababa, ET", scale: "Office Tower Animation" },
  "OP 1": { year: "2024", location: "Addis Ababa, ET", scale: "Office Project 1" },
  "OP2": { year: "2024", location: "Addis Ababa, ET", scale: "Office Project 2" },
  "ADIYA": { year: "2024", location: "Addis Ababa, ET", scale: "Private Residence" },
  "ASTER": { year: "2024", location: "Addis Ababa, ET", scale: "Private Residence" },
  "ROZINA": { year: "2024", location: "Addis Ababa, ET", scale: "Private Residence" },
  "LEGETAFO LANDSCAPE": { year: "2024", location: "Legetafo, ET", scale: "Landscape Masterplan" },
  "HOSPITAL": { year: "2023", location: "Ethiopia", scale: "Healthcare Proposal" },
  "YEKA PARK": { year: "2023", location: "Addis Ababa, ET", scale: "Park Proposal" },
  "BILOS": { year: "2024", location: "Addis Ababa, ET", scale: "Cafe & Restaurant Animation" },
};

const CATEGORIES = [
  { id: "01_APARTMENT", number: "01", label: "Apartment" },
  { id: "02_MIXED_USE", number: "02", label: "Mixed Use" },
  { id: "03_COMPETITION", number: "03", label: "Competition" },
  { id: "04_HOTEL RESORT", number: "04", label: "Hotel & Resort" },
  { id: "05_MALL", number: "05", label: "Mall" },
  { id: "06_OFFICE", number: "06", label: "Office" },
  { id: "07_RESDENCE", number: "07", label: "Residence" },
  { id: "08_LANDSCAPE", number: "08", label: "Landscape" },
  { id: "09_PROPOSAL", number: "09", label: "Proposal" },
  { id: "11_CAFE ANDRESTAURANT", number: "11", label: "Cafe & Restaurant" },
];
const catLabelMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c.label]));

manifest.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.projectName.localeCompare(b.projectName, 'en', { numeric: true });
});

const projects = manifest.filter(p => p.projectName !== 'New folder').map((p) => {
  const cat = CATEGORIES.find(c => c.id === p.category);
  const meta = META[p.projectName] || { year: "2024", location: "Addis Ababa, ET", scale: catLabelMap[p.category] };
  const id = p.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const media = p.media.slice().sort((a, b) => a.fileName.localeCompare(b.fileName, 'en', { numeric: true }));
  const mediaStr = media.map(m => `    { src: ${JSON.stringify(m.localPath)}, isVideo: ${m.isVideo}, fileName: ${JSON.stringify(m.fileName)} },`).join('\n');
  return `  {
    id: ${JSON.stringify(id)},
    category: ${JSON.stringify(p.category)},
    categoryNumber: ${JSON.stringify(cat.number)},
    title: ${JSON.stringify(p.projectName)},
    year: ${JSON.stringify(meta.year)},
    location: ${JSON.stringify(meta.location)},
    scale: ${JSON.stringify(meta.scale)},
    media: [
${mediaStr}
    ],
  },`;
}).join('\n');

const catStr = CATEGORIES.map(c => `  { id: ${JSON.stringify(c.id)}, number: ${JSON.stringify(c.number)}, label: ${JSON.stringify(c.label)} },`).join('\n');

const output = `// Real archviz portfolio data — extracted from the source bundle.
// ${manifest.filter(p => p.projectName !== 'New folder').length} projects across ${CATEGORIES.length} categories.
// ${manifest.filter(p => p.projectName !== 'New folder').reduce((s, p) => s + p.media.length, 0)} media items total.

export type CategoryId =
  | "01_APARTMENT"
  | "02_MIXED_USE"
  | "03_COMPETITION"
  | "04_HOTEL RESORT"
  | "05_MALL"
  | "06_OFFICE"
  | "07_RESDENCE"
  | "08_LANDSCAPE"
  | "09_PROPOSAL"
  | "11_CAFE ANDRESTAURANT";

export interface Category {
  id: CategoryId;
  number: string;
  label: string;
}

export const CATEGORIES: Category[] = [
${catStr}
];

export interface MediaItem {
  src: string;
  isVideo: boolean;
  fileName: string;
}

export interface Project {
  id: string;
  category: CategoryId;
  categoryNumber: string;
  title: string;
  year: string;
  location: string;
  scale: string;
  media: MediaItem[];
}

export const PROJECTS: Project[] = [
${projects}
];

export function posterFor(p: Project): MediaItem | undefined {
  return p.media.find((m) => !m.isVideo) ?? p.media[0];
}
`;

fs.mkdirSync('/home/z/my-project/src/lib', { recursive: true });
fs.writeFileSync('/home/z/my-project/src/lib/projects.ts', output);
console.log('Wrote', manifest.filter(p => p.projectName !== 'New folder').length, 'projects');
