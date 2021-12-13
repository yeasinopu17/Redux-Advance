import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiActions.showNotification({
                    status: 'pending',
                    title: 'sending...',
                    message: 'Sending Cart data..',
                })
            );

            const response = await fetch('https://react-http-8d7cb-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw new Error('Sending Cart data Failed..');
            }

            // const responseData = await response.json();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success...',
                    message: 'Sending Cart data successfully..',
                })
            );
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Sending Cart data failed..',
                })
            );
        });
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
