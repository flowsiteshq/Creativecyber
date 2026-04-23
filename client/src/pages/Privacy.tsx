import LegalPage from "@/components/LegalPage";
import { privacyContent } from "@/data/legalContent";

export default function Privacy() {
  return (
    <LegalPage
      title={privacyContent.title}
      subtitle={privacyContent.subtitle}
      sections={privacyContent.sections}
      accentColor="#0B1E3D"
    />
  );
}
