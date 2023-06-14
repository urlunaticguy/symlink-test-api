"use client";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGoogle, setIsGoogle] = useState();
  const [image, setImage] = useState(null);
  const [id, setID] = useState("");
  const [addACardAPIResult, setAddACardAPIResult] = useState("");

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleIsGoogleChange = (event) => {
    setIsGoogle(Number(event.target.value));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleResetAddACard = () => {
    setAddACardAPIResult("");
    setDescription("");
    setID("");
    setImage(null);
    setIsGoogle();
    setTitle("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const url = "https://ajiji-api.iosx.in/api/v1/card/add";
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFqaWppLmNvbSIsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJBamlqaSIsInJvbGVzIjp7Il9pZCI6IjY0NmI2YjEzNDMzMjNkNGM0ODBmMjZjNyIsImNvZGUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiJ9LCJjdXJyZW50RGF5IjoiIiwiaWF0IjoxNjg2NzM2ODg5LCJleHAiOjE2ODczNDE2ODl9.Fn8feqDEGZM4LijayvVEquS9YexoPG7AGAg0onao1mc",
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isgoogle", isGoogle);
    formData.append("image", image);
    formData.append("challenges[0]", id);

    axios
      .post(url, formData, { headers })
      .then((response) => {
        console.log("API call successful");
        console.log(response.data);
        if (response.data.message === "Card successfully Added.") {
          setAddACardAPIResult("Status - Card Added ✅");
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };

  return (
    <main className={styles.main}>
      Hello World
      <div>
        Add a card API
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 20,
          }}
        >
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          ></input>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          ></input>
          <label>IsGoogle</label>
          <input
            type="number"
            name="isgoogle"
            value={isGoogle}
            onChange={handleIsGoogleChange}
          ></input>
          <label>File</label>
          <input type="file" name="image" onChange={handleImageChange}></input>
          <label>Challenge ID</label>
          <input placeholder="challenge" value={id} onChange={handleIDChange} />
          <button type="submit">Submit</button>
          {addACardAPIResult !== "" && <div>{addACardAPIResult}</div>}
          {addACardAPIResult === "" && <div>Status - No Result</div>}
        </form>
        <button
          style={{ width: 80, marginTop: 10 }}
          onClick={handleResetAddACard}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
