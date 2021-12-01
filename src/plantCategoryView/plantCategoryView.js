import React, {useState,useEffect} from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import axios from 'axios';

import './plantCategoryView.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlantCategoryView = (props) => {
  const history = useHistory()
  const location = useLocation()

  let [plantCategory_items,setPlantCategory_items] = useState('');
  

  let category_id = location.state.ct_id;

  const onEnterDetailPlant = (plant) =>{    
    history.push({
      pathname: "/detailplant",
      state:{plantData:plant}
    });
  }

  const getPlantCategoryData = async () => {         
    
    let data_URL = `https://codingjoa.kro.kr:49000/api/v1/category/${category_id}`;
    
    await axios.get(`${data_URL}`).then(function (response) {           
      console.log(response);  
      
       let test = () => {

        var categoryBanner = response.data.plants.map(plant => 
          <div className="plant_item" onClick={()=>{onEnterDetailPlant(plant)}}>
            <div className="imageBox"><div className="overlay"></div><img src={"https://codingjoa.kro.kr:49000/"+plant.imageUrl}></img></div>
            <div className="titleBox">
              <h4>{plant.name}</h4>
              <input type="button" className="buttonStyle_1" value="자세히 보기"></input>
            </div>
          </div> 
        );

        console.log(categoryBanner);

        return(
          <div className="page_container">
            <div className="plant_banner">
            
              <div className="imageBox"><div className="overlay"></div><img src={"https://codingjoa.kro.kr:49000/"+response.data.imageUrl}></img></div>
              <div className="textBox">
                <h4>{response.data.name}</h4>
                <span>스크롤해서 만나기↓</span>
              </div>          
            </div>

            <div className="plant_listBox">
              {categoryBanner}
            </div>
          </div>
        );
      }

      var result = test();
      
      setPlantCategory_items(result);
      console.log(plantCategory_items);  
    }).catch(function (error) {
      console.log(error);  
          // 오류발생시 실행
    }).then(function() {     
        // 항상 실행       
    });         
  };

  

  useEffect(() => { 
    getPlantCategoryData();
  },[])

  return (
    <div className="PlantCategoryView">          
      {plantCategory_items}
    </div>
  );
};

export default PlantCategoryView;
