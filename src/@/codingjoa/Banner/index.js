import React from 'react'
import { getBanners, postBanner, deleteBanner } from '@/codingjoa/ajax'
import { useViewDispatch, useInputRefHandlar } from '@/codingjoa/hook'

function AddBanner({
  dispatch,
}) {
  const image = React.useRef(null);
  const handleSubmit = useInputRefHandlar(formData => {
    postBanner(formData).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  }, {
    image,
  })
  return (
    <>
      <input ref={image} type="file" />
      <button onClick={handleSubmit} className="submitBtn">등록</button>
    </>
  );
}

function reducer(state, action) {
  if(action.type === 'fetched') {
    return {
      ...state,
      type: 'list',
      data: action.result,
    };
  }
  if(action.type === 'page') {
    return {
      ...state,
      type: 'list',
      current: action.page,
    };
  }
  if(action.type === 'refresh') {
    return {
      ...state,
      type: 'pending',
      data: null,
    };
  }
  return state;
}

function BannerListMain({
  data,
  dispatch,
}) {
  const Row = (row, index) => {
    const handleDelete = e => {
      e.preventDefault();
      deleteBanner({
        id: row.id,
      }).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    };
    return (
      <tr key={index}>
        <td><img width="240px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`banner_id${row.id}`} /></td>
        <td><button onClick={handleDelete} className="deleteBtn">삭제</button></td>
      </tr>
    );
  };

  return <div className="adminBanner">
    <h3>배너 추가</h3>
    <div className="inputBox">
      <AddBanner dispatch={dispatch} />
    </div>            

    <h3>배너 목록</h3>
    <table className="tableStyle_1">
      <thead>
        <tr>
          <th>이미지</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>        
        {data.map && data.map(Row)}
      </tbody>
    </table>

  </div>
};

export default function Banner() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getBanners({}).catch(err => 0).then(data => dispatch({
          type: 'fetched',
          result: data,
        }));
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <BannerListMain data={state.data} dispatch={dispatch} />
      }
      return null;
    },
    reducer,
    initialValue: {
      type: 'pending',
      current: 1,
      last: 1,
      data: null,
      id: null,
    },
  });
  return view;
}
