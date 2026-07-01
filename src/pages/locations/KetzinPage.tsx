import { REGIONS } from "@/lib/seo";
import { LocationPageTemplate } from "./LocationPageTemplate";

export default function KetzinPage() {
  const region = REGIONS.find((r) => r.id === "ketzin")!;
  return <LocationPageTemplate region={region} />;
}
