import { createQueryObject } from "../helpers/helpers";
import { FaListUl } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { categories } from "../constants/list";



function Sidebar({ setQuery, query }) {
  const categoryHandler = (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const category = li.innerText.trim().toLowerCase();
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLowerCase() === query.category
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
