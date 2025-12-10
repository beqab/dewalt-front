export interface BrandInfo {
  name: string;
  slug: string;
  logo: string;
  description: string;
  history: string;
  keyFeatures: string[];
  website?: string;
}

export const brandsInfo: Record<string, BrandInfo> = {
  DeWalt: {
    name: "DeWalt",
    slug: "dewalt",
    logo: "/imgs/dewalt.png",
    description:
      "DEWALT, established in 1924 by Raymond DeWalt, has been a trusted name among professionals for a century. The brand's journey began with the invention of the adjustable radial arm saw, known as the 'Wonder-Worker,' which revolutionized jobsite productivity.",
    history:
      "Over the years, DEWALT has expanded its product line to include a wide range of power tools, hand tools, and accessories designed for durability and performance. The company emphasizes innovation, focusing on enhancing performance, ease of use, and productivity. Notable advancements include the development of brushless motors that offer up to 57% more runtime compared to standard brushed motors.",
    keyFeatures: [
      "100+ years of professional tool manufacturing",
      "Innovative brushless motor technology",
      "Made in the USA with global materials",
      "Commitment to sustainability and battery recycling",
      "Supporting trades through Grow the Trades program",
      "Wide range of cordless and corded power tools",
    ],
    website: "https://www.dewalt.com",
  },
  Stanley: {
    name: "Stanley",
    slug: "stanley",
    logo: "/imgs/stanley.png",
    description:
      "Stanley Tools, a renowned brand in the hand tools industry, has a rich history dating back to 1843. Founded by Frederick T. Stanley, the company has been at the forefront of innovation in the hand tools sector for over 180 years.",
    history:
      "Stanley Tools' journey began in 1843 when Frederick T. Stanley founded The Stanley Works in New Britain, Connecticut. Over the years, Stanley has introduced groundbreaking innovations including the first steel tape measure in 1930, utility knives in 1936, and the PowerLock® Tape Rule in 1963. In 2010, Stanley Tools merged with Black & Decker, forming Stanley Black & Decker, a global leader in tools and storage solutions.",
    keyFeatures: [
      "180+ years of tool manufacturing excellence",
      "Pioneer in measuring tools and tape rules",
      "Innovative hand tool designs",
      "Global leader in tools and storage solutions",
      "Wide range of professional and DIY tools",
      "Commitment to quality and durability",
    ],
    website: "https://www.stanleytools.com",
  },
  "Black&Decker": {
    name: "Black & Decker",
    slug: "black-decker",
    logo: "/imgs/black-decker.svg",
    description:
      "BLACK+DECKER, founded in 1910, has been a leader in innovation for power tools, home products, and outdoor equipment for over 110 years. The brand's drill has even been used in an early mission to the moon.",
    history:
      "As a global brand, BLACK+DECKER's products are available in over 100 countries worldwide, serving customers across North America, South America, Europe, Asia, Africa, and Australia. The company manufactures its tools in the United States, Mexico, Brazil, China, and the United Kingdom, utilizing all facilities to provide high-quality tools at competitive prices.",
    keyFeatures: [
      "110+ years of innovation in power tools",
      "Global presence in over 100 countries",
      "Affordable and reliable tool solutions",
      "Wide range of power tools and home products",
      "Outdoor equipment and accessories",
      "Commitment to quality at competitive prices",
    ],
    website: "https://www.blackanddecker.com",
  },
};
