import React from 'react'
import { getPlants } from './ajax'
import { useAsyncView } from './hook'
import PlantDetail from './PlantDetail'

export default function Plant() {
  const [ id, setId ] = React.useState(null);
  const edit = React.useMemo(() => {
    if(id === null) {
      return null;
    }
    return <PlantDetail id={id} />
  }, [ id ]);
  const Row = (row, index) => (
    <tr key={index} onClick={() => setId(row.id)}>
      <td>{row.id}</td>
      <td><img height="64px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`category_id${row.id}`} /></td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>{row.categoryId}</td>
      <td>{row.categoryName}</td>
    </tr>
  );
  const [ View, state ] = useAsyncView((payload, callback) => {
    getPlants(payload).then(data => callback({
      code: 1,
      data,
    }), err => callback({
      code: -1,
      data: {
        code: err?.response?.status,
        message: err?.response?.data?.message,
      },
    }));
  });

  return <>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이미지</th>
          <th>작물명</th>
          <th>설명</th>
          <th>분류</th>
        </tr>
      </thead>
      <tbody>
        {edit}
      </tbody>
    </table>
    <View>
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
          {state.data?.plants?.map && state.data.plants.map(Row)}
        </tbody>
      </table>
    </View>
  </>
}
