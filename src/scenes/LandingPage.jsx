import React, { useState , useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import profil1 from "../images/herosectionpic.jpg";
import test4 from "../images/test4.jpg"
import test2 from "../images/test2.jpg"
import test3 from "../images/test3.jpg"
import test5 from "../images/test5.jpg"
import { CgProfile } from "react-icons/cg";
import { CgTime } from "react-icons/cg";
import { CgPullClear } from "react-icons/cg";
import Accordion from "../Components/Accordion";
import Humburger from 'hamburger-react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LandingPage = () => {
  // eslint-disable-next-line
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };


  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  const plans = [
    {
      name: "Basic Plan",
      price: 49,
      features: ["2 hours of lessons per week", "Access to learning materials", "Weekly progress reports"]
    },
    {
      name: "Premium Plan",
      price: 89,
      features: ["5 hours of lessons per week", "Unlimited access to materials", "1-on-1 tutoring sessions", "Personalized study plan"]
    },
    {
      name: "Pro Plan",
      price: 129,
      features: ["Unlimited hours of lessons per week", "Priority access to tutors", "Personalized progress tracking", "Quarterly review sessions"]
    }
  ];

  const getBorderColor = (index) => {
    switch(index) {
      case 0:
        return 'border-blue-500';
      case 1:
        return 'border-green-500';
      case 2:
        return 'border-yellow-500';
      default:
        return 'border-gray-300';
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);

    try {
      const pabblyWebhookUrl =
          "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZmMDYzNDA0MzY1MjY1NTUzNDUxMzUi_pc";
      // eslint-disable-next-line
      const response = await axios.post(pabblyWebhookUrl, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log("response:", response);
      setSubmitMessage(
          "We appreciate your interest! Our team will reach out to you shortly."
      );
    }catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="all-home">
          <header
              className={`fixed top-0 left-0 w-full z-50 ${active ? 'activenav' : ''} backdrop-blur-md bg-opacity-30 shadow-lg transition-all duration-500 ease-in-out`}
          >
            <div className="container mx-auto flex justify-between px-5 items-center py-4">
              <h1 className="text-3xl font-bold text-indigo-800">EnglishElevate</h1>

              {/* Hamburger Icon for Small and Medium Screens */}
              <div className="lg:hidden">
                <Humburger toggled={open} toggle={setOpen} size={28}/>
              </div>

              {/* Navigation for Large Screens */}
              <nav className="hidden lg:flex space-x-6">
                <a
                    href="#home"
                    onClick={() => handleScroll('home')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  Home
                </a>
                <a
                    href="#features"
                    onClick={() => handleScroll('features')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  Features
                </a>
                <a
                    href="#testimonials"
                    onClick={() => handleScroll('testimonials')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  Testimonials
                </a>
                <a
                    href="#pricing"
                    onClick={() => handleScroll('pricing')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  Pricing
                </a>
                <a
                    href="#faq"
                    onClick={() => handleScroll('faq')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  FAQ
                </a>
                <a
                    href="#contact"
                    onClick={() => handleScroll('contact')}
                    className="text-lg text-gray-700 hover:text-indigo-600 hover:underline transition-all duration-300"
                >
                  Contact
                </a>
              </nav>
            </div>
          </header>

          {/* Mobile Menu Dropdown */}
          {open && (
              <div className="menu-content mt-10 bg-indigo-600 lg:hidden transition-all duration-300 ease-in-out">
                <nav>
                  <a onClick={closeMenu} href="#home" className="mx-2 hover:underline">
                    Home
                  </a>
                  <a onClick={closeMenu} href="#features" className="mx-2 hover:underline">
                    Features
                  </a>
                  <a onClick={closeMenu} href="#testimonials" className="mx-2 hover:underline">
                    Testimonials
                  </a>
                  <a onClick={closeMenu} href="#pricing" className="mx-2 hover:underline">
                    Pricing
                  </a>
                  <a onClick={closeMenu} href="#faq" className="mx-2 hover:underline">
                    FAQ
                  </a>
                  <a onClick={closeMenu} href="#contact" className="mx-2 hover:underline">
                    Contact
                  </a>
                </nav>
              </div>
          )}
          {/* Hero Section */}
          <section
              id="home"
              className="h-screen mt-16 container mx-auto px-4 flex flex-col items-center lg:flex-row lg:justify-between transition-all duration-500 ease-in-out"
          >
            <div
                className="flex flex-col text-center lg:text-left"
                data-aos="fade-up"
                data-aos-delay="300"
            >
              <h1 className="text-4xl font-bold text-indigo-600 transition-all duration-500 ease-in-out">
                Elevate Your English <br /> with EnglishElevate
              </h1>
              <p className="text-lg mt-5 font-sans transition-all duration-500 ease-in-out">
                Transform your language skills and open doors to global opportunities.
                Start your English learning journey with us today!
              </p>
              <p className="text-md mt-5 flex gap-2 text-indigo-950 font-serif" id="contact-us">
                Ready to elevate your English? Contact us for a free trial class:
              </p>

              <div
                  className="mt-8 flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-4 gap-4 lg:gap-8 transition-all duration-500 ease-in-out"
                  data-aos="fade-up"
                  data-aos-delay="500"
              >
                <a
                    href="#contact"
                    className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Contact Us
                </a>
                <a
                    href="#pricing"
                    className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Get Started
                </a>
              </div>
            </div>

            <div
                className="home-img mt-8 lg:mt-0 md:hidden lg:flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
                data-aos="fade-up"
                data-aos-delay="800"
            >
              <div className="border-4 border-indigo-400 rounded-lg p-2">
                <img
                    src={profil1}
                    alt="EnglishElevate Students"
                    className="rounded-md w-full h-auto transition-all duration-500 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
          </section>


        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
          <div id="features" className="text-center">
            <h2
                className="text-4xl font-extrabold mb-8 transition-all duration-500 ease-in-out"
                data-aos="fade-up"
                data-aos-delay="300"
            >
              Why Choose EnglishElevate?
            </h2>
            <div
                className="flex justify-center  flex-wrap md:flex-nowrap md:space-x-12 transition-all duration-500 ease-in-out"
            >
              {/* Expert Instructors */}
              <div
                  className="w-72 shadow-lg p-6 rounded-lg bg-white bg-opacity-80 hover:bg-opacity-100 hover:scale-105 transform transition-all duration-300 ease-in-out mb-6 md:mb-0"
                  data-aos="fade-up"
                  data-aos-delay="500"
              >
                <div className="flex justify-center mb-4">
                  <CgProfile size={60} className="text-indigo-500"/>
                </div>
                <h3 className="text-xl font-semibold text-center text-indigo-800">
                  Certified Instructors
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Learn from certified instructors who are native English speakers and bring years of experience to help
                  you master English.
                </p>
              </div>

              {/* Flexible Learning Hours */}
              <div
                  className="w-72 shadow-lg p-6 rounded-lg bg-white bg-opacity-80 hover:bg-opacity-100 hover:scale-105 transform transition-all duration-300 ease-in-out mb-6 md:mb-0"
                  data-aos="fade-up"
                  data-aos-delay="600"
              >
                <div className="flex justify-center mb-4">
                  <CgTime size={60} className="text-indigo-500"/>
                </div>
                <h3 className="text-xl font-semibold text-center text-indigo-800">
                  Customizable Schedules
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Enjoy the flexibility to learn at your own pace, with lessons and schedules tailored to fit your needs
                  and lifestyle.
                </p>
              </div>

              {/* Comprehensive Curriculum */}
              <div
                  className="w-72 shadow-lg p-6 rounded-lg bg-white bg-opacity-80 hover:bg-opacity-100 hover:scale-105 transform transition-all duration-300 ease-in-out mb-6 md:mb-0"
                  data-aos="fade-up"
                  data-aos-delay="700"
              >
                <div className="flex justify-center mb-4">
                  <CgPullClear size={60} className="text-indigo-500"/>
                </div>
                <h3 className="text-xl font-semibold text-center text-indigo-800">
                  All-Inclusive Curriculum
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Master all aspects of English, including grammar, vocabulary, fluency, and confidence through our
                  comprehensive courses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-200 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Students Say</h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                }}
                className="testimonials-carousel"
            >
              {/* Testimonial 1 */}
              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                        src={test4}
                        className="w-16 h-16 rounded-full mr-4"
                        alt="Profile"
                    />
                    <p className="font-semibold">- Sarah L., Business Professional</p>
                  </div>
                  <p className="text-gray-600">
                    "EnglishElevate has transformed the way I approach learning. The
                    courses are engaging, and the instructors truly care about my
                    progress. I feel more confident in my business communication."
                  </p>
                </div>
              </SwiperSlide>

              {/* Testimonial 2 */}
              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                        src={test2}
                        className="w-16 h-16 rounded-full mr-4"
                        alt="Profile"
                    />
                    <p className="font-semibold">- Carlos M., University Student</p>
                  </div>
                  <p className="text-gray-600">
                    "I've tried many English courses, but none compare to
                    EnglishElevate. The interactive lessons and personalized feedback
                    have boosted my confidence tremendously."
                  </p>
                </div>
              </SwiperSlide>

              {/* Testimonial 3 */}
              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                        src={test3}
                        className="w-16 h-16 rounded-full mr-4"
                        alt="Profile"
                    />
                    <p className="font-semibold">- Michael J., Tech Entrepreneur</p>
                  </div>
                  <p className="text-gray-600">
                    "The flexibility and personalized feedback provided by
                    EnglishElevate have been game-changers in my language learning
                    journey. I highly recommend it to anyone looking to improve their
                    English."
                  </p>
                </div>
              </SwiperSlide>

              {/* Testimonial 4 */}
              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                        src={test5}
                        className="w-16 h-16 rounded-full mr-4"
                        alt="Profile"
                    />
                    <p className="font-semibold">- Jessica T., Marketing Specialist</p>
                  </div>
                  <p className="text-gray-600">
                    "EnglishElevate is the best course I've taken. The curriculum is
                    clear and well-structured, and I love the flexibility to learn at
                    my own pace. I've seen amazing results!"
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        {/* Pricing Section */}

        <section id="pricing" className="bg-gradient-to-r from-purple-400 to-pink-500 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Pricing Plan</h2>

            <div id='prc-box' className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                  <div
                      key={index}
                      className={`bg-white p-8 rounded-lg shadow-lg text-center border-4 ${getBorderColor(index)} transition-all duration-300 hover:scale-105`}
                  >
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <p className="text-4xl font-bold mb-4">
                      ${plan.price}<span className="text-sm">/month</span>
                    </p>
                    <ul className="mb-6 text-left">
                      {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gradient-to-r from-blue-100 to-gray-200 py-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
                <Accordion
                    title="What is EnglishElevate?"
                    answer="EnglishElevate is an online learning platform designed to help you improve your English skills with personalized lessons and expert instructors."
                />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
                <Accordion
                    title="What levels of English do you offer courses for?"
                    answer="We cater to all levels, from beginner to advanced, with courses designed to meet your specific needs."
                />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
                <Accordion
                    title="Are the lessons live or pre-recorded?"
                    answer="Our lessons are live, giving you the opportunity to interact with instructors and classmates in real-time."
                />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
                <Accordion
                    title="How can I track my progress?"
                    answer="You can track your progress through our platform's dashboard, which includes detailed reports and feedback from instructors."
                />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
                <Accordion
                    title="Do I need any special software or equipment?"
                    answer="All you need is a stable internet connection, a microphone, and a camera for interactive lessons."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <h2 className="f-title">Get More Information</h2>
          <form
              className="max-w-lg mx-auto bg-gradient-to-r from-blue-50 to-gray-50 p-8 rounded-xl shadow-md transform transition-transform hover:scale-105"
              onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                  placeholder="Enter your full name"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                  placeholder="Enter your email address"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                  placeholder="Write your message here"
                  rows="4"
                  required
              ></textarea>
            </div>
            <button
                type="submit"
                className={`w-full py-3 px-6 text-white rounded-lg font-semibold transition duration-300 ${
                    isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
            {submitMessage && (
                <p className="mt-4 text-center text-green-600 font-medium">{submitMessage}</p>
            )}
          </form>

        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950 text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-lg font-semibold tracking-wide">
              &copy; 2024 <span className="text-indigo-300">EnglishElevate</span>. All rights reserved.
            </p>
            <div className="mt-6 flex justify-center space-x-6">
              <a
                  href="/privacy-policy"
                  className="text-indigo-200 hover:text-white transition-colors duration-300 ease-in-out transform hover:scale-105"
              >
                Privacy Policy
              </a>
              <a
                  href="/terms-of-service"
                  className="text-indigo-200 hover:text-white transition-colors duration-300 ease-in-out transform hover:scale-105"
              >
                Terms of Service
              </a>
            </div>
            <div className="mt-6 text-sm opacity-70">
              <p>Made with ❤️ by the EnglishElevate Team</p>
            </div>
          </div>
        </footer>

      </div>
  );
};

export default LandingPage;