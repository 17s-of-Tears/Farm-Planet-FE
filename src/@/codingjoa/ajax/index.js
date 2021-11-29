import axios from 'axios'
axios.defaults.baseURL = 'http://txshi.iptime.org:49000/'
axios.defaults.withCredentials = true;

export async function signAdmin({
  id,
  password,
}) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/sign',
    data: {
      id,
      password,
    },
  });
}

export async function getMyInfo() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin',
  });
  return result.data;
}

export async function getBoardNotices({
  page = 0,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/board/notice?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}
