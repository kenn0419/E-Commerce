
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { apiCreateOrder } from "apis";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showConfetti } from "store/user/userSlice";
import Swal from "sweetalert2";

// This value is from the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const dispatch = useDispatch();
    const [{ isPending, options, dispatch: shoot }] = usePayPalScriptReducer();
    useEffect(() => {
        shoot({
            type: 'resetOptions',
            value: {
                ...options, currency
            }
        })
    }, [currency, showSpinner])
    const handleCreateOrder = async () => {
        const response = await apiCreateOrder({ ...payload, status: 'Succeed' });
        if (response.success) {
            dispatch(showConfetti());
            setTimeout(() => {
                Swal.fire('Congratulations', 'Order was created', 'success').then(() => {
                    window.close();
                })
            }, 200);
        }
    }
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        { amount: { currency_code: currency, value: amount } }
                    ]
                }).then(orderId => orderId)}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    if (response.status === 'COMPLETED') {
                        await handleCreateOrder();
                    }
                })}
            />
        </>
    );
}

const Paypal = ({ amount, payload }) => {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px", margin: 'auto' }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}

export default memo(Paypal);