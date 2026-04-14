import { Layout } from "@/components/Layout";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactSection } from "@/pages/ContactSection";
import { HeroSection } from "@/pages/HeroSection";
import { ReviewsSection } from "@/pages/ReviewsSection";
import { ServicesSection } from "@/pages/ServicesSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Layout>
          <HeroSection />
          <ServicesSection />
          <ReviewsSection />
          <ContactSection />
        </Layout>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
