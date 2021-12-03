import axios from 'axios'
axios.defaults.baseURL = 'https://codingjoa.kro.kr:49000/'
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

export async function signoutAdmin() {
  await axios({
    method: 'DELETE',
    url: '/api/v1/admin/sign',
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
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/board/notice?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getBoardNotice({
  id,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/board/notice/${id}`,
  });
  return result.data;
}

export async function postBoardNotice({
  title,
  content,
}) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/board/notice',
    data: {
      title,
      content,
    },
  });
}

export async function updateBoardNotice({
  id,
  title,
  content,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/board/notice/${id}`,
    data: {
      title,
      content,
    },
  });
}

export async function deleteBoardNotice({
  id,
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/board/notice/${id}`,
  });
}

export async function getBanners() {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/banner`,
  });
  return result.data;
}

export async function postBanner(formData) {
  const result = await axios({
    method: 'POST',
    url: `/api/v1/admin/category/banner`,
    data: formData,
  });
}

export async function deleteBanner({
  id
}) {
  const result = await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/banner/${id}`,
  });
}

export async function getCategories() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin/category',
  });
  return result.data;
}

export async function getCategory({
  id
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/${id}`,
  });
  return result.data;
}

export async function postCategory(formData) {
  const result = await axios({
    method: 'POST',
    url: '/api/v1/admin/category',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function updateCategory(id, formData) {
  const result = await axios({
    method: 'PUT',
    url: `/api/v1/admin/category/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function deleteCategory({
  id
}) {
  const result = await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/${id}`,
  });
}

export async function getPlants() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin/category/plant',
  });
  return result.data;
}

export async function getPlant({
  id,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/plant/${id}`,
  });
  return result.data;
}

export async function postPlant(formData) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/category/plant',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function updatePlant(id, formData) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/category/plant/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function deletePlant({
  id
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/plant/${id}`,
  });
}

export async function getAccounts() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin/account/',
  });
  return result.data;
}

export async function postAccount({
  accountID,
  name,
}) {
  const result = await axios({
    method: 'POST',
    url: '/api/v1/admin/account',
    data: {
      accountID,
      name,
    },
  });
  return result.data;
}

export async function updateAccount({
  id,
  name,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/account/${id}`,
    data: {
      name,
    },
  });
}

export async function resetPassword({
  id,
}) {
  const result = await axios({
    method: 'PUT',
    url: `/api/v1/admin/account/${id}/pw`,
  });
  return result.data?.password ?? null;
}

export async function getUsers() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin/user',
  });
  return result.data;
}

export async function updateUser({
  id,
  name,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/user/${id}`,
    data: {
      name,
    },
  });
}
