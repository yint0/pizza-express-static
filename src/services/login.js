import request from '@/utils/request';
import MD5 from 'md5';

export default async function login(params) {
  return request('/v1/api/admin/login', {
    method: 'POST',
    data: {
      account: params.userName,
      password: MD5(params.password),
    },
  });
}
