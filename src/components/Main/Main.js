import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TabBar from "../Shell/TabBar";
import { updateStatus } from "../../api/status";
import { STATES, readLastAnswer, writeLastAnswer } from "./states";
import "./Main.css";

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

export default function Main() {
  const { t } = useTranslation();
  const last = readLastAnswer();
  const found = STATES.findIndex((s) => s.key === (last && last.status));

  const [index, setIndex] = useState(found === -1 ? 1 : found);
  const [composing, setComposing] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(last);
  const trackRef = useRef(null);

  const state = STATES[index] || STATES[1];

  // Keep the active dot in step with the slide the user scrolled to.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    if (!slide) return;
    const step = slide.offsetWidth + 24;
    const i = Math.round(el.scrollLeft / step);
    if (i !== index && i >= 0 && i < STATES.length) setIndex(i);
  };

  const scrollTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const step = slide ? slide.offsetWidth + 24 : 324;
    el.scrollTo({ left: i * step, behavior: "smooth" });
    setIndex(i);
  };

  useEffect(() => {
    // Open on the last answer, or on "I'm okay" for a first visit.
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const step = slide ? slide.offsetWidth + 24 : 324;
    el.scrollLeft = index * step;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async () => {
    setSending(true);
    setError(null);
    try {
      await updateStatus(composing.key);
      const record = { status: composing.key, at: new Date().toISOString(), message: message.trim() };
      writeLastAnswer(record);
      setSent(record);
      setComposing(null);
      setMessage("");
    } catch (e) {
      setError(t("main.sendFailed"));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <main className={`ty-main ty-state-${state.tone}`}>
        <header className="ty-main-head">
          <h1>{t("main.title")}</h1>
          <p>{t("main.subtitle")}</p>
        </header>

        <div className="ty-carousel" ref={trackRef} onScroll={onScroll}>
          {STATES.map((s, i) => (
            <div className="ty-slide" key={s.key}>
              <button
                type="button"
                className={`ty-orb ty-orb-${s.tone}`}
                onClick={() => (i === index ? setComposing(s) : scrollTo(i))}
                aria-label={t(s.labelKey)}
              >
                {t(s.labelKey)}
              </button>
            </div>
          ))}
        </div>

        <div className="ty-dots" role="tablist" aria-label={t("main.subtitle")}>
          {STATES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t(s.labelKey)}
              className={i === index ? "active" : ""}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>

        {sent && (
          <p className="ty-sent-note">
            {t("main.sentAt", { time: formatTime(sent.at) })}
            {" · "}
            {t(STATES.find((s) => s.key === sent.status).labelKey)}
          </p>
        )}
      </main>

      {composing && (
        <div className={`ty-compose ty-state-${composing.tone}`} role="dialog" aria-modal="true">
          <div className="ty-compose-inner">
            <button
              type="button"
              className="ty-compose-close"
              onClick={() => setComposing(null)}
              aria-label={t("main.close")}
            >
              ×
            </button>
            <header className="ty-compose-head">
              <h1>{t("main.title")}</h1>
              <div className={`ty-orb ty-orb-small ty-orb-${composing.tone}`}>{t(composing.labelKey)}</div>
            </header>
            <div className="ty-sheet">
              <div className="ty-sheet-handle" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("main.messagePlaceholder")}
                rows={4}
              />
              {error && <div className="ty-sheet-error">{error}</div>}
              <button type="button" className="ty-sheet-send" disabled={sending} onClick={send}>
                {sending ? t("main.sending") : t("main.send")}
              </button>
            </div>
          </div>
        </div>
      )}

      <TabBar />
    </>
  );
}
