import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/v1/api/role');
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function findAll() {
  return request('/v1/api/user');
}
