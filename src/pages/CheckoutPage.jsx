import BasketCard from "../components/BasketCard";
import BasketSidbar from "../components/BasketSidbar";
import { useCart } from "../context/CartContext";
import styles from './Checkout.module.css'
import image from "../assets/emptycard.png"


function CheckoutPage() {
  const [state, dispatch] = useCart();

  const clickHandler = (type, payload) => {
    dispatch({ type, payload });
  };
  if (!state.itemsCounter) {
    return (
      <div className={styles.emptycart}>
        <p>select your products</p>
        <img src={image} alt="emptycart" />
      </div>
    );
  }
  return (
    <div className={styles.cotainer}>
      <BasketSidbar state={state} clickHandler={clickHandler}/>
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
