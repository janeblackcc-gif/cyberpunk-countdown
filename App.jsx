import React from 'react';
import CyberpunkCountdown from './CyberpunkCountdown';

/**
 * 使用示例：CyberpunkCountdown 组件演示
 */
function App() {
  // 示例 1: 使用默认配置（倒计时 2 天）
  //return <CyberpunkCountdown />;

  // 示例 2: 自定义目标日期
  const customDate = new Date('2025-12-21T07:30:00');
  return <CyberpunkCountdown targetDate={customDate} />;

  // 示例 3: 设置为某个产品发布日期
  // const productLaunchDate = new Date('2025-06-15T00:00:00');
  // return <CyberpunkCountdown targetDate={productLaunchDate} />;
}

export default App;
