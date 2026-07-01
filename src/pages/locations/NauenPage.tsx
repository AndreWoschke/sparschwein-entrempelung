import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function NauenPage() {
  const region = REGIONS.find((r) => r.id === "nauen")!;
  return <LocationPageTemplate region={region} />;
}
