import queryfactoryList, { create, update } from '@/services/factory';
import { message } from 'antd';

export default {
  namespace: 'factory',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryfactoryList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call }) {
      yield call(create, payload);
      message.success('提交成功');
    },
    *update({ payload }, { call }) {
      yield call(update, payload.id, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
