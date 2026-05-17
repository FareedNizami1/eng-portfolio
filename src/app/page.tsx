import { HomeWithThree } from "@/components/HomeWithThree";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CADSection } from "@/components/sections/CADSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { site } from "@/data/portfolio";

export default function Home() {
  return (
    <HomeWithThree>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BackgroundSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <CADSection />
        <SocialSection />
      </main>
      <footer className="border-t border-[var(--glass-border)] bg-[var(--glass-nav)] px-4 py-8 text-center backdrop-blur-xl md:px-6">
        <p className="font-mono text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </footer>
    </HomeWithThree>
  );
}
