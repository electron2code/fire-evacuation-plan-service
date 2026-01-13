import CustomHome from "@/components/web/custom-home";
import Header from "@/components/web/header";
import Hero from "@/components/web/hero";
import ServicesSection from "@/components/web/servicesSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <Header />
      <Hero />
      <ServicesSection /> */}
      <CustomHome />
      <ServicesSection />
    </>
  );
}
