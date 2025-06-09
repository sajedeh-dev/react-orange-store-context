// import './global.css'
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotfound from "./pages/404";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import Layout from "./layout/Layout";

function App() {
  return (
    
      <CartProvider>
        <ProductProvider>
          <Layout>
          <Routes>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={<PageNotfound />} />
          </Routes>
          </Layout>
        </ProductProvider>
      </CartProvider>
    
  );
}

export default App;
