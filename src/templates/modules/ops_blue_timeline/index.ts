import img from '@/assets/svg/empty.svg'

export default {
  type: 'ops_blue_timeline',
  name: '蓝色时间轴运维模板',
  content: `![个人头像](/resume-avatar-placeholder.svg)
# 个人简历

姓名：张同学 ｜ 年龄：应届生 ｜ 求职意向：运维工程师 / 云计算工程师

电话：138xxxx0000 ｜ 邮箱：example@example.com ｜ 城市：某城市 ｜ GitHub：github.com/example

## 教育背景

**示例大学 - 计算机相关专业 - 本科** | 2021年09月 - 2025年06月

## 技能

- 熟悉 Linux 系统常用命令与基础服务管理，能够完成日志查看、进程排查和网络连通性定位
- 熟悉 Docker 镜像构建、容器运行、端口映射、数据卷及常见容器化部署流程


## 项目经历

**轻量级服务监控与告警平台** | 2025年03月 - 2025年05月

**技术栈：** \`Docker\` \`Shell\` \`Prometheus\` \`Nginx\` \`Grafana\`

**项目简介：** 基于开源组件搭建一套轻量级监控平台，用于展示服务器资源、服务状态和关键指标，帮助团队及时发现异常并提升日常运维效率。

**主要工作：**

- 使用 Docker Compose 编排 Prometheus、Grafana、Node Exporter 等基础组件
- 编写基础监控配置，采集 CPU、内存、磁盘和网络等常用指标


## 实习经历

**云舟科技有限公司（示例）** | **运维实习生** | 2025年06月 - 2025年09月

**主要工作：**

- 参与公司内部测试环境服务器巡检，记录 CPU、内存、磁盘和服务运行状态
- 编写简单 Shell 脚本处理日志归档、临时文件清理和服务状态检查
- 与开发同学配合完成测试环境发布验证，保障服务按计划上线`,
  primaryColor: '#4f8ed8',
  primaryBackground: '#5d94d7',
  font: 'Noto Sans SC',
  lineHeight: 26,
  img,
  hot: 0
}
