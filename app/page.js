"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight, FaRegCirclePlay } from "react-icons/fa6";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { AiOutlineMail } from "react-icons/ai";
import { GiInjustice } from "react-icons/gi";
import { MdOutlinePhone } from "react-icons/md";
import {
  BsBoundingBoxCircles,
  BsCalendar2Week,
  BsActivity,
  BsFillCheckCircleFill,
  BsCrosshair,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import BaseLayout from "@/layout/base";
import Counter from "@/components/counter";
import styled from "styled-components";
import { useState, useEffect } from "react";


const lawyersData = {
  "Lawyers in Lahore": [
    "Best Dermatologist in Lahore",
    "Best Gynecologist in Lahore",
    "Best Urologist in Lahore",
    "Best Sexologist in Lahore",
    "Best Internal Medicine Specialist in Lahore",
    "Best Child Specialist in Lahore",
    "Best Orthopedic Surgeon in Lahore",
    "Best Eye Specialist in Lahore",
  ],
  "Lawyers in Karachi": [
    "Best Dermatologist in Karachi",
    "Best Gynecologist in Karachi",
    "Best Urologist in Karachi",
    "Best Sexologist in Karachi",
    "Best Internal Medicine Specialist in Karachi",
    "Best Child Specialist in Karachi",
    "Best Orthopedic Surgeon in Karachi",
    "Best Eye Specialist in Karachi",
  ],
  "Lawyers in Islamabad": [
    "Best Dermatologist in Islamabad",
    "Best Gynecologist in Islamabad",
    "Best Urologist in Islamabad",
    "Best Sexologist in Islamabad",
    "Best Internal Medicine Specialist in Islamabad",
    "Best Child Specialist in Islamabad",
    "Best Orthopedic Surgeon in Islamabad",
  ],
  "Lawyers in Other Cities": [
    "Best Nephrologist in Multan",
    "Best Pulmonologist in Multan",
    "Best Cardiologist in Multan",
    "Best Neuro Physician in Multan",
    "Best Gynecologist in Peshawar",
    "Best Urologist in Faisalabad",
    "Best Dentist in Faisalabad",
    "Best Dermatologist in Faisalabad",
  ],
};

export default function () {
  const [activeIndex, setActiveIndex] = useState(0);
  const stats = [
    { icon: <BsFillCheckCircleFill color="#5AAC45" />, text: "25k+ lawyers" },
    { icon: <BsFillCheckCircleFill color="#5AAC45" />, text: "40k+ client" },
    { icon: <BsFillCheckCircleFill color="#5AAC45" />, text: "30k+ reviews" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % stats.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BaseLayout>
      {/* Hero section  */}

      <section id="hero">
        <div className="container">
          <div className="hero p-3 p-md-5">
            <h1>
              Find and Book the
              <br />
              <span style={{ color: "var(--secondary)" }}>
                Best Lawyers
              </span>{" "}
              for Your case
            </h1>
            <StatsSlider className="stats-slider">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  className={index === activeIndex ? "active" : ""}
                >
                  {stat.icon} {stat.text}
                </StatItem>
              ))}
            </StatsSlider>
            <div className="searchbar">
              <div className="city">
                <span>Karachi</span>
                <button className="detect-city-btn">
                  <BsCrosshair /> Detect
                </button>
              </div>
              <div className="search">Lawyers, Law firms</div>
              <button className="btn btn-secondary">Search</button>
            </div>
            <img src="/assets/img/hero-img.png" alt="hero image" />
          </div>
        </div>
      </section>

      {/* Hero section  */}

      {/* Stats */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-center">
            Don't miss the chance
            <br />
            first and premier digital legal platform
          </h1>
          <div className="row gy-4 mt-3">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="1000" />
                <p>No. of lawyers</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="950" />
                <p>No. of local clients</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="750" />
                <p>No. of overseas clients</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="600" />
                <p>No. of cases</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}

      {/* Featured Services Section */}
      <section id="featured-services" className="featured-services section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div class="card border-0 shadow">
                <div className="card-image" style={{ background: "#F3F3FF" }}>
                  <img src="https://oladoc.com/dist/images/online-now-home-2x_highly-compressed.webp" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">Consult Online now</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card border-0 shadow">
                <div className="card-image" style={{ background: "#FFF1DD" }}>
                  <img src="https://oladoc.com/dist/images/online-now-home-2x_highly-compressed.webp" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">Personal Appointment </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card border-0 shadow">
                <div className="card-image" style={{ background: "#F2F8F0" }}>
                  <img src="https://oladoc.com/dist/images/online-now-home-2x_highly-compressed.webp" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">Overseas Pakistanis</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card border-0 shadow">
                <div className="card-image" style={{ background: "#FFF9F7" }}>
                  <img src="https://oladoc.com/dist/images/online-now-home-2x_highly-compressed.webp" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">Submit Enquiry</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Services Section */}

      {/* Consultant */}
      <section id="consultancy" className="consultancy section">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h4>Consult Best Lawyers online</h4>
            <a href="#" className="under">
              View all
            </a>
          </div>

          <div className="consultancy-list mt-5">
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
            <div className="card border-0">
              <img
                className="card-img-top rounded-circle"
                src="https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1741338802949"
                alt="Card image cap"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="card-body">
                <p className="card-text text-center">Criminal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Consultant */}

      {/* Partners */}
      <section id="partners" className="partners section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-center">Our Esteemed Partners</h1>
          <p className="text-center">
            Avail Exclusive partnership benefits for your brand, clients and
            employees.
          </p>

          <Swiper
            className="mt-5"
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://nastp.gov.pk/assets_main/v1_img/kharian/logo.png"
                  alt="Partner 1"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Jubilee_Insurance_Pakistan_logo.svg"
                  alt="Partner 2"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://crystalpng.com/wp-content/uploads/2024/12/new-Jazzcash-logo.png"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://cdn.brandfetch.io/zameen.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://res.cloudinary.com/hlsr7ls49/image/upload/v1617186918/bdhsfq68kje8nfkjzohh.png"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://d1t78adged64l7.cloudfront.net/images/companies/1722248287_bM7yZgnLDT.webp?v=1741338802949"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://d1t78adged64l7.cloudfront.net/images/companies/1721298500_XXw52qPcHo.webp?v=1741338802949"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="partner-item text-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bank_alfalah_logo.png"
                  alt="Partner 3"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* Partners */}

      {/* News */}
      <section id="news" className="news section">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h4>As seen in news</h4>
          </div>
          <Swiper
            className="mt-5"
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              425: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img
                    src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/samaa.png"
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="">
                    READ MORE
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img
                    src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/pro-pakistani.png"
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="">
                    READ MORE
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img
                    src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/the-nation.png"
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="">
                    READ MORE
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img
                    src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/business-recorder.png"
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="">
                    READ MORE
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* News */}

      {/* Testimonials */}
      <section id="testimonials" className="testimonials section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-center">Google customer reviews</h1>
          <p className="text-center">
            Check out the reviews from our satisfied customers
          </p>

          <Swiper
            className="mt-5"
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <FaQuoteLeft className="quote-icon-left" />
                  <span>
                    Proin iaculis purus consequat sem cure digni ssim donec
                    porttitora entum suscipit rhoncus. Accusantium quam,
                    ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                    risus at semper.
                  </span>
                  <FaQuoteRight className="quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-1.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < 3 ? (
                      <BsStarFill key={i} color="#FFD700" fill="#FFD700" />
                    ) : (
                      <BsStar key={i} color="#FFD700" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <FaQuoteLeft className="quote-icon-left" />
                  <span>
                    Export tempor illum tamen malis malis eram quae irure esse
                    labore quem cillum quid malis quorum velit fore eram velit
                    sunt aliqua noster fugiat irure amet legam anim culpa.
                  </span>
                  <FaQuoteRight className="quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-2.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < 4 ? (
                      <BsStarFill key={i} color="#FFD700" fill="#FFD700" />
                    ) : (
                      <BsStar key={i} color="#FFD700" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <FaQuoteLeft className="quote-icon-left" />
                  <span>
                    Enim nisi quem export duis labore cillum quae magna enim
                    sint quorum nulla quem veniam duis minim tempor labore quem
                    eram duis noster aute amet eram fore quis sint minim.
                  </span>
                  <FaQuoteRight className="quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-3.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < 5 ? (
                      <BsStarFill key={i} color="#FFD700" fill="#FFD700" />
                    ) : (
                      <BsStar key={i} color="#FFD700" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <FaQuoteLeft className="quote-icon-left" />
                  <span>
                    Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                    multos export minim fugiat dolor enim duis veniam ipsum anim
                    magna sunt elit fore quem dolore labore illum veniam.
                  </span>
                  <FaQuoteRight className="quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-4.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < 5 ? (
                      <BsStarFill key={i} color="#FFD700" fill="#FFD700" />
                    ) : (
                      <BsStar key={i} color="#FFD700" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <FaQuoteLeft className="quote-icon-left" />
                  <span>
                    Quis quorum aliqua sint quem legam fore sunt eram irure
                    aliqua veniam tempor noster veniam sunt culpa nulla illum
                    cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                  </span>
                  <FaQuoteRight className="quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-5.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < 5 ? (
                      <BsStarFill key={i} color="#FFD700" />
                    ) : (
                      <BsStar key={i} color="#FFD700" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* Testimonials */}

      {/* Lawyer by cities */}
      <section id="lawyer-by-cities" className="lawyer-by-cities section">
        <div className="container">
          <h1 className="text-center">Search Lawyers by City</h1>
          <div className="wrapper mt-5">
            <a
              href="#"
              className="city rounded"
              style={{
                backgroundImage:
                  "url(https://www.imusafir.pk/blog/wp-content/uploads/2025/01/Faisal-Masjid-1.jpg)",
              }}
            >
              <div className="content">
                <span className="count">89</span>
                <p className="card-text text-center">Islamabad</p>
              </div>
            </a>
            <a
              href="#"
              className="city rounded"
              style={{
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWfsr-mZYduXr-PJZ97E9PpZUcuZTGQAKAWk2b_uBQjb_dYOZ2PTQ-q9ooLDdYgem2j_Q&usqp=CAU)",
              }}
            >
              <div className="content">
                <span className="count">30</span>
                <p className="card-text text-center">Lahore</p>
              </div>
            </a>
            <a
              href="#"
              className="city rounded"
              style={{
                backgroundImage:
                  "url(https://www.qatarairways.com/content/dam/images/renditions/vertical-hd/destinations/pakistan/karachi/v-hd-mazarequaid-karachi.jpg)",
              }}
            >
              <div className="content">
                <span className="count">14</span>
                <p className="card-text text-center">Karachi</p>
              </div>
            </a>
            <a
              href="#"
              className="city rounded"
              style={{
                backgroundImage:
                  "url(https://norwesttours.com/wp-content/uploads/2020/11/khyber-gate.jpg)",
              }}
            >
              <div className="content">
                <span className="count">6</span>
                <p className="card-text text-center">Peshawar</p>
              </div>
            </a>
            <a
              href="#"
              className="city rounded"
              style={{
                backgroundImage:
                  "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gulshan_Dadn_Khan_Maseet%2C_Rawalpindi.JPG/640px-Gulshan_Dadn_Khan_Maseet%2C_Rawalpindi.JPG)",
              }}
            >
              <div className="content">
                <span className="count">212</span>
                <p className="card-text text-center">Rawalpindi</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* Lawyer by cities */}
      <section>
        <div className="container py-5">
          <div className="row">
            {Object.entries(lawyersData).map(([city, lawyers], index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <h5 className="text-dark fw-bold mb-5">
                  {city}
                </h5>
                <ul className="list-unstyled" style={{listStyle: "'➤ '"}}>
                  {lawyers.map((lawyer, idx) => (
                    <li className="mb-4" key={idx}>
                      <a href="#" className="text-decoration-none text-secondary">
                        {lawyer}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

const StatsSlider = styled.div``;

const StatItem = styled.div`
  display: none;
  color: #fff;
  gap: 0.75rem;
  align-items: center;
  border-radius: 0.5rem;
  background: rgba(255, 158, 21, 0.2);
  font-weight: 600;
  font-size: 14px;
  padding: 0.5rem;
  opacity: 0;
  width: max-content;

  &.active {
    display: flex;
    animation: fade 1s ease forwards;
  }
`;
