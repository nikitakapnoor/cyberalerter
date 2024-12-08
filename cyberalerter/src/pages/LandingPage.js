import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopImage from '../images/Landimage.svg';
import Frame1 from '../images/IMAS.svg';
import Frame2 from '../images/AI.svg';
import Frame3 from '../images/WS.svg';
import Frame4 from '../images/Cloud.svg';
import Frame5 from '../images/Notify.svg';
import LogImg from '../images/Login.svg';
import linkedin from '../images/linkedin.svg';
import insta from '../images/instagram.svg';
import github from '../images/github.svg';
import FooterImg from '../images/Footerimg.svg';
import logo from '../images/Logoac.svg';
import Recording from '../images/Recording.mp4';
import '../styles/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        } else {
          entry.target.classList.remove('fade-in-visible');
        }
      });
    };

    const observerOptions = {
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Top Image Section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${TopImage})` }}>
        <div style={{ left: '9%', top: '12%', position: 'absolute' }}>
          <img src={logo} alt="Back Button" className="w-9 h-9 cursor-pointer" />
        </div>
        <div className="absolute" style={{ left: '7%', bottom: '30%' }}>
          <Link to="/login">
            <img className="text-white py-2 px-4 rounded-lg" src={LogImg} alt="Login" />
          </Link>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-8 text-center fade-in">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4 text-lg text-gray-700">Your journey starts here.</p>
      </div>

      {/* Table Section */}
      <div className="mt-8 fade-in" style={{ fontFamily: 'K2D' }}>
        <table className="table-auto mx-auto w-full max-w-screen-lg">
          <tbody>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame1} alt="Image 1" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Intelligent Monitoring and Scanning
                <p style={{ fontSize: "15px" }}>
                  "Monitor vulnerabilities effortlessly with automated scans, or perform a quick scan by inputting specific OEM websites. Get detailed reports for critical IT/OT systems."
                </p>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                AI-Driven Insights
                <p style={{ fontSize: "15px" }}>
                  "Our advanced AI analyses vulnerability data, provides severity levels,mitigations strategies,and generates actionable reports.Future plans include implementing GPT-like models for dynamic interactions and insights."{" "}
                </p>
              </td>
              <td className="p-5">
                <img src={Frame2} alt="Image 2" />
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame3} alt="Image 3" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Advanced Web Scraping
                <p style={{ fontSize: "15px" }}>
                  "Leverage powerful scraping algorithms to extract real-time vulnerability data from OEM websites and other platforms,ensuring no threat goes unnoticed."
                </p>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Seamless Cloud Integration
                <p style={{ fontSize: "15px" }}>
                  "Store all scan results and AI-generated reports securely in the cloud. Access your data whenever you need it,with secure and reliable backups."
                </p>
              </td>
              <td className="p-5">
                <img src={Frame4} alt="Image 4"></img>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame5} alt="Image 5" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Instant Notifications
                <p style={{ fontSize: "15px" }}>
                  "Recieve instant email notifications about detected vulnerabilities,ensuring you take action before threats escalate"
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Video Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-8 mb-12">
        <video controls loop autoPlay muted className="w-full h-[28rem]">
          <source src={Recording} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Footer */}
      <div className="w-full bg-cover bg-center mt-8 p-8" style={{ backgroundImage: `url(${FooterImg})` }}>
        <div className="flex justify-between flex-row-reverse items-center" style={{ fontFamily: 'K2D', fontSize: '15px' }}>
          <div className="flex items-center space-x-2">
            <a href="https://www.linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/your-github-id" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
              <img src={github} alt="GitHub" className="w-6 h-6" />
              <span>GitHub</span>
            </a>
            <a href="https://www.instagram.com/your-instagram-id" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
              <img src={insta} alt="Instagram" className="w-6 h-6" />
              <span>Instagram</span>
            </a>
          </div>
          <div className="text-white">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p>Contact: info@yourcompany.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
