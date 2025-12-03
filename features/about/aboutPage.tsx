import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "ჩვენ შესახებ" },
];

export default function AboutPage() {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      {/* Hero Section with Gradient and Background Image */}
      <div className="min-h-[400px] md:relative md:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 hidden md:block">
          {/* Mobile: Image at top */}

          {/* Desktop: Image on right side */}
          <div className="hidden md:block">
            <div className="absolute top-0 right-0 h-full w-full">
              <Image
                src="/imgs/Vector2.png"
                alt="DEWALT Tools"
                fill
                className="object-cover object-right"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="inset-0 min-h-[700px] bg-[url('/imgs/Vector3.png')] bg-cover bg-center bg-no-repeat md:absolute md:min-h-auto md:bg-none">
          {/* Content */}
          <div className="customContainer md:pbs-16 relative z-10 flex h-full min-h-[400px] flex-col justify-start pt-50 md:min-h-[600px] md:pt-20">
            <div className="max-w-2xl md:pt-16">
              <h1 className="text-primary font-bpg-web-002-caps mb-2 text-center text-2xl md:text-left md:text-3xl">
                &quot;EAGLE POWER TOOLS&quot;
              </h1>
              <h2 className="text-primary font-bpg-web-002-caps mb-4 text-center md:text-left">
                DEWALT-ის ოფიციალური პარტნიორი საქართველოში
              </h2>
              <div className="text-white">
                <p className="text-neutral mb-1 text-sm leading-relaxed md:text-sm">
                  DEWALT x McLaren
                </p>
                <p className="text-neutral text-sm leading-relaxed md:text-sm">
                  DEWALT-მა და McLaren Formula 1-მა ერთად შექმნეს შეზღუდული
                  რაოდენობის კოლექცია, რომელიც აერთიანებს DEWALT-ის საიმედოობას
                  და McLaren-ის მაღალშესრულებადობას. ეს კოლექცია შექმნილია
                  პროფესიონალებისთვის, რომლებიც საჭიროებენ უკიდურეს პირობებში
                  მუშაობის უნარს, სადაც წამები მნიშვნელოვანია.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
