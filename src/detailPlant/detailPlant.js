import React , {useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import './detailPlant.css';
import { Row, Col,Modal, Button } from 'antd';
import axios from 'axios';
//import Slider from "react-slick";

const DetailPlant = ({selectedPlantList,setSelectedPlantList}) => {
    const history = useHistory()
    const location = useLocation()

    const plantData = location.state.plantData; 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [limitPlantCount, setLimitPlantCount] = useState(null);

    const plant = {
        id: plantData.id,
        name: plantData.name,
        content: plantData.description,
        imgURL: "https://codingjoa.kro.kr:49000/" + plantData.imageUrl
    }
    
    let _selectedPlantList = selectedPlantList;
    // console.log(selectedPlantList) 
    // console.log(_selectedPlantList)

    let _limitPlantCount = null;
    
    const sendPlant = (plant) => {
        axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me").then(res =>{
          console.log(res.data);
          if(res.data.farm == null){
            alert("구독후 이용가능하십니다.")
            history.push("/subscript")
          }else if(Object.keys(res.data.farm.plants) == 0){
            console.log("1")
            //  구독정보 axios
            axios.get("https://codingjoa.kro.kr:49000/api/v1/subscribe").then((res) => {
              console.log("2")
              console.log(selectedPlantList) 
              console.log(_selectedPlantList)          

              switch (res.data.level) {
                case 1:
                  _limitPlantCount = 12;
                  break;
                case 2:
                  _limitPlantCount = 17;
                  break;
                case 3:
                  _limitPlantCount = 25;
                  break;

                default:
                  break;
              }
              setLimitPlantCount(_limitPlantCount)             
              console.log(_limitPlantCount)
              var msg =""

              // 리스트 가득 차지않았을때
              if(_selectedPlantList.list.length < _limitPlantCount){ 
                  // console.log("객체 속성의 수" + _selectedPlantList.list.length)
                  // console.log("3")
                  // console.log(selectedPlantList) 
                  // console.log(_selectedPlantList.list)
                  // console.log(plant)

                  // var tempElement ={};
                  // tempElement.id = plant.id;
                  // tempElement.name = plant.name;

                                                 
                  _selectedPlantList.list.push({id:plant.id,name:plant.name});
                  
                  // console.log("4")
                  // console.log(selectedPlantList)                                               
                  // console.log(_selectedPlantList)
                  setSelectedPlantList(_selectedPlantList);
                  msg = "현재까진 선택하신 작물 수는" + _selectedPlantList.list.length + "/" + _limitPlantCount; 
              }
              // 리스트가 가득 찼을때
              if(Object.keys(_selectedPlantList.list) == _limitPlantCount){
                  showModal();
                  msg = ""; 
              }
              if(msg != "")
                alert(msg)              
              
            }).catch((err)=>{
                console.log("구독정보 요청 오류"+err.name);
            })
          }
            
        })
             
       
    };

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      //plant 정보 전달
      var result= [];
      result = _selectedPlantList.map(res => res.id);
      console.log(result);
      axios.post("",{result}).then(res=>{
        console.log("plant 정보 전달 완료");
      }).catch(err => {
        console.log("plant 정보 전달 에러" + err.name);
      })
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    var test = _selectedPlantList.list.map(res=>res.name +", ");
    return (
        <div className="wrapper">
            <div className="SubscribeRequestModal">
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="재배 신청하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>작물을 모두 고르셨습니다.  {limitPlantCount != null ? "총" + limitPlantCount + "개" : "알수없음" }</p>
                    <p>목록 : {test}</p>                    
                    <p>재배를 시작하시겠습니까?<br></br>
                    (신청이후 관리자가 승인하면 요청하신 작물재배가 시작됩니다.)</p>
                </Modal>
            </div>

            <Row>
                <Col span={5}></Col>
                <Col span={14}>
                    <div className="formWrapper">                        
                            <div class="formBox">
                                {/* <img src='public\temp\img\logo.png' alt='logo' /> */}
                                <div>
                                    <img className="imgStyle" src={plant.imgURL} alt='sweetPotato' />
                                </div>
                                <label className="plantName">{plant.name}</label>
                                <div>
                                    <p className='textRoom'>
                                        {plant.content}
                                    </p>
                                </div>
                                <div>
                                    <button class="loginButton" onClick={()=> sendPlant(plant)}>재배하기</button>
                                </div>
                            </div>                        
                    </div>
                </Col>
                <Col span={5}></Col>
            </Row>
        </div>
    )
}

export default DetailPlant;