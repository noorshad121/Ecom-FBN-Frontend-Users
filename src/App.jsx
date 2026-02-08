import React, { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Loader from "./components/Loader.jsx";

import { ShopContext } from "./context/ShopContext.jsx";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Collection = lazy(() => import("./pages/Collection.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

const App = () => {
  const { token } = useContext(ShopContext);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <SearchBar />

      {/* Lazy loading starts here */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={token ? <Cart /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;