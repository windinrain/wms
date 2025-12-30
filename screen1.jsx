import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  TrendingUp, 
  AlertCircle, 
  Leaf, 
  Database, 
  PieChart, 
  Activity,
  Layers,
  ArrowUpRight,
  Package,
  CheckCircle2,
  Timer,
  Percent,
  Droplets
} from 'lucide-react';

// --- 辅助组件 ---

// 1. 头部
const Header = () => (
  <div className="flex justify-between items-center px-8 py-4 border-b border-cyan-900/30 bg-[#020408] relative shrink-0 z-50">
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <Box className="w-6 h-6 text-cyan-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wider">资产决策洞察中心</h1>
        <p className="text-xs text-cyan-500/70 uppercase tracking-[0.2em]">Inventory Strategy & Decision Brain</p>
      </div>
    </div>
    <div className="flex items-center space-x-2 text-cyan-300 font-mono text-sm border border-cyan-500/30 px-3 py-1 rounded bg-cyan-900/10">
      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
      <span>AI PREDICTION: ON</span>
    </div>
  </div>
);

// 2. 关键指标卡片行
const KeyMetricsRow = () => {
    const metrics = [
        { label: 'SKU 总数', value: '12,450', unit: '个', icon: Package, trend: '+5.2%', color: 'cyan' },
        { label: '库存准确率', value: '99.98', unit: '%', icon: CheckCircle2, trend: '+0.02%', color: 'green' },
        { label: '平均周转', value: '45.2', unit: '天', icon: Timer, trend: '-2.1%', color: 'yellow' },
        { label: '库容利用率', value: '82.5', unit: '%', icon: Percent, trend: '+1.5%', color: 'cyan' },
    ];

    return (
        <div className="grid grid-cols-4 gap-3 h-24 shrink-0">
            {metrics.map((m, i) => (
                <div key={i} className="bg-[#0a0f18] border border-cyan-900/30 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="flex justify-between items-start z-10">
                        <span className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">{m.label}</span>
                        <div className={`p-1.5 rounded bg-${m.color === 'green' ? 'emerald' : (m.color === 'yellow' ? 'yellow' : 'cyan')}-900/20 text-${m.color === 'green' ? 'emerald' : (m.color === 'yellow' ? 'yellow' : 'cyan')}-400`}>
                            <m.icon className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="z-10">
                         <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-mono font-bold text-white tracking-tight">{m.value}</span>
                            <span className="text-[10px] text-gray-500 font-bold">{m.unit}</span>
                         </div>
                         <div className={`text-[10px] font-mono flex items-center ${m.trend.startsWith('+') ? 'text-green-400' : 'text-yellow-400'}`}>
                            {m.trend} <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                         </div>
                    </div>
                    {/* 背景装饰 */}
                    <div className={`absolute -right-2 -bottom-2 w-16 h-16 rounded-full opacity-5 bg-${m.color === 'green' ? 'emerald' : (m.color === 'yellow' ? 'yellow' : 'cyan')}-500 blur-xl group-hover:opacity-10 transition-opacity`}></div>
                </div>
            ))}
        </div>
    )
}

