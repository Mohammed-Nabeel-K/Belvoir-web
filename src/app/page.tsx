import Footer from "./(sides)/users/components/ui/footer/Footer";
import Hero from "./(sides)/users/components/ui/hero/hero";
import Navbar from "./(sides)/users/components/ui/navbar/Navbar";
import WhyBelvoirSection from "./(sides)/users/components/ui/whyBelvoir/whysection";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <WhyBelvoirSection />

      <Footer />
    </>
  );
}
