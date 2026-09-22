// The three answers, in carousel order. Keys mirror StatusEnum on the backend.
export const STATES = [
  { key: "GREAT", labelKey: "main.great", tone: "great" },
  { key: "OK", labelKey: "main.ok", tone: "ok" },
  { key: "BAD", labelKey: "main.bad", tone: "bad" },
];

export const LAST_ANSWER_KEY = "ty_last_answer";

export const readLastAnswer = () => {
  try {
    const raw = localStorage.getItem(LAST_ANSWER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const writeLastAnswer = (record) =>
  localStorage.setItem(LAST_ANSWER_KEY, JSON.stringify(record));
