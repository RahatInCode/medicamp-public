import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router'; // make sure you are using react-router-dom v6

const slides = [
  {
    image: 'https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg',
    title: 'Free Health Checkup Camp',
    program: 'Diabetes Awareness & Checkup Program',
    success: 'Over 850 patients successfully treated',
    cured: '97% diagnosed early and cured',
  },
  {
    image: 'https://sixtyandme.com/wp-content/uploads/2015/10/Sixty-and-Me-Words-Can%E2%80%99t-Describe-the-Cuteness-of-this-Baby%E2%80%99s-Laugh.jpg',
    title: 'Child Immunization Drive',
    program: 'WHO Certified Immunization Program',
    success: '1200+ children vaccinated',
    cured: 'No cases of post-vaccine complications',
  },
  {
    image: 'https://t4.ftcdn.net/jpg/06/17/68/57/360_F_617685721_BqOhlK0PzrfZin33BEt5FWlzaMZcNlmZ.jpg',
    title: 'Women’s Health Awareness',
    program: 'Cervical Cancer Screening Initiative',
    success: '700+ women screened',
    cured: 'Early detection saved 95+ lives',
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[90vh] relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-sm" />

              {/* Content */}
              <div className="z-20 text-center px-4 md:px-10 text-white max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-wide drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-3 font-medium text-gray-200">
                  {slide.program}
                </p>
                <p className="text-md md:text-lg mb-1 text-gray-300">{slide.success}</p>
                <p className="text-md md:text-lg mb-6 text-gray-300">{slide.cured}</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {/* Learn More Button - external link */}
                  <a
                    href="https://www.transparenthands.org/why-are-health-camps-important-in-rural-areas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition"
                  >
                    Learn More
                  </a>

                  {/* Join Our Next Camp - internal route */}
                  <Link
                    to="/camps"
                    className="bg-black text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-800 transition"
                  >
                    Join Our Next Camp
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
