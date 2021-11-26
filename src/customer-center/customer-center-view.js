import React, {useState, useEffect} from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const CustomerCenter_view = (props) => {

  let [viewData,setViewData] = useState(null);
  
  const history = useHistory()
  const location = useLocation()
  // const parsed = queryString.parse(location.search);

  let viewID = location.state.id;
  let viewType = location.state.type;    
  console.log(location.state.id);  
  
  const getViewData = async () => {
    let data_URL = `http://txshi.iptime.org:49000/api/v1/board/${viewType}/${viewID}`;
      
    await axios.get(`${data_URL}`).then(function (response) {      
      setViewData(response.data);
    }).catch(function (error) {
          // 오류발생시 실행
    }).then(function() {
        // 항상 실행       
    });
  };
           
  useEffect(() => { 
    getViewData();
  },[location])
  if (viewData == null){
    return null;
  }
  return (
    <div className="CustomerCenter_view">
      <div className="view_boardContainor">
        <h2>{viewType == 'faq' ? "FAQ" : "공지사항"}</h2>

        <div className="titleLine">
          <h4>{viewData.title}</h4>
          <p>{viewData.createdAt.substring(0,10)}</p>
        </div>
        
        {viewType == 'faq' 
        ? <div className="textLine">
            <div className="question">Q. {viewData.question}</div>
            <div className="answer">A. {viewData.answer}</div>
          </div>  
        : <div className="textLine">
            <div className="content">{viewData.content}</div>          
          </div>
        }    

        <button className="listButton" onClick={()=>{history.goBack()}}>목록</button>
      </div>

        
    </div>
  );
};

export default CustomerCenter_view;