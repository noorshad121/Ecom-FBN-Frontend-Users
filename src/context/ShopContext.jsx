import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_API_URL;

 export const ShopContext = createContext();

const ShopContextProvider = (props)=> {


 const navigate = useNavigate();
    const Currency = '₹';
    const delivery_fee = 10;
    

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
   const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cartItems")) || {}
);

    const [token, setToken] = useState("");

    const [products, setProducts] = useState([]);

    const addToCart = async(itemId, size)=> {

        if(!size) {
            toast.error('Select Product Size')
            return;
        }
     
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        
        toast('Item Added In Cart')
        setCartItems(cartData)
        if(token) {
          try {
             await axios.post(`${backendUrl}/api/cart/add`,{itemId, size}, {headers : {token}})
            } catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
  let totalCount = 0;

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const qty = cartItems[productId][size];
      if (qty > 0) {
        totalCount += qty;
      }
    }
  }

  return totalCount;
};

// update cart item
const updateQuantity = async(itemId, size, quantity)=>{
   
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity;
    setCartItems(cartData)

    if(token) {
        try {
         await axios.post(`${backendUrl}/api/cart/update`,{itemId, size, quantity}, {headers : {token}});
        } catch(error) {
        console.log(error);
        toast.error(error.message);
        }
    }
}


// get total cart ammount

const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const itemInfo = products.find(
      (product) => product._id === itemId
    );

    if (!itemInfo) continue;

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];

      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};

// user cart list

const getUserCart = async (token)=> {
try {
    
    const responce = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers : {token}})
    if(responce.data.success) {
        setCartItems(responce.data.cartData)
        
    }
} catch(error){
    console.log(error);
    toast.error(error.message)
}
}
    
    
    // total product list
const getProductData = async()=> {
 
    try {
    const responce = await axios.get(`${backendUrl}/api/product/list`);
    if(responce.data.success) {
     setProducts(responce.data.products)
    }else {
        toast.error(responce.data.message)
    }
    } catch(error) {
        console.log(error);
        toast.error(error.message);

    }
}
useEffect(()=> {
getProductData();
},[])

// refresh login signup token
useEffect(()=>{
if(!token && localStorage.getItem('token')) { 

setToken(localStorage.getItem('token'));
getUserCart(localStorage.getItem('token'))

}
},[])
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);



    const value = {
           backendUrl,
           products,
           Currency,
           navigate,
           delivery_fee,
           search,
           setSearch,
           showSearch,
           setShowSearch,
           cartItems,
           setCartItems,
           addToCart,
           getCartCount,
           updateQuantity,
           getCartAmount,
           token,
           setToken

    }


    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;