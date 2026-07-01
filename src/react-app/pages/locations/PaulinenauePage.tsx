import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function PaulinenauePage() {
  const region = REGIONS.find((r) => r.id === "paulinenaue")!;
  return <LocationPageTemplate region={region} />;
}
