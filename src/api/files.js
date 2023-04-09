import { toast } from "react-toastify";

export const download = async (file, name) => {
    const downloadURL = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = name;
    link.click();
};

export const reportExport = (reportType, reportFormat, token) => {

  var url = `http://localhost:8080/api/reports/v1/export?` + new URLSearchParams({
    "reportType": reportType,
    "reportFormat": reportFormat
  });

  return async () => {
    const file = await fetch(url, {
      method: "GET",
      headers: {
        accept: 'application/json',
        "Authorization": "Bearer " + token,
      }
    }).then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(JSON.stringify(text));
        });
      } else {
        return res.blob();
      }
    }).catch(err => {
        toast.error(JSON.parse(err.message).message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });

    console.log("file = " + file)

    await download(file, reportType.toLowerCase() + "." + reportFormat.toLowerCase());
  };
};