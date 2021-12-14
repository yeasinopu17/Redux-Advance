import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'sending...',
                message: 'Sending Cart data..',
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://react-http-8d7cb-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
            });

            if (!response.ok) {
                throw new Error('Sending Cart data Failed..');
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success...',
                    message: 'Sending Cart data successfully..',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Sending Cart data failed..',
                })
            );
        }
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-8d7cb-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Unable to fetch...');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.item || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Fetching Cart data failed..',
                })
            );
        }
    };
};
