// src/App.jsx

import About from "../Components/Home/About";
import TopDoctors from "../Components/Home/TopDoctors";
import Contact from "../Components/Home/Contact";
import Footer from "../Components/Home/Footer";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/Services";
import Testimonials from "../Components/Home/Testimonials";
import './../styles/styles.css';
import Navbar from "../Components/Home/Navbar";


const Home = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <TopDoctors />
    <Contact />
    <Footer />
  </div>
);

export default Home;
