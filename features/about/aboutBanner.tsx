import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutBanner() {
  return (
    <div className="lg:col h-[500px] bg-[url('/imgs/VectorMob.png')] bg-cover bg-center md:mt-0 md:h-[300px] md:bg-[url('/imgs/Vector.png')]">
      <div className="customContainer flex h-full items-center justify-center lg:justify-start">
        <div className="pt-[210px] text-center lg:pt-0 lg:pl-[160px]">
          <h1 className="font-bpg-web-002-caps text-2xl text-white">
            &quot;EAGLE POWER TOOLS&quot;{" "}
          </h1>
          <h2 className="mx-auto mt-2 mb-8 max-w-[272px] leading-8 text-white lg:max-w-full">
            DEWALT-ის ოფიციალური პარტნიორი საქართველოში
          </h2>
          <Button variant="default" className="w-[190px]" asChild>
            <Link href="/about">სრულად</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