// 3. 库存价值全景 (加宽版圆环图)
const InventoryDonut = () => {
    const totalValue = 12850; 
    const data = [
        { label: 'A类 核心件', value: 60, color: '#06b6d4' }, 
        { label: 'B类 通用件', value: 30, color: '#10b981' }, 
        { label: 'C类 消耗品', value: 10, color: '#64748b' }  
    ];

    const radius = 70;
    const strokeWidth = 28; // 加宽宽度
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="flex flex-col h-full bg-[#0a0f18] border border-cyan-900/30 rounded-xl p-4 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-2 z-10">
                <h3 className="text-cyan-400 font-bold flex items-center text-sm tracking-wider">
                    <PieChart className="w-4 h-4 mr-2" /> 库存结构 (ABC)
                </h3>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="relative w-48 h-48">
                    {/* SVG Donut */}
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                        {/* 背景轨道 */}
                        <circle cx="100" cy="100" r={radius} stroke="#1e293b" strokeWidth={strokeWidth} fill="none" />
                        
                        {/* 数据环 */}
                        {data.map((item, index) => {
                            const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -offset;
                            offset += (item.value / 100) * circumference;
                            
                            return (
                                <circle 
                                    key={index}
                                    cx="100" 
                                    cy="100" 
                                    r={radius} 
                                    stroke={item.color} 
                                    strokeWidth={strokeWidth}
                                    fill="none" 
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt" 
                                    className="transition-all duration-1000 ease-out hover:opacity-80"
                                />
                            );
                        })}
                    </svg>
                    
                    {/* 中心数据 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <span className="text-[10px] text-gray-500 mb-0.5">总价值</span>
                        <div className="flex items-baseline">
                            <span className="text-xl font-mono font-bold text-white tracking-tight">
                                {totalValue.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-cyan-500 ml-1">w</span>
                        </div>
                    </div>
                </div>

                {/* 图例 */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-3">
                    {data.map((item, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="flex items-center text-xs space-x-1 mb-0.5">
                                <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}}></span>
                                <span className="text-gray-300 scale-90 origin-left">{item.label}</span>
                            </div>
                            <span className="font-mono text-white text-sm font-bold pl-2.5">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

             <div className="mt-2 bg-red-900/10 border border-red-500/20 p-2 rounded flex justify-between items-center animate-pulse">
                <div className="flex items-center text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-2" />
                    <span className="scale-90 origin-left">呆滞料金额</span>
                </div>
                <span className="font-mono text-red-300 font-bold text-sm">¥ 420.5 万</span>
            </div>
        </div>
    )
}

// 4. 库位热力云图 (高密度像素版 - 无闪烁)
const HeatCloudMap = () => {
    // 增加行列数，使用正方形小格子
    const rows = 20; 
    const cols = 32;
    
    const getHeatColor = (row, col) => {
        // 模拟几个不规则热点
        const dist1 = Math.sqrt(Math.pow(row - 5, 2) + Math.pow(col - 8, 2)); 
        const dist2 = Math.sqrt(Math.pow(row - 14, 2) + Math.pow(col - 24, 2)); 
        const dist3 = Math.sqrt(Math.pow(row - 10, 2) + Math.pow(col - 15, 2));
        
        // 动态计算 alpha
        let alpha = 0.1;
        let color = '22, 78, 99'; // Base cyan-900
        
        if (dist1 < 5) {
            alpha = (1 - dist1 / 5) * 0.9;
            color = '239, 68, 68'; // Red
        } else if (dist2 < 6) {
            alpha = (1 - dist2 / 6) * 0.8;
            color = '245, 158, 11'; // Orange
        } else if (dist3 < 4) {
            alpha = (1 - dist3 / 4) * 0.6;
            color = '6, 182, 212'; // Cyan
        } else {
             // 随机底噪
             alpha = 0.05 + Math.random() * 0.1;
        }

        return `rgba(${color}, ${alpha})`; 
    };

    return (
        <div className="h-full bg-[#0a0f18] border border-cyan-900/30 rounded-xl p-4 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 z-10 shrink-0">
                <h3 className="text-cyan-400 font-bold flex items-center text-sm tracking-wider">
                    <Database className="w-4 h-4 mr-2" /> 库位热力云图 (High-Res Heatmap)
                </h3>
                <div className="flex space-x-3 text-[10px] text-gray-500">
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-sm bg-red-500 mr-1"></span>Hot</span>
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-sm bg-yellow-500 mr-1"></span>Mid</span>
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-sm bg-cyan-900 mr-1"></span>Cold</span>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                {/* 像素网格 */}
                <div className="w-full h-full grid gap-px" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
                    {Array.from({ length: rows * cols }).map((_, i) => {
                        const row = Math.floor(i / cols);
                        const col = i % cols;
                        const bg = getHeatColor(row, col);
                        return (
                            <div 
                                key={i} 
                                className="w-full h-full hover:brightness-150 transition-all duration-300"
                                style={{ backgroundColor: bg }}
                            ></div>
                        )
                    })}
                </div>
                
                {/* 移除闪烁的扫描动画，保持静谧 */}
            </div>
            
            <div className="absolute bottom-2 left-2 text-[10px] text-gray-400 font-mono z-10 bg-black/50 px-2 py-0.5 rounded">
                Resolution: {cols}x{rows} / TOP SKU: 轴承-A204
            </div>
        </div>
    )
}

// 5. 关键备件水位 (列表 + 滚动)
const LiquidGaugeItem = ({ name, value, threshold, color }) => {
    const isLow = value < threshold;
    const waveStyle = { background: `linear-gradient(to top, ${color} 40%, ${color}aa 100%)` };

    return (
        <div className="flex flex-col items-center w-14 h-full shrink-0 mx-2">
            <div className="relative w-full flex-1 bg-gray-800/30 rounded-t-lg border border-gray-700 overflow-hidden flex flex-col justify-end group min-h-0">
                <div className="absolute w-full border-t border-dashed border-red-500/50 z-20" style={{ bottom: `${threshold}%` }}></div>
                <div className="w-full relative transition-all duration-1000 ease-in-out min-h-0" style={{ height: `${value}%`, ...waveStyle }}>
                    <div className="absolute top-0 w-[200%] h-2 bg-white/20 animate-[wave_2s_linear_infinite]" style={{ transform: 'translateY(-50%)' }}></div>
                </div>
                {/* 极简数值 */}
                <div className="absolute w-full text-center bottom-1 z-30">
                    <span className="text-[10px] font-mono font-bold text-white drop-shadow-md">{value}</span>
                </div>
            </div>
            {/* 标签 */}
            <div className={`mt-1.5 text-center p-0.5 w-full rounded border ${isLow ? 'bg-red-900/20 border-red-500 text-red-400 animate-pulse' : 'bg-gray-800/50 border-gray-700 text-gray-500'}`}>
                <span className="text-[9px] font-bold block scale-75 whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
            </div>
        </div>
    );
};

const ScrollingSpareParts = () => {
    const parts = [
        { name: "汽机主轴瓦", value: 78, threshold: 30, color: "#06b6d4" },
        { name: "锅炉给水泵", value: 45, threshold: 30, color: "#06b6d4" },
        { name: "DCS模件", value: 22, threshold: 25, color: "#ef4444" },
        { name: "高压断路器", value: 90, threshold: 20, color: "#10b981" },
        { name: "润滑油站", value: 65, threshold: 30, color: "#06b6d4" },
        { name: "空压机滤芯", value: 15, threshold: 20, color: "#ef4444" },
        { name: "伺服电机", value: 82, threshold: 30, color: "#10b981" },
        { name: "变频器", value: 55, threshold: 30, color: "#06b6d4" },
        { name: "液压阀组", value: 35, threshold: 30, color: "#f59e0b" },
        { name: "通讯模块", value: 95, threshold: 20, color: "#10b981" },
    ];

    return (
        <div className="flex-[1] min-h-0 bg-[#0a0f18] border border-cyan-900/30 rounded-xl p-4 overflow-hidden flex flex-col">
             <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-cyan-400 font-bold flex items-center text-sm tracking-wider">
                    <Activity className="w-4 h-4 mr-2" /> 核心备件安全水位 (10+)
                </h3>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-2 py-1 rounded text-[10px] text-gray-400">
                    <div className="w-3 h-px border-t border-dashed border-red-500"></div>
                    <span>安全阈值</span>
                </div>
            </div>
            
            <div className="flex-1 min-h-0 relative w-full overflow-hidden">
                {/* 自动滚动容器 - 使用 CSS animation 模拟 ticker */}
                <div className="flex h-full absolute top-0 left-0 animate-[scrollLeft_20s_linear_infinite] hover:pause">
                    {/* 渲染两遍以实现无缝循环 */}
                    {[...parts, ...parts].map((p, i) => (
                        <LiquidGaugeItem key={i} {...p} />
                    ))}
                </div>
            </div>
        </div>
    )
}

// 6. 绿色仓储指标
const GreenMetrics = () => {
    return (
        <div className="h-full bg-[#0a0f18] border border-emerald-900/30 rounded-xl p-4 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2 z-10">
                <h3 className="text-emerald-400 font-bold flex items-center text-sm tracking-wider">
                    <Leaf className="w-4 h-4 mr-2" /> 绿色仓储 (ESG)
                </h3>
            </div>
            
            <div className="flex-1 flex items-center justify-between">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-2 border border-emerald-400/50 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                    <div className="flex flex-col items-center z-10">
                        <span className="text-2xl font-bold text-white font-mono">245</span>
                        <span className="text-[9px] text-emerald-400">kg CO₂</span>
                    </div>
                </div>

                <div className="flex-1 ml-4 space-y-3">
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>机器人代步减排</span>
                            <span className="text-emerald-400">180 kg</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[75%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>无纸化作业单</span>
                            <span className="text-emerald-400">1,240 单</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[90%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 7. 周转率趋势
const TrendChart = () => {
    const history = [2.1, 2.3, 2.2, 2.5, 2.8, 3.1, 3.0, 3.2, 3.5, 3.4, 3.8, 4.0];
    const forecast = [4.0, 4.2, 4.3, 4.5];

    const max = 5;
    const width = 100;
    const height = 100;
    
    const getPoints = (arr, startX, stepX) => {
        return arr.map((val, i) => {
            const x = startX + i * stepX;
            const y = height - (val / max) * height;
            return `${x},${y}`;
        }).join(' ');
    }

    const histPoints = getPoints(history, 0, 6); 
    const forePoints = getPoints(forecast, 66, 6); 

    return (
        <div className="h-full bg-[#0a0f18] border border-cyan-900/30 rounded-xl p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2 z-10">
                <h3 className="text-cyan-400 font-bold flex items-center text-sm tracking-wider">
                    <TrendingUp className="w-4 h-4 mr-2" /> 周转率趋势
                </h3>
                <div className="flex items-center space-x-2 text-[9px]">
                    <span className="flex items-center text-gray-400"><span className="w-2 h-1 bg-cyan-500 mr-1"></span>历史</span>
                    <span className="flex items-center text-gray-400"><span className="w-2 h-1 border border-dashed border-cyan-400 mr-1"></span>AI预测</span>
                </div>
            </div>

            <div className="flex-1 relative w-full overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2"/>
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2"/>
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeWidth="0.5" strokeDasharray="2"/>

                    <polygon points={`0,100 ${histPoints} 66,100`} fill="url(#grad1)" opacity="0.5" />
                    <polyline points={histPoints} fill="none" stroke="#06b6d4" strokeWidth="2" />

                    <polygon points={`66,100 ${forePoints} 84,100`} fill="url(#grad2)" opacity="0.3" />
                    <polyline points={forePoints} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />

                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:0.5}} />
                            <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:0}} />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:0.5}} />
                            <stop offset="100%" style={{stopColor:'#f59e0b', stopOpacity:0}} />
                        </linearGradient>
                    </defs>
                    
                    <circle cx="66" cy={100 - (4.0/5)*100} r="1.5" fill="#fff" />
                    <circle cx="84" cy={100 - (4.5/5)*100} r="1.5" fill="#f59e0b" />
                </svg>
                
                <div className="absolute top-4 left-[66%] -translate-x-1/2 bg-cyan-900/80 text-cyan-200 text-[9px] px-1 rounded">
                    Now: 4.0
                </div>
            </div>
        </div>
    )
}

