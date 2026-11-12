// Mockup catalog data. In Phase 2 this moves to a CMS / database (dynamic catalog).
export type Shape =
  | "round"
  | "square"
  | "tall"
  | "flask"
  | "rollon"
  | "diffuser"
  | "atomizer"
  | "cap"
  | "box";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  shape: Shape;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  shape: Shape;
  glass: string; // tint used by the placeholder illustration
  cap: string;
  sizes: string[];
  material: string;
  neck: string;
  moq: string;
  finishes: string[];
  summary: string;
  featured?: boolean;
};

export const categories: Category[] = [
  { slug: "glass-perfume-bottles", name: "Glass Perfume Bottles", blurb: "Classic and designer glass bottles from 30 ml to 100 ml.", shape: "square" },
  { slug: "spray-atomizers", name: "Spray & Travel Atomizers", blurb: "Refillable pocket sprayers and sample vials.", shape: "atomizer" },
  { slug: "roll-on-bottles", name: "Roll-on Bottles", blurb: "Attar and oil roll-ons with steel or glass balls.", shape: "rollon" },
  { slug: "reed-diffusers", name: "Reed Diffuser Bottles", blurb: "Home fragrance bottles with matching stoppers.", shape: "diffuser" },
  { slug: "caps-and-pumps", name: "Caps, Collars & Pumps", blurb: "Crimp and screw pumps, zamac and acrylic caps.", shape: "cap" },
  { slug: "packaging-boxes", name: "Packaging Boxes", blurb: "Rigid and folding boxes with custom printing.", shape: "box" },
];

