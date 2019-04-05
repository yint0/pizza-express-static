import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryfactoryList() {
  return request(`/v1/api/factory`);
}