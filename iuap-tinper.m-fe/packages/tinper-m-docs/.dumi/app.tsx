/* 权限控制入口, 后续配合登陆功能限制未登录用户可见的文档内容 */
/* import { matchRoutes } from 'dumi';

export function render(oldRender) {
  console.log(oldRender)
  if (/design-/g.test(location.href)) location.href = ''
  oldRender()
}

export function onRouteChange({ clientRoutes, location }) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  console.log('zyh-route', route)
}
 */
