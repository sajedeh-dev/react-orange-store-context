import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helpers";
import { useProducts } from "../context/ProductContext";

import styles from "./ProductsPage.module.css";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

function ProductsPage() {
  const products = useProducts();

  const [displyed, setDisplyed] = useState([]);
  const [search, setSearch] = useState("");
  //برای نگهداشتن فیلترها
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplyed(products);

    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplyed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displyed.length && <Loader />}
          {displyed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
