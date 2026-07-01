import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function StaakenPage() {
  const region = REGIONS.find((r) => r.id === "staaken")!;
  return <LocationPageTemplate region={region} />;
}
