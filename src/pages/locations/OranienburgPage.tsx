import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function OranienburgPage() {
  const region = REGIONS.find((r) => r.id === "oranienburg")!;
  return <LocationPageTemplate region={region} />;
}
