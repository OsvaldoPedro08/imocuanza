import React, { useState } from 'react';
import { 
  User, 
  Upload, 
  X, 
  CheckCircle, 
  ArrowLeft, 
  Building2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShowToast from '../../utils/ShowToast';

const Register = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Estados do Formulário de Registo
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    district: '',
    municipality: 'Cazengo',
    typeDoc: 'Bilhete de identidade',
    numDoc: '',
    password: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [docImages, setDocImages] = useState([]);

  // Manipular Foto de Perfil com preview imediato
  const handleFotoPerfilChange = (e) => {
    
    const file = e.target.files[0];
    
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }

  };

  // Adicionar imagens de documentos iterativamente para o array
  const handleAddDocumentImage = (e) => {
    
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
    
        const newImages = files.map(file => ({
    
            file,
            preview: URL.createObjectURL(file)
        }));
    
        setDocImages(prev => [...prev, ...newImages]);
    
    }
    
    e.target.value = '';
  };

  // Remover imagem específica do array de documentos
  const handleRemoveDocumentImage = (index) => {
    setDocImages(prev => prev.filter((_, i) => i !== index));
  };

  // Submeter Registo de Nova Conta
  const handleRegisterSubmit = (e) => {
   
    e.preventDefault();
   
    if (formData.phone.length !== 9) {
   
        setToast({ message: 'O telefone principal deve conter 9 dígitos.', type: 'warning' });
   
        return;
    }

    // Simulação de salvamento no banco de dados via frontend
    console.log('Dados guardados no banco:', {
      ...formData,
      profileImage,
      docImages: docImages.map(d => d.file.name)
    });

    setToast({ message: 'Conta criada com sucesso! Faça login.', type: 'success' });
    
    // Redireciona para o login após 1.5 segundos
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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

      {/* Cabeçalho da Página */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 mb-3">
          <Building2 size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Criar Conta Gratuita</h2>
        <p className="text-sm text-gray-500 mt-1">ImoCuanza — Plataforma de Gestão Imobiliária</p>
      </div>

      {/* Caixa do Formulário */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 rounded-3xl border border-gray-100">
          
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            
            {/* Foto de Perfil */}
            <div className="flex flex-col items-center justify-center space-y-3 pb-4 border-b border-gray-100">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-emerald-500 flex items-center justify-center shadow-inner group">
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Preview Foto" className="w-full h-full object-cover" />
                ) : (
                  <User size={36} className="text-emerald-600" />
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer">
                  <Upload size={16} /> Alterar
                  <input type="file" accept="image/*" onChange={handleFotoPerfilChange} className="hidden" />
                </label>
              </div>
              <label className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                Adicionar foto de perfil
                <input type="file" accept="image/*" onChange={handleFotoPerfilChange} className="hidden" />
              </label>
            </div>

            {/* Grid de Inputs Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Nome */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>

              {/* Telefone (9 dígitos) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Telefone (9 dígitos)</label>
                <input
                  type="text"
                  placeholder="Ex: 923000000"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setFormData({ ...formData, phone: value });
                  }}
                  maxLength={9}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp</label>
                <input
                  type="text"
                  placeholder="Ex: +244 923000000"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Bairro</label>
                <input
                  type="text"
                  placeholder="Ex: Bairro Popular"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>

              {/* Município */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Município</label>
                <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" 
                    value={formData.municipality} 
                    onChange={(e) => setEditData({...formData, municipality: e.target.value})}
                >
                    <option value="Ambaca">Ambaca</option>
                    <option value="Aldeia Nova">Aldeia Nova</option>
                    <option value="Banga">Banga</option>
                    <option value="Bolongongo">Bolongongo</option>
                    <option value="Cazengo">Cazengo</option>
                    <option value="Cambambe">Cambambe</option>
                    <option value="Cerca">Cerca</option>
                    <option value="Golungo Alto">Golungo Alto</option>
                    <option value="Luínga">Luínga</option>
                    <option value="Lucala">Lucala</option>
                    <option value="Massangano">Massangano</option>
                    <option value="Ngonguembo">Ngonguembo</option>
                    <option value="Samba Cajú">Samba Cajú</option>
                    <option value="Tango">Tango</option>
                    <option value="Terreiro">Terreiro</option>
                </select>
              </div>

              {/* Tipo de Documento */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tipo de Documento</label>
                <select
                  value={formData.typeDoc}
                  onChange={(e) => setFormData({ ...formData, typeDoc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                >
                  <option value="Bilhete de identidade">Bilhete de Identidade</option>
                  <option value="Carta de Condução">Carta de Condução</option>
                  <option value="Passaporte">Passaporte</option>
                </select>
              </div>

              {/* Número do Documento */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Número do Documento</label>
                <input
                  type="text"
                  placeholder="Ex: 004829312LA042"
                  value={formData.numDoc}
                  onChange={(e) => setFormData({ ...formData, numDoc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  maxLength={14}
                  required
                />
              </div>

              {/* Palavra Passe */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Palavra-passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>

            </div>

            {/* Seção de Documentos Dinâmicos */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Imagens dos Documentos</h4>
                  <p className="text-[11px] text-gray-400">Adicione uma ou mais imagens dos seus documentos comprovativos</p>
                </div>
                
                <label className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 border border-emerald-200 shadow-sm">
                  <Upload size={14} /> Adicionar Documento
                  <input type="file" accept="image/*" onChange={handleAddDocumentImage} className="hidden" />
                </label>
              </div>

              {docImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {docImages.map((doc, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group shadow-sm">
                      <img src={doc.preview} alt={`Doc ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveDocumentImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-lg shadow-md opacity-90 hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Doc {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                  Nenhum documento adicionado ainda. Clique em "Adicionar Documento".
                </div>
              )}
            </div>

            {/* Ações / Botões Finais */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="cursor-pointer text-xs font-semibold text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={16} /> Já tenho conta (Entrar)
              </button>

              <button
                type="submit"
                className="cursor-pointer px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <CheckCircle size={16} /> Concluir Registo
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Register;