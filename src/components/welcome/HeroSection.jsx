import React from 'react';
import { MapPin, Search, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/01.JPG')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Conteúdo */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl text-white"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <MapPin size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">Cuanza Norte, Angola</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          O seu próximo imóvel está aqui.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          A ImoCuanza é a plataforma de venda e arrendamento de imóveis dedicada ao Cuanza Norte. 
          Anuncie, compre ou arrende com segurança e transparência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/explore-imoveis')} className="cursor-pointer flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-all px-8 py-4 rounded-xl font-semibold">
            <Search size={20} /> Explorar Imóveis
          </button>
          <button className="cursor-pointer flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 transition-all px-8 py-4 rounded-xl font-semibold backdrop-blur-sm">
            <PlusCircle size={20} /> Publicar Imóvel
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
