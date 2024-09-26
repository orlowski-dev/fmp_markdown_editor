"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import "./styles.css";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return;

  return (
    <div
      className={`theme-toggler ${theme}`}
      role="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className={theme === "dark" ? "active" : "inactive"}>
        <MoonIcon />
      </span>
      <div className="indicator-area">
        <span className="indicator"></span>
      </div>
      <span className={theme === "light" ? "active" : "inactive"}>
        <SunIcon />
      </span>
    </div>
  );
};

export default ThemeToggler;
