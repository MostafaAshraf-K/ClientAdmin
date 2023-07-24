import { useState } from "react";
import { storage, database } from "../../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as ref2 } from "firebase/database";
import { BiImageAdd } from "react-icons/bi";
import "./newProduct.css";
import { userRequest } from "../../../requestMethods.js";

export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState("");
  const [smallImages, setSmallImages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file ? file.name : null);
    setImage(file ? file : null);
  };

  const handleSmallImageChange = (event, index) => {
    const file = event.target.files[0];
    const updatedSmallImages = [...smallImages];
    updatedSmallImages[index] = file;
    setSmallImages(updatedSmallImages.slice(0, 4)); // Limit to 4 small images
  };

  const handleAddSmallImage = () => {
    if (smallImages.length < 4) {
      setSmallImages([...smallImages, null]);
    }
  };

  const handleRemoveSmallImage = (index) => {
    const updatedSmallImages = [...smallImages];
    updatedSmallImages.splice(index, 1);
    setSmallImages(updatedSmallImages);
  };

const handleUpload = async () => {
  if (!image) {
    console.log("Please select a main image.");
    return;
  }

  if (!title || !desc) {
    console.log("Please provide a title and description.");
    return;
  }

  if (smallImages.filter(Boolean).length === 0) {
    console.log("Please provide at least one small image.");
    return;
  }

  try {
    const storageRef = ref(storage, "product-images/" + image.name);
    await uploadBytes(storageRef, image);
    const mainImageUrl = await getDownloadURL(storageRef);

    const smallImagePromises = smallImages.map(async (smallImage, index) => {
      if (smallImage) {
        const smallImageStorageRef = ref(
          storage,
          "product-images/small_" + index + "_" + smallImage.name
        );
        await uploadBytes(smallImageStorageRef, smallImage);
        return getDownloadURL(smallImageStorageRef);
      }
      return null;
    });

    const smallImageUrls = await Promise.all(smallImagePromises);

    const productData = {
      title,
      desc,
      img: mainImageUrl,
      smallImages: smallImageUrls.map((url) => ({ url })),
      categories: categories.split(","),
      size: sizes.split(","),
      color: color.split(","),
      price: parseInt(price),
    };

    const response = await userRequest.post("/products", productData);
    console.log("Product successfully created:", response.data);
    console.log(response.data);
    console.log(productData);

    // Reset the form
    setImage(null);
    setSelectedFile(null);
    setTitle("");
    setDesc("");
    setPrice("");
    setColor([]);
    setSizes([]);
    setCategories("");
    setSmallImages([]);
  } catch (error) {
    console.error(error);
    // Handle error here
  }
};


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Main Image</label>
          <div
            className="image-upload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label htmlFor="main-image-upload" className="image-upload-label">
              <BiImageAdd className="image-upload-icon" size={30} />
              <span className="image-upload-text">
                {selectedFile ? selectedFile : "Drag image or choose file"}
              </span>
            </label>
            <input
              type="file"
              id="main-image-upload"
              onChange={handleFileChange}
              className="image-chose"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            placeholder="Product Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="text"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Color (comma-separated)</label>
          <input
            type="text"
            placeholder="Product Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Size (comma-separated)</label>
          <input
            type="text"
            placeholder="Product Size"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories (comma-separated)</label>
          <input
            type="text"
            placeholder="Product Categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Small Images</label>
          {smallImages.map((smallImage, index) => (
            <div key={index} className="small-image-input-container">
              <input
                type="file"
                className="small-image-input"
                id={`small-image-upload-${index}`} // Unique ID for each input
                onChange={(e) => handleSmallImageChange(e, index)}
              />
              <label
                htmlFor={`small-image-upload-${index}`}
                className="small-image-upload-label"
              >
                <BiImageAdd className="small-image-upload-icon" size={20} />
                <span className="small-image-upload-text">
                  {smallImage ? smallImage.name : "Add Small Image"}
                </span>
              </label>
              <button
                type="button"
                className="remove-small-image-button"
                onClick={() => handleRemoveSmallImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {smallImages.length < 4 && (
            <button
              type="button"
              className="add-small-image-button"
              onClick={handleAddSmallImage}
            >
              Add Small Image
            </button>
          )}
        </div>
        <button
          className="addProductButton"
          type="button"
          onClick={handleUpload}
        >
          Create
        </button>
      </form>
    </div>
  );
}
