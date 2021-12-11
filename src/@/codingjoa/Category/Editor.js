import React from 'react'
import { postCategory, updateCategory, deleteCategory } from '@/codingjoa/ajax'
import { useInputRef, useInputRefHandlar } from '@/codingjoa/hook'

export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const image = React.useRef(null);
  const name = useInputRef(payload?.name ?? '');
  const complete = () => dispatch({ type: 'refresh' });
  const handleSubmit = useInputRefHandlar(formData => {
    if(id > 0) {
      updateCategory(id, formData).then(
        () => complete(),
        err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    } else {
      postCategory(formData).then(
        () => complete(),
        err => alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    }
  }, {
    name,
    image,
  });
  const handleDelete = () => {
    deleteCategory({
      id,
    }).then(
      () => complete(),
      err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  };
  return (
  <div className="amdinCategoryList-wirte">
    <div className="inputBox">
      <input ref={name} className="filePath" /><input ref={image} type="file" /><br />
    </div>

    <div className="btnBox">      
      <button onClick={complete} className="cancleBtn">취소</button>
      <button onClick={handleDelete} className="deleteBtn">삭제</button>
      <button onClick={handleSubmit} className="submitBtn">적용</button>            
    </div>
  </div>
    
  );
}
