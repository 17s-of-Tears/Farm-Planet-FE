import { getFarms } from './ajax'
import { useAsyncView } from './hook'

function MixInList(getListAjax, createView) {
  return function MixInList() {
    const [ View, state ] = useAsyncView((payload, callback) => {
      getListAjax(payload).then(data => callback({
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
      {state?.data && createView(state.data)}
    </View>
  }
}

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

/*
function MixInEditor(getDetailAjax, updateDetailAjax, deleteDetailAjax, createView) {
  return function MixInEditor() {
    const [ View, state ] = useAsyncView((payload, callback) => {
      getDetailAjax(payload).then(data => callback({
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
      <div>
        {state?.data && createView(state.data)}
      </div>
      <div>

      </div>
    </View>
  }
}
*/
