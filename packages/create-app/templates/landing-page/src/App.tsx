import { config } from "./config";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Testimonials } from "./components/Testimonials";
import { EmailCapture } from "./components/EmailCapture";
import { Footer } from "./components/Footer";

function App() {
  const { sections } = config;

  return (
    <div className="min-h-screen bg-white">
      {sections.hero && <Hero />}
      {sections.features && <Features />}
      {sections.testimonials && <Testimonials />}
      {sections.cta && <EmailCapture />}
      {sections.footer && <Footer />}
    </div>
  );
}

export default App;
