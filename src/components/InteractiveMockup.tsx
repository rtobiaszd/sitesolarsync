import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, ShieldCheck, HelpCircle, ArrowUpRight, Leaf, DollarSign, Activity, Smartphone, Network, CheckCircle } from 'lucide-react';

interface PortalStatus {
  name: string;
  brand: string;
  kw: number;
  maxKw: number;
  status: 'online' | 'offline' | 'warning';
}

export default function InteractiveMockup() {
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [activeTab, setActiveTab] = useState<'home' | 'portals' | 'eco'>('home');
  const [timeStr, setTimeStr] = useState('12:00');

  // Update time for phone status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Multipliers based on weather
  const getMultiplier = () => {
    switch (weather) {
      case 'cloudy': return 0.45;
      case 'rainy': return 0.12;
      default: return 1.0;
    }
  };

  const multiplier = getMultiplier();

  // Dynamic values
  const basePower = 348.6;
  const currentPower = parseFloat((basePower * multiplier).toFixed(1));
  const baseEcoSavings = 2840; // R$ saved
  const ecoSavings = Math.round(baseEcoSavings * multiplier);
  const co2Avoided = parseFloat((12.4 * multiplier).toFixed(2));
  const treesPlanted = Math.round(315 * multiplier);

  // Portal lists with dynamic kw
  const portals: PortalStatus[] = [
    { name: 'Planta Central SMA', brand: 'SMA', kw: Math.round(120 * multiplier), maxKw: 120, status: 'online' },
    { name: 'Usinas Cobertas Fronius', brand: 'Fronius', kw: Math.round(85 * multiplier), maxKw: 90, status: 'online' },
    { name: 'Inversores Sungrow Sul', brand: 'Sungrow', kw: Math.round(95 * multiplier), maxKw: 100, status: 'online' },
    { name: 'Growatt Residencial I', brand: 'Growatt', kw: Math.round(18 * multiplier), maxKw: 25, status: weather === 'rainy' ? 'warning' : 'online' },
    { name: 'ABB Comercial Norte', brand: 'ABB', kw: Math.round(30 * multiplier), maxKw: 40, status: 'online' }
  ];

  // SVG chart path generator based on weather
  const getChartPath = () => {
    // Width: 320, Height: 120
    // Hours: 6h, 8h, 10h, 12h, 14h, 16h, 18h
    const basePoints = [10, 45, 85, 110, 95, 55, 12]; // sunny shape
    const modifiedPoints = basePoints.map(p => p * multiplier);
    
    // Convert to SVG path coordinates where y is inverted (120 - val)
    const pointsStr = modifiedPoints.map((val, idx) => {
      const x = 20 + idx * 45;
      const y = 110 - val;
      return `${x},${y}`;
    });
    
    return `M 20,110 Q ${pointsStr[1]} ${pointsStr[2]} T ${pointsStr[3]} T ${pointsStr[4]} T ${pointsStr[5]} T 290,110`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Outer Phone Container */}
      <div className="relative mx-auto border-[10px] border-slate-900 bg-slate-950 rounded-[40px] shadow-2xl overflow-hidden aspect-[9/18.5] w-full max-w-[320px] transition-all duration-500 hover:shadow-amber-500/10 hover:border-slate-800">
        {/* Dynamic Notch / Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4 w-28 bg-slate-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800/80 mr-6"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
        </div>

        {/* Screen Status Bar */}
        <div className="absolute top-0 inset-x-0 h-8 bg-slate-900 text-[10px] text-slate-300 flex justify-between items-center px-6 pt-1 select-none z-20">
          <span className="font-semibold">{timeStr}</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded font-bold">5G</span>
            <div className="w-4 h-2 border border-slate-400 rounded-sm p-[1px] flex">
              <div className="bg-emerald-400 h-full w-[85%] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Main Phone Body Context */}
        <div className="h-full pt-8 pb-12 bg-slate-950 text-slate-100 flex flex-col overflow-hidden text-xs">
          
          {/* Internal Header bar */}
          <div className="p-4 pt-3 flex items-center justify-between border-b border-slate-900/60 bg-slate-950/80 sticky top-0 backdrop-blur-md z-10">
            <div>
              <p className="text-[10px] text-slate-400 tracking-wider font-bold">SOLARSYNC APP</p>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Usinas Ativas
              </h4>
            </div>
            <span className="bg-slate-900/80 text-[10px] px-2.5 py-1 rounded-full text-amber-400 border border-slate-800 flex items-center gap-1 font-semibold">
              <Network className="w-3 h-3" />
              Sincronizado
            </span>
          </div>

          {/* Weather Simulator Controls inside App */}
          <div className="p-3.5 bg-slate-900/40 border-b border-slate-900 flex justify-between items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-400">Simular Clima:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
              <button 
                onClick={() => setWeather('sunny')}
                className={`p-1.5 rounded-md transition ${weather === 'sunny' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="Céu Limpo"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setWeather('cloudy')}
                className={`p-1.5 rounded-md transition ${weather === 'cloudy' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="Parcialmente Nublado"
              >
                <Cloud className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setWeather('rainy')}
                className={`p-1.5 rounded-md transition ${weather === 'rainy' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-white'}`}
                title="Chuvoso / Baixa Geração"
              >
                <CloudRain className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* App Viewport Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
            {activeTab === 'home' && (
              <>
                {/* Instant Power display card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-4 border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Sun className="w-20 h-20 text-amber-500 fill-amber-500" />
                  </div>
                  
                  <p className="text-slate-400 text-[10px] tracking-wide font-semibold uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    Potência Ativa Total
                  </p>
                  
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white tracking-tight">{currentPower}</span>
                    <span className="text-xs text-amber-400 font-bold">kW</span>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    5 de 5 portais integrados e ativos
                  </p>
                </div>

                {/* Grid of Micro stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900/80">
                    <p className="text-slate-400 text-[9px] font-bold uppercase flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-emerald-400" />
                      CO₂ Evitado
                    </p>
                    <p className="text-sm font-black text-slate-100 mt-1">{co2Avoided} t</p>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900/80">
                    <p className="text-slate-400 text-[9px] font-bold uppercase flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-400" />
                      Árvores Salvas
                    </p>
                    <p className="text-sm font-black text-slate-100 mt-1">{treesPlanted} un</p>
                  </div>
                </div>

                {/* SVG Active Power Curve Chart */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Curva de Geração Hoje</span>
                    <span className="text-[9px] text-slate-500">kW / h</span>
                  </div>
                  
                  <div className="relative h-20 w-full mt-1 bg-slate-950/50 rounded border border-slate-900 overflow-hidden">
                    {/* SVG Curve */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <path 
                        d={`${getChartPath()} L 290,110 L 20,110 Z`} 
                        fill="url(#glow-grad)"
                        className="transition-all duration-700 ease-out"
                      />
                      {/* Curve line */}
                      <path 
                        d={getChartPath()} 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    
                    {/* Bottom hour labels */}
                    <div className="absolute bottom-0 inset-x-0 px-2 pb-0.5 flex justify-between text-[8px] text-slate-600 select-none font-mono">
                      <span>06h</span>
                      <span>10h</span>
                      <span>12h</span>
                      <span>14h</span>
                      <span>18h</span>
                    </div>
                  </div>
                </div>

                {/* Portals status list (Preview) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Conexões Consolidadas</span>
                    <span className="text-[9px] text-amber-400 cursor-pointer hover:underline" onClick={() => setActiveTab('portals')}>ver todos</span>
                  </div>
                  <div className="space-y-1.5">
                    {portals.slice(0, 3).map((portal, idx) => (
                      <div key={idx} className="bg-slate-900/40 rounded-lg p-2.5 border border-slate-900 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <div>
                            <p className="font-semibold text-slate-200 text-[11px]">{portal.name}</p>
                            <p className="text-[9px] text-slate-500">API Gateway • {portal.brand}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-300 text-[10px]">{portal.kw} kW</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'portals' && (
              <div className="space-y-2">
                <h5 className="text-[10px] text-slate-400 font-bold uppercase mb-2">Todos os Portais ({portals.length})</h5>
                <div className="space-y-2">
                  {portals.map((portal, idx) => (
                    <div key={idx} className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-start space-x-2">
                        <span className={`w-2 h-2 rounded-full mt-1 ${portal.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                        <div>
                          <p className="font-bold text-slate-100 text-[11px]">{portal.name}</p>
                          <p className="text-[9px] text-slate-500">Crawler • {portal.brand} API</p>
                          <p className="text-[9px] text-slate-400 mt-1">Capacidade de Pico: {portal.maxKw} kWp</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-amber-400 text-xs">{portal.kw} kW</p>
                        <p className="text-[9px] text-emerald-400 font-semibold">{Math.round((portal.kw / (portal.maxKw || 1)) * 100)}% cap</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'eco' && (
              <div className="space-y-3 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
                  <Leaf className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-100 text-sm">Painel de Impacto Ecológico</h5>
                <p className="text-[10px] text-slate-400 px-4">Indicadores ambientais gerados dinamicamente a partir da soma acumulada de todos os inversores solares integrados.</p>
                
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Carbono Evitado:</span>
                    <span className="font-bold text-white">{co2Avoided} Toneladas</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Arvores Plantadas:</span>
                    <span className="font-bold text-white">{treesPlanted} un</span>
                  </div>
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-slate-400">Economia Estimada:</span>
                    <span className="font-bold text-amber-400">R$ {ecoSavings.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="bg-amber-400/5 rounded-lg p-3 border border-amber-400/10 text-left">
                  <p className="text-[9px] text-amber-400 font-bold uppercase">CÁLCULO ECOLÓGICO</p>
                  <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">Fórmulas baseadas nas diretrizes de emissões do MME / ONS brasileiro: 1 kWh gerado evita 0.086 kg de CO₂.</p>
                </div>
              </div>
            )}
          </div>

          {/* Phone Bottom Tab Bar */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-slate-900 border-t border-slate-800/80 flex justify-around items-center z-10 select-none">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center w-12 h-full transition ${activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Activity className="w-4 h-4" />
              <span className="text-[8px] mt-0.5">Painel</span>
            </button>
            <button 
              onClick={() => setActiveTab('portals')}
              className={`flex flex-col items-center justify-center w-12 h-full transition ${activeTab === 'portals' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Network className="w-4 h-4" />
              <span className="text-[8px] mt-0.5">Portais</span>
            </button>
            <button 
              onClick={() => setActiveTab('eco')}
              className={`flex flex-col items-center justify-center w-12 h-full transition ${activeTab === 'eco' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-[8px] mt-0.5">Ecológico</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
