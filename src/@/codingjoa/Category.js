import * as ReactRouter from 'react-router-dom'
import { getCategories, deleteCategory } from './ajax'
import { useAsyncView } from './hook'

function Row(row, index) {
  const history = ReactRouter.useHistory();
  const handleDelete = e => {
    e.preventDefault();
    deleteCategory({
      id: row.id,
    }).then(() => history.go(0), err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  };
  return (
    <tr key={index}>
      <td>{row.id}</td>
      <td><img width="128px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`category_id${row.id}`} /></td>
      <td>{row.name}</td>
      <td><button onClick={handleDelete}>삭제</button></td>
    </tr>
  );
}

export default function Category() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getCategories(payload).then(data => callback({
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
            <th>이미지</th>
            <th>분류명</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {state.data?.categories?.map && state.data.categories.map(Row)}
        </tbody>
      </tr>
    </table>
  </View>
}
