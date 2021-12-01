import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { getCategory, updateCategory, deleteCategory } from './ajax'
import { useAsyncView, useInputRef, useInputRefHandlar } from './hook'

function Detail({
  id,
  name,
}) {
  const history = ReactRouter.useHistory();
  const image = React.useRef(null);
  const nameref = useInputRef(name);
  const handleSubmit = useInputRefHandlar(formData => {
    updateCategory(id, formData).then(() => history.go(0), err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  }, {
    name: nameref,
    image,
  });
  const handleDelete = () => {
    deleteCategory({
      id,
    }).then(() => history.go(0), err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  };
  return (
    <div>
      <input ref={nameref} /><br />
      <input ref={image} type="file" /><br />
      <button onClick={handleSubmit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default function CategoryDetail() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getCategory(payload).then(data => {
      callback({
        code: 1,
        data,
      });
    }, err => {
      alert(`조회 실패. [${err?.response?.status}/${err?.response?.data?.message}]`);
    });
  }, {
    id: 2,
  });
  return <View>{state.data && <Detail id={2} name={state.data.name} />}</View>;
}
