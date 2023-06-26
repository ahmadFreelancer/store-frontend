import React from 'react'
import { UseProductContext } from '../context/ProductsContext';
import ModalItems from './ModalItems';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../index.css"


// CartModal is Child of <SingleProduct>
export default function CartModal({ data }) {
    const { cart, addItemsToCart, quantity, clearCart, cartEmpty } = UseProductContext();

    const cartTrigger = () => {
        addItemsToCart(data);
    }
    const cartClearBtn = () => {
        clearCart();
    }

    const initialOptions = {
        clientId: "test",
        currency: "USD",
        intent: "capture",
    };

    // console.log(cart[0])
    // console.log(data)
    return (
        <div>
            <button onClick={cartTrigger} type="button" className="btn btn-primary btnYellow" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add to Cart
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            {
                                cartEmpty ? <h1>Cart Empty</h1> : cart.map((data) => {
                                    return <ModalItems key={data._id} data={data} />
                                })
                            }
                        </div>
                        <div className='modalFooter d-flex flex-column align-items-center justify-content-center'>
                            <button onClick={cartClearBtn} className='btn btn-primary'>
                                Clear Cart
                            </button>
                            
                            <div className="paypalBtn">
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons style={{ layout: "vertical" }} />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
