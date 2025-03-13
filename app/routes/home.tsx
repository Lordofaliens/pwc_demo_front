import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import React, { useState, useRef, ChangeEvent } from "react";

import { handleSubmit } from "../controller"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PwC Price Volume analysis" },
    { name: "description", content: "Our prototype for PwC Price volumen analysis" },
  ];
}


export function UserSpecificationUpload() {
  const [selectedOption, setSelectedOption] = useState<string>("Per Person");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleCancel = () => {
    setUploadedFile(null); // Clear the state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Explicitly reset the input's value
    }
  };

  const onSubmitClick = () => {
    handleSubmit({ uploadedFile, selectedOption });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#000",
          marginBottom: "20px",
        }}
      >
        User Specification Upload
      </h2>
      <div
        style={{
          padding: "15px",
          border: "1px solid #aaa",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="radio"
              value="Per Person"
              checked={selectedOption === "Per Person"}
              onChange={handleOptionChange}
            />
            <span style={{ marginLeft: "8px", color: "#333" }}>
              Per Person
            </span>
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              value="Per Customer"
              checked={selectedOption === "Per Customer"}
              onChange={handleOptionChange}
            />
            <span style={{ marginLeft: "8px", color: "#333" }}>
              Per Customer
            </span>
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            ref={fileInputRef} // Attach the ref here
            type="file"
            onChange={handleFileUpload}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #aaa",
              borderRadius: "4px",
            }}
          />
        </div>
        {uploadedFile && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#e9f5ff",
              border: "1px solid #007bff",
              borderRadius: "4px",
              color: "#333",
            }}
          >
            <strong>File Selected:</strong> {uploadedFile.name}
            <button
              onClick={handleCancel}
              style={{
                marginLeft: "15px",
                padding: "5px 10px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            onClick={onSubmitClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit Selection
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  return <html>
    <div>
      <Welcome />
    </div>
    <div>
      <UserSpecificationUpload />
    </div>
  </html>
}
