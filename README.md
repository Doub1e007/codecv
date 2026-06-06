# CodeCV 本地简历制作工具

CodeCV 是一个基于 Vue 3、Vite 和 Markdown 的简历制作工具。你可以在本地选择模板、编辑 Markdown 简历、实时预览排版，并导出 Markdown 或通过浏览器打印生成 PDF。

本仓库已经在原项目基础上做了本地化调整

原项目地址：[https://github.com/acmenlei/codecv](https://github.com/acmenlei/codecv)

## 目录

- [环境要求](#环境要求)
- [从零复现](#从零复现)
- [本地制作简历](#本地制作简历)
- [导出简历](#导出简历)
- [环境变量](#环境变量)
- [Docker 部署](#docker-部署)
- [项目结构](#项目结构)
- [常用命令](#常用命令)
- [常见问题](#常见问题)

## 环境要求

推荐环境如下：

| 工具 | 推荐版本 | 说明 |
| --- | --- | --- |
| Node.js | 16.20.x 或 18.x | Vite 3 可以运行在 Node 14.18+，推荐使用 16 或 18 |
| npm | 8.x 或 9.x | 本项目已包含 `package-lock.json`，推荐使用 npm 安装 |
| Git | 2.x | 用于克隆项目 |
| Chrome / Edge | 最新稳定版 | 用于预览和打印导出 PDF |

查看本机版本：

```powershell
node -v
npm -v
git --version
```

如果你在国内网络环境安装依赖较慢，可以先设置 npm 镜像：

```powershell
npm config set registry https://registry.npmmirror.com
```

## 从零复现

### 1. 获取代码

当前 README 描述的是这份已经做过本地化改造的项目。要精确复现当前版本，请使用当前目录，或者把当前目录提交到你自己的 Git 仓库后再克隆：

```powershel
git clone https://github.com/Doub1e007/codecv.git
cd codecv
```

原始上游仓库地址是：

```text
https://github.com/acmenlei/codecv.git
```

注意：直接克隆上游仓库只能得到原作者版本

### 2. 安装依赖

推荐使用锁文件安装，确保依赖版本一致：

```powershell
npm ci
```

如果你的环境没有完整锁文件，使用：

```powershell
npm install
```

安装完成后，项目根目录会出现 `node_modules`。

### 3. 启动开发服务

```powershell
npm run dev
```

正常启动后，终端会显示类似地址：

```text
Local:   http://localhost:5173/
```

在浏览器打开：

```text
http://localhost:5173/
```

也可以直接进入蓝色时间轴运维模板编辑页：

```text
http://localhost:5173/#/editor?type=ops_blue_timeline
```

### 4. 验证复现成功

打开编辑页后应能看到：

- 左侧为 Markdown 编辑器。
- 左上角头像占位图可点击上传。


## 本地制作简历

### 选择模板

首页会展示可用模板。当前本地版本保留蓝色时间轴运维模板

如果浏览器曾经缓存过旧内容，请打开编辑页后点击顶部工具栏中的“重置简历内容”按钮，或者清理浏览器 `localStorage` 后刷新页面。

### 编辑内容

编辑页支持两种方式：

- Markdown 模式：直接修改左侧 Markdown 内容。
- 富文本模式：在可视化编辑区域中修改内容。

简历内容会自动保存到浏览器 `localStorage`。刷新页面后一般不会丢失，但正式修改前仍建议导出 `.md` 文件备份。

### 修改头像

蓝色时间轴模板第一行包含头像占位符：

```markdown
![个人头像](/resume-avatar-placeholder.svg)
```

上传方式：

1. 打开蓝色时间轴模板编辑页。
2. 点击预览区左上角头像占位图。
3. 选择本地 `.png`、`.jpg`、`.jpeg`、`.gif`、`.bmp` 或 `.webp` 图片。
4. 图片会以 base64 形式写入 Markdown，并保存到本地浏览器缓存。

也可以手动把头像改成网络图片地址：

```markdown
![个人头像](https://example.com/avatar.jpg)
```

注意：头像替换依赖 `![个人头像](...)` 这个占位符，请不要删除 `个人头像` 这四个字。

### 保存 Markdown

顶部菜单支持导出 MD。建议在完成简历后导出一份 `.md` 文件，之后可以通过导入 MD 恢复或继续编辑。

## 导出简历

项目里有两种导出方式：

### 备用导出，本地推荐

点击编辑页顶部的“备用导出”，项目会跳转到打印页并调用浏览器打印。

推荐打印设置：

- 目标打印机：另存为 PDF。
- 纸张：A4。
- 边距：无或默认。
- 背景图形：开启。
- 缩放：默认或适合页面。

这是本地最稳定的 PDF 导出方式，不依赖服务端。

### 导出 PDF，依赖线上服务

顶部“导出 PDF”按钮会请求 `VITE_EXPORT_URL` 指向的服务端导出接口。如果没有配置该接口，或者网络无法访问该接口，导出会失败。

本地只想制作简历时，不需要配置该服务；使用“备用导出”即可。

## 环境变量

项目根目录可以创建 `.env.local` 来覆盖本地环境变量：

```env
VITE_BASE_URL=
VITE_EXPORT_URL=
VITE_UPSTASH_BASE_URL=
VITE_UPSTASH_GET_TOKEN=
VITE_UPSTASH_SET_TOKEN=
VITE_GITEE_API_URL=
```

变量说明：

| 变量 | 是否必填 | 作用 |
| --- | --- | --- |
| `VITE_BASE_URL` | 否 | 后端 API 地址，登录、社区、图片上传等在线功能会用到 |
| `VITE_EXPORT_URL` | 否 | 服务端 PDF / 图片导出接口 |
| `VITE_UPSTASH_BASE_URL` | 否 | 模板热度和导出次数统计 |
| `VITE_UPSTASH_GET_TOKEN` | 否 | Upstash 读取 token |
| `VITE_UPSTASH_SET_TOKEN` | 否 | Upstash 写入 token |
| `VITE_GITEE_API_URL` | 否 | Gitee star 数据接口 |

本地简历编辑、头像上传、Markdown 保存和备用导出不需要这些变量。

生产构建默认读取 `.env.production`：

```env
VITE_DROP_CONSOLE=true
```

该变量用于在构建时移除 `console` 和 `debugger`。

## Docker 部署

Dockerfile 使用 `httpd:2.4-alpine` 托管 `dist` 静态文件。

先构建前端产物：

```powershell
npm run build
```

再构建镜像：

```powershell
docker build -t codecv:v1 .
```

启动容器：

```powershell
docker run -d -p 8080:80 --name codecv --restart=always codecv:v1
```

访问：

```text
http://localhost:8080/
```

也可以使用原作者发布的镜像：

```powershell
docker run -d -p 8080:80 --name codecv --restart=always docker.io/wenyang0/codecv:latest
```

## 项目结构

```text
codecv
├─ public                         静态资源
│  └─ resume-avatar-placeholder.svg
├─ src
│  ├─ api                         接口封装
│  ├─ assets                      项目资源
│  ├─ components                  公共组件
│  ├─ router                      路由
│  ├─ store                       Pinia 状态管理
│  ├─ templates                   简历模板
│  │  ├─ config.ts                自动扫描模板入口
│  │  └─ modules
│  │     └─ ops_blue_timeline     蓝色时间轴运维模板
│  ├─ utils                       工具函数
│  └─ views
│     ├─ editor                   简历编辑页
│     ├─ download                 浏览器打印导出页
│     ├─ home                     首页
│     └─ template                 模板页
├─ package.json                   脚本和依赖
├─ vite.config.ts                 Vite 配置
└─ Dockerfile                     静态部署镜像
```

### 模板开发规则

每个模板放在 `src/templates/modules/<template_type>` 下：

```text
src/templates/modules/example_template
├─ index.ts
└─ style.scss
```

`index.ts` 导出模板元信息和默认 Markdown：

```ts
export default {
  type: 'example_template',
  name: '示例模板',
  content: '# 个人简历',
  primaryColor: '#333',
  primaryBackground: '#fff',
  font: 'Noto Sans SC',
  lineHeight: 26,
  img,
  hot: 0
}
```

`src/templates/config.ts` 会通过 `import.meta.glob('./modules/*/index.ts')` 自动扫描模板。只要目录里存在 `index.ts`，模板就会出现在模板列表中。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm ci` | 按锁文件安装依赖 |
| `npm install` | 安装或更新依赖 |
| `npm run dev` | 启动本地开发服务 |
| `npm run build` | 类型检查并构建生产产物 |
| `npm run preview` | 本地预览 `dist` 产物 |
| `npm run lint` | 自动修复 ESLint 可修复问题 |
| `npm run formater` | 使用 Prettier 格式化部分源码 |

生产构建完成后，产物在 `dist` 目录。

本地预览生产产物：

```powershell
npm run build
npm run preview
```

## 常见问题

### npm 安装很慢或失败

先切换镜像：

```powershell
npm config set registry https://registry.npmmirror.com
npm ci
```

如果仍失败，删除依赖后重新安装：

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

### PowerShell 不允许执行脚本

如果你使用 Yarn 或某些全局命令时看到 `无法加载文件 ...ps1`，以管理员身份打开 PowerShell，执行：

```powershell
Set-ExecutionPolicy RemoteSigned
```

然后选择 `Y` 或 `A`。

### 打开后仍是旧模板内容

简历内容会缓存在浏览器 `localStorage` 中。解决方式：

1. 点击编辑页顶部工具栏的“重置简历内容”。
2. 或者在浏览器开发者工具中清理当前站点的 `localStorage`。
3. 再刷新页面。

蓝色时间轴模板对应的缓存 key 是：

```text
markdown-content-ops_blue_timeline
```


### 导出 PDF 失败

优先使用“备用导出”，通过浏览器打印另存为 PDF。

“导出 PDF”按钮依赖 `VITE_EXPORT_URL` 配置的服务端接口；没有接口时，本地会导出失败，这是预期行为。


## License

MIT © [Coderlei](./LICENSE)

> 原项目免费开源用于学习。若二次部署或公开使用，请保留原作者和原仓库地址说明。
