import React, { useState } from 'react';
import { FolderTree, Database, Key, ShieldCheck, Cpu, Code, ChevronRight, ChevronDown, Server } from 'lucide-react';
import { DatabaseTable } from '../types';

export default function TechnicalArchitecture() {
  const [selectedTable, setSelectedTable] = useState<string>('solar_plants');
  const [expandedFolder, setExpandedFolder] = useState<Record<string, boolean>>({
    root: true,
    data: true,
    ui: true,
  });

  const toggleFolder = (folder: string) => {
    setExpandedFolder(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const dbSchema: DatabaseTable[] = [
    {
      name: 'companies',
      description: 'Estrutura primária multi-tenant. Identifica o cliente corporativo proprietário das usinas solares.',
      columns: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY', description: 'Identificador único da empresa' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Razão social ou nome fantasia' },
        { name: 'document', type: 'VARCHAR(20)', constraints: 'UNIQUE', description: 'CNPJ/CPF do integrador de energia' },
        { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT true', description: 'Indica se a licença SaaS está ativa' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP', description: 'Data de homologação da conta' },
      ]
    },
    {
      name: 'inverter_portals',
      description: 'Credenciais e portais de monitoramento homologados por empresa para execução dos crawlers.',
      columns: [
        { name: 'id', type: 'INTEGER', constraints: 'PRIMARY KEY AUTOINCREMENT', description: 'ID interno incremental' },
        { name: 'company_id', type: 'UUID', constraints: 'FOREIGN KEY REFERENCES companies(id)', description: 'Vínculo com o tenant' },
        { name: 'brand', type: 'VARCHAR(50)', constraints: 'NOT NULL', description: 'Marca do inversor (SMA, FRONIUS, GROWATT, ABB, etc.)' },
        { name: 'portal_username', type: 'VARCHAR(150)', constraints: 'NOT NULL', description: 'Nome de usuário de acesso ao portal oficial' },
        { name: 'portal_password_encrypted', type: 'TEXT', constraints: 'NOT NULL', description: 'Senha criptografada localmente via Android Keystore' },
        { name: 'sync_status', type: 'VARCHAR(30)', constraints: 'DEFAULT "IDLE"', description: 'Status da última varredura' },
        { name: 'last_synced_at', type: 'TIMESTAMP', description: 'Data/Hora do último sucesso do crawler' },
      ]
    },
    {
      name: 'solar_plants',
      description: 'Tabela principal de usinas fotovoltaicas. Representa os ativos físicos monitorados.',
      columns: [
        { name: 'id', type: 'VARCHAR(100)', constraints: 'PRIMARY KEY', description: 'ID único consolidado (gerado pelo SolarSync)' },
        { name: 'portal_id', type: 'INTEGER', constraints: 'FOREIGN KEY REFERENCES inverter_portals(id)', description: 'Portal de origem dos dados' },
        { name: 'name', type: 'VARCHAR(150)', constraints: 'NOT NULL', description: 'Nome amigável da usina fotovoltaica' },
        { name: 'location', type: 'VARCHAR(255)', description: 'Cidade, Estado ou coordenadas de instalação' },
        { name: 'capacity_kwp', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Capacidade nominal de pico em kWp' },
        { name: 'last_known_power_kw', type: 'DECIMAL(10,2)', description: 'Última potência instantânea registrada' },
        { name: 'status', type: 'VARCHAR(20)', constraints: 'DEFAULT "ACTIVE"', description: 'Estado atual (ACTIVE, WARNING, OFFLINE)' },
      ]
    },
    {
      name: 'telemetry_logs',
      description: 'Histórico de produção energética em alta resolução temporal. Alimentado a cada 15 min.',
      columns: [
        { name: 'id', type: 'INTEGER', constraints: 'PRIMARY KEY AUTOINCREMENT', description: 'ID sequencial interno' },
        { name: 'plant_id', type: 'VARCHAR(100)', constraints: 'FOREIGN KEY REFERENCES solar_plants(id) ON DELETE CASCADE', description: 'Usina fotovoltaica associada' },
        { name: 'timestamp', type: 'TIMESTAMP', constraints: 'NOT NULL', description: 'Momento exato da leitura do inversor' },
        { name: 'power_kw', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Potência gerada no instante em kW' },
        { name: 'daily_yield_kwh', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Soma de geração acumulada do dia em kWh' },
        { name: 'raw_json_payload', type: 'TEXT', description: 'Payload bruto original capturado do portal para auditoria' },
      ]
    },
    {
      name: 'sheets_configs',
      description: 'Parâmetros de integração contínua do Google Sheets para persistência secundária no Workspace.',
      columns: [
        { name: 'id', type: 'INTEGER', constraints: 'PRIMARY KEY AUTOINCREMENT', description: 'ID sequencial' },
        { name: 'company_id', type: 'UUID', constraints: 'FOREIGN KEY REFERENCES companies(id)', description: 'Tenant associado ao backup' },
        { name: 'spreadsheet_id', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'ID físico do arquivo no Google Drive' },
        { name: 'sheet_name', type: 'VARCHAR(100)', constraints: 'DEFAULT "Geração"', description: 'Nome da aba da planilha' },
        { name: 'sync_frequency_min', type: 'INTEGER', constraints: 'DEFAULT 60', description: 'Periodicidade do upload em minutos' },
        { name: 'last_exported_at', type: 'TIMESTAMP', description: 'Momento da última gravação de dados' },
      ]
    }
  ];

  const currentTableData = dbSchema.find(t => t.name === selectedTable) || dbSchema[2];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Column 1: Clean Architecture Directory Tree (5 cols) */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-slate-800">
          <FolderTree className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-slate-100">Estrutura de Pastas (Android MVVM)</h4>
        </div>
        
        <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
          O SolarSync é construído sobre o padrão <strong>Clean Architecture</strong> recomendado pela Google, isolando lógica de dados e interface Compose de forma modular.
        </p>

        {/* Dynamic Tree */}
        <div className="space-y-1 font-mono text-[11px] text-slate-300">
          
          {/* Root */}
          <div>
            <div onClick={() => toggleFolder('root')} className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition">
              {expandedFolder.root ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              <span className="text-amber-400">solarsync/</span>
            </div>
            
            {expandedFolder.root && (
              <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                
                {/* Data Folder */}
                <div>
                  <div onClick={() => toggleFolder('data')} className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition">
                    {expandedFolder.data ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    <span className="text-sky-400">data/</span>
                  </div>
                  
                  {expandedFolder.data && (
                    <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">├──</span>
                        <span className="text-amber-500 font-bold">db/</span>
                        <span className="text-slate-500 text-[10px]">(RoomDB, DAOs, Entities)</span>
                      </div>
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">├──</span>
                        <span className="text-sky-300">model/</span>
                        <span className="text-slate-500 text-[10px]">(Data transfer classes)</span>
                      </div>
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">├──</span>
                        <span className="text-emerald-400">repository/</span>
                        <span className="text-slate-500 text-[10px]">(State & Cloud caching)</span>
                      </div>
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">└──</span>
                        <span className="text-rose-400 font-semibold">worker/</span>
                        <span className="text-slate-500 text-[10px]">(WorkManager background task)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* UI Folder */}
                <div>
                  <div onClick={() => toggleFolder('ui')} className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition">
                    {expandedFolder.ui ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    <span className="text-purple-400">ui/</span>
                  </div>
                  
                  {expandedFolder.ui && (
                    <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">├──</span>
                        <span className="text-purple-300">screens/</span>
                        <span className="text-slate-500 text-[10px]">(Compose Declarative views)</span>
                      </div>
                      <div className="flex items-center space-x-1.5 py-0.5 hover:text-white transition">
                        <span className="text-slate-500">└──</span>
                        <span className="text-fuchsia-400 font-bold">viewmodel/</span>
                        <span className="text-slate-500 text-[10px]">(Observable States, UI flows)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* App Class */}
                <div className="flex items-center space-x-1.5 py-0.5">
                  <span className="text-slate-500">├──</span>
                  <span className="text-amber-400">SolarSyncApp.kt</span>
                  <span className="text-slate-500 text-[10px]">(Hilt injection setup)</span>
                </div>
                
                {/* MainActivity */}
                <div className="flex items-center space-x-1.5 py-0.5">
                  <span className="text-slate-500">└──</span>
                  <span className="text-amber-400">MainActivity.kt</span>
                  <span className="text-slate-500 text-[10px]">(Entry Point Compose Activity)</span>
                </div>

              </div>
            )}
          </div>
          
        </div>

        {/* Sandbox Note */}
        <div className="mt-5 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500" />
            <span>Segurança no Android Sandbox</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
            Credenciais são encriptadas em repouso no banco de dados local utilizando <strong>AES-256-GCM</strong>, cujas chaves de segurança estão isoladas via hardware na <strong>Android Keystore API</strong>. O aplicativo impede exportação de chaves privadas e restringe acessos.
          </p>
        </div>

      </div>

      {/* Column 2: Room Database Visual Schema (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <Database className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-slate-100 font-sans">Banco de Dados Room Local (5 Tabelas)</h4>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mb-4 leading-relaxed font-sans">
          Uma arquitetura offline-first robusta estruturada localmente. Clique em uma tabela para inspecionar seus atributos e chaves estrangeiras:
        </p>

        {/* Tabs for database tables */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dbSchema.map((table) => (
            <button
              key={table.name}
              onClick={() => setSelectedTable(table.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedTable === table.name
                  ? 'bg-amber-400 text-slate-950 font-bold border border-amber-400 shadow-sm'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {table.name}
            </button>
          ))}
        </div>

        {/* Selected table schema presentation */}
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300">
          <div className="mb-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-500" />
                CREATE TABLE {currentTableData.name} (
              </span>
              <span className="text-[10px] text-slate-500 italic">Room Entity</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-1 leading-relaxed border-l-2 border-slate-800 pl-2.5">
              {currentTableData.description}
            </p>
          </div>

          {/* Table columns */}
          <div className="space-y-2 border-y border-slate-800/80 py-3.5 my-3">
            {currentTableData.columns.map((col, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1 hover:bg-slate-900/40 px-1.5 rounded transition">
                <div className="flex items-baseline space-x-2">
                  <span className="text-slate-100 font-bold font-mono">{col.name}</span>
                  <span className="text-sky-400 text-[10px]">{col.type}</span>
                  {col.constraints && (
                    <span className="text-rose-400 font-semibold text-[9px] px-1 bg-rose-500/10 border border-rose-500/20 rounded">
                      {col.constraints}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-sans sm:text-right sm:max-w-xs block leading-tight">
                  {col.description}
                </span>
              </div>
            ))}
          </div>

          <span className="text-xs font-black text-amber-400">);</span>
        </div>

        {/* Relationships legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-sans border-t border-slate-800/80 pt-3.5">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
            <span>PK = Primary Key</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
            <span>FK = Foreign Key</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span>Indices automáticos para varreduras indexadas</span>
          </div>
        </div>

      </div>
    </div>
  );
}
