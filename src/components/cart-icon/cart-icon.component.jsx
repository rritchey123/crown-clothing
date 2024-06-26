import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen, selectCartCount } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import {
  ShoppingIcon,
  CartItemContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";


const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartItemContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
  );
};
export default CartIcon;
