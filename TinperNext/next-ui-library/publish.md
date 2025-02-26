## 各分支发包流程

### TinperNext版本包-发布流程

    一、当前正式版本：
        代码分支：/release/4.1.1  ->  包版本号：4.1.1

    二、开发下一版本：
        代码分支：/develop   commit 1 ->  包版本号：4.1.2-snapshot.2020010505
        代码分支：/develop   commit 2 ->  包版本号：4.1.2-snapshot.2020010506
        代码分支：/develop   commit xxx ->  包版本号：4.1.2-snapshot.xxx

    三、预发布下一版本：
        代码分支：/beta/4.1.2  commit 1 ->  包版本号：4.1.2-beta.0
        代码分支：/beta/4.1.2  commit 2 ->  包版本号：4.1.2-beta.1
        代码分支：/beta/4.1.2  commit xxx ->  包版本号：4.1.2-beta.xxx

    四、正式发布新版本：
        代码分支：/release/4.1.2  ->  包版本号：4.1.2

### 开发快照版【分支：4.x-develop】

    tag:snapshot

    发包：直接提交代码，合并提交代码自动发布

    测试环境定时固定时间自动更新此分支最新版本，工作台使用的tinpernext组件库(非demo示例)

### 日常预发验证版【分支：beta/x.x.x】

    tag:beta

    发包：直接提交代码，合并提交代码自动发布。目前发布4.0.0-beta.x版本,如需发布4.0.1-beta.x

    日常环境定时固定时间自动更新此分支最新版本，工作台使用的tinpernext组件库(非demo示例)

### 正式发布版【分支：release/x.x.x】

    tag:release

    发包：基于上一个发包分支拉取新版本分支合并提交，手动发包，发包后不可再次发布

    例如要发4.1.1，要基于relase/4.1.0新建release/4.1.1后 拉取4.x-develop（也可以是其他分支）分支代码，提交到release/4.1.1

### 新特征验证版【分支：feature/xxx】

    tag:xxx

    发包：合并提交代码自动发布

### 官网demo更新测试环境【使用分支：develop】

    将 4.x-develop分支内容合并到develop分支

### 官网demo更新日常环境【使用分支：daily】

    将 beta/x.x.x 分支内容合并到daily分支
