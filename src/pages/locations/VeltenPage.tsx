import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function VeltenPage() {
  const region = REGIONS.find((r) => r.id === "velten")!;
  return <LocationPageTemplate region={region} />;
}
