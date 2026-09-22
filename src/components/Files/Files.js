import { reportExport } from "../../api/files";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { fetchRequest } from "../../api/utils/request";
import useToken from "../App/useToken";
import NavBar from "../NavBar/NavBar";

export default function Files() {

  const { token } = useToken();
  const { register, handleSubmit } = useForm();

  const uploadFile = async e => {

    const formData = new FormData();
    formData.append("file", e.file[0]);

    await fetchRequest({
      url: "http://localhost:8080/api/users/v1/upload",
      body: formData,
      method: "POST",
      completeMessage: "Upload completed successfully",
      toastifyError: true})
  };

  return(
    <>
      <NavBar/>
      <main className="ty-page">
        <h1>Reports and roster</h1>
        <p className="ty-lead">Export the activity report, or enrol a roster from a Word or Excel file.</p>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "XLSX", token)}>
          Report export xslx
        </button>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "DOCX", token)}>
          Report export docx
        </button>
        <form onSubmit={handleSubmit(uploadFile)}>
          <input type="file" {...register("file")} />
          <input type="submit" />
          <ToastContainer />
        </form>
      </main>
    </>
  );
}