import request from '@/utils/request';

export default async function queryfactoryList() {
  return request(`/v1/api/factory`);
}

export async function create(payload) {
  console.log(payload);
  return request.post('/v1/api/factory', { data: payload });
}

export async function update(id, payload) {
  console.log(id, payload);
  return request.put(`/v1/api/factory/${id}`, { data: payload });
}