import ProductCard from "./components/product_card/product_card";
import Styles from "./App.module.css";

function App() {
  return (
    <section className={Styles.main}>
      <article className={Styles.productList}>
        {[0, 1, 2, 3].map(() => (
          <ProductCard />
        ))}
      </article>
    </section>
  );
}

export default App;
