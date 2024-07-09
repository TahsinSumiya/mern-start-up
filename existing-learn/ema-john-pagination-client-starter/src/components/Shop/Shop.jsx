import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const { count } = useLoaderData();  // Destructure count from useLoaderData
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, seturrentPage] = useState(0);

    console.log('Count from loader data:', count);

 

    const numberOfPages = Math.ceil(count / itemsPerPage);
    console.log('Number of pages:', numberOfPages);

    const pages = [...Array(numberOfPages).keys()];
    console.log('Pages array:', pages);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [ itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity += 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    };

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };
const handleItemPerPage =(e)=>{
    const val = parseInt(e.target.value)
    setItemsPerPage(val)
    seturrentPage(0)
}

const handlePrevPage =(e)=>{
    if(currentPage>1){
        seturrentPage(currentPage-1)
    }
}
const handleNextPage =(e)=>{
    if(currentPage<pages.length){
        seturrentPage(currentPage+1)
    }
}
    return (
        <div className='shop-container'>
            <div className="products-container">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className='pagination'>
                <p>current page : {currentPage}</p>
                <button onClick={handlePrevPage}>Prev</button>
                {pages.map(page => (
                    <button 
                        key={page} 
                        onClick={()=>seturrentPage(page+1)}
                  className={currentPage === page+1 && 'selected'}
                    >
                        {page + 1}
                    </button>
                ))}
                   <button onClick={handleNextPage}>next</button>
                <select value={itemsPerPage} onChange={handleItemPerPage} name="" id="">
                <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>

                </select>
            </div>
        </div>
    );
};

export default Shop;
