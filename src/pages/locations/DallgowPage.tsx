import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function DallgowPage() {
  const region = REGIONS.find((r) => r.id === "dallgow-doeberitz")!;
  return <LocationPageTemplate region={region} />;
}
