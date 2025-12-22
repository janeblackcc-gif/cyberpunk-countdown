import React, { useState, useEffect } from 'react';
import { Zap, Cpu } from 'lucide-react';
import logoImg from './assets/logo.png';

/**
 * HuangpuCountdown - 黄埔马拉松科技版
 *
 * @description
 * 专为黄埔马拉松定制的科技风格倒计时。
 * - 核心色调：科技青 (Cyan-400) + 活力绿 (Lime-400)
 * - 视觉重点：智慧科技、运动活力、精准倒计时
 * - 主题：Technology & Vitality
 */
const CyberpunkCountdown = ({ targetDate: propTargetDate }) => {
  // ============ State Management ============
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isOnline, setIsOnline] = useState(false);

  // 目标日期：优先使用传入的 prop，否则默认为当前时间 + 2 天
  const [targetDate] = useState(() => {
    if (propTargetDate) return propTargetDate;
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  });

  // ============ Countdown Logic ============
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsOnline(true);
        return null; // 停止计时
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // 立即执行一次
    const initialTime = calculateTimeLeft();
    if (initialTime) setTimeLeft(initialTime);

    return () => clearInterval(interval);
  }, [targetDate]);

  // ============ Helpers ============
  const padZero = (num) => num.toString().padStart(2, '0');

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  // ============ Render ============
  return (
    // 深海军蓝背景，选中文本为科技青色
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden font-mono selection:bg-cyan-400 selection:text-black">

      {/* ========== Custom Styles ========== */}
      <CyberpunkStyles />

      {/* ========== Background Effects ========== */}
      <BackgroundGrid />
      <div className="absolute inset-0 scanlines z-10" aria-hidden="true" />

      {/* ========== Main Card ========== */}
      {/* 玻璃态容器 - 科技青边框 */}
      <div className="relative z-20 w-full max-w-5xl border border-cyan-500/30 bg-[#0a0a0e]/80 backdrop-blur-sm p-8 md:p-12 cyber-box-shadow">

        {/* Corner Decorations */}
        <CornerDecorations />

        {/* Header - 战队定制版 */}
        <Header isOnline={isOnline} />

        {/* Content: Countdown or Online State */}
        {!isOnline ? (
          <CountdownDisplay timeUnits={timeUnits} padZero={padZero} />
        ) : (
          <OnlineState />
        )}

        {/* Footer Status 已移除，保持聚焦 */}
      </div>
    </div>
  );
};

// ============ Sub-Components ============

/**
 * 自定义 CSS 样式
 * 科技主题配色 - 减弱 Glitch 效果，增强平滑过渡
 */
const CyberpunkStyles = () => (
  <style>{`
    .font-cyber {
      font-family: 'Share Tech Mono', monospace;
    }

    /* CRT 扫描线 */
    .scanlines {
      background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.2) 50%,
        rgba(0,0,0,0.2)
      );
      background-size: 100% 4px;
      animation: scroll 10s linear infinite;
      pointer-events: none;
    }

    @keyframes scroll {
      0% { background-position: 0 0; }
      100% { background-position: 0 40px; }
    }

    .glitch-text {
      position: relative;
    }

    /* 悬停时触发 - 科技青高亮 */
    .glitch-hover:hover {
      animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      color: #22d3ee; /* cyan-400 */
    }

    /* 幽灵层颜色调整为蓝/紫 */
    .glitch-hover:hover::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: -2px;
      width: 100%;
      height: 100%;
      color: #3b82f6; /* blue-500 */
      opacity: 0.8;
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }

    .glitch-hover:hover::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 2px;
      width: 100%;
      height: 100%;
      color: #a855f7; /* purple-500 */
      opacity: 0.8;
      animation: glitch-anim-2 2s infinite linear alternate-reverse;
    }

    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 80% 0); }
      20% { clip-path: inset(60% 0 10% 0); }
      40% { clip-path: inset(40% 0 50% 0); }
      60% { clip-path: inset(80% 0 5% 0); }
      80% { clip-path: inset(10% 0 70% 0); }
      100% { clip-path: inset(30% 0 20% 0); }
    }

    @keyframes glitch-anim-2 {
      0% { clip-path: inset(10% 0 60% 0); }
      20% { clip-path: inset(80% 0 5% 0); }
      40% { clip-path: inset(30% 0 20% 0); }
      60% { clip-path: inset(10% 0 80% 0); }
      80% { clip-path: inset(50% 0 30% 0); }
      100% { clip-path: inset(20% 0 60% 0); }
    }

    @keyframes glitch-skew {
      0% { transform: skew(0deg); }
      20% { transform: skew(-2deg); }
      40% { transform: skew(2deg); }
      60% { transform: skew(-1deg); }
      80% { transform: skew(1deg); }
      100% { transform: skew(0deg); }
    }

    /* 阴影改为科技青 */
    .cyber-box-shadow {
      box-shadow:
        0 0 10px rgba(34, 211, 238, 0.1),
        inset 0 0 20px rgba(34, 211, 238, 0.05);
    }
  `}</style>
);

const BackgroundGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" aria-hidden="true" />
);

/**
 * 卡片四角装饰线 - 科技青
 */
const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" aria-hidden="true" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" aria-hidden="true" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" aria-hidden="true" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" aria-hidden="true" />
  </>
);

/**
 * 头部标题区域 - 黄埔马拉松定制版
 */
const Header = ({ isOnline }) => (
  <div className="text-center mb-16 relative flex flex-col items-center">
    {/* 赛事 Logo */}
    <img
      src={logoImg}
      alt="2025 黄埔马拉松"
      className="w-auto h-16 sm:h-20 md:h-28 lg:h-32 mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
      aria-hidden="false"
    />

    {/* 赛事铭牌 */}
    <div className="inline-flex items-center gap-2 text-cyan-400 text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-6 border-y-2 border-cyan-400/50 px-6 py-2 bg-cyan-400/10 backdrop-blur-md" role="banner">
      <Zap size={16} className="text-lime-400" aria-hidden="true" />
      <span>HUANGPU MARATHON 2025</span>
      <Zap size={16} className="text-lime-400" aria-hidden="true" />
    </div>

    {/* 主标题 - 赛事口号 */}
    <h1
      className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 glitch-text uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)]"
      data-text={isOnline ? "SEE YOU NEXT YEAR!" : "TO HUANGPU, RUN TO HAPPINESS"}
    >
      {isOnline ? "SEE YOU NEXT YEAR!" : "TO HUANGPU, RUN TO HAPPINESS"}
    </h1>

    {/* 副标题 - 比赛时间 */}
    {!isOnline && (
      <p className="text-cyan-200/80 font-mono text-sm md:text-base mt-4 tracking-widest uppercase border-b border-cyan-500/30 pb-2">
        <span className="text-lime-400 mr-2">►</span>
        Target: 2025.12.28 08:00 AM · TECHNOLOGY & VITALITY
        <span className="text-lime-400 ml-2">◄</span>
      </p>
    )}
  </div>
);

const CountdownDisplay = ({ timeUnits, padZero }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative" role="timer" aria-live="polite" aria-atomic="true">
    {/* 水平装饰线 - 科技青渐变 */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent -z-10 hidden md:block" aria-hidden="true" />

    {timeUnits.map((item, idx) => (
      <TimeBlock
        key={item.label}
        label={item.label}
        value={padZero(item.value)}
        index={idx}
      />
    ))}
  </div>
);

/**
 * 单个时间单位块 - 科技版
 */
const TimeBlock = ({ label, value, index }) => (
  <div className="group relative flex flex-col items-center" aria-label={`${value} ${label}`}>
    {/* 数字容器 - 科技青边框和发光 */}
    <div className="relative w-full bg-black/60 border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-all duration-300 p-6 md:p-8 flex justify-center items-center overflow-hidden backdrop-blur-sm" aria-hidden="true">
      {/* 悬停发光层 - 科技青 */}
      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300" />

      {/* 数字 - 平滑过渡效果 */}
      <span
        className="font-cyber text-6xl md:text-8xl text-cyan-50 font-bold tracking-tighter glitch-hover transition-all duration-200 group-hover:scale-105 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,1)]"
        data-text={value}
      >
        {value}
      </span>

      {/* 角标装饰 - 科技青 */}
      <div className="absolute top-2 right-2 text-[10px] text-cyan-500/90 group-hover:text-cyan-400 font-mono">
        #{index + 1}
      </div>
      {/* 底部进度条 - 科技青渐变 */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-900 via-cyan-600 to-cyan-900 group-hover:via-cyan-400 transition-all" />
    </div>

    {/* 标签 - 活力绿点缀 */}
    <div className="mt-4 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(132,204,22,0.8)]" />
      <span className="text-cyan-600/80 text-sm md:text-base font-bold tracking-[0.3em] group-hover:text-cyan-400 transition-colors font-cyber uppercase">
        {label}
      </span>
    </div>
  </div>
);

const OnlineState = () => (
  <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-1000">
    <div className="relative">
      <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
      <Cpu size={80} className="text-cyan-400 animate-spin relative z-10" style={{ animationDuration: '3s' }} />
    </div>

    <div className="mt-8 border-t border-b border-cyan-500/30 py-4 w-full text-center bg-cyan-900/10">
      <p className="font-cyber text-xl text-cyan-300 tracking-[0.5em] animate-pulse">
        RACE STARTED
      </p>
    </div>

    <button
      className="mt-8 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-bold font-cyber tracking-wider transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
      onClick={() => console.log('System accessed')}
    >
      VIEW RESULTS
    </button>
  </div>
);

export default CyberpunkCountdown;