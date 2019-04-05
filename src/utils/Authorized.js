import { Authorized as RenderAuthorized } from 'ant-design-pro';
import { getRole } from './authority';

let Authorized = RenderAuthorized(getRole()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getRole());
};

export { reloadAuthorized };
export default Authorized;
