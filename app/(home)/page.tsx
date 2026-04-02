import CustomHome from "@/components/web/custom-home";
import ServicesSection from "@/components/web/servicesSection";
import WhyChooseSection from "@/components/web/why-choose-us";
import ClaimsAssistanceSection from "@/components/web/claims-assistance-section";
import ReadyToTransform from "@/components/web/ready-to-transform";
import Testimonials from "@/components/web/testimonials";
import BeforeAfterShowcase from "@/components/web/before-and-after";
import { Metadata } from "next";
import { getBanner } from "@/lib/data";
import OurStory from "@/components/web/our-story";

export async function generateMetadata(): Promise<Metadata> {
  const { banner, bannerImages } = await getBanner();
  return {
    title: "Evacuation Plan Service",
    description: "Welcome to Evacuation Plan Service — your trusted partner in professional emergency planning solutions.We specialize in creating clear, compliant, and easy-to-understand evacuation plans for offices, factories, commercial buildings, and residential properties. Our mission is simple: to help businesses and property owners ensure safety, preparedness, and peace of mind. With a strong focus on accuracy and compliance with safety regulations, we design evacuation layouts that are practical, visually clear, and ready for real-world emergencies. Whether you need fire evacuation plans, emergency exit maps, or customized safety diagrams, we deliver solutions tailored to your specific building structure and requirements. At Evacuation Plan Service, safety is not just a service — it’s our responsibility.",
    generator: 'Next.js',
    applicationName: 'Evacuation plan service',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'evacuation plan',
      'safety plan',
      'fire exit plan',
      'exit plan',
      'escape plan',
      'fire emergency evacuation plans',
      'fire safety planning',
      'california fire plan',
      'fire plan',
      'dillinger escape plan',
      'safety plan for suicidal ideation evac plans',
      'fire escape plan',
      'fire evacuation plan',
      'emergency evacuation plan',
      'fire emergency evacuation plan',
      'fire and evacuation plan',
      'fire evac plan',
      'emergency and evacuation plan',
      'emergency evac plan',
      'fire and emergency evacuation plan',
      'plan of evacuation',
      'fire drill procedure',
      'home fire escape plan',
      'home emergency escape plan',
      'emergency evacuation procedure',
      'evacuation plan example',
      'evacuation route signage',
      'emergency evacuation plan example',
      'emergency and evacuation procedures',
      'example of an emergency evacuation plan',
      'emergency exit plan',
      'evacuation procedures',
      'emergency evacuation procedures in the workplace',
      'evacuation plan drawing',
      'emergency evacuation plan template',
      'free editable fire evacuation plan template',
      'family evacuation plan',
      'how to create an evacuation plan',
      'safety plan template',
      'fire safety plan',
      'Evacuation Plan Service',
      'Fire Evacuation Plan',
      'Emergency Evacuation Plan',
      'Emergency Exit Map',
      'Building Evacuation Plan',
      'Fire Escape Plan Drawing',
      'Fire evacuation plan for office building',
      'Emergency exit map for factory',
      'Evacuation plan design service near me',
      'Building fire escape plan PDF',
      'OSHA compliant evacuation plan',
      'Commercial building evacuation drawing',
      'Fire evacuation plan service in Bangladesh',
      'Evacuation plan design in Dhaka',
      'Emergency exit map service in Kaliganj',
      'Fire safety drawing service Bangladesh',
    ],
    authors: [{ name: 'Md. Sabbir Hossain' }, { name: 'Md. Sabbir Hossain', url: 'https://www.evacuationplanservice.com/about' }],
    creator: 'Electron2Code',
    publisher: 'Israfil Mallick',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      title: banner?.content,
      description: "Service",
      url: `https://www.evacuationplanservice.com`,
      siteName: 'Evacuation Plan Service',
      images: bannerImages.map((image) => ({
        url: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`,
        width: 1800,
        height: 1600,
      })),
      locale: 'en_US',
      type: 'website',
      countryName: "Bangladesh"
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        // noimageindex: false,
        // 'max-video-preview': -1,
        // 'max-image-preview': 'large',
        // 'max-snippet': -1,
      },
    },

    icons: {
      icon: '/icon.png',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },

    twitter: {
      card: 'app',
      title: 'Evacuation Plan Service',
      description: "Welcome to Evacuation Plan Service — your trusted partner in professional emergency planning solutions. We specialize in creating clear, compliant, and easy-to-understand evacuation plans for offices, factories, commercial buildings, and residential properties. Our mission is simple: to help businesses and property owners ensure safety, preparedness, and peace of mind.",
      siteId: '1467726470533754880',
      creator: '@nextjs',
      creatorId: '1467726470533754880',
      images: {
        url: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${bannerImages[0]?.key}`,
        alt: 'Evacution Plan Service Logo',
      },
      app: {
        name: 'twitter_app',
        id: {
          iphone: 'twitter_app://iphone',
          ipad: 'twitter_app://ipad',
          googleplay: 'twitter_app://googleplay',
        },
        url: {
          iphone: 'https://iphone_url',
          ipad: 'https://ipad_url',
        },
      },
    },
    verification: {
      google: "KF3gB9sDgu5d_rgs5xV32AGrpHLMqMpHlBEoPkd4WGM"
    }
  }
}

export default function Home() {
  return (
    <>
      <CustomHome />
      <ServicesSection />
      <WhyChooseSection />
      <ClaimsAssistanceSection />
      <BeforeAfterShowcase />
      <OurStory />
      <Testimonials />
      <ReadyToTransform />
    </>
  );
}
