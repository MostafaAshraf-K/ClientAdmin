import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

// import LayOut from "./pages/LayOut";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import ProductList from "./pages/productList/ProductList";
import OrderPage from "./pages/Orders/Orders";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import Home from "./pages/home/Home";
// import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser?.isAdmin);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          user ? (
            <div className="containerr">
              <Sidebar />
            </div>
          ) : (
            ""
          )
        }
      >
        {user ? (
          <>
            <Route index element={<Home />} />
            <Route path="/users" element={<UserList />} />{" "}
            <Route path="/products" element={<ProductList />} />{" "}
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/orders" element={<OrderPage />} />{" "}
            <Route path="/newproduct" element={<NewProduct />} />
          </>
        ) : (
          <Route index element={<Login />} />
        )}
        {/* <Route path="/user/:userId" element={<User />} /> */}
        {/* <Route path="/newUser" element={<NewUser />} />{" "} */}
      </Route>
    )
  );

  return (
    <>
      {user ? <Topbar /> : ""}
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
