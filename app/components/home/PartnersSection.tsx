import Image from "next/image";

// Partners específicos para mostrar en el home (según diseño)
const featuredPartners = [
  { src: "/partners/41.png", alt: "WorldWide School of English" },
  { src: "/partners/13.png", alt: "Atlantic" },
  { src: "/partners/44.png", alt: "BELS" },
  { src: "/partners/42.png", alt: "Mount Maunganui Language Centre" },
  { src: "/partners/14.png", alt: "Galway Language Centre" },
  { src: "/partners/43.png", alt: "RELA" },
  { src: "/partners/7.png", alt: "Apollo English Language Centre" },
  { src: "/partners/8.png", alt: "The International School of English" },
  { src: "/partners/10.png", alt: "Emerald Cultural Institute" },
];

export default function PartnersSection() {
  return (
    <section className="bg-white pt-2 pb-8 md:pt-3 md:pb-10">
      <div className="container mx-auto px-6">
        <p className="text-center text-base md:text-lg font-semibold text-gray-700 mb-6">
          Escuelas que han confiado en nuestro servicio
        </p>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4">
          {featuredPartners.map((partner, index) => (
            <div
              key={`${partner.alt}-${index}`}
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={160}
                height={80}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
