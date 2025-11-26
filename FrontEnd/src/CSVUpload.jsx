import React, { useRef, useState } from "react";
import Button from "./components/Button";
import "./csvUpload.css";

export default function CSVUpload() {
  const fileInput = useRef();
  const [message, setMessage] = useState("");

  function handleUpload(e) {
    const file = fileInput.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/csv-upload", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? "Upload successful!" : "Upload failed.");
      });
  }

  return (
    <div className="csv-upload-root">
      <h2>Upload Employees (CSV)</h2>
      <input type="file" ref={fileInput} accept=".csv" />
        <label htmlFor="cr-upload-input" className="cr-upload-btn" style={{ cursor: "pointer" }}>Upload
          <input id="cr-upload-input" type="file" style={{ display: "none" }} onChange={handleFileChange} />
        </label>
      <div className="upload-info">
        CSV columns must match Employee Data columns exactly.
      </div>
      {message && <div style={{ marginTop: 12, color: "var(--success)" }}>{message}</div>}
    </div>
  );
}
