import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts, selectAllProducts } from '../../stores/menu/productsSlice';
import ProductDetailCard from "../../components/ProductDetailCard";
import { addToCart } from "../../stores/cart/cartSlice";
import { Tabs } from "../../components/Tabs";

const Menu=() =>{
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const {activeTab,setActiveTab}= useState('');
    //const {categories,setCategories}=useState([]);
    const {activeTabIndex,setActiveTabIndex}= useState(0);

    useEffect(() =>{
        dispatch(fetchProducts())
    }, [])

    const onAddProduct =(product) =>{
        dispatch(addToCart(product))
    }

    return (
        <div className="bg-white">
            {
                products.status !== 'fulfilled' ?
                <div>Loading...</div> : 
                <div className="menu-wrapper">
                    
                    {
                        products.products &&
                        <Tabs
                        list={products.products.map((product)=> product.name.name)}
                        activeTab={activeTab}
                        onTabSwitch={setActiveTab}
                        />
                    }
                    <div className="flex flex-row mx-5">
                    {
                     products.products && products.products[activeTabIndex].products.map((product, index) =>{
                        return(
                            <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct}/>
                        )
                    })
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default Menu;