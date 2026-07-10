import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-emerald-900 rounded-[32px] py-16 px-8 text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para começar?</h2>
        <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-xl mx-auto">
          Junte-se à ImoCuanza e encontre o imóvel ideal no Cuanza Norte.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="cursor-pointer bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all"
            >
            Criar conta gratuita
          </button>
          <button 
            onClick={() => navigate('/explore-imoveis')}
            className="cursor-pointer bg-emerald-800 text-white border border-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all"
            >
            Ver imóveis
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;