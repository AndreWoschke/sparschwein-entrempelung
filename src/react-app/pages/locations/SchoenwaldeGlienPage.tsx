import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function SchoenwaldeGlienPage() {
  const region = REGIONS.find((r) => r.id === "schoenwalde-glien")!;
  return <LocationPageTemplate region={region} />;
}
