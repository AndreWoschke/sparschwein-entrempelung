import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function WerderPage() {
  const region = REGIONS.find((r) => r.id === "werder")!;
  return <LocationPageTemplate region={region} />;
}
