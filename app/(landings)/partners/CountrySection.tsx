import { Partner } from "@/app/lib/partners";
import { PartnerCard } from "./PartnerCard";

interface Props {
  name: string;
  partners: Partner[];
}

export default function CountrySection({ name, partners }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <hr className="my-4 border-t-2 border-gray-300 w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners.map((partner: Partner) =>
          <PartnerCard key={partner.src} partner={partner} />
        )}
      </div>
    </div>
  )
}
