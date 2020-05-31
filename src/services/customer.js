import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCustomerList(params) {
  return request.get(`/law-voice/rest/user/userList?${stringify(params)}`);
}
