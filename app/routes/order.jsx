
import { Link, useLoaderData } from "remix";

export const loader = async () => {
    const data = await fetch(`https://gxwebhackathon.herokuapp.com/users/1/order`).then((res) => res.json());
    return data;
};

function OrderSuccess() {  
    const {0: order} = useLoaderData();
    console.log(order)
    return (
      <div className="order-success">
        <h1>Your Order Was Successful</h1>
        <div >
            <p>
                Thank you for your order. We will contact you shortly to confirm your order.
                
                <br />
                <br />
                 Your order info is shown below.
                 <img src={order.image[0]} alt="order" className="receipt-img" />   
            </p>
            <p>
                <strong>Order ID:</strong> #02002
            </p>
            <p>
                <strong>Name:</strong> Israel Alagbe
            </p>
            <p>
                <strong>Item:</strong> {order.name}
            </p>
            <p>
                <strong>Description:</strong> Made with Italian Sauce, Chicken, and organice vegetables.
            </p>
            <p>
                <strong>Price:</strong> ${order.price}
            </p>
            <p>
                <strong>Quantity:</strong> 4
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>
                <Link className="blue" to="/">Back to Home</Link>
            </p>
        </div>
      </div>
    );
}


export default OrderSuccess;