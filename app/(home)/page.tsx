import CustomHome from "@/components/web/custom-home";
import ServicesSection from "@/components/web/servicesSection";
import WhyChooseSection from "@/components/web/why-choose-us";
import ClaimsAssistanceSection from "@/components/web/claims-assistance-section";
import TestimonialsCarousel from "@/components/web/testimonials-carousel";
import ReadyToTransform from "@/components/web/ready-to-transform";
import Testimonials from "@/components/web/testimonials";

export default function Home() {
  return (
    <>
      <CustomHome />
      <ServicesSection />
      <WhyChooseSection />
      <ClaimsAssistanceSection />
      <Testimonials />
      <ReadyToTransform />
    </>
  );
}
