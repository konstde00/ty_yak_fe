import { toast } from "react-toastify";

export const fetchRequest = async ({
   url, params , body = {}, method = 'GET', headers = {'Content-Type': 'application/json'},
   toastifySuccess = false, toastifyError = false, completeMessage = 'Request completed successfully',
   throwError = false,
}) => {

  if (params !== undefined) {
    url = url + "?" + new URLSearchParams(params)
  }

  if (!body) {
    body = null;
  } else if (!(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  if (method === 'GET') {
    await fetch(url, {
      method: method,
      parameters: params,
      headers: headers
    }).then(res => {
      if(!res.ok) {
        console.log("Error occured")
        return res.text().then(text => { throw new Error(JSON.stringify(text)) })
      }
      else {
        if (toastifySuccess) {
          toast.success(completeMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
        return res.json();
      }
    })
      .catch(err => {
        if (toastifyError) {
          toast.error(JSON.parse(err.message).message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  } else {
    await fetch(url, {
      method: method,
      body: body,
      parameters: params,
      headers: headers
    }).then(res => {
      if(!res.ok) {
        console.log("Error occured")
        return res.text().then(text => { throw new Error(JSON.stringify(text)) })
      }
      else {
        if (toastifySuccess) {
          toast.success(completeMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
        return res.json();
      }
    }).catch(err => {
        if (toastifyError) {
          toast.error(JSON.parse(JSON.parse(err.message)).message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      if (throwError && err.message) {
        throw new Error(err.message);
      }
    });
  }
}