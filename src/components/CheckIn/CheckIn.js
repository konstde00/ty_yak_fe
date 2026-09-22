import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar/NavBar";
import { STATUSES, updateStatus } from "../../api/status";
import "./CheckIn.css";

export const LAST_ANSWER_KEY = "ty_last_answer";

export const ANSWERS = [
  {
    status: STATUSES.GREAT,
    label: "I'm fine",
    hint: "Safe, nothing needed",
    className: "ty-answer-great",
    tone: "great",
  },
  {
    status: STATUSES.OK,
    label: "Okay for now",
    hint: "Safe, but keep in touch",
    className: "ty-answer-ok",
    tone: "ok",
  },
  {
    status: STATUSES.BAD,
    label: "I need help",
    hint: "Ask the circle to reach me",
    className: "ty-answer-bad",
    tone: "bad",
  },
];

export const readLastAnswer = () => {
  try {
    const raw = localStorage.getItem(LAST_ANSWER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function CheckIn() {
  const [sending, setSending] = useState(null);
  const [sent, setSent] = useState(readLastAnswer());
  const [error, setError] = useState(null);
  const [changing, setChanging] = useState(false);

  const answer = async (status) => {
    setSending(status);
    setError(null);
    try {
      await updateStatus(status);
      const record = { status, at: new Date().toISOString() };
      localStorage.setItem(LAST_ANSWER_KEY, JSON.stringify(record));
      setSent(record);
      setChanging(false);
    } catch (e) {
      setError("Your answer was not sent. Check the connection and try again.");
    } finally {
      setSending(null);
    }
  };

  const current = sent && ANSWERS.find((a) => a.status === sent.status);
  const showButtons = !sent || changing;

  return (
    <>
      <NavBar />
      <main className="ty-checkin">
        <div className="ty-checkin-card">
          <ToastContainer />
          {showButtons ? (
            <>
              <h1>How are you?</h1>
              <p className="ty-lead">
                One tap. Everyone in your circle is told the moment you answer.
              </p>
              <div className="ty-answers" role="group" aria-label="Your answer">
                {ANSWERS.map((a) => (
                  <button
                    key={a.status}
                    type="button"
                    className={`ty-answer ${a.className}`}
                    disabled={sending !== null}
                    onClick={() => answer(a.status)}
                  >
                    <strong>{sending === a.status ? "Sending..." : a.label}</strong>
                    <span>{a.hint}</span>
                  </button>
                ))}
              </div>
              {error && <div className="ty-inline-error">{error}</div>}
            </>
          ) : (
            <div className="ty-sent">
              <div className={`ty-sent-badge ty-${current.tone}`}>
                <span className={`ty-dot ty-dot-${current.tone}`} />
                {current.label}
              </div>
              <h2>Your circle has been told</h2>
              <p>Answered at {formatTime(sent.at)}. Answer again whenever things change.</p>
              <button
                type="button"
                className="ty-btn-secondary"
                onClick={() => setChanging(true)}
              >
                Change my answer
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
