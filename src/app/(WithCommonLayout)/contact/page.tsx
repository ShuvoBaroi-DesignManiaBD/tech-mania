import Hero from "@/components/pages/shared/Hero";
import ContactInfo from "@/components/pages/contact/contactInfo";

export default function Page() {
  // const dispatch = useAppDispatch();
  return (
    <div>
      <Hero imageUrl={`url('https://i.ibb.co.com/g9yGXTR/slide-camp-3.webp')`} title="Contact Us"/>
      <ContactInfo></ContactInfo>
    </div>
  );
}
