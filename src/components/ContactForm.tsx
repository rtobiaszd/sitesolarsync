import React, { useState } from 'react';
import { ShieldCheck, Mail, Send, CheckCircle, Sparkles, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { ContactLead } from '../types';

export default function ContactForm() {
  const [lead, setLead] = useState<ContactLead>({
    name: '',
    email: '',
    company: '',
    plantsCount: '5-20',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLead(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.email || !lead.company || !lead.phone) {
      setError('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
    setError(null);
    setIsSubmitted(true);
    
    // Save to localStorage so state persists in preview session
    try {
      const existingLeads = JSON.parse(localStorage.getItem('solarsync_leads') || '[]');
      existingLeads.push({ ...lead, timestamp: new Date().toISOString() });
      localStorage.setItem('solarsync_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  };

  const handleGoogleAuthSimulate = () => {
    // Fill with simulated data
    setLead({
      name: 'Dr. Leonardo Vianna (Google Account)',
      email: 'leonardo.vianna@engenhariasolar.com',
      company: 'Vianna Engenharia Solar Ltda',
      plantsCount: '20-100',
      phone: '+55 (11) 98112-9011',
      notes: 'Demonstração rápida simulada via Google Auth.'
    });
    setError(null);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle className="w-8 h-8 animate-bounce" />
          </div>
          
          <h4 className="text-xl font-bold text-slate-100 font-sans">
            Demonstração Agendada com Sucesso!
          </h4>
          
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Parabéns, <strong>{lead.name.split(' ')[0]}</strong>! Seu ambiente de testes isolado foi provisionado sob o tenant <strong>{lead.company}</strong>.
          </p>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-left max-w-sm mx-auto space-y-2.5 font-mono text-[11px] text-slate-300">
            <p className="text-amber-400 font-bold border-b border-slate-900 pb-1.5 uppercase tracking-wide">
              Credenciais de Acesso Temporárias:
            </p>
            <p><span className="text-slate-500">Subdomínio SaaS:</span> {lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.solarsync.io</p>
            <p><span className="text-slate-500">Painel Ativo:</span> 10 Conexões de Teste Injetadas</p>
            <p><span className="text-slate-500">Link do Console:</span> <span className="text-sky-400 underline cursor-pointer">Acessar Sandbox</span></p>
          </div>

          <p className="text-[10px] text-slate-500">
            Enviamos um email com instruções detalhadas para {lead.email}.
          </p>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setLead({ name: '', email: '', company: '', plantsCount: '5-20', phone: '', notes: '' });
            }}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition"
          >
            Cadastrar Novo Lead
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left instructions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">
              <Sparkles className="w-3 h-3 mr-1" />
              Homologação Instantânea
            </div>

            <h3 className="text-xl md:text-2xl font-black text-slate-100 font-sans leading-tight">
              Injete 10 conexões de teste via Google Auth
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Diga adeus à fragmentação técnica. Preencha os dados da sua empresa integradora de energia solar para receber credenciais exclusivas de teste e simular múltiplos inversores solares em tempo real.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Sem contrato de fidelidade ou cartão</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Conexão API em menos de 3 minutos</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Compatível com SMA, Fronius, Growatt e +10</span>
              </div>
            </div>

            {/* Simulated Google Auth Button */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-wide">Preenchimento Rápido:</p>
              <button
                type="button"
                onClick={handleGoogleAuthSimulate}
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs px-4 py-3 rounded-2xl flex items-center justify-center space-x-2.5 transition shadow-sm font-semibold"
              >
                {/* Simulated Google color dots */}
                <span className="flex space-x-1 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                </span>
                <span>Simular Preenchimento via Google Auth</span>
              </button>
            </div>
          </div>

          {/* Right Lead Capture Form (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4 font-sans">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Seu Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={lead.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Leonardo Vianna"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Email Corporativo *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={lead.email}
                    onChange={handleInputChange}
                    placeholder="Ex: leonardo@engenhariasolar.com"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Empresa / Integradora *</label>
                <input
                  type="text"
                  name="company"
                  value={lead.company}
                  onChange={handleInputChange}
                  placeholder="Ex: Vianna Energia Solar"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Nº de Usinas Fotovoltaicas *</label>
                <select
                  name="plantsCount"
                  value={lead.plantsCount}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="1-5">1 a 5 Usinas</option>
                  <option value="5-20">5 a 20 Usinas</option>
                  <option value="20-100">20 a 100 Usinas</option>
                  <option value="100+">Mais de 100 Usinas</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase">WhatsApp para Contato *</label>
              <input
                type="tel"
                name="phone"
                value={lead.phone}
                onChange={handleInputChange}
                placeholder="Ex: +55 (11) 98765-4321"
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Observações Adicionais (Opcional)</label>
              <textarea
                name="notes"
                value={lead.notes}
                onChange={handleInputChange}
                placeholder="Descreva brevemente suas necessidades de integração solares ou dúvidas..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 transition duration-300 shadow-md transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>COMEÇAR DEMONSTRAÇÃO GRATUITA ☀️</span>
            </button>
            
            <p className="text-[9px] text-slate-500 text-center">
              Ao enviar você concorda com nossos Termos de Uso e Política de Privacidade de Dados Industriais.
            </p>
          </form>

        </div>
      )}

    </div>
  );
}
