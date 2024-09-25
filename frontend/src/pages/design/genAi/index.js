
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
// import leftImage from '../../../assets/images/neolocus/room.png'
import defaultImage from "../../../assets/images/logo.jpg";

import axios from "axios";
import "./Main.css";
// import ImageLoader from "./imageContainer";

// import gemini_icon from '../../assets/svg/gemini_icon.png'
const GenAi = () => {

  const [state, setState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [imageURL, setImageURL] = useState(defaultImage);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [startChart, setStartChart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    api_key: "",
    selected_style: "",
    selected_room_color: "",
    selected_room_type: "",
    number_of_room_designs: "",
    additional_instructions: "",
    username: localStorage.getItem("email"),
  });
  const [imgsLoaded, setImgsLoaded] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    if (imageURL !== null) {
      const loadImage = (image) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image;
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(image);
            }, 2000);

          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all([loadImage(imageURL)]) // Wrap the promise in an array
        .then(() => {
          setImgsLoaded(true);
          setLoading(false);
        })
        .catch((err) => console.log("Failed to load images", err));
    }
  }, [imageURL]);

  const handleChange = ({ target: { name, value } }) => {
    let updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
  };

  const handleUpload = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generateImage/",
        data
      );
      if (response) {
        setLoading(false);
        setImageURL(response.data.image);
        return response.data.image;
      }
    } catch (error) {
      console.error("There was an error!", error.response.data.error); // Log detailed error message
      setErrorMessage(error.response.data.error); // Set detailed error message
      setLoading(false);
      throw error;
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setState(true);
    setImageURL("");
    try {
      const imageUrl = await handleUpload();

      const email1 = email;
      const Select_Type = data.selected_room_type;
      const Select_Color = data.selected_room_color;
      const Select_Style = data.selected_style;

      console.log("Email:", email);
      console.log("Image URL:", imageUrl);

      const response = await axios.post("http://127.0.0.1:8000/sendEmail/", {
        email1,
        imageUrl,
        Select_Type,
        Select_Color,
        Select_Style,
      });

      if (response.status === 200) {
        setState(false);
        alert("Email sent successfully!");
      }
    } catch (error) {
      console.error("There was an error sending the email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const data1 = [
    { label: "Select", value: "" },
    { label: "Living Room", value: "Livingroom" },
    { label: "Bed Room", value: "Bedroom" },
  ];

  const data2 = [
    { label: "Select", value: "" },
    { label: "Red", value: "Red" },
    { label: "Brown", value: "Brown" },
    { label: "Green", value: "Green" },
  ];

  const data3 = [
    { label: "Select", value: "" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const styleData = [
    { label: "Select", value: "" },
    { label: "Modern", value: "Modern" },
    { label: "Minimal", value: "Minimal" },
    { label: "Contemporary", value: "Contemporary" },
    { label: "Traditional", value: "Traditional" },
  ];

  const [selData, setSelData] = useState({
    room: "",
    style: "",
    color: "",
    count: "",
  });

  const handleSelectImage = (item, type) => {
    const updata = { ...selData };
    updata[type] = item.text;
    setSelData(updata);
  };

  const [activeStep, setActiveStep] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <Grid display={"flex"}>
      <Grid
        item
        md={5}
        style={{
          borderRight: "1px solid grey",
          width: "450px",
          height: "calc(100vh - 81px)",
        }}
      >
        <form onSubmit={handleUpload} style={{ padding: "12px" }}>
          {/* <h1 style={{ fontSize: '20px', fontWeight: 500 }}>Upload File</h1> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {/* <input type="file" onChange={(e) => handleFileChange(e)} /> */}
            <div style={{ marginTop: "10px" }}>
              <div>
                <lable>API KEY</lable>
                <input
                  style={{ padding: "6px 8px" }}
                  name="api_key"
                  onChange={handleChange}
                  value={data.api_key}
                />
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <lable>Select Type</lable>
                <select
                  id="connection-name"
                  onChange={handleChange}
                  name="selected_room_type"
                  value={data.selected_room_type}
                >
                  {data1.map((option) => (
                    <option
                      key={option.label}
                      style={{
                        padding: "8px",
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        backgroundColor: "#fff",
                        color: "#333",
                      }}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <lable>Select Style</lable>
                <select
                  id="connection-name"
                  onChange={handleChange}
                  name="selected_style"
                  value={data.selected_style}
                >
                  {styleData.map((option) => (
                    <option
                      key={option.label}
                      style={{
                        padding: "8px",
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        backgroundColor: "#fff",
                        color: "#333",
                      }}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <lable>Select Color</lable>
                <select
                  id="connection-name"
                  onChange={handleChange}
                  name="selected_room_color"
                  value={data.selected_room_color}
                >
                  {data2.map((option) => (
                    <option
                      key={option.label}
                      style={{
                        padding: "8px",
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        backgroundColor: "#fff",
                        color: "#333",
                      }}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <lable>Prompt</lable>
                <input
                  style={{ padding: "6px 8px" }}
                  name="additional_instructions"
                  onChange={handleChange}
                  value={data.additional_instructions}
                />
              </div>
              <div>
                <lable>Email</lable>
                <input
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            {state === true ? (
              <button
                type="button"
                className="btn btn-secondary"
                disabled
                // onClick={handleSendEmail}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                Sending...
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSendEmail}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </Grid>
      <Grid
        item
        md={7}
        padding={"10px"}
        sx={{
          width: "100%",
          height: "88vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
        {/* Display detailed error message */}
        {!imageURL ? (
          "Loading..."
        ) : (
          <img src={imageURL} alt="Generated Interior Design" />
        )}
      </Grid>
    </Grid>
  );
};

export default GenAi;
