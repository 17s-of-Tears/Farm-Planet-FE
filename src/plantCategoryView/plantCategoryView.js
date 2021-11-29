import React, {useState,useEffect} from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import axios from 'axios';

import './plantCategoryView.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlantCategoryView = (props) => {
  const history = useHistory()
  const location = useLocation()

  let [plantCategory_items,setPlantCategory_items] = useState('테스트');
  // url로 받을듯?
  let [plant_banner_img,setPlant_banner_img] = useState('/img/temp_recommend_plant.png');
  // let [plant_banner_title,setPlant_banner_title] = useState('겨울을 좋아하는 작물');
  
  let category_id = location.state.ct_id;


  console.log(category_id);

  const getPlantCategoryData = async () => {         
    
    let data_URL = `http://txshi.iptime.org:49000/api/v1/category/${category_id}`;
    
    await axios.get(`${data_URL}`).then(function (response) {           
      console.log(response);  

      var result = () => {

        var categoryBanner =response.data.plants.map(plants => {
          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src={plants.imageUrl}></img></div>
            <div className="titleBox">
              <h4>{plants.name}</h4>
              <input type="button" className="buttonStyle_1" value="자세히 보기"></input>
            </div>
          </div> 
        });

        return(
          <div className="page_container">
            <div className="plant_banner">
            
              <div className="imageBox"><div className="overlay"></div><img src={response.data.imageUrl !=null ? response.data.imageUrl : plant_banner_img}></img></div>
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
      console.log(result);
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
      {/* <div className="page_container">
        
        <div className="plant_banner">
          <div className="imageBox"><div className="overlay"></div><img src='img/temp_recommend_plant.png'></img></div>
          <div className="textBox">
            <h4>{plant_banner_title}</h4>
            <span>스크롤해서 만나기↓</span>
          </div>          
        </div>
       
        <div className="plant_listBox">
          
          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src='img/temp_plant_img1.png'></img></div>
            <div className="titleBox">
              <h4>고구마</h4>
              <input type="button" className="buttonStyle_1" value="재배하기"></input>
            </div>
          </div>          

        </div>
      </div>      */}

      {!!plantCategory_items.length && plantCategory_items}
    </div>
  );
};

export default PlantCategoryView;
