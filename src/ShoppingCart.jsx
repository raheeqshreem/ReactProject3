

import { Offcanvas } from 'bootstrap'



import React from 'react'
import { useShoppingCart } from './context/ShoppingCartContext';
import CartItem from './CartItem';

const ShoppingCart = () => {
    const {cartItems}=useShoppingCart();
  return <Offcanvas show={true}>
<Offcanvas.Header closeButton>

    <Offcanvas.Title> Cart </Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
{cartItems.map((item) => (

<CartItem key={item.id} {...item} />

))}
</Offcanvas.Body>
   </Offcanvas>
  
};

export default ShoppingCart