import React from 'react';
import {reportExport} from "../../api/files";

export default function Home() {
    return(
        <div>
            <h2>Home</h2>
            <button onClick={reportExport('MOST_ACTIVE_USERS', 'XLSX')}>
                Report export xslx
            </button>
            <button onClick={reportExport('MOST_ACTIVE_USERS', 'DOCX')}>
                Report export docx
            </button>
        </div>
    );
}