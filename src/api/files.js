import {checkError} from "./utils/errors";
import {request} from "./utils/request";

export const download = async (file, name) => {
    const uri = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = uri;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
};

export const reportExport = (reportType, reportFormat) => {
    return async () => {
        try {
            const file = await request({
                url: `/api/reports/v1/export`,
                responseType: 'blob',
                method: 'post',
                body: {
                    "reportType": reportType,
                    "reportFormat": reportFormat
                }
            });

            await download(file, reportType + '.' + reportFormat.toLowerCase());
        } catch (err) {
            checkError(err);
        }
    };
};