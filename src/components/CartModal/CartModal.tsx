import { useContext } from "react";
import ItemRow from "../ItemRow/ItemRow";
import FeeInformation from "../FeeInformation/FeeInformation";
import fixPrice from "../../fixPrice";
import {
  FeaturedProductContext,
  FeaturedProductObject,
  findFeaturedProduct,
} from "../App";
import "./cart-modal.sass";
import ButtonLink from "../ButtonLink/ButtonLink";
import ButtonRemoveAll from "../ButtonRemoveAll/ButtonRemoveAll";

export interface ItemInCart {
  quantity: number;
  product: FeaturedProductObject;
}

// // These slugs will be passed in as props eventually

const selectedProductSlugs = [
  "xx99-mark-two-headphones",
  "xx59-headphones",
  "yx1-earphones",
  "zx9-speaker",
  "zx7-speaker",
  "xx99-mark-one-headphones",
];

interface Props {
  modalIsActive: number;
  handleCartClick: () => void;
}

const CartModal = ({ modalIsActive, handleCartClick }: Props): JSX.Element => {
  let cartModalClasses = "cart-modal col";

  if (modalIsActive === 0 || modalIsActive === 1) {
    cartModalClasses += " hide";
  }
  const allProducts = useContext(FeaturedProductContext);
  const findSelectedProducts = (productSlugs: string[]) => {
    const selectedProducts: FeaturedProductObject[] = [];
    productSlugs.forEach((productSlug: string) => {
      //@ts-ignore
      selectedProducts.push(findFeaturedProduct(allProducts, productSlug));
    });
    return selectedProducts;
  };

  const [
    selectedProductOne,
    selectedProductTwo,
    selectedProductThree,
  ]: FeaturedProductObject[] = findSelectedProducts(selectedProductSlugs);
  const itemsInCart = [
    {
      quantity: 1,
      product: selectedProductOne,
    },
    {
      quantity: 2,
      product: selectedProductTwo,
    },
    {
      quantity: 1,
      product: selectedProductThree,
    },
  ];

  const calculateSubtotal = (items: ItemInCart[]) => {
    return items.reduce((total, currentItem) => {
      return (total += currentItem.product.price * currentItem.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal(itemsInCart);
  return (
    <section id="cart-modal" className={cartModalClasses}>
      <div className="row cart-top-row">
        <h6 className="black-text">Cart (3)</h6>
        <ButtonRemoveAll />
      </div>
      <div className="items-in-cart col">
        {itemsInCart.map((itemInCart) => {
          return (
            <ItemRow
              withSpecifyQuantity
              key={itemInCart.product.id}
              itemData={itemInCart}
            />
          );
        })}
      </div>
      <FeeInformation feeName="Total" amountAsString={fixPrice(subtotal)} />
      <ButtonLink
        className="button-checkout button-dark-orange"
        buttonText="checkout"
        buttonDestination="/checkout"
        onClick={handleCartClick}
      />
    </section>
  );
};

export default CartModal;