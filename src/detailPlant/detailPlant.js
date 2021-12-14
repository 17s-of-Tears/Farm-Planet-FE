import React , {useState} from "react";
import { useLocation } from 'react-router-dom';
import './detailPlant.css';
import { Row, Col,Modal, Button } from 'antd';
import axios from 'axios';
//import Slider from "react-slick";

const DetailPlant = ({selectedPlantList,setSelectedPlantList}) => {
    
    const location = useLocation()

    const plantData = location.state.plantData; 

    const [isModalVisible, setIsModalVisible] = useState(false);

    const plant = {
        id: plantData.id,
        name: plantData.name,
        content: plantData.description,
        imgURL: "https://codingjoa.kro.kr:49000/" + plantData.imageUrl
    }
    
    let _selectedPlantList = selectedPlantList;

    const sendPlant = (plant) => {                
        let subscribeTier = null;

        axios.get("https://codingjoa.kro.kr:49000/api/v1/subscribe/plant")
        .then((res) => {
            // plant 정보가 비어있을때
            if(Object.keys(res.data.plants) == 0){

                //  구독정보 axios
                axios.get("https://codingjoa.kro.kr:49000/api/v1/subscribe").then((res) => {
                    subscribeTier = res.data.level;
                    
                    // 리스트 가득 차지않았을때
                    if(Object.keys(_selectedPlantList.list) < subscribeTier){                                                
                        setSelectedPlantList(_selectedPlantList.list.push({id:plant.id,name:plant.name}));
                    }
                    // 리스트가 가득 찼을때
                    if(Object.keys(_selectedPlantList.list) == subscribeTier){
                        showModal();
                    }
                    
                }).catch((err)=>{
                    console.log("구독정보 요청 오류"+err.name);
                })
            }else{ // plant 정보가 있을때
                alert("이미 신청하셨습니다");
            }
        });       
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

    
    return (
        <div className="wrapper">
            <div className="SubscribeRequestModal">
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="재배 신청하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>작물을 모두 고르셨습니다. [10/10]</p>
                    <p>목록 : a,b,c</p>
                    <p>재배를 시작하시겠습니까?<br></br>
                    (신청이후 관리자가 승인하면 요청하신 작물재배가 시작됩니다.)</p>
                </Modal>
            </div>

            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="formWrapper">
                        <form method="post">
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
                        </form>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    )
}

export default DetailPlant;