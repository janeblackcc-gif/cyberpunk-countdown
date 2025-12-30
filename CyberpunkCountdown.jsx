import React, { useState, useEffect } from 'react';
import { Feather, Wind } from 'lucide-react';
import logoImg from './assets/logo.png';

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
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 relative overflow-hidden font-serif-sc selection:bg-teal-200 selection:text-emerald-900">

      <EcologyStyles />

      <BackgroundScenery />

      <div className="relative z-20 w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-8 md:p-16 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:bg-white/70">

        <Header isOnline={isOnline} />

        {!isOnline ? (
          <CountdownDisplay timeUnits={timeUnits} padZero={padZero} />
        ) : (
          <OnlineState />
        )}
      </div>
    </div>
  );
};

// ============ Sub-Components ============

const EcologyStyles = () => (
  <style>{`
    .text-shadow-sm {
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .text-shadow-glow {
      text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
    }
  `}</style>
);

const BackgroundScenery = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-teal-900/10 blur-[2px] rounded-t-[100%] transform scale-150 translate-y-10" />
    <div className="absolute bottom-0 right-[-20%] w-[80vw] h-[35vh] bg-emerald-800/10 rounded-t-[100%] transform -translate-x-10" />
    <div className="absolute bottom-0 left-[-10%] w-[60vw] h-[25vh] bg-emerald-600/10 rounded-t-[80%] blur-sm" />

    <div className="absolute top-[10%] left-[10%] w-32 h-12 bg-white/40 blur-xl rounded-full animate-float" style={{animationDuration: '15s'}} />
    <div className="absolute top-[20%] right-[15%] w-48 h-16 bg-white/30 blur-xl rounded-full animate-float" style={{animationDuration: '20s', animationDelay: '2s'}} />

    <Feather className="absolute top-[15%] left-[20%] text-emerald-900/5 w-6 h-6 animate-float" style={{animationDuration: '8s'}} />
    <Feather className="absolute top-[18%] left-[22%] text-emerald-900/5 w-4 h-4 animate-float" style={{animationDuration: '9s', animationDelay: '1s'}} />
  </div>
);

const Header = ({ isOnline }) => (
  <div className="text-center mb-16 relative flex flex-col items-center">
    <img
      src={logoImg}
      alt="2026 清远马拉松"
      className="w-auto h-16 sm:h-20 md:h-28 lg:h-32 mb-8 animate-breathe filter drop-shadow-lg"
    />

    <div className="inline-flex items-center gap-3 text-teal-800 text-sm md:text-lg font-serif-sc font-bold tracking-[0.3em] uppercase mb-6 border-b border-teal-700/30 px-8 py-3 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent">
      <Feather size={18} className="text-rose-600" />
      <span>QINGYUAN MARATHON 2026</span>
      <Feather size={18} className="text-rose-600 transform scale-x-[-1]" />
    </div>

    <h1 className="font-serif-sc text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 tracking-wide drop-shadow-sm mb-4">
      {isOnline ? "明年再见！" : "山水至清，奔跑致远"}
    </h1>

    {!isOnline && (
      <p className="text-stone-600 font-serif-sc text-base md:text-lg mt-2 tracking-widest flex items-center justify-center gap-2">
        <span className="w-8 h-[1px] bg-amber-500/50"></span>
        <span>2026年3月15日 08:00 · 凤舞清波</span>
        <span className="w-8 h-[1px] bg-amber-500/50"></span>
      </p>
    )}
  </div>
);

const CountdownDisplay = ({ timeUnits, padZero }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative" role="timer" aria-live="polite" aria-atomic="true">
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

const TimeBlock = ({ label, value, index }) => (
  <div className="group relative flex flex-col items-center transform transition-transform duration-500 hover:-translate-y-2" aria-label={`${value} ${label}`}>
    <div className="relative w-full aspect-square bg-white/80 border border-teal-100/50 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgba(6,78,59,0.1)] transition-all duration-500 flex justify-center items-center overflow-hidden backdrop-blur-sm">

      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-50" />
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-emerald-200/20 blur-2xl rounded-full group-hover:bg-emerald-300/30 transition-colors" />

      <span className="font-display text-5xl md:text-7xl text-emerald-900 font-medium tracking-tight z-10 group-hover:scale-110 transition-transform duration-700 text-shadow-sm">
        {value}
      </span>

      <div className={`absolute bottom-0 left-0 w-full h-1 ${index % 2 === 0 ? 'bg-rose-500/30' : 'bg-amber-500/30'} group-hover:opacity-100 opacity-60 transition-opacity`} />
    </div>

    <div className="mt-4 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
      <span className="text-teal-800 text-xs md:text-sm font-bold tracking-[0.2em] font-serif-sc uppercase">
        {label}
      </span>
    </div>
  </div>
);

const OnlineState = () => (
  <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-1000">
    <div className="relative">
      <div className="absolute -inset-8 bg-emerald-400/20 blur-xl rounded-full animate-pulse" />
      <Wind size={64} className="text-teal-600 animate-float relative z-10" />
    </div>

    <div className="mt-10 py-6 w-full text-center">
      <p className="font-serif-sc text-2xl text-emerald-900 tracking-[0.2em] animate-breathe">
        赛事已开启
      </p>
      <p className="mt-2 font-sans text-stone-500 text-sm tracking-wide">
        RACE STARTED
      </p>
    </div>

    <button
      type="button"
      className="mt-6 px-10 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-serif-sc font-bold tracking-widest rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1"
      onClick={() => console.log('System accessed')}
    >
      查看成绩
    </button>
  </div>
);

export default CyberpunkCountdown;