import React, { useState, useEffect } from 'react';
import { Clock, Zap, Cpu, Trophy } from 'lucide-react';
import logoImg from './assets/logo.png'; // 确保你已经把 logo.png 放进了 src/assets/ 文件夹

/**
 * CyberpunkCountdown - YSRC 深圳战队出征版
 *
 * @description
 * 专为江门马拉松定制的黑金风格倒计时。
 * - 核心色调：黑金 (Yellow-400) + 红色点缀
 * - 视觉重点：战队 Logo、誓师口号、倒计时
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
    // 背景保持深黑，但选中文本颜色改为黄色系
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-mono selection:bg-yellow-500 selection:text-black">

      {/* ========== Custom Styles ========== */}
      <CyberpunkStyles />

      {/* ========== Background Effects ========== */}
      <BackgroundGrid />
      <div className="absolute inset-0 scanlines z-10" />

      {/* ========== Main Card ========== */}
      {/* 边框颜色调整为深黄色/金色 */}
      <div className="relative z-20 w-full max-w-5xl border border-yellow-900/30 bg-[#0a0a0e]/80 backdrop-blur-sm p-8 md:p-12 cyber-box-shadow">

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
 * 修改了部分 Glitch 颜色以匹配黑金主题
 */
const CyberpunkStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

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

    .glitch-text {
      position: relative;
    }

    /* 悬停时触发 - 改为金色高亮 */
    .glitch-hover:hover {
      animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      color: #facc15; /* yellow-400 */
    }

    /* 幽灵层颜色调整为红/金 */
    .glitch-hover:hover::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: -2px;
      width: 100%;
      height: 100%;
      color: #ef4444; /* red-500 */
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
      color: #eab308; /* yellow-500 */
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

    /* 阴影改为金色 */
    .cyber-box-shadow {
      box-shadow:
        0 0 10px rgba(234, 179, 8, 0.1),
        inset 0 0 20px rgba(234, 179, 8, 0.05);
    }
  `}</style>
);

const BackgroundGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
);

/**
 * 卡片四角装饰线 - 改为黄色
 */
const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500" />
  </>
);

/**
 * 头部标题区域 - 战队定制版
 */
const Header = ({ isOnline }) => (
  <div className="text-center mb-16 relative flex flex-col items-center">
    {/* 赛事 Logo */}
    <img 
      src={logoImg} 
      alt="2025江门马拉松赛" 
      className="w-auto h-24 md:h-32 mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" 
    />

    {/* 战队铭牌 */}
    <div className="inline-flex items-center gap-2 text-yellow-400 text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-6 border-y-2 border-yellow-400/50 px-6 py-2 bg-yellow-400/10 backdrop-blur-md">
      <Trophy size={16} className="text-yellow-300" />
      <span>YSRC-SHENZHEN TEAM</span>
      <Trophy size={16} className="text-yellow-300" />
    </div>

    {/* 主标题 - 战斗口号 */}
    <h1
      className="font-sans text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 glitch-text uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]"
      data-text={isOnline ? "恭喜完赛！PB达成！" : "决战江门 势必PB"}
    >
      {isOnline ? "恭喜完赛！PB达成！" : "决战江门 势必PB"}
    </h1>

    {/* 副标题 - 比赛时间 */}
    {!isOnline && (
      <p className="text-yellow-200/80 font-mono text-sm md:text-base mt-4 tracking-widest uppercase border-b border-yellow-500/30 pb-2">
        <span className="text-yellow-500 mr-2">►</span>
        Target: 2025.12.21 07:30 AM · 全军出击
        <span className="text-yellow-500 ml-2">◄</span>
      </p>
    )}
  </div>
);

const CountdownDisplay = ({ timeUnits, padZero }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
    {/* 水平装饰线 - 改为黄色渐变 */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-900 to-transparent -z-10 hidden md:block" />

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
 * 单个时间单位块 - 黑金版
 */
const TimeBlock = ({ label, value, index }) => (
  <div className="group relative flex flex-col items-center">
    {/* 数字容器 - 修改边框和发光色为黄色 */}
    <div className="relative w-full bg-black/60 border-2 border-yellow-900/50 group-hover:border-yellow-400 transition-all duration-300 p-6 md:p-8 flex justify-center items-center overflow-hidden backdrop-blur-sm">
      {/* 悬停发光层 - 改为黄色 */}
      <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-all duration-300" />

      {/* 数字 - 带 Glitch 效果，字体改大，颜色改黄 */}
      <span
        className="font-cyber text-6xl md:text-8xl text-yellow-50 font-bold tracking-tighter glitch-hover transition-all duration-200 group-hover:scale-105 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_25px_rgba(250,204,21,1)]"
        data-text={value}
      >
        {value}
      </span>

      {/* 角标装饰 - 改为黄色 */}
      <div className="absolute top-2 right-2 text-[10px] text-yellow-700/80 group-hover:text-yellow-400 font-mono">
        #{index + 1}
      </div>
      {/* 底部进度条 - 改为黄色渐变 */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 group-hover:via-yellow-400 transition-all" />
    </div>

    {/* 标签 - 改为黄色系 */}
    <div className="mt-4 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
      <span className="text-yellow-600/80 text-sm md:text-base font-bold tracking-[0.3em] group-hover:text-yellow-400 transition-colors font-cyber uppercase">
        {label}
      </span>
    </div>
  </div>
);

const OnlineState = () => (
  <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-1000">
    <div className="relative">
      <div className="absolute -inset-4 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
      <Cpu size={80} className="text-yellow-400 animate-spin relative z-10" style={{ animationDuration: '3s' }} />
    </div>

    <div className="mt-8 border-t border-b border-yellow-500/30 py-4 w-full text-center bg-yellow-900/10">
      <p className="font-cyber text-xl text-yellow-300 tracking-[0.5em] animate-pulse">
        MISSION ACCOMPLISHED
      </p>
    </div>

    <button
      className="mt-8 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold font-cyber tracking-wider transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]"
      onClick={() => console.log('System accessed')}
    >
      VIEW RESULTS
    </button>
  </div>
);

export default CyberpunkCountdown;