import request from '@/utils/request';

export default async function queryfactoryList() {
  return request(`/v1/api/factory`);
}
