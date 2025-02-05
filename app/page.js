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
  BsMap,
} from "react-icons/bs";
import BaseLayout from "@/layout/base";
import Counter from "@/components/counter";

export default function () {
  return (
    <BaseLayout>
      {/* Hero section  */}
      <section id="hero" className="hero section">
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
                  <FaRegCirclePlay />
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
                src="/assets/img/hero-img.png"
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* Hero section  */}

      {/* Featured Services Section */}
      <section id="featured-services" className="featured-services section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <BsActivity />
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p>
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <BsBoundingBoxCircles />
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Sed ut perspici
                  </a>
                </h4>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <BsCalendar2Week />
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Services Section */}

      {/* About section */}
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>About Us</span>
          <h2>About</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 position-relative align-self-start"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src="/assets/img/about.png" className="img-fluid" alt="" />
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn"
              ></a>
            </div>
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>
                Voluptatem dignissimos provident quasi corporis voluptates sit
                assumenda.
              </h3>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <LiaCheckDoubleSolid />{" "}
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                </li>
                <li>
                  <LiaCheckDoubleSolid />{" "}
                  <span>
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </span>
                </li>
                <li>
                  <LiaCheckDoubleSolid />{" "}
                  <span>
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </span>
                </li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About section */}

      {/* Stats */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="100"/>
                <p>Clients</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="500" />
                <p>Cases</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="3162" />
                <p>Hours Of Support</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <Counter value="310" />
                <p>Lawyers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}

      {/* Services */}
      <section id="services" className="services section light-background">
        <div className="container section-title" data-aos="fade-up">
          <span>Services</span>
          <h2>Services</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Nesciunt Mete</h3>
                </a>
                <p>
                  Provident nihil minus qui consequatur non omnis maiores. Eos
                  accusantium minus dolores iure perferendis tempore et
                  consequatur.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Eosle Commodi</h3>
                </a>
                <p>
                  Ut autem aut autem non a. Sint sint sit facilis nam iusto
                  sint. Libero corrupti neque eum hic non ut nesciunt dolorem.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Ledo Markt</h3>
                </a>
                <p>
                  Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                  Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Asperiores Commodit</h3>
                </a>
                <p>
                  Non et temporibus minus omnis sed dolor esse consequatur.
                  Cupiditate sed error ea fuga sit provident adipisci neque.
                </p>
                <a href="service-details.html" className="stretched-link"></a>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Velit Doloremque</h3>
                </a>
                <p>
                  Cumque et suscipit saepe. Est maiores autem enim facilis ut
                  aut ipsam corporis aut. Sed animi at autem alias eius labore.
                </p>
                <a href="service-details.html" className="stretched-link"></a>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <GiInjustice />
                </div>
                <a href="service-details.html" className="stretched-link">
                  <h3>Dolori Architecto</h3>
                </a>
                <p>
                  Hic molestias ea quibusdam eos. Fugiat enim doloremque aut
                  neque non et debitis iure. Corrupti recusandae ducimus enim.
                </p>
                <a href="service-details.html" className="stretched-link"></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services */}

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
                  <FaMapMarkerAlt size="20" className="flex-shrink-0"/>
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
                 <MdOutlinePhone size="20" className="flex-shrink-0"/>
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
                 <AiOutlineMail size="20" className="flex-shrink-0"/>
                  <div>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                  frameBorder ="0"
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
