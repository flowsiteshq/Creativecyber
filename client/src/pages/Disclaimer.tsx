import LegalPage from "@/components/LegalPage";
import { disclaimerContent } from "@/data/legalContent";

export default function Disclaimer() {
  return (
    <LegalPage
      title={disclaimerContent.title}
      subtitle={disclaimerContent.subtitle}
      sections={disclaimerContent.sections}
      accentColor="#1E6FD9"
    />
  );
}
