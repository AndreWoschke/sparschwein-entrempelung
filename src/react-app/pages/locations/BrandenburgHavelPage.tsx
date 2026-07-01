import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function BrandenburgHavelPage() {
  const region = REGIONS.find((r) => r.id === "brandenburg-havel")!;
  return <LocationPageTemplate region={region} />;
}
