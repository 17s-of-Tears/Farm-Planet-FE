import React, {useState} from 'react';

import MainNotice from './mainNotice';
import MainFAQ from './main_FAQ';

const News = (props) => {
  
  return (
    <div className="News">
      <div className="newsBox">
        <h2>News</h2>
        <div className="list_containor">
          <MainNotice/>
          <MainFAQ />

        </div>
        <div className="tri"></div>
      </div>
    </div>
  );
};

export default News;