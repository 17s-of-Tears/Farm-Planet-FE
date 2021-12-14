import React from 'react'
import { getSubscribes, getSubscribe, getSubscribePlant, postSubscribePlant } from '@/codingjoa/ajax'
import { useViewDispatch, useInputRefHandlar } from '@/codingjoa/hook'
import { Pagination } from 'antd';

import FarmEditor from './FarmEditor'
import FarmInfo from './FarmInfo'

function AddSubscribePlant({
  subscribeId,
  subscribePlantId,
  dispatch,
}) {
  const image = React.useRef(null);
  const handleSubmit = useInputRefHandlar(formData => {
    postSubscribePlant(subscribeId, subscribePlantId, formData).then(
      () => dispatch({ type: 'refresh' }),
      err => 0
    );
  }, {
    image,
  });
  return <>
    <input type="file" ref={image} />
    <button onClick={handleSubmit}>제출</button>
  </>
}

function PlantDetail({
  subscribeId,
  subscribePlantId,
  dispatch,
}) {
  const Row = row => (
    <div key={row.id}>
      <div>
        등록일: {row.createdAt}
      </div>
      <div>
        <img width="128px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} />
      </div>
    </div>
  );
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getSubscribePlant({
          subscribeId,
          subscribePlantId,
        }).then(
          data => dispatch({ type: 'fetched', result: data }),
          err => 0,
        );
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>
      }
      if(state.type === 'list') {
        return <div>
          <div>
            <h4>{state.data.name}</h4>
            <h6>{state.data.description}</h6>
            <img width="128px" src={`https://codingjoa.kro.kr:49000/${state.data.imageUrl}`} />
          </div>
          <div>
            <h6>재배 현황 등록</h6>
            <AddSubscribePlant subscribeId={subscribeId} subscribePlantId={subscribePlantId} dispatch={dispatch} />
          </div>
          {state.data.states.map && state.data.states.map(Row)}
        </div>
      }
      return null;
    },
    reducer(state, action) {
      if(action.type === 'fetched') {
        return {
          ...state,
          type: 'list',
          data: action.result,
        };
      }
      if(action.type === 'refresh') {
        return {
          ...state,
          type: 'pending',
          data: null
        };
      }
      return state;
    },
    initialValue: {
      type: 'pending',
      data: null,
    }
  });
  return <div>
    {view}
    <button onClick={() => dispatch({ type: 'refresh' })}>뒤로</button>
  </div>;
}

function SubscribeDetailMain({
  id,
  dispatch
}) {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getSubscribe({ id }).then(
          data => dispatch({ type: 'fetched', result: data }),
          err => alert(`조회 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
        );
      }
    },
    view(state, subDispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <div className="adminSubscribe-detail">
          <FarmInfo id={id} payload={state.data} dispatch={subDispatch} />
          <div>
            <button onClick={() => dispatch({ type: 'refresh' })} className="cancleBtn">뒤로</button>
          </div>
        </div>;
      }
      if(state.type === 'edit') {
        return <PlantDetail subscribeId={id} subscribePlantId={state.subscribePlantId} dispatch={subDispatch} />
      }
      if(state.type === 'editFarm') {
        return <FarmEditor id={id} payload={state.data.subscribe} dispatch={subDispatch} />
      }
      return null;
    },
    reducer(state, action) {
      if(action.type === 'refresh') {
        return {
          ...state,
          type: 'pending',
          data: null,
        };
      }
      if(action.type === 'fetched') {
        return {
          ...state,
          type: 'list',
          data: action.result,
        };
      }
      if(action.type === 'editFarm') {
        return {
          ...state,
          type: 'editFarm',
        };
      }
      if(action.type === 'edit') {
        return {
          ...state,
          type: 'edit',
          subscribePlantId: action.id,
        };
      }
      return state;
    },
    initialValue: {
      type: 'pending',
      data: null,
    },
  });
  return <div>
    {view}
  </div>;
}

function SubscribeListMain({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = row => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.farmName}</td>
      <td>{row.userName}</td>
      <td>{row.createdAt}</td>
      <td>{row.plants}</td>
      <td><button onClick={() => dispatch({ type: 'id', id: row.id })} className="updateBtn">관리</button></td>
    </tr>
  );

  return <div className="amdinSubscribe">
    <table className="tableStyle_1">
      <thead>
        <tr>
          <th>번호</th>
          <th>밭 이름</th>
          <th>사용자 이름</th>
          <th>구독일</th>
          <th>작물 수</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        {data.map && data.map(Row)}
      </tbody>
    </table>
    <Pagination onChange={page => dispatch({ type: 'refresh', page })} current={current} pageSize={1} total={total} />
  </div>
}

export default function Subscribe() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getSubscribes({ page: state.current }).then(
          data => dispatch({ type: 'fetched', result: data }),
          err => 0
        );
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>
      }
      if(state.type === 'list') {
        return <SubscribeListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <SubscribeDetailMain id={state.id} dispatch={dispatch} />
      }
      return null;
    },
    reducer(state, action) {
      if(action.type === 'fetched') {
        return {
          ...state,
          type: 'list',
          current: action.result._meta.page.current,
          last: action.result._meta.page.last,
          data: action.result.users,
        };
      }
      if(action.type === 'refresh') {
        return {
          ...state,
          type: 'pending',
          data: null,
          current: action.page ?? state.current,
        };
      }
      if(action.type === 'id') {
        return {
          ...state,
          type: 'edit',
          id: action.id,
        };
      }
      return null;
    },
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
