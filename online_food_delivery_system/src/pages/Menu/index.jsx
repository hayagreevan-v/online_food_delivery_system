import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts, selectAllProducts } from '../../stores/menu/productsSlice';
import ProductDetailCard from "../../components/ProductDetailCard";
import { addToCart } from "../../stores/cart/cartSlice";
import { Tabs } from "../../components/Tabs";

const Menu=() =>{
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [activeTab,setActiveTab]= useState('');
    //const {categories,setCategories}=useState([]);
    const [activeTabIndex,setActiveTabIndex]= useState(0);

    useEffect(() =>{
        dispatch(fetchProducts())
    }, [])

    const onAddProduct =(product) =>{
        dispatch(addToCart(product))
    }

const onTabSwitch=(newActiveTab)=>{
    setActiveTab(newActiveTab);
<<<<<<< Updated upstream
    let newIndex=0;
    let categories = products.products ? products.products.map((product) => product.name.name) : [];
    let index= categories.findIndex(newActiveTab);
=======
    let categories = products.products.map((product)=> product.name.name);
    let index= categories.findIndex(category => newActiveTab === category);
    console.log(index);
    if(index>-1){
        setActiveTabIndex(index);
    }
    
    else{
        setActiveTabIndex(0);
    }
>>>>>>> Stashed changes
}


    return (
        <div className="bg-white">
            {
                products.status !== 'fulfilled' ?
                <div>Loading...</div> : 
                <div className="menu-wrapper">
                    
                    {
                        Array.isArray(products.products) && products.products.length > 0 ?
                        <Tabs
                        list={products.products.map((product)=> product.name.name)}
                        activeTab={activeTab}
                        onTabSwitch={onTabSwitch}
                        />
                        :<div>Waiting for Server</div>
                    }
                    <div className="flex flex-row mx-5">
                    {
                     products.products && Array.isArray(products.products) && products.products.length > 0 ? 
                     products.products[activeTabIndex].products.map((product, index) =>{
                        return(
                            <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct}/>
                        )
                    }): <div>Waiting for data from Server</div>
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default Menu;