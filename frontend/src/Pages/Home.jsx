// src/App.jsx

import About from "../Components/Home/About";
import TopDoctors from "../Components/Home/TopDoctors";
import Contact from "../Components/Home/Contact";
import Footer from "../Components/Home/Footer";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/Services";
import Testimonials from "../Components/Home/Testimonials";
import "./../styles/styles.css";
import Navbar from "../Components/Home/Navbar";
import { DoctorProvider } from "../Context/DoctorContext/DoctorContext";
import { PatientProvider } from "../Context/PatientContext/PatientContext";
import { ReceptionistProvider } from "../Context/ReceptionistContext.jsx/ReceptionistContext";
import { RadiologistProvider } from "../Context/RadiologistContext/RadiologistContext";
import { RadiologyCenterProvider } from "../Context/RadiologyCenterContext/RadiologyCenterContext";

const Home = () => (
  <div>
    <DoctorProvider>
      <PatientProvider>
        <ReceptionistProvider>
          <RadiologistProvider>
            <RadiologyCenterProvider>
              <Navbar />
            </RadiologyCenterProvider>
          </RadiologistProvider>
        </ReceptionistProvider>
      </PatientProvider>
    </DoctorProvider>
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
