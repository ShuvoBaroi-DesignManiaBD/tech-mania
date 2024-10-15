import Hero from "@/components/pages/shared/Hero";
import MeetTheTeam from "@/components/pages/about/MeetTheTeam";
import OurMission from "@/components/pages/about/OurMission";

export default function Page() {
  // const dispatch = useAppDispatch();
  return (
    <div>
      <Hero
        imageUrl={`url('https://i.ibb.co.com/g9yGXTR/slide-camp-3.webp')`}
        title="About Us"
        description="Welcome to Tech Tips & Tricks Hub—your go-to destination for all things tech! Our mission is to empower tech enthusiasts,
            professionals, and beginners alike by providing high-quality, easy-to-follow tutorials, industry news, and a supportive community
            to share and grow together."
      />
      {/* <OurStory /> */}
      <OurMission />
      {/* <CoreValues /> */}
      <MeetTheTeam />
    </div>
  );
}
