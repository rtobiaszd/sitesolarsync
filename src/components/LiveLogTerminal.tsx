import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Trash2, Filter, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { LogEntry, LogLevel } from '../types';

interface LiveLogTerminalProps {
  onPlantStatusChange?: (plantId: string, status: 'ACTIVE' | 'WARNING' | 'OFFLINE') => void;
}

const SIMULATED_LOGS_TEMPLATES = [
  { level: 'INFO' as LogLevel, service: 'WorkManager' as const, msg: 'Iniciando PeriodicWorkRequest (intervalo de 15 min) para varredura de portais...' },
  { level: 'INFO' as LogLevel, service: 'InverterCrawler' as const, msg: 'Conectando ao portal SMA via túnel Sandbox seguro...' },
  { level: 'SUCCESS' as LogLevel, service: 'InverterCrawler' as const, msg: 'SMA Portal: Usina "Sol de Verão I" respondendo com 142.4 kW. Eficiência de 98.2%.' },
  { level: 'SUCCESS' as LogLevel, service: 'RoomDB' as const, msg: 'Dados da usina "Sol de Verão I" atualizados no Banco Room local.' },
  { level: 'INFO' as LogLevel, service: 'GoogleSheets' as const, msg: 'Sincronização em segundo plano iniciada para Google Sheets Workspace...' },
  { level: 'SUCCESS' as LogLevel, service: 'GoogleSheets' as const, msg: 'Google Sheets API: Planilha de Produção consolidada atualizada com sucesso. +1 registro.' },
  { level: 'INFO' as LogLevel, service: 'InverterCrawler' as const, msg: 'Conectando ao portal Fronius (Usina "Serra da Canastra")...' },
  { level: 'WARNING' as LogLevel, service: 'InverterCrawler' as const, msg: 'Fronius Portal: Instabilidade na resposta da API. Executando reconexão...' },
  { level: 'SUCCESS' as LogLevel, service: 'InverterCrawler' as const, msg: 'Fronius Portal: Conexão restabelecida. Geração ativa em 84.7 kW.' },
  { level: 'INFO' as LogLevel, service: 'InverterCrawler' as const, msg: 'Conectando ao portal Growatt (Usina "Bento Gonçalves")...' },
  { level: 'ERROR' as LogLevel, service: 'InverterCrawler' as const, msg: 'Growatt Portal: Falha de autenticação (Erro 401 - Portal alterou parâmetros do formulário).' },
  { level: 'WARNING' as LogLevel, service: 'WorkManager' as const, msg: 'Falha temporária em Growatt. Aplicando política de Retry Exponencial. Próxima tentativa em 5 min.' },
  { level: 'INFO' as LogLevel, service: 'InverterCrawler' as const, msg: 'Conectando ao portal ABB/FIMER (Usina "Norte Solar II")...' },
  { level: 'ERROR' as LogLevel, service: 'InverterCrawler' as const, msg: 'ABB Portal: Usina "Norte Solar II" detectada com status OFFLINE (Geração zerada).' },
  { level: 'ERROR' as LogLevel, service: 'NotificationManager' as const, msg: 'ALERTA DISPARADO: Usina "Norte Solar II" está OFFLINE! Enviando Push Notification de alta prioridade.' },
  { level: 'SUCCESS' as LogLevel, service: 'NotificationManager' as const, msg: 'NotificationManager: Canal de Push "Alertas Críticos" entregue com sucesso ao dispositivo.' },
  { level: 'SUCCESS' as LogLevel, service: 'RoomDB' as const, msg: 'Status da usina "Norte Solar II" alterado para OFFLINE no Room local.' },
  { level: 'INFO' as LogLevel, service: 'GoogleSheets' as const, msg: 'Exportando alerta crítico de usina OFFLINE para Planilha de Incidentes...' },
  { level: 'SUCCESS' as LogLevel, service: 'GoogleSheets' as const, msg: 'Google Sheets: Incidente reportado na linha #42 do arquivo de auditoria.' },
];

