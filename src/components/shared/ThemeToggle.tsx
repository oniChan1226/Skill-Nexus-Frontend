import { IconMoon, IconSun } from "@tabler/icons-react"
import { useEffect, useState } from "react"

const ThemeToggle = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

   const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
        <button onClick={toggleTheme}
      className="px-4 py-2 bg-transparent rounded dark:text-white cursor-pointer">
            {theme === "light" ? <IconSun stroke={2} /> :<IconMoon stroke={2} />}
        </button>
  )
}

export default ThemeToggle