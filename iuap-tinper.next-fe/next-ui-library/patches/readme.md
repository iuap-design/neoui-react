- 如需对node_modules下的代码修改，并生成补丁文件
- 手动执行以下命令(package-name换成对应包名)：
npx patch-package package-name
- 通过patch打补丁的包必须锁定版本号，以免依赖更新时patch失效导致生产事故；
