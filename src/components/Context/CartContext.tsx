import { PropsWithChildren, createContext, useState } from "react";
import { FeaturedProductObject } from "../App";

export interface ItemToPurchase {
  quantity: number;
  product: FeaturedProductObject;
}

export const CartContext = createContext<ItemToPurchase[]>([]);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [itemsInCart, setItemsInCart] = useState<ItemToPurchase[]>([]);

  const numItemsInCart = () => {
    return itemsInCart.length;
  };

  const addItemToCart = (itemToPurchase: ItemToPurchase) => {
    const isItemInCart = itemsInCart.find((itemInCart) => {
      return itemToPurchase.product.id === itemInCart.product.id; // will find item if it's already in the cart, or else will return undefined
    });
    if (isItemInCart) {
      setItemsInCart(
        itemsInCart.map((itemInCart) => {
          return itemInCart.product.id === itemToPurchase.product.id
            ? {
                ...itemInCart,
                quantity: itemInCart.quantity + itemToPurchase.quantity,
              }
            : itemInCart;
        })
      );
    } else {
      setItemsInCart([...itemsInCart, itemToPurchase]);
    }
  };

  const removeItemFromCart = (itemToRemove: ItemToPurchase) => {
<<<<<<< HEAD
    console.log("all cart items at top of function: ", itemsInCart);
    setItemsInCart(
      itemsInCart.map((itemInCart) => {
        console.log(
          "item in cart: ",
          itemInCart.product,

          "\n item to remove: ",
          itemToRemove.product
        );
=======
    setItemsInCart(
      itemsInCart.map((itemInCart) => {
>>>>>>> 9592b07 (fix bug inside removeItemFromCart function by using -= instead of just - when decrementing quantity property of item object)
        return itemInCart.product.id === itemToRemove.product.id
          ? { ...itemInCart, quantity: (itemInCart.quantity -= 1) }
          : itemInCart;
      })
    );
<<<<<<< HEAD
    console.log("all cart items at bottom of function: ", itemsInCart);
=======
>>>>>>> 9592b07 (fix bug inside removeItemFromCart function by using -= instead of just - when decrementing quantity property of item object)
    setItemsInCart(
      itemsInCart.filter((itemInCart) => {
        return itemInCart.quantity > 0;
      })
    );
  };

  const removeAllItemsFromCart = () => {
    setItemsInCart([]);
  };

  const calculateTotal = () => {
    if (numItemsInCart() === 0) {
      return 0;
    }
    return itemsInCart.reduce((total, currentItem) => {
      return (total += currentItem.product.price * currentItem.quantity);
    }, 50); // 50 for shipping
  };

  return (
    <CartContext.Provider
      value={{
        //@ts-ignore
        itemsInCart,
        numItemsInCart,
        addItemToCart,
        removeItemFromCart,
        removeAllItemsFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
