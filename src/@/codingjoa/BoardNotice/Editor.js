import { useInputRef, useInputRefHandlar } from '@/codingjoa/hook'
import { postBoardNotice, updateBoardNotice, deleteBoardNotice  } from '@/codingjoa/ajax'

export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const title = useInputRef(payload?.title ?? '');
  const content = useInputRef(payload?.content ?? '');
  const handleSubmit = useInputRefHandlar(payload => {
    if(id > 0) {
      updateBoardNotice({
        ...payload,
        id,
      }).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    } else {
      postBoardNotice(payload).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    }

  }, {
    title,
    content,
  });
  const handleDelete = id > 0 ? () => {
    deleteBoardNotice({
      id,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  } : null;
  return (
    <div>
      <input ref={title}></input><br />
      <input ref={content}></input><br />
      <button onClick={handleSubmit}>적용</button>
      <button onClick={handleDelete} disabled={!handleDelete}>삭제</button>
      <button onClick={() => dispatch({ type: 'refresh' })}>취소</button>
    </div>
  );
}
