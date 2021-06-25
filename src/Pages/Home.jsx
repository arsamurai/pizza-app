import React, { useEffect } from "react";
import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingBlock,
} from "../Сomponents";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from "../Redux/filters";
import { fetchPizzas } from "../Redux/pizzas";
import { addPizza } from "../Redux/cart";

const categoryNames = ["Мясо", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
  { name: "цене", type: "price", order: "desc" },
];

const Home = React.memo(function Home() {
  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzas }) => pizzas.pizzas);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onChangeCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [category]
  );

  const onSelectSortBy = React.useCallback(
    (sortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [sortBy]
  );

  const onAddPizzaToCart = (obj) => {
    dispatch(addPizza(obj));
  };

  return (
    <div class="container">
      <div class="content__top">
        <Categories
          activeItem={category}
          onChangeCategory={onChangeCategory}
          items={categoryNames}
        />
        <SortPopup
          activeItem={sortBy.type}
          items={sortItems}
          onSelectSortBy={onSelectSortBy}
        />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">
        {isLoaded
          ? pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                onClickAddPizza={onAddPizzaToCart}
                pizzasCountInCart={
                  cartItems[pizza.id] && cartItems[pizza.id].items.length
                }
                {...pizza}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
});

export default Home;
