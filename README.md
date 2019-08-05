# 法心 CMS

本项目为 `法心` App 的 管理平台。

- [法心 CMS](#%e6%b3%95%e5%bf%83-cms)
  - [技术栈](#%e6%8a%80%e6%9c%af%e6%a0%88)
  - [安装前提](#%e5%ae%89%e8%a3%85%e5%89%8d%e6%8f%90)
  - [项目命令](#%e9%a1%b9%e7%9b%ae%e5%91%bd%e4%bb%a4)
    - [启动项目](#%e5%90%af%e5%8a%a8%e9%a1%b9%e7%9b%ae)
    - [其他命令](#%e5%85%b6%e4%bb%96%e5%91%bd%e4%bb%a4)
  - [开发规范](#%e5%bc%80%e5%8f%91%e8%a7%84%e8%8c%83)
    - [目录结构](#%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)
    - [组件](#%e7%bb%84%e4%bb%b6)
    - [代码风格约束](#%e4%bb%a3%e7%a0%81%e9%a3%8e%e6%a0%bc%e7%ba%a6%e6%9d%9f)
    - [git 规范](#git-%e8%a7%84%e8%8c%83)
      - [commit message 规范](#commit-message-%e8%a7%84%e8%8c%83)
        - [type](#type)
        - [scope](#scope)
        - [subject](#subject)
      - [分支管理](#%e5%88%86%e6%94%af%e7%ae%a1%e7%90%86)
        - [新分支开发](#%e6%96%b0%e5%88%86%e6%94%af%e5%bc%80%e5%8f%91)
    - [单元测试](#%e5%8d%95%e5%85%83%e6%b5%8b%e8%af%95)
    - [VSCode Plugins](#vscode-plugins)
  - [前后端协作](#%e5%89%8d%e5%90%8e%e7%ab%af%e5%8d%8f%e4%bd%9c)
    - [开发流程](#%e5%bc%80%e5%8f%91%e6%b5%81%e7%a8%8b)
    - [Mock 数据](#mock-%e6%95%b0%e6%8d%ae)
  - [权限控制](#%e6%9d%83%e9%99%90%e6%8e%a7%e5%88%b6)
  - [安全](#%e5%ae%89%e5%85%a8)
    - [XSS](#xss)
    - [CORS](#cors)

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

### 其他命令

| 命令         | 效果                   |
| ------------ | ---------------------- |
| stat         | 启动项目               |
| test         | 启动测试               |
| build        | 构建打包               |
| deploy       | 部署                   |
| analyze      | 分析 bundle 体积       |
| fetch:blocks | 获取 antd pro 区块     |
| lint         | 检验代码风格规范       |
| lint:fix     | 根据 lint 规则修复代码 |
| tree         | 生成项目目录树         |

## 开发规范

### 目录结构

```txt
 ├─ config // umi 相关配置
 | ├─  routes.js // 路由配置文件
 | ├─  plugin.config.js
 | ├─  defaultSettings.js
 | └─  config.js
 ├─ public // 静态资源
 ├─ script // 开发、构建脚本
 | ├─  file-tree.js
 | └─  commitmsg.validate.js
 ├─ src
 | ├─ assets // 待加工的静态资源
 | | └─  logo.svg
 | ├─ components //
 | | ├─ commons // 非业务通用组件
 | | ├─ modules // 业务通用组件
 | ├─ constants // 全局常量维护
 | | ├─  storage.js // localStorage、sessionStorage 键名维护
 | | ├─  reg.js // 全局通用正则维护
 | | └─  enum.js // 全局枚举维护
 | ├─ e2e // e2e test
 | ├─ layouts // 全局通用 layout
 | ├─ models // data model
 | | ├─  user.js
 | | ├─  setting.js
 | | ├─  login.js
 | | └─  global.js
 | ├─ pages
 | | ├─ .umi umi生成的配置文件
 | | ├─  Welcome.jsx
 | | ├─  document.ejs // 文档
 | | ├─  Authorized.jsx
 | | └─  404.jsx // 404 页面
 | ├─ services // API 维护
 | | └─  user.js
 | ├─ styles // 样式
 | | └─  utils.less // 工具类
 | ├─ utils // 通用方法
 | | ├─  request.js // 请求
 | | ├─  index.js // 各种通用方法
 | | ├─  format.js // 格式化的通用方法（时间、文件名）
 | | ├─  dom.js // dom 操作通用方法
 | | ├─  Authorized.js // todo delete
 | | └─  authority.js // todo delete
 | ├─  global.less // 全局样式文件
 | └─  global.jsx // 全局 js
 ├─ tests // 测试文件
 | └─  run-tests.js
 ├─  README.md
 ├─  package.json
 ├─  package-lock.json
 ├─  jsconfig.json
 ├─  jest.config.js
 ├─  jest-puppeteer.config.js
 ├─  file-tree.txt
 ├─  CNAME
 ├─  .stylelintrc.js // 样式规则
 ├─  .prettierrc.js // 代码风格
 ├─  .prettierignore
 ├─  .gitignore
 ├─  .eslintrc.js // JS规则
 ├─  .eslintignore
 └─  .editorconfig

```

### 组件

### 代码风格约束

- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)

### git 规范

#### commit message 规范

git commit 尽量细化，每一次 commit 对应一个小功能，message 为该功能的简要描述。可以一个分支多个 commit。

消息格式: [type] -[scope][subject], 示例: feat -g 权限接入

##### type

> `type` 用于说明 commit 的类别，只允许使用下面 6 个标识。

- `feat`：新功能（feature）
- `fix`：修补 bug
- `docs`：文档（documentation）
- `style`： 代码风格（不影响代码运行的变动），比如 `eslint` 风格，并非是样式更换
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）
- `chore`：构建过程或辅助工具的变动

##### scope

> `scope` 用于说明 commit 影响的范围，目前约定影响作用域为全局(`global`)、模块(`module`)、局部(`local`)。

在 commit message 内，使用缩写来代替。

作用域可选值分别为：

- 全局(g)：`feat -g 新增全局方法`
- 模块(m)：`style -m 修改模块样式`
- 局部(l)：`fix -l 修复某个bug`

##### subject

`subject` 是 commit 目的的简短描述，不超过 50 个字符，颗粒度尽可能细致。

#### 分支管理

##### 新分支开发

1. 从 develop 拉取新分支，新分支名字格式为 [type]-[yourBranchName]， `type` 为 commit message 规范中的`type`, 例如 `feat-login`
2. 开发完毕执行 git add & git commit
3. git push
4. 在 github 上切换到你推送的新分支，发起 New Pull Reqeust， Assignees 选择非自己的开发人员，再由他 Code Review 后进行 Merge

### 单元测试

待定

### VSCode Plugins

- GitLens
- Eslint
- Stylelint
- Path Intellisense
- ...

## 前后端协作

### 开发流程

1. 需求评估。前后端需求评审，评估开发时间
2. 开发阶段。前端开发静态页面，后端给出接口文档。之后前后端并行开发
3. 联调阶段。双方结束开发，进入联调阶段。
4. 测试阶段。
5. 部署上线。

### Mock 数据

- mock 平台: [YApi](https://hellosean1025.github.io/yapi/)

## 权限控制

待定

## 安全

### XSS

### CORS
