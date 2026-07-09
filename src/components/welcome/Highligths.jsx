import React from 'react';
import { MapPin, Building, ShieldCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  { icon: MapPin, title: "14 Municípios", desc: "do Cuanza Norte" },
  { icon: Building, title: "Venda & Arrendamento", desc: "diversos tipos" },
  { icon: ShieldCheck, title: "Perfis Verificados", desc: "dados reais" },
  { icon: Handshake, title: "Contacto Seguro", desc: "com transparência" },
];

const Highlights = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <item.icon size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;