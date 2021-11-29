import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Pagination } from 'antd';

const CustomerCenter_FAQ = (props) => {
  const history = useHistory()
  
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [entireCotent,setEntireCotent] = useState(0);

  let [FAQ_item,setFAQ_Item] = useState('');

  //페이지 네이션 관련 함수 
  const onChangePage = (page, pageSize) => {
    console.log(page);
    setCurrentPage(page);    
  };

  const onEnterView = (id) =>{    
    history.push({
      pathname: "/customer-center/view",
      state:{id:id,type:'faq'}
    });
  }

  const getNewsData = async () => {
    const _pageSize = 10;
    setPageSize(_pageSize);
    let _currentPage = currentPage;
    
    let data_URL = `http://txshi.iptime.org:49000/api/v1/board/faq?page=${_currentPage}&pageSize=${_pageSize}`;
    
    await axios.get(`${data_URL}`).then(function (response) {           
      setEntireCotent(response.data._meta.page.total);
   
      var result = response.data.faqs.map(row =>        
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

  useEffect(() => { 
    getNewsData();
  },[currentPage])

  return (
    <div className="CustomerCenter_Notice">
      <div className="list_content">
        {!!FAQ_item.length && FAQ_item}
      </div>
  
      <Pagination current={currentPage} total={entireCotent} onChange={onChangePage} pageSize={pageSize}/>
    </div>
  );
};

export default CustomerCenter_FAQ;