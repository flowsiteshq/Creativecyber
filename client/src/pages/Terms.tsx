import LegalPage from "@/components/LegalPage";
import { termsContent } from "@/data/legalContent";

export default function Terms() {
  return (
    <LegalPage
      title={termsContent.title}
      subtitle={termsContent.subtitle}
      sections={termsContent.sections}
      accentColor="#1E6FD9"
    />
  );
}
