import Styles from "./product_card.module.css";

export default function ProductCard() {
  return (
    <div className={Styles.productCard}>
      <p className={Styles.title}>Product name</p>
    </div>
  );
}
