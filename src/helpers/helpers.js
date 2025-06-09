//شامل فانکشن هایی که ممکن است هرجایی از برنامه بصورت مکرر از انها استفاده شود
const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join("");
};
const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products, category) => {
  if (!category || category === "all") return products;

  return products.filter((p) => (p.category || "").toLowerCase() === category);
};
const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumProducts = (products) => {
  const itemsCounter = products.reduce((counter, product) => counter + product.quantity , 0);
  const total = products.reduce ((counter,product) => counter + product.price * product.quantity , 0).toFixed(2);

  return {itemsCounter  ,  total}
};

const productQuantity = (state, id) => {
  if (!state || !Array.isArray(state.selectedItems)) return 0;
  const index = state.selectedItems.findIndex(item => item?.id === id);
  if (index === -1) return 0;
  return state.selectedItems[index].quantity;
}


export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};
