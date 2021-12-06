import React from 'react'


/*
import { getFarms } from './ajax'
import { MixInList } from './mixin'

function Row(row, index) {
  return (
    <tr key={index}>
      <td>{row.id}</td>
      <td><img height="64px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`category_id${row.id}`} /></td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>{row.categoryId}</td>
      <td>{row.categoryName}</td>
    </tr>
  );
}

export default MixInList(
  getFarms,
  data => (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이미지</th>
          <th>작물명</th>
          <th>설명</th>
          <th>분류번호</th>
          <th>분류명</th>
        </tr>
      </thead>
      <tbody>
        {data?.farms?.map && data.farms.map(Row)}
      </tbody>
    </table>
  )
);
*/

function FarmAddMain() {
  return (<></>);
}

function FarmDetailMain({
  id,
}) {
  return (
    <>{id}</>
  );
}

function FarmListMain({
  detail
}) {
  return (
    <button onClick={() => detail(2)}>1번 리스트</button>
  );
}


export default function Farm() {
  const [ meta, setMeta ] = React.useState({
    id: null,
    type: 'list',
    pageMax: 1,
    data: null,
  });
  const [ currentPage, setCurrentPage ] = React.useState(1);

  const detail = (id) => {
    setMeta({
      id,
      type: 'edit',
      pageMax: meta.pageMax,
      data: meta.data,
    });
  };
  const changePage = page => {
    if(meta.pageMax < page) {
      setCurrentPage(meta.pageMax);
    } else if(1 > page) {
      setCurrentPage(0);
    }
  }
  const fetched = data => {
    setMeta({
      id: meta.id,
      type: meta.type,
      pageMax: data._meta.pageSize,
      data: data.farms,
    });
  }
  const view = React.useMemo(() => {
    if(meta.type === 'list') {
      return <FarmListMain detail={detail} changePage={changePage} />
    } else if(meta.type === 'edit') {
      return <FarmDetailMain id={meta.id} />
    }
    return null;
  }, [ meta ]);

  return (
    <div>
      {view}
    </div>
  );
}
