import { Link, useLocation } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import { RiUploadLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../requestMethods";
import Chart from "../../chart/Chart";
import './product.css'
export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInStock, setProductInStock] = useState(true);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        res.status(500).json(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  console.log(pStats);

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    const updatedProductData = {
      title: productName || product.title,
      desc: productDesc || product.desc,
      price: productPrice || product.price,
      inStock: productInStock,
    };

    try {
      const response = await userRequest.put(
        `/products/${productId}`,
        updatedProductData
      );
      console.log("Product updated successfully:", response.data);

      // Reset form fields
      setProductName("");
      setProductDesc("");
      setProductPrice("");
      setProductInStock(true);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <Button className="productAddButton">Create</Button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <Image src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <Form className="productForm" onSubmit={handleProductUpdate}>
          <div className="productFormLeft">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={product.title}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder={product.desc}
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder={product.price}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <Form.Label>In Stock</Form.Label>
            <Form.Select
              name="inStock"
              id="idStock"
              value={productInStock}
              onChange={(e) => setProductInStock(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <Image src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <RiUploadLine />
              </label>
              <Form.Control type="file" id="file" style={{ display: "none" }} />
            </div>
            <Button className="productButton" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
