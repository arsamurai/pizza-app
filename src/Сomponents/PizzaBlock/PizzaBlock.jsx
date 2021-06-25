import React from "react";
import cn from "classnames";
import Button from "../Button";

function PizzaBlock({
  id,
  name,
  imageUrl,
  types,
  sizes,
  price,
  onClickAddPizza,
  pizzasCountInCart,
}) {
  const pizzaTypes = ["тонкое", "традиционное"];
  const pizzaSizes = [26, 30, 40];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(sizes[0]);

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

  const handleOnAddPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      types: pizzaTypes[activeType],
      sizes: activeSize,
      price,
    };
    onClickAddPizza(obj);
  };

  return (
    <div class="pizza-block">
      <img class="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 class="pizza-block__title">{name}</h4>
      <div class="pizza-block__selector">
        <ul>
          {pizzaTypes.map((type, index) => {
            return (
              <li
                key={type}
                onClick={() => onSelectType(index)}
                className={cn(
                  { active: activeType === index },
                  { disabled: !types.includes(index) }
                )}
              >
                {type}
              </li>
            );
          })}
        </ul>
        <ul>
          {pizzaSizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => onSelectSize(size)}
                className={cn(
                  { active: activeSize === size },
                  { disabled: !sizes.includes(size) }
                )}
              >
                {size}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="pizza-block__bottom">
        <div class="pizza-block__price">от {price} руб. </div>
        <Button onClick={handleOnAddPizza} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {pizzasCountInCart && <i>{pizzasCountInCart}</i>}
        </Button>
      </div>
    </div>
  );
}

export default PizzaBlock;
