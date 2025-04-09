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
} from "react-icons/bs";
import BaseLayout from "@/layout/base";
import Counter from "@/components/counter";
import styled from "styled-components";
import { useState, useEffect } from "react";

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

      {/* <section id="hero" className="hero section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
              data-aos="fade-up"
            >
              <h1>Elegant and creative solutions</h1>
              <p>
                We are team of talented designers making websites with Bootstrap
              </p>
              <div className="d-flex">
                <a href="#about" className="btn-get-started">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <FaRegCirclePlay color="var(--secondary)" />
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-out"
              data-aos-delay="100"
            >
              <img
                src="/assets/img/hero-img.webp"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section> */}
      {/* Hero section  */}

      {/* Stats */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-center">
            Don't miss the chance to join Pakistan's
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
              320: {
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
                  <img src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/samaa.png" alt="Card image cap"/>
                </div>
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="">READ MORE</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/pro-pakistani.png" alt="Card image cap"/>
                </div>
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="">READ MORE</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/the-nation.png" alt="Card image cap"/>
                </div>
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="">READ MORE</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-3">
              <div className="card p-3 border-0 shadow">
                <div className="card-image text-center px-2 py-5">
                  <img src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/news/business-recorder.png" alt="Card image cap"/>
                </div>
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="">READ MORE</a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* News */}

      {/* Testimonials */}
      <section
        id="testimonials"
        className="testimonials section light-background"
      >
        <div className="container section-title" data-aos="fade-up">
          <span>Testimonials</span>
          <h2>Testimonials</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <Swiper
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
              </div>
            </SwiperSlide>
          </Swiper>
          
        </div>
      </section>
      {/* Testimonials */}

      {/* Call to action */}
      <section
        id="call-to-action"
        className="call-to-action section accent-background"
      >
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="col-xl-10">
              <div className="text-center">
                <h3>Call To Action</h3>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <a className="cta-btn" href="#">
                  Call To Action
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to action */}

      {/* Contact */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <span>Section Title</span>
          <h2>Contact</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="info-wrap">
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <FaMapMarkerAlt size="20" className="flex-shrink-0" />
                  <div>
                    <h3>Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <MdOutlinePhone size="20" className="flex-shrink-0" />
                  <div>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <AiOutlineMail size="20" className="flex-shrink-0" />
                  <div>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                  frameBorder="0"
                  style={{ border: 0, width: "100%", height: 270 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="col-lg-7">
              <form
                action="forms/contact.php"
                method="post"
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name-field"
                      className="form-control"
                      required=""
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email-field"
                      required=""
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject-field"
                      required=""
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="10"
                      id="message-field"
                      required=""
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>

                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
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
