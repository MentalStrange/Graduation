import Navbar from '../Components/Home/Navbar';
import '../styles/App.css';
import Section1 from '../Components/Home/Section1';
import image1 from '../Images/image1.png';
import image2 from '../Images/image3.png'
import image3 from '../Images/image4.png';
import image4 from '../Images/image5.png'
import image5 from '../Images/image6.png'
import image6 from '../Images/image77.png'
import Section2 from '../Components/Home/Section2';
import Section3 from '../Components/Home/Section3';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Footer from '../Components/Home/Footer';

function Home() {
  const customButton = <button className="btn btn-lav d-block mt-4">Take the test</button>;
  return (
    <>
      <Navbar/>

      <Section3
      text1="All services for Stroke patients"
      text2="in one place" 
      textClass="text-light font-weight-bold"
      className="main"
      />

      <Section1 
      title="Speed up your analysis" 
      subtitle="Turn customer data into needs and pain points."
      description="Transcribe, analyze, and uncover themes fast."
      imageUrl={image1}
      /> 

      <Section1 
      title="Stop Wasting Time and Put Your Health in Danger"
      subtitle="Store and search years of research in one place."
      description="Give stakeholders everything they need to make better decisions."
      imageUrl={image2}
      reverse
      /> 

      <Section1 
      title="Our Doctors Avaliable 24 Hours"
      subtitle="Expand research across your organization with customization, security, "
      description="and compliance features built with enterprise in mind."
      imageUrl={image3}
      />

      <div className='mt-5 text-center font-weight-bold'>
        <h2 className='display-4 font-weight-bold'>Backed by speed</h2>
        <h2 className='display-4 font-weight-bold'>and security</h2>
      </div>

      <div className='container'>
        <div className="row">
      <Section2
        image={image4}
        textData={{ title: "Schedule Your Time Line", 
        description: "Let customer understanding come to with automated reports about themes and trends across all of your feedback." }}
      />

      <Section2
        image={image5}
        textData={{ title: "Show All your Medical Record", 
        description: "Let customer understanding come to with automated reports about themes and trends across all of your feedback." }}
      />

      <Section2
        image={image6}
        textData={{ title: "Chat and Call With Doctor Anytime", 
        description: "Let customer understanding come to with automated reports about themes and trends across all of your feedback." }}
      />
      </div>
      </div>

      <Section3
        text1="Join Us And Take The Test To Know Your Health"
        description="With Us Do Not Be Worried!"
        textClass="h4 font-weight-bold"
        className="color"
        icon={faStar}
        button={customButton}
      />

      <Footer/>
    </>
  );
}

export default Home;
