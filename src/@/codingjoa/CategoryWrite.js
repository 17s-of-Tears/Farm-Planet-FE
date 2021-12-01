import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { useInputRef, useInputRefHandlar } from './hook'
import { postCategory } from './ajax'

export default function BoardNoticeWrite() {
  const history = ReactRouter.useHistory();
  const name = useInputRef('');
  const image = React.useRef(null);
  const handleSubmit = useInputRefHandlar(formData => {
    postCategory(formData).then(() => {
      history.go(0);
    }, err => {
      alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`);
    });
  }, {
    name,
    image,
  });
  return (
    <div>
      <input ref={name} />
      <input ref={image} type="file" />
      <button onClick={handleSubmit}>카테고리 추가</button>
    </div>
  );
}
