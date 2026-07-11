import React, { useState } from 'react';
import { Bell, Home, Plus, MapPin, Eye, Check, X, User } from 'lucide-react';
import Navbar from "../components/Navbar"

const ViewMyImovelPage = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [selectedNotificacao, setSelectedNotificacao] = useState(null); // ID da notificação aberta
  const [notificacaoStatus, setNotificacaoStatus] = useState({}); // Agora armazena status por ID
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const [notifications] = useState([
    { 
      id: 1, 
      name: "Osvaldo Pedro", 
      imovel: "Casa T2 no centro da cidade.", 
      msg: "Olá, tenho interesse nesse imóvel.", 
      phone: "9XX XXX XXX",
      whatsapp: "9XX XXX XXX",
      disctrict: "Bairro Popular",
      municipality: "Cazengo",
      typeDoc: "Bilhete de Identidade",
      numDoc: "00XXXXXXXKA000",
      profileImage: "/01.JPG",
      documentImages: ["/id01_00.JPG", "/id01_01.JPG"]
    },
    { 
      id: 2, 
      name: "Manuel António", 
      imovel: "Casa T3 na Velha Marica.", 
      msg: "Disponível para visita?", 
      phone: "9YY YYY YYY",
      whatsapp: "9YY YYY YYY",
      disctrict: "Bairro Sambizanga",
      municipality: "Cazengo",
      typeDoc: "Passaporte",
      numDoc: "PN123456",
      profileImage: "/02.JPG",
      documentImages: ["/id02_00.JPG", "/id02_01.JPG"]
    }
  ]);

  const [publishImovel] = useState([
    { 
        id: 1, title: "Casa T2 na Zona Verde", price: "20 000 Kz", location: "Zona Verde, Cazengo", 
        status: "Publicado", image: "/id03_00.JPG" },
  ]);

  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar />
        
        <main className="p-4 md:p-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Os meus Imóveis</h2>

        <div className="flex gap-4 mb-6">
            <button onClick={() => setActiveTab('notifications')} className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${activeTab === 'notifications' ? 'bg-emerald-700 text-white' : 'bg-gray-100'}`}>
            <Bell size={20} /> Notificações {notifications.length > 0 && <span className="bg-red-500 px-2 py-0.5 rounded-full text-xs text-white">{notifications.length}</span>}
            </button>
            <button onClick={() => setActiveTab('publicados')} className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${activeTab === 'publicados' ? 'bg-emerald-700 text-white' : 'bg-gray-100'}`}>
            <Home size={20} /> Imóveis publicados
            </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
            {activeTab === 'notifications' ? (
            <div className="space-y-6">
                {notifications.map(n => (
                <div key={n.id} className={`p-5 border rounded-3xl transition-all ${selectedNotificacao === n.id ? 'border-emerald-500 bg-emerald-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                    <div>
                        <h4 className="font-bold">{n.imovel}</h4>
                        <p className="text-sm text-gray-500">Interessado: {n.name}</p>
                        <p className="text-sm italic text-gray-600">"{n.msg}"</p>
                    </div>
                    </div>

                    {/* BOTÃO DO ACCORDION */}
                    <button onClick={() => setSelectedNotificacao(selectedNotificacao === n.id ? null : n.id)} className="cursor-pointer w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-100">
                    <Eye size={18} /> {selectedNotificacao === n.id ? 'Ocultar perfil' : 'Ver perfil'}
                    </button>

                    {/* CONTEÚDO DO ACCORDION */}
                    {selectedNotificacao === n.id && (
                    <div className="mt-6 pt-6 border-t border-emerald-100">
                        {!notificacaoStatus[n.id] ? (
                        <>
                            <div className="flex items-center gap-4 mb-6">
                            <img src={n.profileImage} onClick={() => setFullScreenImage(n.profileImage)} className="w-16 h-16 rounded-full cursor-pointer object-cover border" alt="Perfil" />
                            <div>
                                <p className="font-bold">{n.name}</p>
                            </div>
                            </div>
                            <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Telefone</span><span className="font-bold">{n.phone}</span></div>
                            <div className="flex justify-between"><span>WhatsApp</span><span className="font-bold">{n.whatsapp}</span></div>
                            <div className="flex justify-between"><span>Bairro</span><span className="font-bold">{n.disctrict}</span></div>
                            <div className="flex justify-between"><span>Município</span><span className="font-bold">{n.municipality}</span></div>
                            <div className="flex justify-between"><span>{n.typeDoc}</span><span className="font-bold">{n.numDoc}</span></div>
                            </div>
                            <div className="mt-4">
                            <p className="text-sm mb-2">Imagens do Documento:</p>
                            <div className="flex gap-2">
                                {n.documentImages.map((doc, idx) => (
                                <img key={idx} src={doc} onClick={() => setFullScreenImage(doc)} className="w-20 h-20 rounded-lg cursor-pointer border object-cover" alt="Doc" />
                                ))}
                            </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setNotificacaoStatus({...notificacaoStatus, [n.id]: 'aceito'})} 
                                    className="cursor-pointer flex-1 bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <Check size={18} 
                                /> 
                                    Aceitar e Partilhar Contacto
                                </button>
                                <button 
                                    onClick={() => setNotificacaoStatus({...notificacaoStatus, [n.id]: 'recusado'})} 
                                    className="cursor-pointer px-6 py-3 bg-white border border-red-100 text-red-600 rounded-xl font-bold flex items-center gap-2">
                                    <X size={18} /> 
                                    Recusar
                                </button>
                            
                            </div>
                        </>
                        ) : (
                        <div className={`p-4 rounded-xl text-center font-bold ${notificacaoStatus[n.id] === 'aceito' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {notificacaoStatus[n.id] === 'aceito' ? 'O interessado tem agora o seu contacto.' : 'Notificação recusada.'}
                        </div>
                        )}
                    </div>
                    )}
                </div>
                ))}
            </div>
            ) : (
            <div className="space-y-6">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold w-full md:w-auto">
                <Plus size={20} /> Publicar imóvel
                </button>
                {publishImovel.map(i => (
                <div key={i.id} className="flex gap-4 p-4 border rounded-2xl">
                    <img src={i.image} className="w-24 h-24 rounded-xl object-cover" alt="imovel" />
                    <div className="flex-1">
                    <h4 className="font-bold text-lg">{i.title}</h4>
                    <p className="text-emerald-700 font-bold">{i.price}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {i.location}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{i.status}</span>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>

        {/* Modal Fullscreen Imagens */}
        {fullScreenImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setFullScreenImage(null)}>
            <img src={fullScreenImage} className="max-h-full max-w-full rounded-xl" alt="Zoom" />
            </div>
        )}
        </main>
    </div>
  );
};

export default ViewMyImovelPage;