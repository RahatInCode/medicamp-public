import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "lucide-react"; // retro theme

// Define themes with name & icon component
const themes = [
  { name: "light", icon: <SunIcon className="w-5 h-5" /> },
  { name: "dark", icon: <MoonIcon className="w-5 h-5" /> },
  { name: "retro", icon: <SparklesIcon className="w-5 h-5" /> },
];

export default function ThemeToggle() {
  // Safe initial theme index
  const [themeIndex, setThemeIndex] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const index = themes.findIndex((t) => t.name === storedTheme);
    return index >= 0 ? index : 0; // fallback to 0 if not found
  });

  const currentTheme = themes[themeIndex] || themes[0]; // fallback

  // Apply theme to document and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme.name);
    localStorage.setItem("theme", currentTheme.name);
  }, [currentTheme]);

  // Handle theme toggle
  const handleToggle = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <button
      onClick={handleToggle}
      className="
        p-2 rounded-full 
        transition 
        bg-gray-200 dark:bg-gray-700 
        text-black dark:text-white 
        hover:bg-gray-300 dark:hover:bg-gray-600
        flex items-center justify-center
      "
      aria-label={`Switch theme to ${themes[(themeIndex + 1) % themes.length].name}`}
    >
      {currentTheme?.icon || <SunIcon className="w-5 h-5" />} {/* fallback icon */}
    </button>
  );
}

