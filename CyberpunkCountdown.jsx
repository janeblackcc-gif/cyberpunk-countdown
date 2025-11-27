import React, { useState, useEffect } from 'react';
import { Clock, Zap, Cpu } from 'lucide-react';

/**
 * CyberpunkCountdown - 赛博朋克风格产品发布倒计时组件
 *
 * @description
 * 高对比度霓虹风格的倒计时组件，具有以下特性：
 * - 深色背景 + 青色/紫色霓虹配色
 * - 故障风（Glitch）文字效果
 * - 悬停时数字发光增强和抖动特效
 * - CRT 扫描线和 HUD 装饰元素
 *
 * @example
 * // 默认倒计时 2 天
 * <CyberpunkCountdown />
 *
 * // 自定义目标日期
 * <CyberpunkCountdown targetDate={new Date('2025-12-31')} />
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

    // 立即执行一次，避免首次渲染时显示 00:00:00:00
    const initialTime = calculateTimeLeft();
    if (initialTime) setTimeLeft(initialTime);

    return () => clearInterval(interval);
  }, [targetDate]);

  // ============ Helpers ============
  const padZero = (num) => num.toString().padStart(2, '0');

  // 倒计时单位配置
  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  // ============ Render ============
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-mono selection:bg-cyan-500 selection:text-black">

      {/* ========== Custom Styles ========== */}
      <CyberpunkStyles />

      {/* ========== Background Effects ========== */}
      <BackgroundGrid />
      <div className="absolute inset-0 scanlines z-10" />

      {/* ========== Main Card ========== */}
      <div className="relative z-20 w-full max-w-4xl border border-cyan-900/50 bg-[#0a0a0e]/80 backdrop-blur-sm p-8 md:p-12 cyber-box-shadow">

        {/* Corner Decorations */}
        <CornerDecorations />

        {/* Header */}
        <Header isOnline={isOnline} />

        {/* Content: Countdown or Online State */}
        {!isOnline ? (
          <CountdownDisplay timeUnits={timeUnits} padZero={padZero} />
        ) : (
          <OnlineState />
        )}

        {/* Footer Status */}
        <FooterStatus />
      </div>
    </div>
  );
};

// ============ Sub-Components ============

/**
 * 自定义 CSS 样式（Glitch 动画、扫描线、发光效果）
 */
const CyberpunkStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    .font-cyber {
      font-family: 'Share Tech Mono', monospace;
    }

    /* CRT 扫描线效果 */
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

    /* Glitch 效果基础类 */
    .glitch-text {
      position: relative;
    }

    /* 悬停时触发 RGB 分离 + 抖动 */
    .glitch-hover:hover {
      animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      color: #0ff;
    }

    /* 品红色幽灵层 */
    .glitch-hover:hover::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: -2px;
      width: 100%;
      height: 100%;
      color: #f0f;
      opacity: 0.8;
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }

    /* 青色幽灵层 */
    .glitch-hover:hover::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 2px;
      width: 100%;
      height: 100%;
      color: #0ff;
      opacity: 0.8;
      animation: glitch-anim-2 2s infinite linear alternate-reverse;
    }

    /* Glitch 切片动画 - 通道 1 */
    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 80% 0); }
      20% { clip-path: inset(60% 0 10% 0); }
      40% { clip-path: inset(40% 0 50% 0); }
      60% { clip-path: inset(80% 0 5% 0); }
      80% { clip-path: inset(10% 0 70% 0); }
      100% { clip-path: inset(30% 0 20% 0); }
    }

    /* Glitch 切片动画 - 通道 2 */
    @keyframes glitch-anim-2 {
      0% { clip-path: inset(10% 0 60% 0); }
      20% { clip-path: inset(80% 0 5% 0); }
      40% { clip-path: inset(30% 0 20% 0); }
      60% { clip-path: inset(10% 0 80% 0); }
      80% { clip-path: inset(50% 0 30% 0); }
      100% { clip-path: inset(20% 0 60% 0); }
    }

    /* 抖动变形动画 */
    @keyframes glitch-skew {
      0% { transform: skew(0deg); }
      20% { transform: skew(-2deg); }
      40% { transform: skew(2deg); }
      60% { transform: skew(-1deg); }
      80% { transform: skew(1deg); }
      100% { transform: skew(0deg); }
    }

    /* 霓虹发光阴影 */
    .cyber-box-shadow {
      box-shadow:
        0 0 10px rgba(6,182,212,0.1),
        inset 0 0 20px rgba(6,182,212,0.05);
    }
  `}</style>
);

/**
 * 背景网格效果
 */
const BackgroundGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
);

/**
 * 卡片四角装饰线
 */
const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
  </>
);

/**
 * 头部标题区域
 */
const Header = ({ isOnline }) => (
  <div className="text-center mb-12 relative">
    {/* 协议版本标签 */}
    <div className="inline-flex items-center gap-2 text-pink-500 text-xs tracking-[0.2em] uppercase mb-2 border border-pink-500/30 px-2 py-1 rounded bg-pink-500/5">
      <Zap size={12} className="animate-pulse" />
      Protocol v.2.0.77
    </div>

    {/* 主标题 */}
    <h1
      className="font-cyber text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 glitch-text uppercase tracking-wider"
      data-text={isOnline ? "SYSTEM ONLINE" : "NEURAL LINK INITIALIZING"}
    >
      {isOnline ? "SYSTEM ONLINE" : "NEURAL LINK"}
    </h1>

    {/* 副标题 */}
    {!isOnline && (
      <p className="text-cyan-700 font-mono text-sm mt-2 tracking-widest opacity-80">
        ESTABLISHING CONNECTION TO MAINFRAME...
      </p>
    )}
  </div>
);

/**
 * 倒计时数字显示区域
 */
const CountdownDisplay = ({ timeUnits, padZero }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
    {/* 水平装饰线 */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent -z-10 hidden md:block" />

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
 * 单个时间单位块（天/时/分/秒）
 */
const TimeBlock = ({ label, value, index }) => (
  <div className="group relative flex flex-col items-center">
    {/* 数字容器 */}
    <div className="relative w-full bg-black/40 border border-cyan-900 group-hover:border-cyan-400/60 transition-all duration-300 p-6 flex justify-center items-center overflow-hidden">
      {/* 悬停发光层 */}
      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-300" />

      {/* 数字 - 带 Glitch 效果 */}
      <span
        className="font-cyber text-5xl md:text-7xl text-white font-bold tracking-tighter glitch-hover transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
        data-text={value}
      >
        {value}
      </span>

      {/* 装饰元素 */}
      <div className="absolute top-1 right-1 text-[8px] text-cyan-800 group-hover:text-cyan-400">
        0{index + 1}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-900 group-hover:bg-cyan-400 transition-colors" />
    </div>

    {/* 标签 */}
    <div className="mt-4 flex items-center gap-2">
      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
      <span className="text-cyan-600 text-sm font-bold tracking-[0.2em] group-hover:text-cyan-300 transition-colors">
        {label}
      </span>
    </div>
  </div>
);

/**
 * 系统上线状态显示
 */
const OnlineState = () => (
  <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-1000">
    {/* 旋转 CPU 图标 */}
    <div className="relative">
      <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
      <Cpu size={80} className="text-cyan-400 animate-spin relative z-10" style={{ animationDuration: '3s' }} />
    </div>

    {/* 访问授权提示 */}
    <div className="mt-8 border-t border-b border-cyan-500/30 py-4 w-full text-center bg-cyan-900/10">
      <p className="font-cyber text-xl text-cyan-300 tracking-[0.5em] animate-pulse">
        ACCESS GRANTED
      </p>
    </div>

    {/* 进入系统按钮 */}
    <button
      className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold font-cyber tracking-wider transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
      onClick={() => console.log('System accessed')}
    >
      ENTER SYSTEM
    </button>
  </div>
);

/**
 * 页脚状态信息
 */
const FooterStatus = () => (
  <div className="mt-16 flex justify-between items-end border-t border-gray-800 pt-4 text-[10px] md:text-xs text-gray-500 font-mono">
    {/* 左侧：地理坐标 */}
    <div className="flex flex-col gap-1">
      <span>LAT: 35.6762° N</span>
      <span>LNG: 139.6503° E</span>
      <span className="text-purple-500">SECURE CONNECTION</span>
    </div>

    {/* 右侧：系统负载 */}
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="h-1 w-24 bg-gray-800 rounded overflow-hidden">
          <div className="h-full w-[80%] bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
        </div>
        <span className="opacity-50">SYS.LOAD: 89%</span>
      </div>
      <Clock size={16} className="text-cyan-600" />
    </div>
  </div>
);

export default CyberpunkCountdown;
