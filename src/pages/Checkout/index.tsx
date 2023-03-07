import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { coffees } from '../../data/coffee-list.json';

export function Checkout() {
  const { cart } = useContext(CartContext);

  const filteredCoffees = coffees.filter((coffee) =>
    cart.some((item) => item.id === coffee.id)
  );

  return (
    <>
      <h1>Checkout</h1>
      <div>
        {filteredCoffees.map((coffee) => {
          const item = cart.find((item) => item.id === coffee.id);
          return (
            <div key={coffee.id}>
              <img src={coffee.image} alt={coffee.image} />
              <h3>{coffee.name}</h3>
              <span>{item?.count}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
