import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = ({ email }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.post("http://127.0.0.1:8000/getImages/", { email });
                setImages(response.data.images);
            } catch (error) {
                setError("Failed to fetch images");
            }
        };

        fetchImages();
    }, [email]);

    if (error) {
        return <div style={{marginTop:"15px"}}>{error}</div>;
    }

    return (
        <div style={{marginTop:"15px"}}>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`img ${index + 1}`} />
            ))}
        </div>
    );
};

export default ImageGallery;
