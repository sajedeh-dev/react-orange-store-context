import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const [state] = useCart();
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">OrangeStore🍊</Link>
        <Link to="/checkout">
          <div>
            <HiOutlineShoppingCart />
          {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>Developed by SajedehTaheri</footer>
    </>
  );
}

export default Layout;