export default function LiveLogTerminal({ onPlantStatusChange }: LiveLogTerminalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filter, setFilter] = useState<LogLevel | 'ALL'>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // Pre-populate with some logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [];
    const now = new Date();
    for (let i = 0; i < 8; i++) {
      const template = SIMULATED_LOGS_TEMPLATES[i % SIMULATED_LOGS_TEMPLATES.length];
      const timeStr = new Date(now.getTime() - (8 - i) * 15000).toLocaleTimeString('pt-BR');
      initialLogs.push({
        id: `init-${i}`,
        timestamp: timeStr,
        level: template.level,
        service: template.service,
        message: template.msg
      });
    }
    setLogs(initialLogs);
    indexRef.current = 8;
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const template = SIMULATED_LOGS_TEMPLATES[indexRef.current % SIMULATED_LOGS_TEMPLATES.length];
      const timeStr = new Date().toLocaleTimeString('pt-BR');
      
      const newLog: LogEntry = {
        id: `sim-${Date.now()}`,
        timestamp: timeStr,
        level: template.level,
        service: template.service,
        message: template.msg
      };

      setLogs((prev) => {
        const updated = [...prev, newLog];
        // Keep last 100 logs
        return updated.slice(-100);
      });

      // Notify parent if status change occurs in the simulation
      if (onPlantStatusChange) {
        if (template.msg.includes('Norte Solar II') && template.msg.includes('OFFLINE')) {
          onPlantStatusChange('plant-3', 'OFFLINE');
        } else if (template.msg.includes('Sol de Verão I') && template.msg.includes('142.4 kW')) {
          onPlantStatusChange('plant-1', 'ACTIVE');
        }
      }

      indexRef.current += 1;
    }, 4500); // Add a log every 4.5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, onPlantStatusChange]);

  // Scroll to bottom on new logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const clearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filter === 'ALL' || log.level === filter;
    const matchesService = serviceFilter === 'ALL' || log.service === serviceFilter;
    return matchesLevel && matchesService;
  });

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'SUCCESS': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'WARNING': return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
      case 'ERROR': return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
      default: return 'text-sky-400 bg-sky-500/10 border-sky-500/25';
    }
  };

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'SUCCESS': return <CheckCircle className="w-3 h-3" />;
      case 'WARNING': return <AlertTriangle className="w-3 h-3" />;
      case 'ERROR': return <AlertTriangle className="w-3 h-3 text-rose-400" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Header bar of terminal */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-slate-400 font-semibold text-xs ml-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            SolarSync WorkManager Android Sandbox
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs border transition-all ${
              isPlaying 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
            }`}
            title={isPlaying ? 'Pausar Simulador' : 'Iniciar Simulador'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 mr-1" />
                <span>EXECUTANDO</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 mr-1" />
                <span>PAUSADO</span>
              </>
            )}
          </button>

          <button 
            onClick={clearLogs}
            className="p-1 px-2.5 bg-slate-800 border border-slate-700 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Limpar Terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex flex-wrap gap-2 items-center text-slate-400 text-[11px]">
        <div className="flex items-center gap-1.5 mr-2">
          <Filter className="w-3 h-3 text-slate-500" />
          <span>Filtro de Logs:</span>
        </div>
        <div className="flex space-x-1">
          {(['ALL', 'INFO', 'SUCCESS', 'WARNING', 'ERROR'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-2 py-0.5 rounded transition ${
                filter === level 
                  ? 'bg-slate-800 text-amber-400 font-semibold border border-slate-700' 
                  : 'hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              {level === 'ALL' ? 'TODOS' : level}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-slate-800 mx-2 hidden sm:block"></div>

        <div className="flex items-center space-x-1">
          <span className="text-slate-500">Serviço:</span>
          <select 
            value={serviceFilter} 
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-slate-300 focus:outline-none focus:border-amber-500 text-[11px]"
          >
            <option value="ALL">Todos os Serviços</option>
            <option value="WorkManager">WorkManager</option>
            <option value="InverterCrawler">InverterCrawler</option>
            <option value="NotificationManager">NotificationManager</option>
            <option value="RoomDB">RoomDB</option>
            <option value="GoogleSheets">GoogleSheets</option>
          </select>
        </div>
      </div>

      {/* Log list viewport */}
      <div className="p-4 h-80 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {filteredLogs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
            <span className="animate-pulse">Aguardando logs do WorkManager...</span>
            <span className="text-[10px] text-slate-600">(Certifique-se de que o simulador está rodando)</span>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2 text-slate-300 leading-relaxed hover:bg-slate-900/40 p-1 rounded transition group">
              <span className="text-slate-600 text-[11px] select-none">{log.timestamp}</span>
              
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 shrink-0 ${getLevelColor(log.level)}`}>
                {getLevelIcon(log.level)}
                {log.level}
              </span>

              <span className="text-amber-500/90 font-semibold shrink-0">[{log.service}]</span>
              
              <span className="text-slate-300 group-hover:text-white transition break-all sm:break-normal">{log.message}</span>
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Footer bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 text-slate-500 text-[10px] flex justify-between items-center">
        <span>Polling Ativo: 15m agendados no WorkManager</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Android Sandbox Protegido
          </span>
          <span className="text-slate-600">v2.4.0-mvp</span>
        </div>
      </div>
    </div>
  );
}
