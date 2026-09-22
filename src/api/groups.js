import { fetchRequest } from "./utils/request";

const API = "http://localhost:8080";

const authHeaders = () => {
  const stored = localStorage.getItem("token");
  const token = stored ? JSON.parse(stored).accessToken : null;
  return token
    ? { "Content-Type": "application/json", Authorization: "Bearer " + token }
    : { "Content-Type": "application/json" };
};

// PUT /api/groups/v1  body: { id, newName, userToAdd, userToRemove }
// Any field left empty is sent as null and ignored by the backend.
export const updateGroup = ({ id, newName, userToAdd, userToRemove }) =>
  fetchRequest({
    url: `${API}/api/groups/v1`,
    method: "PUT",
    body: {
      id: Number(id),
      newName: newName || null,
      userToAdd: userToAdd ? Number(userToAdd) : null,
      userToRemove: userToRemove ? Number(userToRemove) : null,
    },
    headers: authHeaders(),
    toastifySuccess: true,
    completeMessage: "Group updated",
    toastifyError: true,
    throwError: true,
  });
