import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function RathenowPage() {
  const region = REGIONS.find((r) => r.id === "rathenow")!;
  return <LocationPageTemplate region={region} />;
}
