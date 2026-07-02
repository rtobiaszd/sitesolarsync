import React, { useState, useEffect } from 'react';
import { 
  GitBranch, Kanban, MessageSquare, Bot, Cpu, Zap, Layers, Play, CheckCircle, 
  AlertTriangle, ArrowRight, RefreshCw, Send, Plus, Trash2, Calendar, Users, Briefcase, Settings, Building, FileSpreadsheet
} from 'lucide-react';
import { Deal, PipelineStage, WorkflowNode, WorkflowConnection } from '../types';

export default function SaaSConsolePrototype() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workflow' | 'crm' | 'inbox'>('dashboard');
  
  // State for CRM Kanban
  const [deals, setDeals] = useState<Deal[]>([
    { id: 'deal-1', title: 'Fronius Inversor Parado', plantName: 'Usinas Cobertas Fronius', brand: 'Fronius', stageId: 'stage-1', priority: 'HIGH', status: 'OPEN', lastUpdated: 'Hoje' },
    { id: 'deal-2', title: 'SMA Sobreaquecimento Lote C', plantName: 'Planta Central SMA', brand: 'SMA', stageId: 'stage-1', priority: 'MEDIUM', status: 'OPEN', lastUpdated: 'Ontem' },
    { id: 'deal-3', title: 'Growatt Desconexão Wi-Fi', plantName: 'Growatt Residencial I', brand: 'Growatt', stageId: 'stage-2', priority: 'LOW', status: 'OPEN', lastUpdated: 'Hoje' },
    { id: 'deal-4', title: 'ABB Corrente Reversa', plantName: 'ABB Comercial Norte', brand: 'ABB', stageId: 'stage-3', priority: 'HIGH', status: 'OPEN', lastUpdated: '2 dias atrás' },
  ]);

  const stages: PipelineStage[] = [
    { id: 'stage-1', name: 'Alerta de Erro', color: 'bg-rose-500/10 border-rose-500 text-rose-400', autoMoveEnabled: true, onEnterAction: 'Notificar WhatsApp Integrador' },
    { id: 'stage-2', name: 'Triagem Técnica', color: 'bg-amber-500/10 border-amber-500 text-amber-400', autoMoveEnabled: false, onEnterAction: 'Criar Issue no GitHub/Jira' },
    { id: 'stage-3', name: 'Equipe em Campo', color: 'bg-sky-500/10 border-sky-500 text-sky-400', autoMoveEnabled: false, onEnterAction: 'Agendar Visita no Calendário' },
    { id: 'stage-4', name: 'Solucionado', color: 'bg-emerald-500/10 border-emerald-500 text-emerald-400', autoMoveEnabled: true, onEnterAction: 'Enviar Relatório por Email' },
  ];

  // State for Workflow Engine Simulator
  const [workflowActive, setWorkflowActive] = useState(true);
  const [isSimulatingWorkflow, setIsSimulatingWorkflow] = useState(false);
  const [activeNodeStep, setActiveNodeStep] = useState<number>(-1);
  const [workflowLog, setWorkflowLog] = useState<string[]>([]);

  const workflowNodes: WorkflowNode[] = [
    { id: 'node-1', type: 'trigger', title: 'Trigger: Usina OFFLINE', description: 'Ativado via WorkManager se potência zerar por > 15min', config: {} },
    { id: 'node-2', type: 'condition', title: 'Condition: Horário Comercial?', description: 'Verifica se hora está entre 07:00 e 18:00', config: {} },
    { id: 'node-3', type: 'ai_decision', title: 'IA: Classificar Urgência', description: 'Modelo flash analisa severidade e histórico', config: {} },
    { id: 'node-4', type: 'action', title: 'Action: Criar Ticket Jira', description: 'Abertura automatizada no Squad de Manutenção', config: { actionType: 'create_jira' } },
    { id: 'node-5', type: 'action', title: 'Action: Alerta WhatsApp', description: 'Mensagem omnichannel prioritária ao proprietário', config: { actionType: 'send_whatsapp' } },
  ];

  // State for Unified Inbox & Chatbot
  const [botMode, setBotMode] = useState<'menu' | 'ai' | 'hybrid'>('hybrid');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot' | 'system'; text: string; time: string }[]>([
    { sender: 'system', text: 'Conversa iniciada via Entrada Omnichannel (WhatsApp)', time: '10:45' },
    { sender: 'user', text: 'Olá, estou com problemas no meu inversor SMA da Usina Central.', time: '10:45' },
    { sender: 'bot', text: 'Olá! Sou o assistente SolarSync. Identifiquei que você é da empresa SolSolar. \n\nMenu de Suporte:\n1. Verificar status de usinas\n2. Reportar mau funcionamento\n3. Agendar manutenção técnica\n\nDigite o número desejado ou digite sua dúvida diretamente.', time: '10:45' },
  ]);
  const [userInput, setUserInput] = useState('');

  // Workflow Simulation runner
  const runWorkflowSimulation = () => {
    if (isSimulatingWorkflow) return;
    setIsSimulatingWorkflow(true);
    setActiveNodeStep(0);
    setWorkflowLog(['[Simulador] Iniciando fluxo de automação de eventos...']);

    const delays = [1500, 3000, 4500, 6000, 7500];
    
    // Step 1: Trigger
    setTimeout(() => {
      setActiveNodeStep(1);
      setWorkflowLog(prev => [...prev, '[WORKFLOW] Trigger Ativado! Usina "Norte Solar II" reportou OFFLINE por telemetria.']);
    }, delays[0]);

    // Step 2: Condition
    setTimeout(() => {
      setActiveNodeStep(2);
      const isDaytime = new Date().getHours() >= 6 && new Date().getHours() <= 18;
      setWorkflowLog(prev => [...prev, `[WORKFLOW] Condição validada: É horário solar? ${isDaytime ? 'SIM (Dia ativo)' : 'NÃO (Válido para retry)'}. Continuar.`]);
    }, delays[1]);

    // Step 3: AI Classifier
    setTimeout(() => {
      setActiveNodeStep(3);
      setWorkflowLog(prev => [...prev, '[WORKFLOW] Inteligência Artificial: Analisando criticidade... Usina homologada como "Prioridade Alta". Tipo de erro: Inversor desarmado.']);
    }, delays[2]);

    // Step 4 & 5: Parallel Actions
    setTimeout(() => {
      setActiveNodeStep(4);
      setWorkflowLog(prev => [...prev, '[WORKFLOW] Ação Executada: Chamando Jira API para criar ticket #SOLAR-9102... SUCESSO.']);
    }, delays[3]);

    setTimeout(() => {
      setActiveNodeStep(5);
      setWorkflowLog(prev => [...prev, '[WORKFLOW] Ação Executada: Disparando notificação WhatsApp ao integrador de campo... SUCESSO.', '[Simulador] Fluxo encerrado com sucesso.']);
      setIsSimulatingWorkflow(false);
    }, delays[4]);
  };

  // Chatbot message processor
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const userMsg = userInput;
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time }]);
    setUserInput('');

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse = '';
      if (botMode === 'menu') {
        if (userMsg.includes('1') || userMsg.toLowerCase().includes('status') || userMsg.toLowerCase().includes('usina')) {
          botResponse = 'Sua usina "Planta Central SMA" está OPERACIONAL gerando 120 kW. \nUsina "Norte Solar II" está OFFLINE (Erro de conexão).';
        } else if (userMsg.includes('2') || userMsg.toLowerCase().includes('erro')) {
          botResponse = 'Abertura de chamado técnico: Por favor, descreva o erro do inversor ou informe o código do display.';
        } else {
          botResponse = 'Comando inválido no modo Determinístico. Escolha opções de 1 a 3:\n1. Status de usinas\n2. Reportar erro\n3. Agendar manutenção';
        }
      } else if (botMode === 'ai') {
        botResponse = `[Processado por Gemini Flash] Entendi que você está com problemas no inversor SMA. Analisei seu histórico e identifiquei uma queda repentina na usina Planta Central SMA. Já criei um ticket de prioridade alta no seu Jira (Ticket #SOL-249). Deseja que eu agende um especialista?`;
      } else {
        // Hybrid
        if (userMsg === '1' || userMsg === '2' || userMsg === '3') {
          botResponse = '[Modo Menu] Ticket cadastrado com sucesso. Caso queira conversar livremente, digite sua dúvida e nossa IA integrada irá analisar e responder imediatamente.';
        } else {
          botResponse = `[Modo Híbrido - Transição para IA] Identifiquei uma mensagem fora do menu estruturado. \n\nAnálise de Intenção: Suporte Técnico.\n\n"SolarSync AI" responde: Olá! Identifiquei instabilidade no inversor Fronius há 12 minutos. O backup automático no Google Sheets já está ativo. Gostaria de enviar um comando de reinicialização remota pela nossa API?`;
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse, time }]);
    }, 1000);
  };

  // Move deal handler
  const moveDeal = (dealId: string, targetStageId: string) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        const targetStage = stages.find(s => s.id === targetStageId);
        // Alert simulated actions
        const alertMsg = `[SaaS Automation] Deal "${deal.title}" movido para "${targetStage?.name}". Ação executada: ${targetStage?.onEnterAction}`;
        setWorkflowLog(l => [alertMsg, ...l]);
        return { ...deal, stageId: targetStageId, lastUpdated: 'Agora' };
      }
      return deal;
    }));
  };

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-3xl overflow-hidden font-sans">
      
      {/* Console Nav Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg text-slate-950 font-black tracking-tighter text-sm">
            SS
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              SolarSync B2B SaaS
              <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase">
                Console Integrador
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Painel administrativo multi-empresa e motor de automação</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'dashboard' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Indicadores</span>
          </button>
          <button 
            onClick={() => setActiveTab('workflow')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'workflow' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Workflow Engine</span>
          </button>
          <button 
            onClick={() => setActiveTab('crm')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'crm' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>CRM Pipeline</span>
          </button>
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'inbox' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inbox Omnichannel</span>
          </button>
        </div>
      </div>

      {/* Main Console Tab Contents */}
      <div className="p-6">
        
        {/* TAB 1: DASHBOARD METRICS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Empresas (Tenants)</span>
                  <Building className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xl font-extrabold text-white mt-2">12 Clientes</h4>
                <p className="text-[10px] text-emerald-400 mt-1">▲ +3 integradores este mês</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Integrações de API</span>
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xl font-extrabold text-white mt-2">42 Portais</h4>
                <p className="text-[10px] text-slate-400 mt-1">SMA, Fronius, Growatt, etc.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Usinas Monitoradas</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xl font-extrabold text-white mt-2">148 plantas</h4>
                <p className="text-[10px] text-emerald-400 mt-1">98.5% uptime de polling</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Taxa Bot Resolução</span>
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xl font-extrabold text-white mt-2">82% Triagem</h4>
                <p className="text-[10px] text-slate-400 mt-1">Resolvido via chatbot híbrido</p>
              </div>

            </div>

            {/* Ingestion & Webhooks Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Ingestão de Eventos Externos / Webhooks (/api/events)</h4>
                  <p className="text-xs text-slate-400">Ative gatilhos no SolarSync a partir de logs externos de inversores ou sistemas parceiros</p>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-semibold">
                  API Gateway On
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
                  <p className="text-amber-400 font-bold">// Endpoint de Ingestão de Log por Webhook</p>
                  <p className="mt-1 text-slate-500">POST {window.location.origin || 'https://api.solarsync.io'}/api/events</p>
                  
                  <div className="mt-3 text-slate-400">
                    {`{`}
                    <div className="pl-4">
                      {`"event_id": "evt_90812x3",`} <br />
                      {`"provider": "GROWATT",`} <br />
                      {`"severity": "CRITICAL",`} <br />
                      {`"plant_id": "usina_campinas_01",`} <br />
                      {`"error_code": "E03_BUS_OVERVOLTAGE",`} <br />
                      {`"message": "Tensão excessiva do barramento CC detectada."`}
                    </div>
                    {`}`}
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col justify-between p-1">
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-200">Como funciona o motor de webhooks?</p>
                    <ul className="list-disc pl-4 text-slate-400 space-y-1">
                      <li>Usinas legadas e portais de monitoramento disparam webhooks de alerta.</li>
                      <li>O validador SaaS descriptografa e ingere o evento em milissegundos.</li>
                      <li>O motor varre regras de automação ativas e dispara o fluxo associado.</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-amber-400/5 border border-amber-400/10 rounded-lg text-xs text-slate-400 leading-relaxed">
                    <strong>Integração Direta:</strong> Conecte canais do Slack, Teams, Jira ou GitHub instantaneamente apontando seus alertas para nosso endpoint de escuta.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WORKFLOW NODE BUILDER */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4 text-amber-400" />
                  Editor de Workflows Visuais (Baseado em Nós)
                </h4>
                <p className="text-xs text-slate-400">Desenhe árvores lógicas complexas sem escrever uma única linha de código.</p>
              </div>

              <button 
                onClick={runWorkflowSimulation}
                disabled={isSimulatingWorkflow}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition ${
                  isSimulatingWorkflow 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-amber-400 text-slate-950 hover:bg-amber-500'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isSimulatingWorkflow ? 'SIMULANDO...' : 'TESTAR FLUXO LIVE'}</span>
              </button>
            </div>

            {/* Visual Nodes Board Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Nodes Map (8 cols) */}
              <div className="lg:col-span-8 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 relative overflow-hidden min-h-[360px] flex flex-col justify-between">
                
                {/* Node Grid Layout representation */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 relative">
                  {workflowNodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                      {index > 0 && index !== 4 && (
                        <div className="hidden md:flex flex-col items-center justify-center shrink-0">
                          <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                            activeNodeStep === index ? 'text-amber-400 scale-125 animate-pulse' : 'text-slate-700'
                          }`} />
                        </div>
                      )}
                      
                      {index === 4 && (
                        <div className="absolute right-12 bottom-4 hidden md:flex items-center">
                          <div className="h-10 w-px bg-slate-800"></div>
                        </div>
                      )}

                      <div 
                        className={`w-full md:w-36 bg-slate-950 rounded-xl p-3.5 border transition-all duration-500 text-center relative ${
                          activeNodeStep === index 
                            ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-slate-900 scale-105' 
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded-full mb-1.5 uppercase ${
                          node.type === 'trigger' ? 'bg-rose-500/10 text-rose-400' :
                          node.type === 'condition' ? 'bg-sky-500/10 text-sky-400' :
                          node.type === 'ai_decision' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {node.type}
                        </span>
                        
                        <h5 className="font-bold text-[11px] text-slate-100 leading-tight">{node.title}</h5>
                        <p className="text-[9px] text-slate-400 mt-1 leading-snug">{node.description}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Automation Rules Tip */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Status do Motor de Fluxos:</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Ativo & Saudável
                  </span>
                </div>
              </div>

              {/* Simulation Logs Terminal Panel (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-full justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-300 uppercase mb-3">Logs do Motor de Execução</h5>
                  <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 h-64 overflow-y-auto font-mono text-[10px] space-y-2 text-slate-300">
                    {workflowLog.length === 0 ? (
                      <p className="text-slate-600 italic">Nenhuma simulação ativa. Clique no botão acima para rodar um teste em tempo real do workflow.</p>
                    ) : (
                      workflowLog.map((log, idx) => (
                        <p key={idx} className={`${
                          log.includes('SUCESSO') ? 'text-emerald-400' :
                          log.includes('Trigger') ? 'text-rose-400' :
                          log.includes('Inteligência') ? 'text-purple-400' : 'text-slate-300'
                        }`}>
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-400/5 rounded-xl border border-amber-400/10 text-xs text-slate-400 leading-relaxed">
                  <strong>Nota do Arquiteto:</strong> Esse motor utiliza agendamentos e transações assíncronas do Node.js, empacotando ações externas em filas persistentes (BullMQ / Redis) para garantir entrega resiliente.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: CRM PIPELINES */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <Kanban className="w-4 h-4 text-amber-400" />
                  CRM Kanban Integrado (Pipelines de Resolução)
                </h4>
                <p className="text-xs text-slate-400">Visualize problemas técnicos estruturados como leads e tickets lógicos em andamento.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filtro de Usina:</span>
                <select className="bg-slate-900 border border-slate-800 rounded-lg text-xs px-3 py-1.5 text-slate-300">
                  <option>Todas as Plantas</option>
                  <option>Planta Central SMA</option>
                  <option>Usinas Cobertas Fronius</option>
                </select>
              </div>
            </div>

            {/* Kanban Board Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((stage) => {
                const stageDeals = deals.filter(d => d.stageId === stage.id);
                return (
                  <div key={stage.id} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex flex-col h-[400px]">
                    {/* Stage Header */}
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${stage.color}`}>
                        {stage.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">{stageDeals.length}</span>
                    </div>

                    {/* Stage Automatic Actions Info */}
                    <div className="mb-3.5 bg-slate-950 p-2 rounded-lg border border-slate-900 text-[9px] text-slate-400 flex flex-col">
                      <span className="text-[8px] text-amber-500 font-bold uppercase tracking-wider">Ação onEnter:</span>
                      <span className="text-slate-300 truncate">{stage.onEnterAction}</span>
                    </div>

                    {/* Stage Deals Cards */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-none">
                      {stageDeals.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-600 text-[10px] italic py-8 border border-dashed border-slate-900 rounded-xl">
                          Vazio
                        </div>
                      ) : (
                        stageDeals.map((deal) => (
                          <div key={deal.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 shadow-sm hover:border-slate-700 transition">
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-slate-200 text-[11px] leading-tight">{deal.title}</h5>
                              <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${
                                deal.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                deal.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {deal.priority}
                              </span>
                            </div>
                            
                            <p className="text-[9px] text-slate-400">{deal.plantName}</p>
                            
                            <div className="flex items-center justify-between text-[8px] text-slate-500 border-t border-slate-900/60 pt-2 mt-1">
                              <span>Brand: {deal.brand}</span>
                              <span>{deal.lastUpdated}</span>
                            </div>

                            {/* Move controls inside Kanban */}
                            <div className="pt-2 flex justify-end gap-1 border-t border-slate-900">
                              {stage.id !== 'stage-4' && (
                                <button
                                  onClick={() => {
                                    const nextIdx = stages.findIndex(s => s.id === stage.id) + 1;
                                    if (nextIdx < stages.length) {
                                      moveDeal(deal.id, stages[nextIdx].id);
                                    }
                                  }}
                                  className="text-[8px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 px-2 py-1 rounded font-bold uppercase transition flex items-center gap-0.5"
                                >
                                  Mover <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: UNIFIED INBOX & HYBRID CHATBOT */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Unified Omnichannel Inbox & Chatbot Sandbox
                </h4>
                <p className="text-xs text-slate-400">Veja o atendimento automatizado agindo sobre os canais integrados.</p>
              </div>

              {/* Bot Selector modes */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                <span className="text-[10px] text-slate-500 px-2 font-bold uppercase">Modo Bot:</span>
                <button
                  onClick={() => setBotMode('menu')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${botMode === 'menu' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setBotMode('ai')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${botMode === 'ai' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                >
                  AI LLM
                </button>
                <button
                  onClick={() => setBotMode('hybrid')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${botMode === 'hybrid' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                >
                  Híbrido
                </button>
              </div>
            </div>

            {/* Chatbox UI Mock */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-2xl mx-auto flex flex-col h-96">
              
              {/* Chat Title */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-850 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <h5 className="font-bold text-slate-200 text-xs">Atendimento SolSolar (Cliente #8)</h5>
                    <p className="text-[9px] text-slate-500">Canal: WhatsApp Integrador (+55 11 99999-0000)</p>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  Integração: Twilio Gateway
                </span>
              </div>

              {/* Chat view area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/60 scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'
                  }`}>
                    {msg.sender === 'system' ? (
                      <span className="bg-slate-900/80 text-slate-500 text-[9px] px-3 py-1 rounded-full border border-slate-850">
                        {msg.text}
                      </span>
                    ) : (
                      <div className={`max-w-xs rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-amber-400 text-slate-950 rounded-tr-none font-medium' 
                          : 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span className={`block text-[8px] text-right mt-1.5 font-mono ${
                          msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <div className="bg-slate-950 border-t border-slate-850 p-3 flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Simule a digitação de uma mensagem de teste..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-amber-400 text-slate-950 hover:bg-amber-500 p-2.5 rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
