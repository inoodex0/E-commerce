import Image from "next/image";

const logos = [
  { src: "/images/partnership/A.png", alt: "Partner A" },
  { src: "/images/partnership/b.png", alt: "Partner B" },
  { src: "/images/partnership/E.png", alt: "Partner E" },
  { src: "/images/partnership/EY.png", alt: "Partner EY" },
  { src: "/images/partnership/F.png", alt: "Partner F" },
  { src: "/images/partnership/F1.png", alt: "Partner F1" },
  { src: "/images/partnership/s.png", alt: "Partner S" },
  { src: "/images/partnership/v.png", alt: "Partner V" },
];

export default function Partnership() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16">

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        <div className="grid grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-4 lg:gap-x-0">

          {logos.map((logo) => (

            <div
              key={logo.src}
              className="flex h-16 items-center justify-center sm:h-20 lg:h-24"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={90}
                className="h-12 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0 sm:h-14 lg:h-18"
              />
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
