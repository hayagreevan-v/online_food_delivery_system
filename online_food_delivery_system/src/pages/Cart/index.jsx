import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../stores/menu/productsSlice";
import {ReactComponent as ArrowRightSvg} from "../../assets/icons/arrow-right-long-svgrepo-com.svg";

import useTabSwitch from "../../hooks/useTabSwitch";

const Cart =() =>{
    const cart= useSelector(selectAllProducts);
    const tabs=['Summary','Delivery','Payment'];
    const [currentTab,handleTabSwitch]= useTabSwitch(tabs,'Summary');


    if(!cart || cart.products.length===0){
        return (
            <div className="bg-white h-full text-black flex justify-center p-4">
                <h1>Your cart is empty!</h1>
            </div> 
        )
    }
    return (
        <>Cart</>
    )
}

export default Cart;