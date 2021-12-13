import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const PlantCategoryList_plantList = (props) => {
  const history = useHistory()

  let [plantList_items,setPlatnList_items] = useState('');

  let [me, setMe] = useState(null);

  useEffect(() => {
      if(me === null) {
        axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me")
          .then(res => {
            setMe(res.data);
            console.log(me);
          })
          .catch(err => {
            setMe(false);
            console.log(err)
          });
      } else if(me === false) {
        alert("로그인 없이는 접근 할 수 없어요!");
        history.push("/login");
      }
    }, [ me ]);

  const onEnterPlantList = (category_id) =>{    
    history.push({
      pathname: "/plant-category-view",
      state:{ct_id:category_id}
    });
  }
  const getPlantListData = () => {    
    let response = props.plantListData;
    console.log(props);
    var result = response.categories.map(row => {
    var plantList = row.plants.map(plants => 
      <div className="imageBox"><img src={"https://codingjoa.kro.kr:49000/" + plants.imageUrl}></img></div>
    )

    return(
      <div className="listItem">          
      <div className="titleLine" onClick={()=> {onEnterPlantList(row.id)}}>
        <h3>#테스트 식물리스트</h3><span>더보기 &gt;</span>
      </div>                
      <div className="list_gridBox">                        
        {plantList}
      </div>
    </div> );               
    });
    setPlatnList_items(result);
  }

  // const getPlantListData = async () => {         
    
  //   let data_URL = `http://txshi.iptime.org:49000/api/v1/category`;
    
  //   await axios.get(`${data_URL}`).then(function (response) {           
  //     console.log(response);

  //     var result = response.data.categories.map(row => {
  //       var plantList = row.plants.map(plants => 
  //         <div className="imageBox"><img src={"http://txshi.iptime.org:49000/" + plants.imageUrl}></img></div>
  //       )

  //       return(
  //         <div className="listItem">          
  //         <div className="titleLine" onClick={()=> {onEnterPlantList(row.id)}}>
  //           <h3>#테스트 식물리스트</h3><span>더보기 &gt;</span>
  //         </div>                
  //         <div className="list_gridBox">                        
  //           {plantList}
  //         </div>
  //       </div> );               
  //       }  
  //     );
  //     setPlatnList_items(result);
  //   }).catch(function (error) {
  //         // 오류발생시 실행
  //   }).then(function() {
  //       // 항상 실행       
  //   });         
  // };

  useEffect(() => { 
    getPlantListData();
  },[])

  return (
    <div className="PlantCategoryList_plantList">
      <div className="tagListBox">
      {!!plantList_items.length && plantList_items}  
      </div>
    </div>
  );
};

export default PlantCategoryList_plantList;
