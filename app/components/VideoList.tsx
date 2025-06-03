import { services } from "../../lib/data/services";
import { VideoCard } from "./VideoCard";

export default function VideoList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <VideoCard key={service.id} service={service} />
      ))}
    </div>
  );
}
