import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginSignup/LoginComponent';
import SignUpComponent from '../components/LoginSignup/SignUpComponent';
import Slider from 'react-slick';
import Frame4 from '../images/Frame4.svg';
import Frame3 from '../images/Frame3.svg';
import Frame2 from '../images/Frame2.svg';
import logo from '../images/Logoac.svg';
import '../styles/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true, 
    arrows: false, 
  };

  return (
    <div className="min-h-screen flex flex-col bg-scan-pattern bg-cover bg-center">
      <div className="absolute" style={{ left: '4%', top: '5%' }}>
        <Link to="/">
          <img src={logo} alt="Back Button" className="w-9 h-9 cursor-pointer" />
        </Link>
      </div>
      {/* Main Content Row */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Section (Slick Slider) */}
        <div className="relative w-full md:w-1/2 bg-transparent flex items-center justify-center p-4 md:p-0">
          <Slider className="autoplay w-full" {...settings}>
            <div className="relative">
              <img src={Frame4} alt="Slide 1" className="object-contain w-full h-80" />
            </div>
            <div>
              <img src={Frame3} alt="Slide 2" className="object-contain w-full h-80" />
            </div>
            <div>
              <img src={Frame2} alt="Slide 3" className="object-contain w-full h-80" />
            </div>
          </Slider>
        </div>

        {/* Right Section (Login/Signup) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative">
          <div className="w-full max-w-md p-8 bg-opacity-50 rounded-lg">
            {isSignUp ? (
              <SignUpComponent toggleForm={toggleForm} />
            ) : (
              <LoginComponent toggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
