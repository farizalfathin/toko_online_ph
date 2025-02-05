import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ContantctPage from "./page/ContantctPage";
import Landing from "./page/AboutPage";
import Detail from "./page/Detail";
import { useAuth } from "./utils/store/useAuth";
import AuthRouter from "./auth/AuthRouter";
import AuthUser from "./auth/AuthUser";
import Keranjang from "./components/Keranjang";
import { useCart } from "./utils/store/useCart";
import ProductPage from "./page/ProductPage";
import Profile from "./page/ProfilePage";

const App = () => {
  const { fetchUser } = useAuth();
  const { fetchcart } = useCart();

  useEffect(() => {
    fetchUser();
    fetchcart();
  }, [fetchUser, fetchcart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContantctPage />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route element={<AuthUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/keranjang" element={<Keranjang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
