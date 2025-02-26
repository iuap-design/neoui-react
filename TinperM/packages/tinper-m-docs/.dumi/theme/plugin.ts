import { IApi } from 'dumi';

export default (api: IApi) => {
  api.modifyRoutes(memo => {
    memo['docs/preview/:component'] = {
      path: 'preview/:component',
      id: 'docs/preview/index',
      parentId: 'DocLayout',
      file: '../../docs/preview/index.md',
      absPath: '/preview'
    }

    memo['docs/design-guidance/:menu'] = {
      path: 'design-guidance/:menu',
      id: 'docs/design-guidance/index',
      parentId: 'DocLayout',
      file: '../../docs/design-guidance/index.md',
      absPath: '/design-guidance'
    }

    return memo;
  })
};
