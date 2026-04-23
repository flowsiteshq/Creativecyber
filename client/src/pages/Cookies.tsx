import LegalPage from "@/components/LegalPage";
import { cookieContent } from "@/data/legalContent";

export default function Cookies() {
  return (
    <LegalPage
      title={cookieContent.title}
      subtitle={cookieContent.subtitle}
      sections={cookieContent.sections}
      accentColor="#D4A843"
    />
  );
}
