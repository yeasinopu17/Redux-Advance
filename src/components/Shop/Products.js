import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCT = [
    { id: 'p1', price: 6, title: 'My first book', description: 'The first book desc' },
    { id: 'p2', price: 2, title: 'My 2nd book', description: 'The 2nd book desc' },
    { id: 'p3', price: 4, title: 'My 3rd book', description: 'The 3rd book desc' },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCT.map((item) => (
                    <ProductItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Products;
