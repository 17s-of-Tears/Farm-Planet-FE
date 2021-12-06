import React from 'react'
import * as ReactRouter from 'react-router-dom'
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
    <div>
      <input ref={name} /><br />
      <input ref={image} type="file" /><br />
      <button onClick={complete}>수정</button>
      <button onClick={complete}>삭제</button>
      <button onClick={complete}>취소</button>
    </div>
  );
}
