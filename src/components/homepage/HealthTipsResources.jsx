import { FaHeartbeat, FaAppleAlt, FaRunning, FaHandsWash, FaBookMedical } from 'react-icons/fa';

const healthTips = [
  {
    icon: <FaHeartbeat className="text-red-500 w-8 h-8" />,
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to keep your body functioning optimally.',
  },
  {
    icon: <FaAppleAlt className="text-green-500 w-8 h-8" />,
    title: 'Balanced Diet',
    description: 'Incorporate fruits, vegetables, and whole grains into your meals for better health.',
  },
  {
    icon: <FaRunning className="text-blue-500 w-8 h-8" />,
    title: 'Regular Exercise',
    description: 'Aim for 30 minutes of moderate exercise most days of the week.',
  },
  {
    icon: <FaHandsWash className="text-yellow-500 w-8 h-8" />,
    title: 'Maintain Hygiene',
    description: 'Wash your hands regularly to prevent infections and illnesses.',
  },
];

const resources = [
  {
    name: 'WHO Health Topics',
    url: 'https://www.who.int/health-topics',
  },
  {
    name: 'CDC Healthy Living',
    url: 'https://www.cdc.gov/healthyweight/index.html',
  },
  {
    name: 'MediCamp Blog',
    url: '/blog',
  },
];

export default function HealthTipsResources() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Health Tips & Resources</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        {healthTips.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition transform hover:scale-[1.05] duration-300"
          >
            {icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Useful Resources</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          {resources.map(({ name, url }, idx) => (
            <li key={idx}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-900"
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
