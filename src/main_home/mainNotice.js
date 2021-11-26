import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MainNotice = (props) => {

  let [noticeItem,setNoticeItme] = useState('');
  const history = useHistory();
  const onEnterView = (id) =>{    
    history.push({
      pathname: "/customer-center/view",
      state:{id:id,type:'notice'}
    });
  }

  useEffect(() => { 
    const getNewsData = async () => {
      let data_URL = "http://txshi.iptime.org:49000/api/v1/board/notice";
    
      var response = await axios.get(`${data_URL}`).then(function (response) {
        let endSection = 3;

        var result = response.data.notices.slice(0,endSection).map(row =>
          <div className="list_item" onClick={() => onEnterView(row.id)}>
            <h4>{row.title}</h4>
            <p>{row.createdAt.substring(0,10)}</p>
          </div>
        );
        setNoticeItme(result);
      }).catch(function (error) {
            // 오류발생시 실행
      }).then(function() {
          // 항상 실행       
      });       
    };

  getNewsData();
  },[])

  return (
    <div className="MainNotice">
      <h3>공지사항</h3>
          <div className="list_content">
            {!!noticeItem.length && noticeItem}
      </div>
    </div>
  );
};

export default MainNotice;
