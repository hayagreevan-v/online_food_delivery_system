import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts, selectAllProducts } from '../../stores/menu/productsSlice';
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";

const Menu=() =>{
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const {activeTab,setActiveTab}= useState('');
    const {categories,setCategories}=useState([]);
    useEffect(() =>{
        dispatch(fetchProducts())
    }, [])

    return (
        <div className="bg-white">
            {
                products.status === 'pending' ?
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
                    {
                        Array.isArray(products.products) && products.products.length > 0 ? products.products[0].products.map((product, index) =>{
                            return(
                                <ProductDetailCard key={index} product={product}/>
                            )
                        }): <div>Waiting for data from Server</div>
                    }
                </div>
            }
        </div>
    )
}

export default Menu;

/*
Array.isArray(products) && products.length > 0 ?
                        products.map((menuCategory, index) =>{
                            return(
                                <>
                                    <h2>{menuCategory.data.name.name}</h2>
                                    <div className="products-list">
                                        {
                                            menuCategory.data.products.map((product, index) =>{
                                                return(
                                                    <div>{product.name}</div>

                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }): 
                        <div>No products found</div>

*/