import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function WustermarkPage() {
  const region = REGIONS.find((r) => r.id === "wustermark")!;
  return <LocationPageTemplate region={region} />;
}
