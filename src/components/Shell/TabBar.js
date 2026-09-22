import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./TabBar.css";

const Home = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M3.5 11.5 12 4l8.5 7.5V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z" />
  </svg>
);

const Person = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5z" strokeLinejoin="round" />
  </svg>
);

const Gear = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8l1.6 2.6 3-.6.9 2.9 2.9.9-.6 3 2.6 1.6-2.6 1.6.6 3-2.9.9-.9 2.9-3-.6L12 21.2l-1.6-2.6-3 .6-.9-2.9-2.9-.9.6-3L1.6 12l2.6-1.6-.6-3 2.9-.9.9-2.9 3 .6z" />
  </svg>
);

export default function TabBar() {
  const { t } = useTranslation();
  return (
    <nav className="ty-tabbar" aria-label={t("app.title")}>
      <NavLink to="/" end aria-label={t("tabs.home")}>
        {({ isActive }) => <Home filled={isActive} />}
      </NavLink>
      <NavLink to="/following" aria-label={t("tabs.people")}>
        {({ isActive }) => <Person filled={isActive} />}
      </NavLink>
      <NavLink to="/settings" aria-label={t("tabs.settings")}>
        <Gear />
      </NavLink>
    </nav>
  );
}
