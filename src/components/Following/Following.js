import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TabBar from "../Shell/TabBar";
import { readLastAnswer } from "../Main/states";
import "./Following.css";

const CONTACTS_KEY = "ty_contacts";

const readContacts = () => {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export default function Following() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState(readContacts());
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState({ name: "", userId: "" });
  const [showAdd, setShowAdd] = useState(false);

  const me = readLastAnswer();

  const persist = (next) => {
    setContacts(next);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(next));
  };

  const add = (e) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    persist([
      ...contacts,
      { id: Date.now(), name: draft.name.trim(), userId: draft.userId ? Number(draft.userId) : null },
    ]);
    setDraft({ name: "", userId: "" });
    setShowAdd(false);
  };

  const remove = (id) => persist(contacts.filter((c) => c.id !== id));

  const visible = contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <main className="ty-list-page">
        <header className="ty-list-head">
          <button type="button" className="ty-icon-btn" onClick={() => setShowAdd((v) => !v)} aria-label={t("following.add")}>
            +
          </button>
          <h1>{t("following.title")}</h1>
          <button type="button" className="ty-text-btn" onClick={() => setEditing((v) => !v)}>
            {editing ? t("following.done") : t("following.edit")}
          </button>
        </header>

        <div className="ty-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("following.search")}
            aria-label={t("following.search")}
          />
        </div>

        <div className="ty-person">
          <div className="ty-avatar">{t("following.you")[0]}</div>
          <div className="ty-person-body">
            <div className="ty-person-name">{t("following.you")}</div>
            <div className={`ty-person-status ${me ? "ty-" + me.status.toLowerCase() : ""}`}>
              {me ? t(`following.yourStatus.${me.status}`) : t("following.noAnswer")}
            </div>
            <div className="ty-person-conn">{t("following.connection")}</div>
          </div>
        </div>

        {visible.length === 0 && contacts.length === 0 && (
          <p className="ty-empty">{t("following.empty")}</p>
        )}

        {visible.map((c) => (
          <div className="ty-person" key={c.id}>
            <div className="ty-avatar">{initials(c.name)}</div>
            <div className="ty-person-body">
              <div className="ty-person-name">{c.name}</div>
              <div className="ty-person-status">{t("following.awaiting")}</div>
              <div className="ty-person-conn">{t("following.connection")}</div>
            </div>
            {editing && (
              <button type="button" className="ty-round-remove" onClick={() => remove(c.id)} aria-label={t("following.remove")}>
                −
              </button>
            )}
          </div>
        ))}

        <h2 className="ty-section-title">{t("following.addSection")}</h2>
        {showAdd || contacts.length === 0 ? (
          <form className="ty-add-form" onSubmit={add}>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder={t("following.addName")}
              aria-label={t("following.addName")}
              required
            />
            <input
              type="number"
              value={draft.userId}
              onChange={(e) => setDraft({ ...draft, userId: e.target.value })}
              placeholder={t("following.addUserId")}
              aria-label={t("following.addUserId")}
            />
            <button type="submit">{t("following.add")}</button>
          </form>
        ) : (
          <div className="ty-person">
            <div className="ty-avatar">+</div>
            <div className="ty-person-body">
              <div className="ty-person-name">{t("following.addName")}</div>
              <div className="ty-person-conn">{t("following.addSection")}</div>
            </div>
            <button type="button" className="ty-round-add" onClick={() => setShowAdd(true)} aria-label={t("following.add")}>
              +
            </button>
          </div>
        )}
      </main>
      <TabBar />
    </>
  );
}
