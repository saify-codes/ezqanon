import BaseLayout from "@/layout/base";

export default function () {
  return (
    <BaseLayout>
      <section id="hero" class="hero section">
        <div class="container">
          <div class="row gy-4">
            <div
              class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
              data-aos="fade-up"
            >
              <h1>Elegant and creative solutions</h1>
              <p>
                We are team of talented designers making websites with Bootstrap
              </p>
              <div class="d-flex">
                <a href="#about" class="btn-get-started">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  class="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i class="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div
              class="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-out"
              data-aos-delay="100"
            >
              <img
                src="/assets/img/hero-img.png"
                class="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
