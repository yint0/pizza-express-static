import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import settings from './zh-CN/settings';
import login from './zh-CN/login';
import factory from './zh-CN/factory';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.home.introduce': '介绍',
  'app.authentication.failed.hint.line1': '您没有权限访问这个页面',
  'app.authentication.failed.hint.line2': '请确认您的用户名密码，重新登录',
  ...globalHeader,
  ...menu,
  ...settings,
  ...login,
  ...factory,
};
