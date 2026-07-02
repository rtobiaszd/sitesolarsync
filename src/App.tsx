import React, { useState, useEffect } from 'react';
import { 
  Sun, Shield, ArrowRight, Zap, RefreshCw, Smartphone, Code, Play, CheckCircle, 
  Layers, MessageSquare, Bot, HelpCircle, Briefcase, FileText, ChevronRight, X, Github, Cpu
} from 'lucide-react';
import InteractiveMockup from './components/InteractiveMockup';
import LiveLogTerminal from './components/LiveLogTerminal';
import TechnicalArchitecture from './components/TechnicalArchitecture';
import SaaSConsolePrototype from './components/SaaSConsolePrototype';
import ContactForm from './components/ContactForm';
import LogoGrid from './components/LogoGrid';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'sandbox'>('landing');
  const [plantStatusState, setPlantStatusState] = useState<Record<string, 'ACTIVE' | 'WARNING' | 'OFFLINE'>>({
    'plant-1': 'ACTIVE',
    'plant-2': 'ACTIVE',
    'plant-3': 'ACTIVE',
  });

  // Floating AI Assistant State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiHistory, setAiHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Olá! Sou o consultor de arquitetura do SolarSync. Tem alguma dúvida sobre nossas integrações (SMA, Fronius, ABB), banco Room, WorkManager ou modelo multi-tenant SaaS?' }
  ]);

  const handlePlantStatusChange = (plantId: string, status: 'ACTIVE' | 'WARNING' | 'OFFLINE') => {
    setPlantStatusState(prev => ({ ...prev, [plantId]: status }));
  };

  const scrollToSection = (id: string) => {
    setActiveTab('landing');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Client-side AI expert assistant simulation
  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    const userText = aiQuery;
    setAiHistory(prev => [...prev, { role: 'user', text: userText }]);
    setAiQuery('');

    setTimeout(() => {
      let replyText = '';
      const q = userText.toLowerCase();

      if (q.includes('workmanager') || q.includes('segundo plano') || q.includes('background')) {
        replyText = 'O SolarSync utiliza o Android WorkManager com um PeriodicWorkRequest configurado com intervalo de 15 minutos (limite mínimo do sistema operacional). Ele garante resiliência agendando crawlers de segundo plano que rodam mesmo se o app for forçado a fechar. Caso ocorra erro de portal instável, aplicamos uma política de retry exponencial (Linear/Exponential Backoff).';
      } else if (q.includes('room') || q.includes('banco') || q.includes('schema') || q.includes('tabela')) {
        replyText = 'Nosso banco local Room é estruturado com 5 tabelas relacionais robustas: "companies" (controle multi-tenant), "inverter_portals" (guardião criptografado de credenciais de portais), "solar_plants" (os ativos físicos), "telemetry_logs" (histórico de geração kW a cada 15m), e "sheets_configs" (integração contínua com Google Sheets).';
      } else if (q.includes('sheets') || q.includes('google') || q.includes('backup')) {
        replyText = 'A sincronização contínua com o Google Sheets funciona como um backup de contingência transparente. O WorkManager faz chamadas autenticadas via OAuth à Google Sheets API do usuário, gravando logs de incidentes e produção ativa diretamente em uma planilha do Google Drive pré-configurada.';
      } else if (q.includes('segurança') || q.includes('senha') || q.includes('sandbox')) {
        replyText = 'Segurança é nossa prioridade número um. Todas as senhas dos portais solares são criptografadas em repouso no Banco Room utilizando criptografia AES-256-GCM. As chaves criptográficas estão isoladas via hardware através da Android Keystore API, impedindo exportação. O aplicativo roda no isolamento do Android Sandbox com permissões mínimas restritas (INTERNET e POST_NOTIFICATIONS).';
      } else if (q.includes('chatbot') || q.includes('conversão') || q.includes('whatsapp')) {
        replyText = 'Nosso chatbot SaaS é omnichannel e suporta 3 modos: Determinístico (Menu estruturado por teclado numérico), AI-Only (Respostas geradas pelo Gemini Flash baseadas na telemetria da usina), e Híbrido (Menu padrão com transição inteligente para IA se o usuário digitar uma dúvida complexa).';
      } else if (q.includes('sma') || q.includes('fronius') || q.includes('growatt') || q.includes('inversor')) {
        replyText = 'Nossa plataforma é homologada para as maiores marcas do ecossistema solar brasileiro e global, incluindo SMA (Sunny Portal), ABB/Fimer, Fronius (Solar.web REST), Sungrow, Canadian Solar, APsystems, Growatt, SolarEdge, Huawei, Deye, Hoymiles e WEG. Se o inversor não tiver portal oficial, suportamos leitura local via Modbus TCP.';
      } else {
        replyText = 'Ótima pergunta! O SolarSync foi arquitetado para simplificar a vida do integrador solar B2B. Ele unifica a telemetria, gerencia equipes de manutenção via Kanban CRM, cria fluxos de automação de incidentes e sincroniza dados de backup. Qual outro detalhe técnico da nossa infraestrutura você gostaria de explorar?';
      }

      setAiHistory(prev => [...prev, { role: 'assistant', text: replyText }]);
    }, 800);
  };

  return (
    <div id="solar-app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Premium Header / Navigation */}
      <header className="sticky top-0 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => scrollToSection('hero-top')}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-md opacity-30 rounded-full animate-pulse"></div>
              <Sun className="w-7 h-7 text-amber-400 fill-amber-400 relative z-10" />
            </div>
            <div>
              <span className="font-sans font-black text-base tracking-tight text-white">Solar<span className="text-amber-400">Sync</span></span>
              <span className="text-[9px] block text-slate-500 font-mono leading-none font-bold">B2B SaaS</span>
            </div>
          </div>

          {/* Navigation Links for Sections */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-400">
            <button 
              onClick={() => { setActiveTab('landing'); scrollToSection('hero-top'); }}
              className={`hover:text-white transition ${activeTab === 'landing' ? 'text-amber-400 font-bold' : ''}`}
            >
              Apresentação
            </button>
            <button 
              onClick={() => scrollToSection('features-section')}
              className="hover:text-white transition"
            >
              Funcionalidades
            </button>
            <button 
              onClick={() => scrollToSection('architecture-section')}
              className="hover:text-white transition"
            >
              Arquitetura & Código
            </button>
            <button 
              onClick={() => scrollToSection('ecosystem-section')}
              className="hover:text-white transition"
            >
              Ecossistema solares
            </button>
            <button 
              onClick={() => setActiveTab('sandbox')}
              className={`hover:text-white transition ${activeTab === 'sandbox' ? 'text-amber-400 font-bold' : ''}`}
            >
              Simulador SaaS
            </button>
          </nav>

          {/* Action Call for Free Demo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab(activeTab === 'landing' ? 'sandbox' : 'landing')}
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-xl transition border border-slate-800"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeTab === 'landing' ? 'Painel SaaS Sandbox' : 'Ver Landing Page'}</span>
            </button>

            <button 
              onClick={() => scrollToSection('conversion-section')}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-md transition duration-300"
            >
              Agendar Demo ☀️
            </button>
          </div>

        </div>
      </header>

      {/* Main Viewport Router (Landing vs Sandbox) */}
      <main className="flex-1">
        {activeTab === 'sandbox' ? (
          /* FULL INTERACTIVE SAAS PROTOTYPE CONSOLE */
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Ambiente de Testes Multiusuário
                </span>
                <h1 className="text-xl md:text-2xl font-black text-white mt-2">Simulador de Plataforma SaaS SolarSync</h1>
                <p className="text-xs text-slate-400 mt-1">Explore a infraestrutura de backend em tempo real: crie robôs de automação, arraste chamados no Kanban e simule atendimentos inteligentes.</p>
              </div>

              <button 
                onClick={() => setActiveTab('landing')}
                className="bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs px-4 py-2 rounded-xl transition border border-slate-800 flex items-center gap-1.5"
              >
                Voltar para a Landing Page
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <SaaSConsolePrototype />
          </section>
        ) : (
          /* HIGH CONVERSION LANDING PAGE */
          <div className="space-y-20 pb-20">
            
            {/* 1. HERO SECTION */}
            <section id="hero-top" className="relative pt-12 md:pt-20 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Content (7 cols) */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase select-none">
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>SaaS Integrador & App Android</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight font-sans">
                      Todas as suas usinas fotovoltaicas.<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                        Um único painel inteligente.
                      </span>
                    </h1>

                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">
                      Chega de abrir dezenas de guias para monitorar marcas diferentes. O <strong>SolarSync</strong> unifica múltiplos portais de inversores (SMA, Fronius, ABB, Sungrow, Growatt, etc.) com crawlers em segundo plano resilientes e alertas push automáticos.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button 
                        onClick={() => scrollToSection('conversion-section')}
                        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-400/10 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Começar Demonstração Gratuita
                      </button>

                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs px-6 py-3.5 rounded-2xl transition flex items-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Ver Repositório GitHub</span>
                      </a>
                    </div>

                    {/* Ecological/Financial Microstats for Trust */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900 max-w-lg">
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase block">Uptime Crawler</span>
                        <span className="text-base font-extrabold text-slate-200">99.9%</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase block">Tempo de Setup</span>
                        <span className="text-base font-extrabold text-slate-200">&lt; 3 minutos</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase block">Inversores Ativos</span>
                        <span className="text-base font-extrabold text-slate-200">12 marcas+</span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column App Mockup (5 cols) */}
                  <div className="lg:col-span-5 relative">
                    {/* Background glow decoration behind phone */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 to-orange-500/5 rounded-full blur-3xl transform scale-110 pointer-events-none"></div>
                    <InteractiveMockup />
                  </div>

                </div>
              </div>
            </section>

            {/* 2. GRID DE LOGOS (Ecossistema Multimarcas) */}
            <section id="ecosystem-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/60 pt-16">
              <LogoGrid />
            </section>

            {/* 3. FUNCIONALIDADES PRINCIPAIS & LIVE TERMINAL */}
            <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Lógica e Resiliência em Ação</span>
                <h2 className="text-2xl md:text-3xl font-black text-white font-sans">
                  Automação integrada em segundo plano
                </h2>
                <p className="text-xs md:text-sm text-slate-400">
                  Nosso aplicativo Android herda confiabilidade de hardware e APIs Google para manter dados fluindo mesmo com o aplicativo fechado.
                </p>
              </div>

              {/* Grid of 4 Feature Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/5 text-amber-400 flex items-center justify-center border border-amber-400/10 mb-4">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm">Automação com WorkManager</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Agendamento periódico inteligente em segundo plano (PeriodicWorkRequest de 15 minutos). Políticas de retry exponencial garantem resiliência total a falhas do portal oficial.
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/5 text-amber-400 flex items-center justify-center border border-amber-400/10 mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm">Alertas Push Pró-ativos</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Nosso sistema de disparo de eventos detecta usinas OFFLINE ou inversores sobreaquecidos em tempo real e emite notificações de alta prioridade via NotificationManager.
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/5 text-amber-400 flex items-center justify-center border border-amber-400/10 mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm">Sincronização Google Sheets</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Backup transparente e indestrutível em nuvem diretamente para o Workspace do integrador. Tenha uma folha de auditoria e geração histórica sempre atualizada no Google Drive.
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/5 text-amber-400 flex items-center justify-center border border-amber-400/10 mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm">UI Avançada Material 3</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Painel Analítico completo, terminal de auditoria integrado e cartões de impacto ecológico (CO₂ evitado, árvores equivalentes) baseados em diretrizes oficiais.
                  </p>
                </div>

              </div>

              {/* LIVE LOG TERMINAL DISPLAY */}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    Demonstração em Tempo Real (Logs de Segundo Plano)
                  </h4>
                  <span className="text-[10px] text-slate-500">Android WorkManager Worker Thread</span>
                </div>
                <LiveLogTerminal />
              </div>

            </section>

            {/* 4. ARQUITETURA TÉCNICA E SEGURANÇA */}
            <section id="architecture-section" className="bg-slate-900/20 py-16 border-y border-slate-900/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Infraestrutura Corporativa</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white font-sans">
                    Arquitetura Limpa e Modelo Room DB
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400">
                    O SolarSync respeita padrões de desacoplamento, encapsulamento de credenciais e concorrência estruturada do ecossistema Android moderno.
                  </p>
                </div>

                <TechnicalArchitecture />
              </div>
            </section>

            {/* 5. SEÇÃO DE CONVERSÃO & CAPTURA DE LEADS */}
            <section id="conversion-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm />
            </section>

          </div>
        )}
      </main>

      {/* Floating AI Architecture Consultant */}
      <div className="fixed bottom-6 right-6 z-50">
        {isAiOpen ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-80 sm:w-96 h-96 flex flex-col shadow-2xl overflow-hidden font-sans">
            
            {/* Header chat */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-4.5 h-4.5 text-amber-400" />
                <div>
                  <h5 className="font-bold text-slate-200 text-xs">Arquiteto SolarSync AI</h5>
                  <p className="text-[9px] text-slate-500">Online • Pronto para tirar dúvidas</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat content list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3.5 bg-slate-950/40 text-xs scrollbar-thin">
              {aiHistory.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-amber-400 text-slate-950 rounded-tr-none font-semibold' 
                      : 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-850'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat form */}
            <form onSubmit={handleAiAsk} className="p-2 border-t border-slate-850 bg-slate-950 flex gap-1.5">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ex: Como funciona o WorkManager?"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-400 text-slate-950 hover:bg-amber-500 px-3 py-2 rounded-xl text-xs font-bold transition"
              >
                Perguntar
              </button>
            </form>

          </div>
        ) : (
          <button
            onClick={() => setIsAiOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group relative"
            title="Conversar com Consultor de Arquitetura Solar"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
            
            <Bot className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 font-bold text-xs uppercase tracking-wider transition-all duration-500 whitespace-nowrap">
              Dúvidas Técnicas?
            </span>
          </button>
        )}
      </div>

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sun className="w-6 h-6 text-amber-400 fill-amber-400" />
              <span className="font-sans font-black text-sm tracking-tight text-white">Solar<span className="text-amber-400">Sync</span></span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Consolidação de telemetria fotovoltaica e automação omnichannel para integradores de energia solar sênior de próxima geração.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 mb-3 uppercase tracking-wider text-[10px]">Arquitetura</h5>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => scrollToSection('architecture-section')} className="hover:text-slate-300">Clean Architecture</button></li>
              <li><button onClick={() => scrollToSection('architecture-section')} className="hover:text-slate-300">Room Relational Schema</button></li>
              <li><button onClick={() => scrollToSection('features-section')} className="hover:text-slate-300">WorkManager Sandbox</button></li>
              <li><button onClick={() => scrollToSection('features-section')} className="hover:text-slate-300">Android Security Sandbox</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 mb-3 uppercase tracking-wider text-[10px]">SaaS Sandbox</h5>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => { setActiveTab('sandbox'); }} className="hover:text-slate-300">Unified Chat Inbox</button></li>
              <li><button onClick={() => { setActiveTab('sandbox'); }} className="hover:text-slate-300 font-semibold text-amber-400/90">Visual Workflow Editor</button></li>
              <li><button onClick={() => { setActiveTab('sandbox'); }} className="hover:text-slate-300">Kanban CRM Stages</button></li>
              <li><button onClick={() => { setActiveTab('sandbox'); }} className="hover:text-slate-300">Webhook Event Log</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 mb-3 uppercase tracking-wider text-[10px]">Contatos e Suporte</h5>
            <p className="text-[11px] leading-relaxed">
              Fale com um Engenheiro:<br />
              <span className="text-slate-300 font-semibold">suporte@solarsync.io</span><br />
              <span className="text-[10px] text-slate-600">Disponibilidade: 08:00 às 18:00 BRT</span>
            </p>
            
            <div className="mt-4 pt-4 border-t border-slate-900 flex items-center space-x-2 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Todos os sistemas operacionais online.</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} SolarSync Inc. Todos os direitos reservados. Feito para homologadores B2B de energia limpa.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Serviço</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Segurança do App</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
