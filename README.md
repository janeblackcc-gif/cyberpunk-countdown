# 🌃 Cyberpunk Countdown Component

一个基于 React + Tailwind CSS 的赛博朋克风格产品发布倒计时组件，具有高对比度霓虹配色、故障风文字效果和精美的交互动画。

## ✨ 特性

- 🎨 **赛博朋克美学**：深色背景 + 青色/紫色霓虹配色
- ⚡ **故障风效果**：RGB 色差分离 + 随机切片动画
- 💫 **交互反馈**：悬停时数字发光增强 + 轻微抖动
- 📱 **响应式设计**：完美适配移动端和桌面端
- 🎭 **细节装饰**：CRT 扫描线、HUD 角落装饰、技术数据元素
- 🔧 **高可维护性**：模块化组件结构，代码可读性强

## 📦 安装依赖

```bash
# 安装 React 和 ReactDOM（如果尚未安装）
npm install react react-dom

# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 安装图标库（用于装饰元素）
npm install lucide-react
```

## 🛠️ Tailwind CSS 配置

确保您的 `tailwind.config.js` 包含以下内容：

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
```

在您的主 CSS 文件中引入 Tailwind：

```css
/* index.css 或 App.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 使用方法

### 基础用法

```jsx
import CyberpunkCountdown from './CyberpunkCountdown';

function App() {
  return <CyberpunkCountdown />;
}
```

### 自定义目标日期

```jsx
import CyberpunkCountdown from './CyberpunkCountdown';

function App() {
  // 设置倒计时目标为 2025 年 12 月 31 日
  const targetDate = new Date('2025-12-31T23:59:59');

  return <CyberpunkCountdown targetDate={targetDate} />;
}
```

### 产品发布场景示例

```jsx
import CyberpunkCountdown from './CyberpunkCountdown';

function ProductLaunchPage() {
  // 产品发布日期：2025 年 6 月 15 日
  const launchDate = new Date('2025-06-15T00:00:00');

  return (
    <div>
      <CyberpunkCountdown targetDate={launchDate} />
    </div>
  );
}
```

## 🎯 Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `targetDate` | `Date` | 当前时间 + 2 天 | 倒计时的目标日期时间 |

## 🎨 设计说明

### 配色方案

- **主色调**：深黑色背景 `#050505`
- **强调色**：
  - 青色 `#06b6d4` / `#22d3ee`（霓虹蓝）
  - 紫色 `#a855f7` / `#c084fc`（电光紫）
  - 品红 `#ff00ff`（故障风效果）

### 动画效果

1. **Glitch 故障风**：悬停时触发 RGB 通道分离 + 切片动画
2. **CRT 扫描线**：模拟老式 CRT 显示器效果
3. **霓虹发光**：多层 `text-shadow` 实现霓虹灯光晕
4. **抖动变形**：`skew` 变换模拟图像不稳定感

### 字体

组件使用 Google Fonts 的 **Share Tech Mono** 字体，自动从 CDN 加载。这是一款适合赛博朋克主题的等宽字体。

## 📁 文件结构

```
lftbd/
├── CyberpunkCountdown.jsx    # 主组件
├── App.jsx                    # 使用示例
└── README.md                  # 本文档
```

## 🔧 自定义扩展

### 修改倒计时结束后的行为

在 `OnlineState` 组件中修改按钮的 `onClick` 事件：

```jsx
<button
  className="..."
  onClick={() => {
    // 自定义行为，例如跳转到产品页面
    window.location.href = '/product';
  }}
>
  ENTER SYSTEM
</button>
```

### 调整配色

在 `CyberpunkStyles` 组件中修改 CSS 变量的颜色值：

```css
/* 示例：将青色改为绿色 */
.glitch-hover:hover {
  color: #00ff00; /* 原为 #0ff */
}
```

### 添加音效

```jsx
const OnlineState = () => {
  useEffect(() => {
    // 播放系统启动音效
    const audio = new Audio('/sounds/system-online.mp3');
    audio.play();
  }, []);

  return (
    // ... 组件内容
  );
};
```

## 🌐 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

> **注意**：部分 CSS 动画效果（如 `clip-path`）在旧版浏览器中可能不支持。

## 📝 技术细节

### 组件结构

```
CyberpunkCountdown (主组件)
├── CyberpunkStyles (自定义 CSS)
├── BackgroundGrid (背景网格)
├── CornerDecorations (角落装饰)
├── Header (标题区域)
├── CountdownDisplay (倒计时显示)
│   └── TimeBlock × 4 (天/时/分/秒)
├── OnlineState (上线状态)
└── FooterStatus (页脚状态)
```

### 性能优化

- ✅ 使用 `useEffect` 清理定时器，避免内存泄漏
- ✅ 子组件拆分，提升代码可维护性
- ✅ 动画使用 GPU 加速属性（`transform`, `opacity`）
- ✅ 扫描线使用伪元素，减少 DOM 节点

## 🎬 效果预览

### 倒计时状态
- 四个数字块分别显示天/时/分/秒
- 悬停时数字放大 1.1 倍并发出青色光晕
- RGB 色差分离产生故障风效果

### 上线状态
- 旋转的 CPU 图标
- "ACCESS GRANTED" 脉冲提示
- "ENTER SYSTEM" 按钮带紫色发光

## 🤝 贡献

如需自定义或扩展功能，请随意修改源代码。该组件采用 MIT 风格设计，代码结构清晰，易于二次开发。

## 📄 许可

本组件基于 Gemini AI 和 Claude AI 的协作设计生成，可自由用于个人和商业项目。

---

**🎯 设计协作**：此组件由 Gemini 提供前端原型，Claude 负责企业级代码重构。
