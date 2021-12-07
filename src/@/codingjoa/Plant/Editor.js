import React from 'react'
import { postPlant, updatePlant, deletePlant } from '@/codingjoa/ajax'
import { useInputRef, useInputRefHandlar } from '@/codingjoa/hook'

export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const name = useInputRef(payload.name ?? '');
  const description = useInputRef(payload.description ?? '');
  const categoryId = useInputRef(`${payload.categoryId}` ?? '0');
  const image = React.useRef(null);
  const handleSubmit = useInputRefHandlar(formData => {
    if(id > 0) {
      updatePlant(id, formData).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    } else {
      postPlant(formData).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    }
  }, {
    name,
    image,
    description,
    categoryId,
  });
  const handleDelete = id > 0 ? () => {
    deletePlant({
      id,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  } : null;
  return (
    <tr>
      <td>{id}</td>
      <td><input type="file" ref={image} /></td>
      <td><input ref={name} /></td>
      <td><input ref={description} /></td>
      <td><input ref={categoryId} type="number" /></td>
      <td>
        <button onClick={handleSubmit}>등록</button>
        {handleDelete && <button onClick={handleDelete}>삭제</button>}
      </td>
    </tr>
  );
}
