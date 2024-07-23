import { BeamSection } from "@/components/dashboard/beam-section";
import BottomSectionLanding from "@/components/landing/bottom-section-landing";
import CallToActionSection from "@/components/landing/cta-section";
import EventsSectionLanding from "@/components/landing/events-section-landing";
import HeroSectionNew2 from "@/components/landing/hero-section";
import { IntegrationsSectionLanding } from "@/components/landing/Integrations-section-landing";
import { Icons } from "@/components/shared/icons";
import Particles from "@/components/ui/particles";
import { SphereMask } from "@/components/ui/sphere-mask";

export default async function IndexPage() {
  return (
    <>
      <HeroSectionNew2 />
      <SphereMask />
      <BeamSection />
      <IntegrationsSectionLanding />
      <EventsSectionLanding />
      <CallToActionSection />
      <SphereMask reverse />
      <BottomSectionLanding />

      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
