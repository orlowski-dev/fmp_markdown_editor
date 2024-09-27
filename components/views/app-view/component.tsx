"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import "./styles.css";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useState } from "react";

const AppView = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebarCallback = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  return (
    <div className={`app-view ${isSidebarVisible ? "sv" : "si"} `}>
      <Sidebar />
      <div className="content">
        <AppHeader
          onToggle={toggleSidebarCallback}
          isSidebarVisible={isSidebarVisible}
        />
      </div>
    </div>
  );
};

export default AppView;
