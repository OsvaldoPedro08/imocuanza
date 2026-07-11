import React, { useState } from 'react';
import { Edit2, UploadCloud, X, Maximize2 } from 'lucide-react';
import Navbar from '../components/Navbar'

const FileDropzone = ({ label, file, onChange, onRemove }) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-bold mb-1">{label}</label>
    {file ? (
      <div className="relative border-2 border-green-400 border-dashed rounded-xl p-2 bg-green-50">
        <img src={file} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
        <button onClick={onRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
          <X size={14} />
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 bg-gray-50">
        <UploadCloud className="text-gray-400 mb-2" />
        <span className="text-xs text-gray-500 font-bold">Carregar Imagem (formatos jpg/png)</span>
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
      </label>
    )}
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Osvaldo Pedro",
    phone: "",
    whatsapp: "",
    district: "",
    municipality: "Cazengo",
    typeDoc: "Bilhete de Identidade",
    numDoc: "",
    profileImage: null,
    documentImages: []
  });

  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  // Definindo quais campos são obrigatórios para considerar o perfil completo
  const isProfileComplete = 
    user.name && user.phone && user.district && user.municipality && user.typeDoc
    && user.numDoc && user.profileImage && user.documentImages.length > 0;

  const startEditing = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const handleFile = (e, field, index = null) => {
    
    const file = e.target.files[0];
    
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    
    if (field === 'profileImage') {
    
        setEditData({ ...editData, profileImage: url });
    
    } else {
    
        const newDocs = [...editData.documentImages];
    
        if (index !== null) newDocs[index] = url;
    
        else newDocs.push(url);
    
        setEditData({ ...editData, documentImages: newDocs });
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main className="p-4 md:p-10 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h2 className="text-2xl font-bold">Meu Perfil</h2>
                <button 
                    onClick={startEditing} 
                    className="cursor-pointer p-2 text-emerald-700 font-bold flex gap-2 items-center hover:bg-emerald-100"
                >
                    <Edit2 size={18} /> Editar
                </button>
            </div>
                
            {/* Notificação no topo */}
            {!isProfileComplete && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl mb-8 font-medium">
                Aviso: O seu perfil está incompleto. Configure todos os seus dados para poder publicar imóveis.
                </div>
            )}

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            
                <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border">
                    {user.profileImage ? <img src={user.profileImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
                </div>
                <div>
                    <h3 className="font-bold text-lg">{user.name || "Nome não configurado"}</h3>
                </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-b pb-2">
                        <label className="text-gray-500 text-sm">Telefone</label>
                        <p className="font-semibold">{user.phone || "-"}</p>
                    </div>
                    <div className="border-b pb-2">
                        <label className="text-gray-500 text-sm">WhatsApp</label>
                        <p className="font-semibold">{user.whatsapp || "-"}</p>
                    </div>
                    <div className="border-b pb-2">
                        <label className="text-gray-500 text-sm">Bairro</label>
                        <p className="font-semibold">{user.district || "-"}</p>
                    </div>
                    <div className="border-b pb-2">
                        <label className="text-gray-500 text-sm">Município</label>
                        <p className="font-semibold">{user.municipality || "-"}</p>
                    </div>
                    <div className="border-b pb-2">
                        <label className="text-gray-500 text-sm">Tipo de Documento</label>
                        <p className="font-semibold">{user.typeDoc || "-"}</p>
                    </div>
                </div>

                <h3 className="font-bold mt-8 mb-4">Imagens do/a {user.typeDoc}</h3>
                <div className="flex gap-4 flex-wrap">
                    {user.documentImages.length != 0 ?
                        user.documentImages.map((img, i) => (
                        <div key={i} className="cursor-pointer" onClick={() => setFullscreenImg(img)}>
                        <img src={img} className="w-24 h-24 rounded-xl object-cover border" />
                        </div>
                    ))
                    : <div>Nenhum documento carregado</div> 
                    }
                    
                </div>
            </div>

            {/** EDITACAO */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6">Editar Perfil</h3>
                    
                    <div className="space-y-4">
                    <FileDropzone label="Foto de Perfil" file={editData.profileImage} onChange={(e) => handleFile(e, 'profileImage')} onRemove={() => setEditData({...editData, profileImage: null})} />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Nome</label>
                            <input 
                                className="w-full p-3 border rounded-xl" 
                                value={editData.name} 
                                onChange={(e) => setEditData({...editData, name: e.target.value})} 
                                placeholder="Nome conforme BI" 
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Telefone</label>
                            <input 
                                className="w-full p-3 border rounded-xl" 
                                value={editData.phone} 
                                onChange={(e) => setEditData({...editData, phone: e.target.value})} 
                                placeholder="Nº de Telefone" 
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Whatsapp</label>
                            <input 
                                className="w-full p-3 border rounded-xl" 
                                value={editData.whatsapp} 
                                onChange={(e) => setEditData({...editData, whatsapp: e.target.value})} 
                                placeholder="Nº do Whatsapp" 
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Bairro</label>
                            <input 
                                className="w-full p-3 border rounded-xl" 
                                value={editData.district} 
                                onChange={(e) => setEditData({...editData, district: e.target.value})} 
                                placeholder="Bairro" 
                            />
                        </div>
                        
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Município</label>
                            <select 
                                className="w-full p-3 border rounded-xl bg-white" 
                                value={editData.municipality} 
                                onChange={(e) => setEditData({...editData, municipality: e.target.value})}
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
                        
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Tipo de documento</label>
                            <select 
                                className="w-full p-3 border rounded-xl bg-white" 
                                value={editData.typeDoc} onChange={(e) => 
                                setEditData({...editData, typeDoc: e.target.value})}
                            >
                                <option value="Bilhete de Identidade">Bilhete de Identidade</option>
                                <option value="Passaporte">Passaporte</option>
                                <option value="Carta de Condução">Carta de Condução</option>
                            </select>
                        </div>

                        <div className='mb-2'>
                            <label className="block text-sm font-bold mb-1">Nº do/a {editData.typeDoc}</label>
                            <input 
                                className="w-full p-3 border rounded-xl" 
                                value={editData.numDoc} 
                                onChange={(e) => setEditData({...editData, numDoc: e.target.value})} 
                                placeholder="Número do documento" 
                            />
                        </div>
                    </div>

                    <label className="block text-sm font-bold mt-4 mb-2">Carrega a/as imagens do/a {editData.typeDoc}</label>
                    {editData.documentImages.map((doc, i) => (
                        <FileDropzone 
                            key={i} 
                            label={`Imagem ${i + 1}`} 
                            file={doc} 
                            onChange={(e) => handleFile(e, 'doc', i)} 
                            onRemove={() => setEditData({...editData, documentImages: editData.documentImages.filter((_, idx) => idx !== i)})} 
                        />
                    ))}
                    
                    <button 
                        onClick={() => setEditData({...editData, documentImages: [...editData.documentImages, null]})} 
                        className="cursor-pointer w-full py-3 border-2 border-dashed border-emerald-600 text-emerald-600 rounded-xl font-bold"
                    >
                        + Inserir imagem (formatos jpg/png)
                    </button>
                    </div>
                    
                    <div className="flex gap-3 mt-8">
                    <button onClick={() => setIsEditing(false)} className="cursor-pointer flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancelar</button>
                    <button onClick={() => { setUser(editData); setIsEditing(false); }} className="cursor-pointer flex-1 py-3 bg-emerald-700 text-white rounded-xl font-bold">Guardar</button>
                    </div>
                </div>
                </div>
            )}
            
            {fullscreenImg && (
                <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={() => setFullscreenImg(null)}>
                <img src={fullscreenImg} className="max-h-full max-w-full object-contain" />
                </div>
            )}
        </main>
    </div>
  );
};

export default ProfilePage;