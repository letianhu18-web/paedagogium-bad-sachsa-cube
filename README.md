# 魔方里的 Pädagogium Bad Sachsa

一个以互动 3D 魔方为入口的中文学校介绍网站。魔方默认从打乱状态开始自动旋转，贴纸会分阶段平滑变化、自动复原并重新进入下一轮。内容以 Pädagogium Bad Sachsa 学校官网公开资料为主，包含学校、历史、管理团队、教师、寄宿生活、联系方式与逐条来源。

## 安装与运行

需要 Node.js 20.9 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

检查项目：

```bash
npm run typecheck
npm run lint
npm run build
```

## 主要技术

- Next.js 16（App Router）
- TypeScript
- Tailwind CSS 4
- Three.js + React Three Fiber + Drei
- Framer Motion

## 页面结构

```text
src/
├─ app/
│  ├─ page.tsx                  首页 / 3D 魔方
│  ├─ school/page.tsx           学校介绍
│  ├─ history/page.tsx          历史时间轴
│  ├─ leadership/page.tsx       校长与管理人员
│  ├─ teachers/page.tsx         教师列表与搜索
│  ├─ teachers/[id]/page.tsx    教师详情
│  ├─ internat/page.tsx         寄宿学校
│  ├─ contact/page.tsx          联系方式
│  └─ sources/page.tsx          资料来源
├─ components/
│  ├─ cube/                     3D 魔方、动态加载与 2D 后备界面
│  └─ teachers/                 教师检索组件
└─ data/
   ├─ teachers.ts               教师数据
   ├─ leadership.ts             管理人员数据
   ├─ history.ts                历史时间轴数据
   ├─ sources.ts                来源记录
   └─ site.ts                   导航、魔方面与联系方式
```

## 数据来源

优先使用学校官网：<https://www.internats-gymnasium.de/>。

每条重要信息的具体页面、用途、获取日期和核实日期列在网站 `/sources` 页面及 `src/data/sources.ts`。人员和历史记录中也保存了对应来源链接。学校官网不同页面对创办时间存在 1889/1890 的表述差异，网站没有自行合并结论，而是在学校页和历史页明确说明。

当前资料最后核实日期：`2026-07-15`。

## 修改教师数据

所有教师数据位于 `src/data/teachers.ts`。每条数据结构为：

```ts
{
  id: "unique-url-id",
  name: "官网公开姓名",
  photo: "/images/teachers/unique-url-id.jpg", // 仅有官网真实照片时填写
  subjects: [
    { de: "Mathematik", zh: "数学", category: "自然科学", lead: false }
  ],
  roles: [{ de: "官网德语职务", zh: "中文翻译" }],
  email: "仅在官网公开时填写",
  phone: "仅在官网公开时填写",
  source: "来源网址",
  verifiedAt: "YYYY-MM-DD"
}
```

修改后运行 `npm run typecheck`、`npm run lint` 和 `npm run build`。

## 添加新教师

1. 在学校官网教师页确认姓名、学科和公开职务。
2. 在 `teachers` 数组末尾添加一条记录。
3. `id` 使用唯一、稳定、适合 URL 的小写拉丁字符和连字符。
4. 复用已有学科分类：`语言`、`自然科学`、`社会科学`、`艺术与体育`、`宗教与价值观` 或 `其他`。
5. 只有官网明确公开时才添加工作邮箱或工作电话。
6. 若官网公开了真实人员照片，将图片保存到 `public/images/teachers/` 并填写 `photo`；官网空白占位图不要使用。
7. 更新 `verifiedAt` 和 `/sources` 页的核实日期。

动态详情路由会通过 `generateStaticParams` 自动为新增教师生成页面。
每位教师都会获得独立可打开的网址：本地运行时格式为 `http://localhost:3000/teachers/<id>`；部署后域名会自动替换为实际网站域名。

## 修改学校历史

历史数据位于 `src/data/history.ts`。每个事件必须包含年份、中文标题、说明、德语关键词和来源 URL。无法从公开可靠来源确认的年份不要加入。若多个官方页面互相矛盾，应保留差异说明，不自行推断。

## 已知限制

- 人员与课程会变化，网站是一次静态整理，不会自动同步学校官网。
- 学校官网对创办年份存在 1889/1890 的不同表述，本站保留该差异。
- 魔方“打乱”和自动演变用于互动展示，会重排贴纸颜色并改变姿态，不模拟完整的 3×3 魔方层转算法。
- WebGL 不可用或 3D 模块加载失败时会自动显示二维可点击后备界面。
- 官网教师页部分人员只公开姓氏和称谓，本站不会推断其名字。
- 当前 42 位教师中，28 位使用官网真实照片；其余官网只提供统一空白占位图，因此显示姓名首字母头像。
- 校园图片来自学校官网，仅用于本非官方网站的信息展示；重新发布前请自行确认适用的使用许可。

## 隐私说明

项目只整理学校公开工作信息，不包含教师私人住址、私人电话、家庭信息、私人社交账号、教师评分、学生评论或未经证实的信息。
