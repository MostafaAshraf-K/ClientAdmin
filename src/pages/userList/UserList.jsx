import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import "./userList.css";
import { userRequest } from "../../../requestMethods";
import userImg from "../../assets/149071.png";
import Swal from "sweetalert2";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userRequest("/users?user=new");
        setData(response.data);
      } catch (err) {
        res.status(500).json(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userRequest
          .delete(`/users/${id}`)
          .then(() => {
            setData(data.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete the user.", "error");
          });
      }
    });
  };

  return (
    <div className="userList">
      {" "}
      <h1>Users Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
            <th>Transaction Volume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>
                <div className="userListUser">
                  <img
                    className="userListImg"
                    src={row.avatar || userImg}
                    alt=""
                  />
                  {row.username}
                </div>
              </td>
              <td>{row.email}</td>
              <td>{row.isAdmin ? "Admin" : "User"}</td>
              <td>0 BTC</td>
              <td>
                <Link to={"/user/" + row._id}>
                  <RiEdit2Line className="userListEdit" />
                </Link>
                <RiDeleteBin6Line
                  className="userListDelete"
                  onClick={() => handleDelete(row._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
