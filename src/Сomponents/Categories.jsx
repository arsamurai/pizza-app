import React from "react";

// class Categories extends React.Component {
//   state = {
//     itemChoosed: null,
//   };

//   onSelectItem = (index) => {
//     this.setState({
//       itemChoosed: index,
//     });
//   };

//   render() {
//     const { items } = this.props;
//     return (
//       <div className="categories">
//         <ul>
//           <li
//             className={this.state.itemChoosed === null && "active"}
//             onClick={() => this.onSelectItem(null)} >
//             Все
//             </li>
//           {items.map((name, index) => (
//             <li
//               className={this.state.itemChoosed === index && "active"}
//               onClick={() => this.onSelectItem(index)}
//               key={`${name}_${index}`}
//             >
//               {name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

const Categories = React.memo(function Categories({
  activeItem,
  onClickItem,
  items,
  onChangeCategory,
}) {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeItem === null && "active"}
          onClick={() => onChangeCategory(null)}
        >
          Все
        </li>
        {items.map((name, index) => (
          <li
            className={activeItem === index && "active"}
            onClick={() => onChangeCategory(index)}
            key={`${name}_${index}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
