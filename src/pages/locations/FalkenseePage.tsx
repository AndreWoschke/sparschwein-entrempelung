import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function FalkenseePage() {
  const region = REGIONS.find((r) => r.id === "falkensee")!;
  return <LocationPageTemplate region={region} />;
}
