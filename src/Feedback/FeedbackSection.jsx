// components/homepage/FeedbackSection.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const feedbacks = [
  {
    name: "Rashid Ahmed",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "I got my diabetes diagnosed early thanks to MediCamp. Their support literally saved my life.",
    rating: 5,
  },
  {
    name: "Shirin Akter",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback:
      "Amazing service, free checkups and great doctors. Thank you MediCamp for caring about people like us.",
    rating: 4,
  },
  {
    name: "Kabir Hossain",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    feedback:
      "Very friendly staff, clean environment, and instant reports. Highly recommend!",
    rating: 5,
  },
  // New feedback cards added here
  {
    name: "Farhana Islam",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback:
      "The staff was so caring and the checkup process was super smooth. Felt very comfortable.",
    rating: 5,
  },
  {
    name: "Jahidul Hasan",
    image: "https://randomuser.me/api/portraits/men/84.jpg",
    feedback:
      "Excellent facilities and knowledgeable doctors. I felt genuinely supported throughout.",
    rating: 4,
  },
  {
    name: "Nabila Rahman",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    feedback:
      "MediCamp’s free checkups gave me peace of mind. Truly grateful for their dedication.",
    rating: 5,
  },
]

export default function FeedbackSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          What Patients Say
        </h2>
        <p className="text-gray-500 mb-12 max-w-xl mx-auto">
          Real stories from real people. Here’s how MediCamp made a difference.
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination]}
        >
          {feedbacks.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full relative">
                {/* Quote icon */}
                <svg
                  className="w-8 h-8 text-gray-300 absolute top-6 right-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.17 6A5.5 5.5 0 002 11.5C2 15.64 5.36 19 9.5 19c.67 0 1.32-.12 1.93-.34l.34-1.9c-.49.18-1 .28-1.57.28-2.26 0-4.1-1.84-4.1-4.1a4.1 4.1 0 014.1-4.1c.42 0 .83.08 1.2.22l.28-1.53A5.54 5.54 0 007.17 6zm9 0A5.5 5.5 0 0011 11.5c0 4.14 3.36 7.5 7.5 7.5.67 0 1.32-.12 1.93-.34l.34-1.9c-.49.18-1 .28-1.57.28-2.26 0-4.1-1.84-4.1-4.1a4.1 4.1 0 014.1-4.1c.42 0 .83.08 1.2.22l.28-1.53A5.54 5.54 0 0016.17 6z" />
                </svg>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{item.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
} 


