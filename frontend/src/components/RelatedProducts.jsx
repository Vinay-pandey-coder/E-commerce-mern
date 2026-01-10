import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext';
import Title from './Title';
import Productsitem from './Productsitem';

const RelatedProducts = ({category,subCategory}) => {

  const {products} = useContext(shopContext);
  const [related,setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category && subCategory === item.subCategory);
      setRelated(productsCopy.slice(0,5));
    }
  },[products])

  return (
    <>
      <div className='my-24'>
        <div className='text-center text-3xl py-2'>
          <Title text1={'RELATED '} text2={'PRODUCTS'}/>  
        </div>  
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
          {related.map((item,index) => (
            <Productsitem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>
      </div> 
    </>
  )
}

export default RelatedProducts
