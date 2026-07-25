import React, { useState } from 'react';
import { Lock, Phone, User, MapPin, FileText, Upload, X, CheckCircle, ArrowRight, Image as ImageIcon,ShieldCheck,Building, Building2 } from 'lucide-react';
import ShowToast from '../../utils/ShowToast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();

    // Estados do Formulário de Login
  const [telefoneLogin, setTelefoneLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  // Estados de Modais
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Submeter Login
  const handleLoginSubmit = (e) => {
    
    e.preventDefault();
    
    if (telefoneLogin.length !== 9) {
      setToast({ message: 'O número de telefone deve ter exatamente 9 dígitos.', type: 'warning' });
      return;
    }
    
    if (!senhaLogin) {
      setToast({ message: 'Por favor, insira a palavra-passe.', type: 'warning' });
      return;
    }

    setToast({ message: 'Sessão iniciada com sucesso!', type: 'success' });
    
    setTimeout(() => navigate('/explore-imoveis'), 1000);

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      
      {/* Toast de Alerta */}
      {toast && (
        <ShowToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Cabeçalho do Login */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 mb-4">
          <Building2 size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">ImoCuanza</h2>
        <p className="text-sm text-gray-500 mt-1">Plataforma de Gestão Imobiliária</p>
      </div>

      {/* Caixa do Formulário de Login */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 rounded-3xl border border-gray-100">
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            
            {/* Campo Telefone com limite de 9 dígitos */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Número de Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Ex: 923456789"
                  value={telefoneLogin}
                  onChange={(e) => handlePhoneChange(e, setTelefoneLogin)}
                  maxLength={9}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">{telefoneLogin.length}/9 dígitos</p>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Palavra-passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  required
                />
              </div>
            </div>

            {/* Links Auxiliares: Esqueci minha senha / Criar conta */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Esqueci minha senha?
              </button>
              <button
                type="button"
                onClick={() => navigate('/registro') }
                className="cursor-pointer font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Criar conta
              </button>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="cursor-pointer w-full mt-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              Entrar na Plataforma <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* ================= MODAL: ESQUECI MINHA SENHA ================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">Recuperação de Palavra-passe</h3>
              <button 
                onClick={() => setShowForgotModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <p className="font-medium text-gray-900">Siga os passos abaixo para redefinir a sua senha:</p>
              <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                  <p>Insira o seu número de telefone registado na plataforma.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                  <p>Confirme a sua identidade através do código enviado por SMS ou WhatsApp.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                  <p>Defina uma nova palavra-passe segura para aceder à sua conta.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-5 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;