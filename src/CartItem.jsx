import React from 'react'
import Stack  from  "react-bootstrap/Stack";
import { useShoppingCart } from './context/ShoppingCartContext';
import Product from './pages/user/Product/Product';


const CartItem = ({id,quantity}) => {
    const {removeItemFromCart}=useShoppingCart()

    const item=Products.find((i)=>i.productId === id);
    if (item==null) return null;

  return  ( 
  <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
<img  src={item.secure_url} alt = " cart-img " style={{width:"125px",height:"75px",objectFit:"cover"}}/>
<div className="me-auto">
<div>
    {item.name}{" "}
    {quantity>1 && <span className="text-muted" style={{fontSize:"0.65rem"}}> x {quantity}</span>}
</div>
<div className="text-muted" style={{fontSize: "0.75rem"}}>
    {item.price}
</div>


<div>
{item.price*quantity}
</div>

</div>
<button variant="outline-danger" size="sm" onClick={()=>removeItemFromCart(id)}>
    &times;
</button>
  </Stack>
  );
};

export default CartItem