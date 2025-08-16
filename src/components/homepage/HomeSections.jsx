import { motion } from "framer-motion";
import Slider from "react-slick";
import emailjs from "emailjs-com";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { FaHeartbeat, FaSyringe, FaChild, FaBrain, FaAppleAlt, FaPills, FaStethoscope } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import doc1 from "../../assets/doctors/doc1.jpg";
import doc2 from "../../assets/doctors/doc2.jpg";
import doc3 from "../../assets/doctors/doc3.jpg";
import doc4 from "../../assets/doctors/doc4.jpg";
import doc5 from "../../assets/doctors/doc5.jpg";
import doc6 from "../../assets/doctors/doc6.jpg";
import docRight from "../../assets/doctors/doc-right.jpg";
import heart from "../../assets/news/heart.jpg";
import vaccine from "../../assets/news/vaccine.jpg";
import diabetes from "../../assets/news/diabetes.jpg";



// Doctor Data
const doctors = [
  { name: "Dr. Sarah Khan", specialty: "Cardiologist", img: doc1 },
  { name: "Dr. Ahmed Rahman", specialty: "Dermatologist", img: doc2 },
  { name: "Dr. Ayesha Noor", specialty: "Pediatrician", img: doc3 },
  { name: "Dr. Saraf Khan", specialty: "Pathologist", img: doc4 },
  { name: "Dr. Ahmed Rahat", specialty: "Psychiatrist", img: doc5 },
  { name: "Dr. Sneha Benzir", specialty: "Neurologist", img: doc6 },
  // Special tall image (no name/specialty)
  { name: "", specialty: "", img: docRight },
];


// News Data
const news = [
  { title: "5 Tips to Improve Heart Health", img:heart, icon: <FaHeartbeat className="text-red-500 text-xl" />, link: "#" },
  { title: "New Vaccine Breakthrough", img:vaccine, icon: <FaSyringe className="text-blue-500 text-xl" />, link: "#" },
  { title: "How to Manage Diabetes", img:diabetes, icon: <FaAppleAlt className="text-green-500 text-xl" />, link: "#" },
  { title: "Understanding Child Nutrition", img: "https://images.unsplash.com/photo-1613679074451-9ddcc1103cc8?q=80&w=870&auto=format&fit=crop", icon: <FaChild className="text-pink-500 text-xl" />, link: "#" },
  { title: "Brain Health Secrets", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1031&auto=format&fit=crop", icon: <FaBrain className="text-purple-500 text-xl" />, link: "#" },
  { title: "New Pain Relief Drug Released", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=940&auto=format&fit=crop", icon: <FaPills className="text-orange-500 text-xl" />, link: "#" },
  { title: "General Health Checkup Guide", img: "https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?q=80&w=870&auto=format&fit=crop", icon: <FaStethoscope className="text-gray-700 text-xl" />, link: "#" },
];

// Partners Data
const partners = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQaXgOHaNwQFp-_lb5pdaUKdrds46jbiMr7lPydy-IA50sknBanBZ9ki_nKPBWT90bqg0&usqp=CAU",
  "https://www.newsbangla24.com/assets/news_images/2023/07/16/pharma-job.jpg",
  "https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/02/01/renata.jpg",
  "https://images.ajkerpatrika.com/original_images/incepta.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d8/AmerisourceBergen_logo.svg",
  "https://ugc.cdn.rewardgateway.net/Collateral/1420000/1429019.svg",
  "https://medex.com.bd/img/medex-logo-w-bg.webp",
];

// FAQ Data
const faqs = [
  { q: "How do I book an appointment?", a: "Fill the form with your details and choose a department." },
  { q: "Can I cancel my booking?", a: "Yes, contact us at least 24 hours before your appointment." },
  { q: "Do you offer emergency services?", a: "Yes, 24/7 emergency care is available." },
];

// Custom arrows for react-slick
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button aria-label="next" onClick={onClick}
      className={`${className} !flex !items-center !justify-center !w-9 !h-9 !rounded-full !bg-white !shadow-md hover:!scale-105`}
      style={{ ...style }}>
      <AiOutlineRight />
    </button>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button aria-label="previous" onClick={onClick}
      className={`${className} !flex !items-center !justify-center !w-9 !h-9 !rounded-full !bg-white !shadow-md hover:!scale-105`}
      style={{ ...style }}>
      <AiOutlineLeft />
    </button>
  );
}

