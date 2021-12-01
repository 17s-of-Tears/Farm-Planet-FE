import { getPlants } from './ajax'
import { useAsyncView } from './hook'

function Row(row, index) {
  return (
    <tr key={index}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>{row.categoryId}</td>
      <td>{row.categoryName}</td>
    </tr>
  );
}

export default function Plant() {
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
  return <View>
    <table>
      <tr>
        <thead>
          <tr>
            <th>번호</th>
            <th>작물명</th>
            <th>설명</th>
            <th>분류번호</th>
            <th>분류명</th>
          </tr>
        </thead>
        <tbody>
          {state.data?.plants?.map && state.data.plants.map(Row)}
        </tbody>
      </tr>
    </table>
  </View>
}
