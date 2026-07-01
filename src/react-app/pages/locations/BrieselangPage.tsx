import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function BrieselangPage() {
  const region = REGIONS.find((r) => r.id === "brieselang")!;
  return <LocationPageTemplate region={region} />;
}
