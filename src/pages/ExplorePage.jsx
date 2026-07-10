import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Bed, Bath, Square, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        transacao: "Todas (Venda/Arrendamento)",
        tipo: "Todos os tipos",
        municipio: "Todos os municípios"
    });

    // Dados dos imóveis
    const properties = [
        { id: 1, title: "Casa T3 com quintal no Bairro Popular", price: "8 500 000", type: "Venda",
            category: "Casa", location: "Cazengo, Bairro Popular", beds: 3, baths: 2, area: "180m²",
            image: "/id01_00.JPG", description: "Ampla casa de 3 divisões, com sala ampla, cozinha equipada, dois wc e quintal espaçoso. Ideal para famílias. Boa localização, perto de uma esquadra policial e lojas.",
            images : ["/id01_00.JPG", "/id01_01.JPG", "/id01_02.JPG", "/id01_03.JPG"]
        },
        { id: 2, title: "Casa T3 com quintal, no Bairro Sambizanga", price: "125 000", type: "Arrendamento",
            category: "Casa", location: "Cazengo, Sambizanga", beds: 3, baths: 1, area: "85m²",
            image: "/id02_00.JPG", description: "",
            images: ["/id02_00.JPG", "/id02_01.JPG", "/id02_02.JPG", "/id02_03.JPG"]
        },
        { id: 3, title: "Apartamento T2 mobilado no centro", price: "120 000", type: "Arrendamento",
            category: "Apartamento", location: "Cambambe, Alto Dondo", beds: 2, baths: 1, area: "185m²",
            image: "/id03_00.JPG", description: "",
            images: ["/id03_00.JPG", "/id03_01.WEBP", "/id03_02.WEBP", "/id03_03.WEBP"]
        },
        { id: 4, title: "Terreno no Bairro Marica", price: "1 500 000", type: "Venda",
            category: "Terreno", location: "Cazengo, Bairro Marica", beds: "", baths: "", area: "30mx25m",
            image: "/terreno01.JPG", description: "Terreno com 30 metros de comprimento e 25 metros de largura, já com registo predial e o proprietário se responsabilizará por desafixar o direito a superfície. O terreno está numa zona estratégica com uma ótima margem de crescimento habitacional. OBS: As negociações do preço serão de forma presencial.",
            images: []
        },
        { id: 5, title: "Terreno na Zona Verde", price: "800 000", type: "Venda",
            category: "Terreno", location: "Cazengo, Zona Verde", beds: "", baths: "", area: "20mx15m",
            image: "/terreno02.WEBP", description: "Terreno com 20 metros de comprimento e 15 metros de largura, já com registo predial e o proprietário se responsabilizará por desafixar o direito a superfície. O terreno está numa zona estratégica com uma ótima margem de crescimento habitacional. OBS: As negociações do preço serão de forma presencial.",
            images: []
        },
        { id: 6, title: "Terreno na Vieta", price: "600 000", type: "Venda",
            category: "Terreno", location: "Cazengo, Vieta", beds: "", baths: "", area: "15mx15m",
            image: "/terreno03.JPG", description: "Terreno com 15 metros de comprimento e 15 metros de largura, já com registo predial e o proprietário se responsabilizará por desafixar o direito a superfície. O terreno está numa zona estratégica com progressão no crescimento habitacional e com zonas comerciais. OBS: As negociações do preço serão de forma presencial.",
            images: []
        }
    ];

    // Filtro Dinâmico Simples
    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTransacao = filters.transacao === "Todas (Venda/Arrendamento)" || p.type === filters.transacao;
        const matchesTipo = filters.tipo === "Todos os tipos" || p.category === filters.tipo;
        const matchesMunicipio = filters.municipio === "Todos os municípios" || p.location.includes(filters.municipio);
        
        return matchesSearch && matchesTransacao && matchesTipo && matchesMunicipio;
        });
    }, [searchTerm, filters]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Imóveis no Cuanza Norte</h1>
          <p className="text-gray-600 text-lg md:text-xl">Encontre casas, apartamentos, terrenos e mais para venda ou arrendamento.</p>
        </header>

        {/* Blocos de Filtro */}
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
            <div className="relative mb-6">
                <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                <input 
                    type="text" 
                    placeholder="Pesquisar por tipo, preço, categoria, localidade..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className='flex flex-col w-full'>
                    <label className='block ml-1 mb-1'>Designação</label>
                    <select className="cursor-pointer p-4 rounded-xl border border-gray-200" onChange={(e) => setFilters({...filters, transacao: e.target.value})}>
                        <option>Todas (Venda/Arrendamento)</option>
                        <option>Venda</option>
                        <option>Arrendamento</option>
                    </select>
                </div>

                <div className='flex flex-col w-full'>
                    <label className='block ml-1 mb-1'>Imóvel</label>
                    <select className="cursor-pointer p-4 rounded-xl border border-gray-200" onChange={(e) => setFilters({...filters, tipo: e.target.value})}>
                        <option>Todos os tipos</option>
                        <option>Casa</option>
                        <option>Apartamento</option>
                        <option>Terreno</option>
                        <option>Espaço Comercial</option>
                        <option>Armazém</option>
                    </select>
                </div>
                
                <div className='flex flex-col w-full'>
                    <label className='block ml-1 mb-1'>Município</label>
                    <select className="cursor-pointer p-4 rounded-xl border border-gray-200" onChange={(e) => setFilters({...filters, municipio: e.target.value})}>
                        <option>Todos os municípios</option>
                        <option>Ambaca</option>
                        <option>Aldeia Nova</option>
                        <option>Banga</option>
                        <option>Bolongongo</option>
                        <option>Cazengo</option>
                        <option>Cambambe</option>
                        <option>Cerca</option>
                        <option>Golungo Alto</option>
                        <option>Luínga</option>
                        <option>Lucala</option>
                        <option>Massangano</option>
                        <option>Ngonguembo</option>
                        <option>Samba Cajú</option>
                        <option>Tango</option>
                        <option>Terreiro</option>
                    </select>
                </div>
            
            </div>

        </div>

        <p className="mb-4 text-gray-600 font-medium">{filteredProperties.length} imóveis encontrados</p>

        {/* Lista de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProperties.map(p => (
                    <div 
                        key={p.id} 
                        className="cursor-pointer bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                        onClick={() => navigate('detalhes-imovel', { state: { imovel : p }})}
                    >
                      <div className="relative h-56 w-full bg-gray-200">
                        <img src={p.image} alt={p.title} className='w-full h-full object-cover transition-transform duration-500 hover:scale-105' />
                        <div className="absolute top-4 left-4 flex gap-2">
                            {p.type === 'Venda' ? <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">{p.type}</span>
                            : <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{p.type}</span>}
                          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{p.category}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{p.price} Kz</h3>
                        <p className="text-gray-900 font-medium mb-4 text-lg">{p.title}</p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                          <MapPin size={18} /> {p.location}
                        </div>
                        <div className="flex gap-6 text-gray-600 border-t pt-4">
                          <span className="flex items-center gap-2"><Bed size={20} /> {p.beds} quartos</span>
                          <span className="flex items-center gap-2"><Bath size={20} /> {p.baths} wc</span>
                          <span className="flex items-center gap-2"><Square size={20} /> {p.area} área</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
      </div>
    </main>
  );
};

export default ExplorePage;