import React from 'react';
import { Sun, Shield, Layers, HelpCircle } from 'lucide-react';

const INTEGRATED_BRANDS = [
  { name: 'SMA', desc: 'Sunny Portal API', origin: 'Alemanha' },
  { name: 'ABB', desc: 'Aurora / Fimer Cloud', origin: 'Suíça' },
  { name: 'Fronius', desc: 'Solar.web REST', origin: 'Áustria' },
  { name: 'Sungrow', desc: 'iSolarCloud Crawler', origin: 'China' },
  { name: 'Canadian', desc: 'CSI Cloud API', origin: 'Canadá' },
  { name: 'APsystems', desc: 'EMA Portal', origin: 'EUA' },
  { name: 'Growatt', desc: 'ShineServer API', origin: 'China' },
  { name: 'SolarEdge', desc: 'Monitoring SDK', origin: 'Israel' },
  { name: 'Huawei', desc: 'FusionSolar API', origin: 'China' },
  { name: 'Deye', desc: 'SOLARMAN Cloud', origin: 'China' },
  { name: 'Hoymiles', desc: 'S-Miles Cloud', origin: 'China' },
  { name: 'WEG', desc: 'WNet IoT Platform', origin: 'Brasil' },
];

export default function LogoGrid() {
  return (
    <div className="space-y-6">
      
      {/* Intro micro header */}
      <div className="text-center space-y-1 max-w-lg mx-auto">
        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Integração Multimarcas Pronta para Uso
        </span>
        <h4 className="text-lg font-bold text-slate-100">
          Usinas consolidadas em segundos
        </h4>
        <p className="text-xs text-slate-400">
          Nossos crawlers e conectores API oficiais buscam e consolidam a telemetria independente da marca do seu inversor fotovoltaico.
        </p>
      </div>

      {/* Grid of brand Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-2">
        {INTEGRATED_BRANDS.map((brand, idx) => (
          <div 
            key={idx}
            className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/30 rounded-xl p-3.5 text-center transition-all duration-300 transform hover:-translate-y-0.5 group relative overflow-hidden"
          >
            {/* Small solar motif backdrop */}
            <div className="absolute top-0 right-0 p-1 opacity-[0.03] group-hover:opacity-[0.08] transition duration-300">
              <Sun className="w-12 h-12 text-amber-400" />
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-500 mb-2 font-mono">
              <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-bold text-slate-400 group-hover:text-amber-400 transition">
                #{idx + 1}
              </span>
              <span>{brand.origin}</span>
            </div>

            <h5 className="font-black text-slate-200 text-sm group-hover:text-white transition tracking-tight">
              {brand.name}
            </h5>
            
            <p className="text-[9px] text-slate-500 mt-1 truncate">
              {brand.desc}
            </p>

            <div className="mt-2.5 flex justify-center items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[8px] text-slate-400 font-bold uppercase">Homologado</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ecosystem coverage footer */}
      <div className="bg-slate-900/30 rounded-2xl border border-slate-800/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Sua marca não está listada? Nosso conector Genérico via <strong>Modbus TCP/SunSpec</strong> resolve em minutos.</span>
        </span>
        <span className="text-[10px] text-amber-400 font-bold cursor-pointer hover:underline uppercase shrink-0">
          Falar com arquiteto técnico →
        </span>
      </div>

    </div>
  );
}
