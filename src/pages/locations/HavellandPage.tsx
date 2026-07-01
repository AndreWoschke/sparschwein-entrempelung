import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function HavellandPage() {
  const region = REGIONS.find((r) => r.id === "havelland")!;
  return <LocationPageTemplate region={region} />;
}
