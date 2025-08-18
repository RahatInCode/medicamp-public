import { FaHeartbeat, FaAppleAlt, FaRunning, FaHandsWash } from "react-icons/fa";

const healthTips = [
  {
    icon: <FaHeartbeat className="text-primary w-8 h-8" />,
    title: "Stay Hydrated",
    description:
      "Drink at least 8 glasses of water daily to keep your body functioning optimally.",
  },
  {
    icon: <FaAppleAlt className="text-secondary w-8 h-8" />,
    title: "Balanced Diet",
    description:
      "Incorporate fruits, vegetables, and whole grains into your meals for better health.",
  },
  {
    icon: <FaRunning className="text-accent w-8 h-8" />,
    title: "Regular Exercise",
    description:
      "Aim for 30 minutes of moderate exercise most days of the week.",
  },
  {
    icon: <FaHandsWash className="text-info w-8 h-8" />,
    title: "Maintain Hygiene",
    description:
      "Wash your hands regularly to prevent infections and illnesses.",
  },
];

const resources = [
  {
    name: "WHO Health Topics",
    url: "https://www.who.int/health-topics",
  },
  {
    name: "CDC Healthy Living",
    url: "https://www.cdc.gov/healthyweight/index.html",
  },
  {
    name: "MediCamp Blog",
    url: "/blog",
  },
];

export default function HealthTipsResources() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-base-100 rounded-2xl shadow-lg transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-base-content text-center">
        Health Tips & Resources
      </h2>

      {/* Health Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        {healthTips.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 border border-base-200 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-[1.05] duration-300 bg-base-200"
          >
            {icon}
            <h3 className="mt-4 text-xl font-semibold text-base-content">
              {title}
            </h3>
            <p className="mt-2 text-base-content/70">{description}</p>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">
          Useful Resources
        </h3>
        <ul className="list-disc list-inside space-y-2 text-primary">
          {resources.map(({ name, url }, idx) => (
            <li key={idx}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-secondary"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
