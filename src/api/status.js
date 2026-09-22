import { fetchRequest } from "./utils/request";

const API = "http://localhost:8080";

// Mirrors StatusEnum on the backend: GREAT, OK, BAD.
export const STATUSES = {
  GREAT: "GREAT",
  OK: "OK",
  BAD: "BAD",
};

const authHeaders = () => {
  const stored = localStorage.getItem("token");
  const token = stored ? JSON.parse(stored).accessToken : null;
  return token
    ? { "Content-Type": "application/json", Authorization: "Bearer " + token }
    : { "Content-Type": "application/json" };
};

// PATCH /api/statuses/v1?status=GREAT|OK|BAD
// Recording a status is what tells the group: the backend sends the notification.
export const updateStatus = (status) =>
  fetchRequest({
    url: `${API}/api/statuses/v1`,
    params: { status },
    method: "PATCH",
    body: null,
    headers: authHeaders(),
    toastifyError: true,
    throwError: true,
  });

// GET /api/users/v1/info
export const getMyInfo = () =>
  fetch(`${API}/api/users/v1/info`, { headers: authHeaders() }).then((r) =>
    r.ok ? r.json() : null
  );
