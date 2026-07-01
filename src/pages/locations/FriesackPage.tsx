import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function FriesackPage() {
  const region = REGIONS.find((r) => r.id === "friesack")!;
  return <LocationPageTemplate region={region} />;
}
