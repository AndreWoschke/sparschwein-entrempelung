import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function PremnitzPage() {
  const region = REGIONS.find((r) => r.id === "premnitz")!;
  return <LocationPageTemplate region={region} />;
}
