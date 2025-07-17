import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../../api/axiosSecure'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function FeedbackSection() {
  const { data: feedbacks = [], isLoading, isError } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback')
      return res.data
    },
  })

  if (isLoading) return <p className="text-center py-10">Loading feedback...</p>
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load feedback.</p>

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
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          pagination={{ clickable: true }}
          grabCursor={true}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-[1.02] h-full flex flex-col justify-between">
                {/* Quote icon */}
                <svg
                  className="w-8 h-8 text-gray-300 mb-2 self-end"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5.5 5.5 0 002 11.5C2 15.64 5.36 19 9.5 19c.67 0 1.32-.12 1.93-.34l.34-1.9c-.49.18-1 .28-1.57.28-2.26 0-4.1-1.84-4.1-4.1a4.1 4.1 0 014.1-4.1c.42 0 .83.08 1.2.22l.28-1.53A5.54 5.54 0 007.17 6zm9 0A5.5 5.5 0 0011 11.5c0 4.14 3.36 7.5 7.5 7.5.67 0 1.32-.12 1.93-.34l.34-1.9c-.49.18-1 .28-1.57.28-2.26 0-4.1-1.84-4.1-4.1a4.1 4.1 0 014.1-4.1c.42 0 .83.08 1.2.22l.28-1.53A5.54 5.54 0 0016.17 6z" />
                </svg>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.participantName)}&background=random`}
                    alt={item.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.participantName}
                    </h3>
                    <div className="text-yellow-500 text-sm">
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

