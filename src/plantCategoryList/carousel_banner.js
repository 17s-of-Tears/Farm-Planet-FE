import React, { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'

const SimpleCarousel = (props) => {
  
  let [carousel_items,setCarousel_items] = useState('');

  const getCarousel_items = () => {    
    let response = props.plantListData;
    console.log(props);
    var result = response.banners.map(row =>     
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://codingjoa.kro.kr:49000/" + row.imageUrl}
        />
      </Carousel.Item>          
    );
    setCarousel_items(result);
  }

  useEffect(() => { 
    getCarousel_items();
  },[])
  
  return (
    <Carousel>
      {!!carousel_items.length && carousel_items}  
    </Carousel>
    
  );
}

export default SimpleCarousel;