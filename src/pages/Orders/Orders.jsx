import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { userRequest } from "../../../requestMethods";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userRequest("/orders");
        setOrders(response.data);
      } catch (err) {
        res.status(500).json(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="productList">
      <h1>Order Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.products.map((product, index) => (
              <tr key={order._id + index}>
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order._id}</td>
                )}
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.userId}</td>
                )}
                <td>{product._id}</td>
                <td>{product.quantity}</td>
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.amount}</td>
                )}
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.status}</td>
                )}
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.createdAt}</td>
                )}
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.updatedAt}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
