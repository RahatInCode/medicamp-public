import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "lucide-react"; // retro

const themes = [
  { name: "light", icon: <SunIcon className="w-5 h-5" /> },
  { name: "dark", icon: <MoonIcon className="w-5 h-5" /> },
  { name: "retro", icon: <SparklesIcon className="w-5 h-5" /> },
];

export default function ThemeToggle() {
  const [themeIndex, setThemeIndex] = useState(
    themes.findIndex((t) => t.name === localStorage.getItem("theme")) || 0
  );

  const currentTheme = themes[themeIndex];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme.name);
    localStorage.setItem("theme", currentTheme.name);
  }, [themeIndex]);

  const handleToggle = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full transition bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={`Switch theme to ${themes[(themeIndex + 1) % themes.length].name}`}
    >
      {currentTheme.icon}
    </button>
  );
}

