import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { Search, ChevronDown, MapPin, Bed, Bath, Square } from 'lucide-react';

const ExplorePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        transacao: "Todas (Venda/Arrendamento)",
        type: "Todos os tipos",
        municipio: "Todos os municípios"
    });
  
    const imovelMock = [
        { id: 1, title: "Casa T3 com quintal no Bairro Popular", price: "8 500 000", type: "Venda", category: "Casa", location: "Cazengo, Bairro Popular", beds: 3, baths: 2, area: "180m²", image: "/03.JPG" },
        { id: 2, title: "Casa T3 com quintal, no Bairro Sambizanga", price: "125 000", type: "Arrendamento", category: "Casa", location: "Cazengo, Sambizanga", beds: 3, baths: 1, area: "85m²", image: "/04.JPG" },
        { id: 3, title: "Apartamento T2 mobilado no centro", price: "120 000", type: "Arrendamento", category: "Apartamento", location: "Cambambe, Alto Dondo", beds: 2, baths: 1, area: "185m²", image: "/05.JPG" }
    ];

    const filteredImovelMock = useMemo(() => {
        return imovelMock.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTransacao = filters.transacao === "Todas (Venda/Arrendamento)" || p.type === filters.transacao;
        const matchesType = filters.type === "Todos os tipes" || p.category === filters.type;
        const matchesMunicipio = filters.municipio === "Todos os municípios" || p.location.includes(filters.municipio);
        
        return matchesSearch && matchesTransacao && matchesType && matchesMunicipio;
        });
    }, [searchTerm, filters]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Container */}
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Imóveis no Cuanza Norte</h1>
          <p className="text-gray-600 text-lg md:text-xl">Encontre casas, apartamentos, terrenos e mais para venda ou arrendamento.</p>
        </header>

        {/* Barra de Pesquisa e Filtros */}
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
            <div className="relative mb-6">
                <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Filtro de Transação */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Transação</label>
                    <select 
                    className="p-4 bg-white border border-gray-200 rounded-xl outline-none"
                    onChange={(e) => setFilterValues({...filters, transacao: e.target.value})}
                    >
                    <option>Todas (Venda/Arrendamento)</option>
                    <option>Venda</option>
                    <option>Arrendamento</option>
                    </select>
                </div>

                {/* Filtro tipo de Imóvel */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Tipe de Imóvel</label>
                    <select 
                    className="p-4 bg-white border border-gray-200 rounded-xl outline-none"
                    onChange={(e) => setFilterValues({...filters, type: e.target.value})}
                    >
                    <option>Todos os tipos</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>Terreno</option>
                    <option>Espaço Comercial</option>
                    <option>Armazém</option>
                    </select>
                </div>

                {/* Filtro do Município */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Município</label>
                    <select 
                    className="p-4 bg-white border border-gray-200 rounded-xl outline-none"
                    onChange={(e) => setFilterValues({...filters, municipio: e.target.value})}
                    >
                    <option>Todos os municípios</option>
                    <option>Ndalatando</option>
                    <option>Dondo</option>
                    <option>Cazengo</option>
                    </select>
                </div>
            </div>
          
        </div>

        <p className="text-gray-500 mb-6 font-medium text-lg">{filteredImovelMock.length} imóveis encontrados</p>
        
        {/* Grid de Imóveis: 1 coluna mobile, 2 médio, 3 grande */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImovelMock.map(p => (
            <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 w-full bg-gray-200">
                <img src={p.image} alt={p.title} className='w-full h-full object-cover transition-transform duration-500 hover:scale-105' />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">{p.type}</span>
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{p.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{p.price} Kz</h3>
                <p className="text-gray-900 font-medium mb-4 text-lg">{p.title}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPin size={18} /> {p.location}
                </div>
                <div className="flex gap-6 text-gray-600 border-t pt-5">
                  <span className="flex items-center gap-2"><Bed size={20} /> {p.beds}</span>
                  <span className="flex items-center gap-2"><Bath size={20} /> {p.baths}</span>
                  <span className="flex items-center gap-2"><Square size={20} /> {p.area}</span>
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