export default function HomeSections() {
  const [form, setForm] = useState({ department: "", doctor: "", name: "", phone: "", email: "" });
  const [expanded, setExpanded] = useState(null);

  // Split doctors: normal cards vs special tall-right image
  const { normalDoctors, tallImage } = useMemo(() => {
    const tall = doctors.find(d => !d.name && !d.specialty)?.img;
    const list = doctors.filter(d => d.name);
    return { tallImage: tall, normalDoctors: list };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.department || !form.doctor) {
      toast.error("Please fill all required fields!");
      return;
    }
    emailjs
      .send("service_e7u097i", "template_vquklnj", form, "HuRVe1WWq8lKM11vP")
      .then(() => {
        Swal.fire("Success!", "Appointment request sent!", "success");
        setForm({ department: "", doctor: "", name: "", phone: "", email: "" });
      })
      .catch(() => {
        Swal.fire("Error!", "Something went wrong!", "error");
      });
  };

  const newsSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false, dots: true } },
      { breakpoint: 640, settings: { slidesToShow: 1, arrows: false, dots: true } },
    ],
  };

  const partnerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="space-y-16 ml-30 mr-30 mt-50 mb-20">
      <Toaster position="top-right" />

      {/* Our Doctors */}
      <section className="px-6 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Doctors</h2>

        {/* Parent grid: 3 columns of doctor cards + 1 fixed right column for the tall image */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left: doctor cards in their own grid */}
          <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalDoctors.map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <img src={doc.img} alt={doc.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
                <h3 className="text-lg font-semibold">{doc.name}</h3>
                <p className="text-gray-500">{doc.specialty}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: vertical tall image (always right side on md+) */}
          {tallImage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1 hidden md:block"
            >
              <div className="h-full min-h-[520px]">
                <img
                  src={tallImage}
                  alt="Doctors"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-6">Be the First to Read</h2>
        <Slider {...newsSettings}>
          {news.map((n, i) => (
            <motion.div whileHover={{ scale: 1.03 }} key={i} className="p-4">
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
                <img src={n.img} alt={n.title} className="h-48 w-full object-cover" />
                <div className="p-4 flex items-center gap-2">
                  {n.icon}
                  <h3 className="font-bold">{n.title}</h3>
                </div>
                <div className="px-4 pb-4">
                  <a href={n.link} className="text-blue-600 text-sm hover:underline">Read More →</a>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Appointment + FAQ */}
      <section className="px-6 py-12 bg-gray-50 grid md:grid-cols-2 gap-8">
        {/* Appointment Form */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
          <form
            onSubmit={sendEmail}
            className="space-y-4 backdrop-blur-lg bg-white/70 p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <select
              className="w-full border p-2 rounded"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
              required
            >
              <option value="">Select Department</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Pediatrics</option>
            </select>

            <select
              className="w-full border p-2 rounded"
              value={form.doctor}
              onChange={e => setForm({ ...form, doctor: e.target.value })}
              required
            >
              <option value="">Select Doctor</option>
              {normalDoctors.map((d, i) => (
                <option key={i}>{d.name}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <button type="submit" className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-700 cursor-pointer transition">
              Make an Appointment
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                layout
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="bg-white p-4 rounded-xl shadow-lg cursor-pointer"
              >
                <h3 className="font-semibold">{faq.q}</h3>
                {expanded === i && <p className="mt-2 text-gray-500">{faq.a}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
        <Slider {...partnerSettings}>
          {partners.map((logo, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="flex items-center justify-center p-4">
              {/* Normalized box so all logos look consistent */}
              <div className="h-16 w-40 flex items-center justify-center">
                <img src={logo} alt="partner" className="max-h-full max-w-full object-contain" />
              </div>
            </motion.div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