export const products: Product[] = [
  {
    slug: "aurora-square-50ml",
    name: "Aurora Square 50 ml",
    category: "glass-perfume-bottles",
    shape: "square",
    glass: "#e9dfd0",
    cap: "#1f1b16",
    sizes: ["30 ml", "50 ml", "100 ml"],
    material: "Thick-base flint glass",
    neck: "FEA 15",
    moq: "1 pc",
    finishes: ["Clear", "Frosted", "Gradient spray"],
    summary: "Our best-selling square bottle with a heavy base and crimp-neck spray. A clean canvas for screen-printed or hot-stamped logos.",
    featured: true,
  },
  {
    slug: "luna-round-30ml",
    name: "Luna Round 30 ml",
    category: "glass-perfume-bottles",
    shape: "round",
    glass: "#f2d9d0",
    cap: "#b08a4a",
    sizes: ["30 ml", "50 ml"],
    material: "Flint glass",
    neck: "FEA 15",
    moq: "1 pc",
    finishes: ["Clear", "Frosted", "Rose tint"],
    summary: "A soft, rounded bottle with a gold zamac cap. Popular with niche and gift-set brands.",
    featured: true,
  },
  {
    slug: "monolith-tall-100ml",
    name: "Monolith Tall 100 ml",
    category: "glass-perfume-bottles",
    shape: "tall",
    glass: "#dde3e6",
    cap: "#2b2b2b",
    sizes: ["50 ml", "100 ml"],
    material: "Super-flint glass",
    neck: "FEA 15",
    moq: "1 pc",
    finishes: ["Clear", "Matte black", "Smoke"],
    summary: "A tall, architectural rectangle for premium launches. Pairs with magnetic caps.",
    featured: true,
  },
  {
    slug: "heritage-flask-50ml",
    name: "Heritage Flask 50 ml",
    category: "glass-perfume-bottles",
    shape: "flask",
    glass: "#e7e0c9",
    cap: "#6b4f2a",
    sizes: ["50 ml"],
    material: "Flint glass",
    neck: "Screw 18/415",
    moq: "1 pc",
    finishes: ["Clear", "Amber"],
    summary: "A flat flask silhouette with a wooden-look cap, suited to oud and woody scents.",
    featured: true,
  },
  {
    slug: "pocket-atomizer-10ml",
    name: "Pocket Atomizer 10 ml",
    category: "spray-atomizers",
    shape: "atomizer",
    glass: "#d9d2e6",
    cap: "#8c8c8c",
    sizes: ["5 ml", "8 ml", "10 ml"],
    material: "Aluminium shell, glass liner",
    neck: "Bottom-fill",
    moq: "1 pc",
    finishes: ["Silver", "Gold", "Black", "Rose gold"],
    summary: "Refillable from the bottom, fits in any bag. Ideal for resellers and decant shops.",
    featured: true,
  },
  {
    slug: "sample-vial-2ml",
    name: "Sample Spray Vial 2 ml",
    category: "spray-atomizers",
    shape: "tall",
    glass: "#eef0f0",
    cap: "#c9c9c9",
    sizes: ["2 ml", "3 ml", "5 ml"],
    material: "Tubular glass",
    neck: "Snap-on sprayer",
    moq: "1 pc",
    finishes: ["Clear"],
    summary: "Slim tester vials for sampling programmes and gift-with-purchase.",
  },
  {
    slug: "attar-rollon-10ml",
    name: "Attar Roll-on 10 ml",
    category: "roll-on-bottles",
    shape: "rollon",
    glass: "#e8d6b8",
    cap: "#b08a4a",
    sizes: ["3 ml", "6 ml", "10 ml"],
    material: "Glass with steel ball",
    neck: "Screw",
    moq: "1 pc",
    finishes: ["Clear", "Amber", "Frosted"],
    summary: "Leak-resistant roll-on with a steel ball for oil-based perfumes and attars.",
    featured: true,
  },
  {
    slug: "cylinder-diffuser-100ml",
    name: "Cylinder Diffuser 100 ml",
    category: "reed-diffusers",
    shape: "diffuser",
    glass: "#dfe6dc",
    cap: "#3a3a3a",
    sizes: ["100 ml", "150 ml", "200 ml"],
    material: "Flint glass",
    neck: "Screw 28 mm",
    moq: "1 pc",
    finishes: ["Clear", "Amber", "Matte white"],
    summary: "A heavy cylinder for reed diffusers, supplied with plug and collar.",
    featured: true,
  },
  {
    slug: "zamac-cap-fea15",
    name: "Zamac Cap FEA 15",
    category: "caps-and-pumps",
    shape: "cap",
    glass: "#c8a96a",
    cap: "#c8a96a",
    sizes: ["FEA 15"],
    material: "Zinc alloy (zamac)",
    neck: "FEA 15",
    moq: "1 pc",
    finishes: ["Gold", "Silver", "Black", "Gunmetal"],
    summary: "Heavy, premium-feel caps that click onto FEA 15 crimp collars.",
  },
  {
    slug: "crimp-pump-fea15",
    name: "Crimp Spray Pump FEA 15",
    category: "caps-and-pumps",
    shape: "cap",
    glass: "#bdbdbd",
    cap: "#bdbdbd",
    sizes: ["FEA 13", "FEA 15"],
    material: "Aluminium collar",
    neck: "FEA 15",
    moq: "1 pc",
    finishes: ["Silver", "Gold", "Black"],
    summary: "Fine-mist crimp pumps matched to our glass bottles, with dip-tubes cut to size.",
  },
  {
    slug: "rigid-gift-box",
    name: "Rigid Gift Box",
    category: "packaging-boxes",
    shape: "box",
    glass: "#2d2a26",
    cap: "#c8a96a",
    sizes: ["30 ml", "50 ml", "100 ml"],
    material: "Greyboard with art paper wrap",
    neck: "—",
    moq: "1 pc",
    finishes: ["Hot-stamp foil", "Emboss", "Spot UV"],
    summary: "Magnetic-closure rigid box with foam insert, printed with your brand.",
    featured: true,
  },
  {
    slug: "folding-carton",
    name: "Folding Carton",
    category: "packaging-boxes",
    shape: "box",
    glass: "#efe7da",
    cap: "#8a6a3a",
    sizes: ["30 ml", "50 ml", "100 ml"],
    material: "Ivory board 310 gsm",
    neck: "—",
    moq: "1 pc",
    finishes: ["Full-colour print", "Matte lamination", "Foil"],
    summary: "An affordable printed carton for retail and marketplace sellers.",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (cat: string) => products.filter((p) => p.category === cat);
