import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function HennigsdorfPage() {
  const region = REGIONS.find((r) => r.id === "hennigsdorf")!;
  return <LocationPageTemplate region={region} />;
}
