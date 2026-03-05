export interface BrandInfo {
  name: string;
  slug: string;
  logo: string;
  description: {
    en: string;
    ka: string;
  };
  history: {
    en: string;
    ka: string;
  };
  keyFeatures: {
    en: string;
    ka: string;
  }[];
  website?: string;
}

export const brandsInfo: Record<string, BrandInfo> = {
  DeWalt: {
    name: "DeWalt",
    slug: "dewalt",
    logo: "/imgs/dwalt.png",
    description: {
      en: "DEWALT, established in 1924 by Raymond DeWalt, has been a trusted name among professionals for a century. The brand's journey began with the invention of the adjustable radial arm saw, known as the 'Wonder-Worker,' which revolutionized jobsite productivity.",
      ka: "DEWALT დაარსდა 1924 წელს რეიმონდ დევოლტის მიერ და უკვე საუკუნეა პროფესიონალების ნდობას იმსახურებს. ბრენდის გზა დაიწყო რეგულირებადი რადიალური მკლავიანი ხერხის — „Wonder-Worker“-ის — გამოგონებით, რომელმაც სამუშაო ადგილზე პროდუქტიულობა რადიკალურად გაზარდა.",
    },
    history: {
      en: "Over the years, DEWALT has expanded its product line to include a wide range of power tools, hand tools, and accessories designed for durability and performance. The company emphasizes innovation, focusing on enhancing performance, ease of use, and productivity. Notable advancements include the development of brushless motors that offer up to 57% more runtime compared to standard brushed motors.",
      ka: "წლების განმავლობაში DEWALT-მა გააფართოვა ასორტიმენტი და შექმნა გამძლეობასა და წარმადობაზე ორიენტირებული ელექტროინსტრუმენტების, ხელის ინსტრუმენტებისა და აქსესუარების ფართო არჩევანი. კომპანია განსაკუთრებულ ყურადღებას აქცევს ინოვაციას — მუშაობს წარმადობის, მოხერხებულობისა და პროდუქტიულობის გაუმჯობესებაზე. მნიშვნელოვან მიღწევებს შორისაა brushless (ჯაგრისის გარეშე) ძრავების განვითარება, რომლებიც სტანდარტულ ჯაგრისიან ძრავებთან შედარებით 57%-მდე მეტ მუშაობის ხანგრძლივობას უზრუნველყოფს.",
    },
    keyFeatures: [
      {
        en: "100+ years of professional tool manufacturing",
        ka: "100+ წელი პროფესიონალური ხელსაწყოების წარმოებაში",
      },
      {
        en: "Innovative brushless motor technology",
        ka: "ინოვაციური brushless (ჯაგრისის გარეშე) ძრავების ტექნოლოგია",
      },
      {
        en: "Made in the USA with global materials",
        ka: "დამზადებულია აშშ-ში გლობალური მასალების გამოყენებით",
      },
      {
        en: "Commitment to sustainability and battery recycling",
        ka: "მდგრადობისა და აკუმულატორების გადამუშავების მიმართ ერთგულება",
      },
      {
        en: "Supporting trades through Grow the Trades program",
        ka: "ხელოსნური პროფესიების მხარდაჭერა Grow the Trades პროგრამით",
      },
      {
        en: "Wide range of cordless and corded power tools",
        ka: "ბატარეიანი და ქსელური ელექტროინსტრუმენტების ფართო არჩევანი",
      },
    ],
    website: "https://www.dewalt.com",
  },
  Stanley: {
    name: "Stanley",
    slug: "stanley",
    logo: "/imgs/stanley.png",
    description: {
      en: "Stanley Tools, a renowned brand in the hand tools industry, has a rich history dating back to 1843. Founded by Frederick T. Stanley, the company has been at the forefront of innovation in the hand tools sector for over 180 years.",
      ka: "Stanley Tools — ხელის ინსტრუმენტების ინდუსტრიის ცნობილი ბრენდი — მდიდარ ისტორიას 1843 წლიდან ითვლის. ფრედერიკ ტ. სტენლის მიერ დაარსებული კომპანია უკვე 180 წელზე მეტია ინოვაციების ერთ-ერთი წამყვანი ძალაა ხელის ინსტრუმენტების სფეროში.",
    },
    history: {
      en: "Stanley Tools' journey began in 1843 when Frederick T. Stanley founded The Stanley Works in New Britain, Connecticut. Over the years, Stanley has introduced groundbreaking innovations including the first steel tape measure in 1930, utility knives in 1936, and the PowerLock® Tape Rule in 1963. In 2010, Stanley Tools merged with Black & Decker, forming Stanley Black & Decker, a global leader in tools and storage solutions.",
      ka: "Stanley Tools-ის ისტორია 1843 წელს დაიწყო, როდესაც ფრედერიკ ტ. სტენლიმ კონექტიკუტის შტატში, ნიუ-ბრიტანში, დააარსა The Stanley Works. წლების განმავლობაში Stanley-მ არაერთი მნიშვნელოვანი ინოვაცია შემოიტანა, მათ შორის: პირველი ფოლადის რულეტი 1930 წელს, უნივერსალური დანები 1936 წელს და PowerLock® რულეტი 1963 წელს. 2010 წელს Stanley Tools გაერთიანდა Black & Decker-თან და შეიქმნა Stanley Black & Decker — ხელსაწყოებისა და შენახვის (storage) გადაწყვეტილებების გლობალური ლიდერი.",
    },
    keyFeatures: [
      {
        en: "180+ years of tool manufacturing excellence",
        ka: "180+ წელი უმაღლესი ხარისხის ხელსაწყოების წარმოებაში",
      },
      {
        en: "Pioneer in measuring tools and tape rules",
        ka: "საზომი ხელსაწყოებისა და რულეტების პიონერი",
      },
      {
        en: "Innovative hand tool designs",
        ka: "ინოვაციური ხელის ინსტრუმენტების დიზაინი",
      },
      {
        en: "Global leader in tools and storage solutions",
        ka: "გლობალური ლიდერი ხელსაწყოებსა და storage გადაწყვეტილებებში",
      },
      {
        en: "Wide range of professional and DIY tools",
        ka: "პროფესიონალური და DIY ხელსაწყოების ფართო არჩევანი",
      },
      {
        en: "Commitment to quality and durability",
        ka: "ხარისხისა და გამძლეობის მიმართ ერთგულება",
      },
    ],
    website: "https://www.stanleytools.com",
  },
  "Black&Decker": {
    name: "Black & Decker",
    slug: "black-decker",
    logo: "/imgs/black-decker.svg",
    description: {
      en: "BLACK+DECKER, founded in 1910, has been a leader in innovation for power tools, home products, and outdoor equipment for over 110 years. The brand's drill has even been used in an early mission to the moon.",
      ka: "BLACK+DECKER, დაარსებული 1910 წელს, უკვე 110 წელზე მეტია ინოვაციების ლიდერია ელექტროინსტრუმენტებში, სახლის პროდუქტებსა და ეზო-გარე მოწყობილობებში. ბრენდის ბურღი კი ერთ-ერთ ადრეულ მთვარის მისიაშიც კი გამოიყენეს.",
    },
    history: {
      en: "As a global brand, BLACK+DECKER's products are available in over 100 countries worldwide, serving customers across North America, South America, Europe, Asia, Africa, and Australia. The company manufactures its tools in the United States, Mexico, Brazil, China, and the United Kingdom, utilizing all facilities to provide high-quality tools at competitive prices.",
      ka: "როგორც გლობალური ბრენდი, BLACK+DECKER-ის პროდუქცია ხელმისაწვდომია მსოფლიოს 100-ზე მეტ ქვეყანაში და ემსახურება მომხმარებლებს ჩრდილოეთ და სამხრეთ ამერიკაში, ევროპაში, აზიაში, აფრიკასა და ავსტრალიაში. კომპანია ხელსაწყოებს აწარმოებს აშშ-ში, მექსიკაში, ბრაზილიაში, ჩინეთსა და გაერთიანებულ სამეფოში — წარმოების ქსელის გამოყენებით უზრუნველყოფს მაღალი ხარისხის პროდუქტს კონკურენტულ ფასად.",
    },
    keyFeatures: [
      {
        en: "110+ years of innovation in power tools",
        ka: "110+ წელი ინოვაციებში ელექტროინსტრუმენტების სფეროში",
      },
      {
        en: "Global presence in over 100 countries",
        ka: "გლობალური წარმოდგენილობა 100-ზე მეტ ქვეყანაში",
      },
      {
        en: "Affordable and reliable tool solutions",
        ka: "მისაწვდომი და საიმედო ხელსაწყოების გადაწყვეტილებები",
      },
      {
        en: "Wide range of power tools and home products",
        ka: "ელექტროინსტრუმენტებისა და სახლის პროდუქტების ფართო არჩევანი",
      },
      {
        en: "Outdoor equipment and accessories",
        ka: "გარე/ეზოს მოწყობილობები და აქსესუარები",
      },
      {
        en: "Commitment to quality at competitive prices",
        ka: "ხარისხი კონკურენტულ ფასად",
      },
    ],
    website: "https://www.blackanddecker.com",
  },
};
