import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const points = [
  "Foto e nome verificado do interessado",
  "Historial de publicações na plataforma",
  "Decisão total do anunciante sobre partilha de contactos",
  "Painel de administração contra burlas"
];

const Transparency = () => {
  
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Lado do Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Transparência em cada passo</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Sabemos que confiança é fundamental. Por isso, quando alguém demonstra interesse no seu imóvel, 
            pode ver o perfil completo dessa pessoa antes de partilhar os seus contactos.
          </p>

          <ul className="space-y-4 mb-8">
            {points.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="text-emerald-600" size={24} />
                {point}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => navigate('/login')}
            className="cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Começar agora <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Lado da Imagem (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gray-200 rounded-3xl h-[400px] w-full overflow-hidden">
            {/* Imagem */}
            <img src="/02.JPG" alt="Segurança ImoCuanza" className="w-full h-full object-cover" />
          </div>
          
          {/* Card flutuante sobreposto */}
          <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CheckCircle className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Perfil verificado</p>
              <p className="text-sm text-gray-500">Cada utilizador tem dados reais.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Transparency;