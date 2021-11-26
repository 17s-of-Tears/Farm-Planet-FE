import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Main_FAQ = (props) => {

  let [FAQ_item,setFAQ_Item] = useState('');
  const history = useHistory();
  const onEnterView = (id) =>{    
    history.push({
      pathname: "/customer-center/view",
      state:{id:id,type:'notice'}
    });
  }

  useEffect(() => { 
    const getNewsData = async () => {
      
      let data_URL = "http://txshi.iptime.org:49000/api/v1/board/faq";
    
      var response = await axios.get(`${data_URL}`).then(function (response) {
        let endSection = 3;
        console.log(response);
        var result = response.data.faqs.slice(0,endSection).map(row =>
          <div className="list_item" onClick={() => onEnterView(row.id)}>
            <h4>{row.title}</h4>
            <p>{row.createdAt.substring(0,10)}</p>
          </div>
        );
        setFAQ_Item(result);
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
      <h3>FAQ</h3>
          <div className="list_content">
            {!!FAQ_item.length && FAQ_item}
      </div>
    </div>
  );
};

export default Main_FAQ;
