import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, ArrowLeft, PhoneCall, Heart, MessageCircle, Banknote, Home, SendHorizonal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { div } from 'framer-motion/client';

const ViewImovelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //recupera os dados vindo da explorepage
  const imovel = location.state?.imovel;

  // Estado para controlar a imagem principal e a interação
  const [mainImage, setMainImage] = useState(imovel.image); //imagem principal 
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const [message, setMessage] = useState("");

  if(!imovel) return <div>Imóvel não encontrado.</div>

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <button 
          className="cursor-pointer flex items-center gap-2 text-gray-600 mb-6 hover:text-emerald-700"
          onClick={() => navigate('/explore-imoveis')}
        >
          <ArrowLeft size={20} /> Voltar aos imóveis
        </button>

        {/* Galeria de Imagens */}
        <div className="bg-white rounded-3xl p-2 shadow-sm mb-6">
          <img src={mainImage} className="w-full h-80 object-cover rounded-2xl mb-4" />
          <div className="flex gap-4">
            {imovel.images.map((img, i) => (
              <img 
                key={i} src={img} 
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded-xl cursor-pointer border-2 hover:border-emerald-600"
              />
            ))}
          </div>

          <div className="text-2xl font-bold">
            {imovel.type === 'Venda' ? <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">{imovel.type}</span>
            : <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{imovel.type}</span>}
            <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{imovel.category}</span>
          </div>
        
            <hr className='text-center text-gray-300 mt-4 mb-4' />

            {/* Detalhes do Imóvel */}
            <div>
              <h1 className="text-2xl font-bold mb-2 pl-2">{imovel.title}</h1>
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-500 mb-2 pl-2">
              <MapPin size={18} /> {imovel.location}
            </div>
            
            <div className="flex items-center gap-2 font-bold text-emerald-700 mb-4 pl-2">
              <Banknote size={18} />{imovel.price} kz
            </div>

            <div className='flex gap-2 mb-6 font-bold text-gray-600 pl-2'>
              {imovel.beds != '' && imovel.baths != '' && (
                <div className='flex gap-2'>
                  <span>{imovel.beds} quartos</span>
                  <span>{imovel.baths} wc</span>
                </div>
              )}
              <span>{imovel.area} área</span>
            </div>

            <hr className='text-center text-gray-300 mt-4 mb-4' />

            <div>
              <label className='block font-bold ml-1 mb-1'>Descrição</label>
              <p className="text-gray-600 mb-4 pl-2">{imovel.description}</p>
            </div>
            
            {/* Descrição e Botão de Interesse */}
            <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
              {!interestSent ? (
                <>
                  {!showInterestForm ? (
                    <div>
                      <button 
                        onClick={() => setShowInterestForm(true)}
                        className="cursor-pointer flex w-full text-center justify-center gap-2 bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800"
                      >
                        <Heart size={24} /> Tenho interesse
                      </button>

                      <p className='text-gray-600 pl-2 text-sm mt-4 text-center'>
                        O anunciante receberá uma notificação e decidir
                        se partilha os contactos consigo.
                      </p>

                      <hr className='text-center text-gray-300 mt-4' />
                      
                      <p className='text-gray-600 pl-2 text-sm mt-4'>
                        Contacto do anunciante
                      </p>
                      <div className='flex items-center gap-2 font-bold text-gray-600 mt-2 pl-2'>
                        <PhoneCall size={18} />Disponível após aceitação
                      </div>
                    </div>
                    
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-bold text-gray-600 mb-6 pl-2">
                        <MessageCircle size={18} />Mensagem ao anunciante
                      </div>
                      <textarea 
                        className="w-full p-4 border rounded-xl"
                        placeholder="Escreva uma mensagem ao anunciante..."
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button 
                        onClick={() => setInterestSent(true)}
                        className="cursor-pointer flex w-full text-center justify-center gap-2 bg-emerald-700 text-white py-4 rounded-xl font-bold"
                      >
                        <SendHorizonal size={24} /> Enviar interesse
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4 border-2 border-emerald-100 bg-emerald-50 rounded-xl">
                  <p className="font-bold text-emerald-800">Interesse enviado!</p>
                  <p className="text-sm text-gray-600 text-center">O anunciante foi notificado e poderá ver o seu perfil.</p>
                  <p className="text-sm text-gray-600 text-center">Se aceitar, partilhará os contactos consigo.</p>
                </div>
              )}
            </div>
        </div>
      
      </div>
    </main>
  );
};

export default ViewImovelPage;