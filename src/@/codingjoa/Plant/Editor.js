import React from 'react'
import { getCategories, postPlant, updatePlant, deletePlant } from '@/codingjoa/ajax'
import { useViewDispatch, useInputRef, useInputRefHandlar } from '@/codingjoa/hook'

function Option({
  data,
}) {
  const Row = row => {
    return <option key={row.id} value={`${row.id}`}>{row.name}</option>
  };
  return data.map ? data.map(Row) : null;
}


export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const options = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getCategories({}).then(
          data => dispatch({
            type: 'fetched',
            result: data,
          }),
        );
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <option>...</option>
      }
      if(state.type === 'fetched') {
        return <Option data={state.data} />
      }
      return null
    },
    reducer(state, action) {
      if(action.type === 'pending') {
        return {
          ...state,
          type: 'pending',
          data: null,
        };
      }
      if(action.type === 'fetched') {
        return {
          ...state,
          type: 'fetched',
          data: action.result.categories,
        };
      }
      return state;
    },
    initialValue: {
      type: 'pending',
      data: null,
    },
  });
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
    <div>
      <div>
        <h3>작물명</h3>
        <input ref={name} />
        <h3>설명</h3>
        <textarea ref={description} rows="10"></textarea>
        <h3>분류</h3>
        <select ref={categoryId}>
          {options}
        </select>
        <h3>이미지</h3>
        <input type="file" ref={image} />
      </div>
      <div>
        <button onClick={handleSubmit}>등록</button>
        {handleDelete && <button onClick={handleDelete}>삭제</button>}
        <button onClick={() => dispatch({ type: 'refresh' })}>취소</button>
      </div>
    </div>
  );
}
