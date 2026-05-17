import TopSections from "@/components/landing/TopSections";
import MidSections from "@/components/landing/MidSections";
import BottomSections from "@/components/landing/BottomSections";

export default function Index() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#141414] overflow-x-hidden">
      <TopSections scrollTo={scrollTo} />
      <MidSections />
      <BottomSections scrollTo={scrollTo} />
    </div>
  );
}
