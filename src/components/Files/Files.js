import { reportExport } from "../../api/files";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { fetchRequest } from "../../api/utils/request";
import useToken from "../App/useToken";
import TabBar from "../Shell/TabBar";

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
      
      <main className="ty-list-page">
        <h1 className="ty-list-head-title">Звіти та список</h1>
        <p className="ty-person-conn" style={{marginBottom: 16}}>Експортуйте звіт про активність або імпортуйте список із Word чи Excel.</p>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "XLSX", token)}>
          Експорт .xlsx
        </button>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "DOCX", token)}>
          Експорт .docx
        </button>
        <form onSubmit={handleSubmit(uploadFile)}>
          <input type="file" {...register("file")} />
          <input type="submit" />
          <ToastContainer />
        </form>
      </main>
      <TabBar />
    </>
  );
}