import { Table, Button, Image } from "react-bootstrap";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getProducts } from "../../redux/apiCalls";
import "./productList.css";
import { deleteProduct, getProducts } from "../../redux/apiCalls.js";
import Swal from "sweetalert2";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id, dispatch)
          .then(() => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            getProducts(dispatch);
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete the product.", "error");
            res.status(500).json(error);
          });
      }
    });
  };

  return (
    <div className="productList">
      {" "}
      <h1>Products Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <div className="productListItem">
                  <Image className="productListImg" src={product.img} alt="" />
                  {product.title}
                </div>
              </td>
              <td>{product.inStock}</td>
              <td>{product.price}</td>
              <td>
                <Link to={"/product/" + product._id}>
                  <Button className="productListEdit">Edit</Button>
                </Link>
                <RiDeleteBin6Line
                  className="productListDelete"
                  onClick={() => handleDelete(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