// --- 主布局 ---
const App = () => {
  return (
    <div className="h-screen bg-[#020408] text-white font-sans overflow-hidden flex flex-col selection:bg-cyan-500/30">
      
      <Header />

      <div className="flex-1 p-4 grid grid-cols-12 gap-4 min-h-0">
        
        {/* 左侧栏 (3/12): 资金与环保 */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
            <div className="flex-[3] min-h-0">
                <InventoryDonut />
            </div>
            <div className="flex-[2] min-h-0">
                <GreenMetrics />
            </div>
        </div>

        {/* 中间栏 (5/12): 关键指标 + 热力云 */}
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
            {/* 上：关键指标 (固定高度) */}
            <KeyMetricsRow />
            
            {/* 下：热力云图 (占据剩余) */}
            <div className="flex-1 min-h-0">
                <HeatCloudMap />
            </div>
        </div>

        {/* 右侧栏 (4/12): 备件水位 + 趋势 */}
        <div className="col-span-4 flex flex-col gap-4 min-h-0">
             {/* 上：备件水位 (横向滚动) */}
             <ScrollingSpareParts />

             {/* 下：周转率趋势 */}
             <div className="flex-[1] min-h-0">
                <TrendChart />
             </div>
        </div>
      </div>

      <style>{`
        @keyframes scanDown {
            0% { top: -20%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 120%; opacity: 0; }
        }
        @keyframes wave {
            0% { background-position-x: 0; }
            100% { background-position-x: 100px; }
        }
        @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .hover\\:pause:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default App;
