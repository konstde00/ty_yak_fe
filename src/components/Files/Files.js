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
      <div>
        <h1 style={{marginTop: "100px"}}>
          Page for operation with files
        </h1>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "XLSX", token)}>
          Report export xslx
        </button>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "DOCX", token)}>
          Report export docx
        </button>
        <div>
          <h2 />
          <h2 />
        </div>
        <form onSubmit={handleSubmit(uploadFile)}>
          <input type="file" {...register("file")} />
          <input type="submit" />
          <ToastContainer />
        </form>
        <div>
          <h2 />
          <h2 />
        </div>
      </div>
    </>
  );
}