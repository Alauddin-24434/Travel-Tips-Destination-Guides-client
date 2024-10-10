
import RightSideBar from "@/components/UI/Shared/RightSideBar";
import React from "react";
import "./Layout.css"
import LeftSidebar from "@/components/UI/Shared/LeftSidebar";
import Navbar from "@/components/UI/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
    <div className="layout-content">
      <header className="navbar">
  <Navbar/>
      </header>
      <aside className="sidebar-left">
      <LeftSidebar/>
      </aside>
      <aside className="sidebar-right">
      <RightSideBar/>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
  );
}
