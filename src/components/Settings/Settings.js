import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabBar from "../Shell/TabBar";
import { updateGroup } from "../../api/groups";
import "../Following/Following.css";

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", newName: "", userToAdd: "", userToRemove: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    if (!form.id) return;
    setBusy(true);
    try {
      await updateGroup(form);
      setForm({ ...form, newName: "", userToAdd: "", userToRemove: "" });
    } catch (err) {
      // toast already shown by fetchRequest
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <main className="ty-list-page">
        <ToastContainer />
        <header className="ty-list-head">
          <span />
          <h1>{t("settings.title")}</h1>
          <span />
        </header>

        <h2 className="ty-section-title">{t("settings.account")}</h2>
        <Link className="ty-person" to="/charts">
          <div className="ty-person-body"><div className="ty-person-name">{t("settings.reports")}</div></div>
        </Link>
        <Link className="ty-person" to="/files">
          <div className="ty-person-body"><div className="ty-person-name">{t("settings.roster")}</div></div>
        </Link>

        <h2 className="ty-section-title">{t("settings.group")}</h2>
        <form className="ty-add-form" onSubmit={save}>
          <p className="ty-person-conn" style={{ marginBottom: 12 }}>{t("settings.groupHint")}</p>
          <input type="number" name="id" required value={form.id} onChange={onChange} placeholder={t("settings.groupId")} aria-label={t("settings.groupId")} />
          <input type="text" name="newName" value={form.newName} onChange={onChange} placeholder={t("settings.newName")} aria-label={t("settings.newName")} />
          <input type="number" name="userToAdd" value={form.userToAdd} onChange={onChange} placeholder={t("settings.userToAdd")} aria-label={t("settings.userToAdd")} />
          <input type="number" name="userToRemove" value={form.userToRemove} onChange={onChange} placeholder={t("settings.userToRemove")} aria-label={t("settings.userToRemove")} />
          <button type="submit" disabled={busy}>{busy ? t("settings.saving") : t("settings.save")}</button>
        </form>

        <button type="button" className="ty-btn-secondary" style={{ marginTop: 24 }} onClick={logout}>
          {t("settings.logout")}
        </button>
      </main>
      <TabBar />
    </>
  );
}
