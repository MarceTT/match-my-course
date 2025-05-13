import { Partner } from "@/app/lib/partners";
import Image from "next/image";

interface Props {
  countryKey: string;
  name: string;
  partners: Partner[];
}

export default function CountrySection({ countryKey, name, partners }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <hr className="my-4 border-t-2 border-gray-300 w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners
          .filter((partner: Partner) => partner.key === countryKey)
          .map((partner: Partner) => (
            <div key={partner.src} className="flex justify-center items-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={400}
                height={400}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-sm"
              />
            </div>
          ))}
      </div>
    </div>
  )
}
