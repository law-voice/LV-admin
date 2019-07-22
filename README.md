# 法心 CMS

本项目为 `法心` App 的 管理平台。

## 技术栈
- [react](https://reactjs.org/) & [中文文档](https://zh-hans.reactjs.org/)
- [umi](https://umijs.org/zh/guide/)
- [dva](https://dvajs.com/guide/)
- [react-router](https://reacttraining.com/react-router/web/) & [中文文档](https://www.redux.org.cn/)
- [redux](https://redux.js.org/) & [中文文档](https://www.redux.org.cn/)
- [redux-saga](https://redux-saga.js.org/) & [中文文档](https://redux-saga-in-chinese.js.org)
- [Ant-Design](https://ant.design/docs/react/introduce-cn)

> 后续可能考虑迁移至 `Typescript`

## 安装前提
`node`、`npm`

## 项目命令

### 启动项目

> 首次运行需执行以下命令
1. `yarn` (or `npm install`)

2. `yarn dev` (or `npm run dev`)

## 前后端协作

### 开发流程
1. 需求评估。前后端需求评审，评估开发时间
2. 开发阶段。前端开发静态页面，后端给出接口文档。之后前后端并行开发
3. 联调阶段。双方结束开发阶段，进入联调。
4. 测试阶段。
5. 部署上线。

### Mock数据
- mock平台: [YApi](https://hellosean1025.github.io/yapi/)

## 权限控制
待定

## 安全
待定

## 开发规范

### 目录结构

### 组件

### lint 规范
- eslint
- stylelint

### git 规范
#### commit message 规范
git commit 尽量细化，每一次 commit 对应一个小功能，message 为该功能的简要描述。可以一个分支多个 commit。

消息格式: [type] -[scope] [subject], 示例: feat -g 权限接入
##### type
> `type` 用于说明 commit 的类别，只允许使用下面6个标识。
- `feat`：新功能（feature）
- `fix`：修补bug
- `docs`：文档（documentation）
- `style`： 代码风格（不影响代码运行的变动），比如 `eslint` 风格，并非是样式更换
- `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）
- `chore`：构建过程或辅助工具的变动
##### scope
> `scope` 用于说明 commit 影响的范围，目前约定影响作用域为全局(`global`)、模块(`module`)、局部(`local`)。

在 commit message 内，使用缩写来代替。

作用域可选值分别为：
- 全局(g)：`feat -g 新增全局方法`
- 模块(m)：`style -m 修改模块样式`
- 局部(l)：`fix -l 修复某个bug`
##### subject
`subject` 是 commit 目的的简短描述，不超过50个字符，颗粒度尽可能细致。

#### 分支管理
##### 新分支开发
1. 从 develop 拉取新分支，新分支名字格式为 [type]-[yourBranchName]， `type` 为 commit message 规范中的`type`, 例如 `feat-login`
2. 开发完毕执行 git add & git commit
3. git push
4. 在 github 上切换到你推送的新分支，发起 New Pull Reqeust， Assignees 选择非自己的开发人员，再由他 Code Review 后进行 Merge


### 单元测试
待定
