import React, { useState } from 'react';
import { UploadCloud, X, Camera, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"

const PublishImovelPage = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false); // Novo estado para controlar a tela de sucesso
  const [images, setImages] = useState([null]);
  const [metodoPagamento, setMetodoPagamento] = useState('express');
  const [comprovativo, setComprovativo] = useState(null);

  let valueToPay = 0; //valor que será pago dependendo do tipo de transação

  const [formData, setFormData] = useState({
    typeTrasition: 'Venda', category: 'Casa', title: '', description: '', 
    price: '', beds: '', baths: '', area: '', district: '', 
    municipality: 'Ndalatando', phone: '', paymentMethod: '', reference: '',
    firstImage: "", imovelImages: [], comprovative: ''
  });

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      if (index === newImages.length - 1 && images.length < 5) newImages.push(null);
      setImages(newImages);
    }
  };

  const handleSave = async () => {
    const payload = {
      ...formData,
      paymentMethod: metodoPagamento,
      firstImage: images[0],
      imovelImages: images.filter(img => img !== null),
      comprovative: comprovativo
    };

    console.log("Enviando dados para a API:", payload);

    setIsPublished(true); // Ativa a tela de sucesso
  };

  //função que gera o valor de pagamento. Para arrendamento, 5% e para venda 3%
   const PayValue = (transition, value) => {
        
        let price = Number(value);

        //verifica o tipo de transação
        if(transition === 'Venda') { // 3% => 0.3
            valueToPay = price * 0.3;
        } else { // 5% => 0.5
            valueToPay = price * 0.5;
        }
   }

  // Se o imóvel já foi publicado, exibe a tela de sucesso da imagem
  if (isPublished) {
    return (
      <main className="p-4 md:p-10 max-w-xl mx-auto bg-white min-h-screen flex flex-col items-center justify-center text-center">
        <div className="bg-emerald-50 p-6 rounded-full mb-6">
          <CheckCircle2 className="text-emerald-600" size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Imóvel pendente!</h2>
        <p className="text-gray-600 mb-8 max-w-xs">
          O seu imóvel estará disponível na plataforma depois da revisão pelos administradores. Será notificado quando alguém demonstrar interesse.
        </p>
        <div className="flex gap-4 w-full">
            <button
                onClick={() => navigate('/meus-imoveis')}
                className="cursor-pointer flex-1 py-4 bg-emerald-700 text-white rounded-xl font-bold"
            >
                Ver os meus imóveis
            </button>
            <button 
                onClick={() => navigate('/explore-imoveis')}
                className="cursor-pointer flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold"
            >
                Ver imóveis
            </button>
        </div>
      </main>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar />
        
        <main className="p-4 md:p-10 max-w-4xl mx-auto min-h-screen">
        <h2 className="text-3xl font-bold mb-2">Publicar Imóvel</h2>
        <p className="text-gray-600 mb-6">Preencha os detalhes do seu imóvel e pague a taxa de publicação.</p>
            
            <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]'>
                {/* Indicadores */}
                <div className="flex items-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {step > s ? '✓' : s}
                        </div>
                        {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
                    </div>
                    ))}
                </div>

                {/* Passo 1 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="font-bold">Fotos do imóvel *</label>
                            <div className="flex gap-2 flex-wrap">
                                {images.map((img, idx) => (
                                <div key={idx} className="relative w-24 h-24">
                                    {img ? (
                                    <div className="w-full h-full relative">
                                        <img src={img} className="w-full h-full object-cover rounded-xl border" />
                                        <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1"><X size={12}/></button>
                                    </div>
                                    ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
                                        <Camera className="text-gray-400" /> <span className="text-xs text-gray-400">Adicionar</span>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={(e) => handleImageUpload(e, idx)} 
                                        />
                                    </label>
                                    )}
                                </div>
                                ))}
                            </div>
                            <div className='mt-2'>
                                <label className="text-gray-400 text-sm">Adicione pelo menos uma foto (máximo 5).</label>
                            </div>
                        </div>
                        
                        <div className='mb-4'>
                            <label className='text-gray-400'>Tipo de Transação</label>
                            <select 
                                className="cursor-pointer w-full p-3 border rounded-xl mt-2" 
                                value={formData.typeTrasition} 
                                onChange={(e) => setFormData({ ...formData, typeTrasition: e.target.value })}
                            >
                                <option value="Venda">Venda</option>
                                <option value="Arrendamento">Arrendamento</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-400'> Tipo de Imóvel</label>
                            <select
                                className="cursor-pointer w-full p-3 border rounded-xl mt-2" 
                                value={formData.category} 
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Casa">Casa</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Terreno">Terreno</option>
                                <option value="Espaço Comercial">Espaço Comercial</option>
                                <option value="Armazém">Armazém</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-400'>Título</label>
                            <input 
                                className="w-full p-3 border rounded-xl mt-2" 
                                placeholder="Ex: Casa T3 no Bairro Popular" 
                                value={formData.title} 
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            />
                        </div>
                    
                        <button 
                            onClick={() => setStep(2)} 
                            className="cursor-pointer w-full py-4 bg-black text-white rounded-xl font-bold"
                        >
                            Continuar para detalhes
                        </button>
                    </div>
                )}

                {/* Passo 2 */}
                {step === 2 && (
                    <div className="space-y-4">
                    
                    <div className='mb-4'>
                        <label className='text-gray-400'>Descrição</label>
                        <textarea
                            className="w-full p-3 border rounded-xl mt-2" 
                            placeholder="Descreva o imóvel..." 
                            rows={4}
                            value={formData.description} 
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className='flex flex-col'>
                                <label className='text-gray-400'>Preço (KZ)*</label>
                                <input
                                    type="number"
                                    className="p-3 border rounded-xl mt-2" 
                                    placeholder="Preço (Kz)" 
                                    value={formData.price} 
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label className='text-gray-400'>Dimensão</label>
                                <input 
                                    className="p-3 border rounded-xl mt-2" 
                                    placeholder="Ex: 15mx20m" 
                                    value={formData.area} 
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })} 
                                />
                            </div>

                    </div>

                    {/** Mostra os campos de quarto e wc so se o tipo do imovel for casa */}
                            {formData.category !== 'Terreno' && formData.category !== 'Armazém' && formData.category !== 'Espaço Comercial' 
                            && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className='flex flex-col'>
                                        <label className='text-gray-400'>Quartos</label>
                                        <input
                                            type="number" 
                                            className="p-3 border rounded-xl mt-2" 
                                            placeholder="Número de quartos do imóvel" 
                                            value={formData.beds} 
                                            onChange={(e) => setFormData({ ...formData, beds: e.target.value })} 
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='text-gray-400'>WC</label>
                                        <input 
                                            type="number"
                                            className="p-3 border rounded-xl mt-2" 
                                            placeholder="Número de WC" 
                                            value={formData.baths} 
                                            onChange={(e) => setFormData({ ...formData, baths: e.target.value })} 
                                        />
                                    </div>
                                </div>
                            )}

                        <div>
                            <label className='text-gray-400'>Bairro</label>
                            <input 
                                className="w-full p-3 border rounded-xl mt-2" 
                                placeholder="Ex: Cazengo, Bairro Popular" 
                                value={formData.district} 
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })} 
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-400'>Município</label>
                            <select 
                                className="cursor-pointer w-full p-3 border rounded-xl mt-2" 
                                value={formData.municipality} 
                                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
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

                        <div className='mb-4'>
                            <label className='text-gray-400'>Telefone</label>
                            <input 
                                className="w-full p-3 border rounded-xl mt-2" 
                                placeholder="+244 9XX XXX XXX" 
                                value={formData.phone} 
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                            />
                        </div>
                    
                    <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="cursor-pointer flex-1 py-4 bg-gray-100 rounded-xl font-bold">Voltar</button>
                        <button 
                            onClick={() => {
                                PayValue(formData.typeTrasition, formData.price);
                                setStep(3);
                            }} 
                            className="cursor-pointer flex-1 py-4 bg-black text-white rounded-xl font-bold"
                        >
                            Continuar para pagamento
                        </button>
                    </div>
                    </div>
                )}

                {/* Passo 3 */}
                {step === 3 && (
                    <div className="space-y-4">
                    <div className="bg-emerald-50 p-6 rounded-2xl text-center border border-emerald-100">
                        <h4 className="text-emerald-900 font-bold text-xl">{valueToPay} kz</h4>
                        <p className="text-sm text-emerald-800">Pagamento único para publicar o seu imóvel</p>
                    </div>
                    
                    <label className="font-bold">Método de pagamento *</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <button onClick={() => setMetodoPagamento('express')} className={`cursor-pointer p-4 border-2 rounded-xl text-left ${metodoPagamento === 'express' ? 'border-emerald-600 bg-emerald-50' : ''}`}>
                            <div className="font-bold">Pagamento Express</div>
                            <div className='text-xs text-gray-500'>Multicaixa Express</div>
                        </button>
                        <button onClick={() => setMetodoPagamento('iban')} className={`cursor-pointer p-4 border-2 rounded-xl text-left ${metodoPagamento === 'iban' ? 'border-emerald-600 bg-emerald-50' : ''}`}>
                        <div className="font-bold">Transferência Bancária</div>
                        <div className='text-xs text-gray-500'>IBAN / referência</div>
                        </button>
                    </div>

                    {metodoPagamento === 'iban' ? (
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 space-y-1">
                            <p><b>Banco:</b> BFA</p>
                            <p><b>IBAN:</b>  AO06 0000 0000 0000 0000 0</p>
                            <p><b>Beneficiário:</b> ImoCuanza, Lda</p>
                            <p className='mt-2'><b>OBS:</b> Após o pagamento e clicado em "<b>Confirmar e Publicar</b>", os administradores vão analisar seus dados e posteriormente tornar o imóvel público na plataforma.</p>
                        </div>
                    ) : (
                        <div className='bg-gray-50 p-4 rounded-xl text-sm text-gray-600 space-y-1'>
                            <p>Aceda ao <b>Multicaixa Express</b> para o pagamento. Após o pagamento, carregar o comprovativo no campo abaixo</p>
                            <p><b>Numéro do Express:</b> 900 000 000</p>
                            <p className='mt-2'><b>OBS:</b> Após o pagamento e clicado em "<b>Confirmar e Publicar</b>", os administradores vão analisar seus dados e posteriormente tornar o imóvel público na plataforma.</p>
                        </div>
                    )}

                    <div className="mt-4">
                        <label className="block font-bold mb-2">Carregar comprovativo:</label>
                        {comprovativo ? (
                        <div className="relative w-full h-32 mt-2">
                            <img src={comprovativo} className="w-full h-full object-cover rounded-xl border" alt="Comprovativo" />
                            <button onClick={() => setComprovativo(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X size={14}/></button>
                        </div>
                        ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                            <UploadCloud className="text-gray-400 mb-2" />
                            <span className="text-sm">Clique para carregar o ficheiro</span>
                            <input type="file" className="hidden" onChange={(e) => setComprovativo(URL.createObjectURL(e.target.files[0]))} />
                        </label>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="cursor-pointer flex-1 py-4 bg-gray-100 rounded-xl font-bold">Voltar</button>
                        <button onClick={handleSave} className="cursor-pointer flex-1 py-4 bg-emerald-700 text-white rounded-xl font-bold">Confirmar e Publicar</button>
                    </div>
                    </div>
                )}
            </div>
        </main>
    </div>
  );
};

export default PublishImovelPage;