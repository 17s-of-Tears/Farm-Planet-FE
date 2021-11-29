import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PlantCategoryList_plantList = (props) => {
  const history = useHistory()

  let [plantList_items,setPlatnList_items] = useState('');
  
  const onEnterPlantList = (category_id) =>{    
    history.push({
      pathname: "/detailplant",
      state:{ct_id:category_id}
    });
  }

  const getPlantListData = async () => {         
    
    let data_URL = `http://txshi.iptime.org:49000/api/v1/category`;
    
    await axios.get(`${data_URL}`).then(function (response) {           
      console.log(response);  
      var result = response.data.categories.map(row =>        
        <div className="listItem">
         
          <div className="titleLine" onClick={()=> {onEnterPlantList(row.id)}}><h3>#테스트 식물리스트</h3><span>더보기 &gt;</span></div>
                
          <div className="list_gridBox">            
            <div className="imageBox"><img src='img/temp_plant_img1.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img2.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img3.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img4.png'></img></div>
          </div>
        </div>   
      );
      setPlatnList_items(result);
    }).catch(function (error) {
          // 오류발생시 실행
    }).then(function() {
        // 항상 실행       
    });         
  };

  useEffect(() => { 
    getPlantListData();
  },[])

  return (
    <div className="PlantCategoryList_plantList">
      <div className="tagListBox">
        
      
        <div className="listItem">
          {/* 타이틀라인 */}
          <div className="titleLine"><h3>#테스트 식물리스트</h3><span>&gt;</span></div>
          
          {/* 그리드형식의 리스트 */}
          <div className="list_gridBox">
            <div className="imageBox"><img src='img/temp_plant_img1.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img2.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img3.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img4.png'></img></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCategoryList_plantList;
