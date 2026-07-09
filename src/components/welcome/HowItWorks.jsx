import React from 'react';
import { UserPlus, Camera, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { 
    id: "01", 
    icon: UserPlus, 
    title: "Crie o seu Perfil", 
    desc: "Registe-se com dados reais: nome conforme o BI, telefone com WhatsApp, endereço completo, número de BI e foto tipo passe." 
  },
  { 
    id: "02", 
    icon: Camera, 
    title: "Publicar Imóvel", 
    desc: "Tire fotos de alta qualidade do seu imóvel, adicione a descrição, localização e valor." 
  },
  { 
    id: "03", 
    icon: Handshake, 
    title: "Receba Interesses", 
    desc: "Quando alguém se interessar, recebe uma notificação. Veja o perfil do interessado e decida se partilha os seus contactos." 
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <p className="text-lg text-gray-600">Publicar ou encontrar um imóvel é simples e seguro em poucos passos.</p>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 relative overflow-hidden"
            >
              <div className="bg-emerald-600 p-4 rounded-xl text-white">
                <step.icon size={32} />
              </div>
              <div className="flex-1">
                <span className="text-4xl font-black text-gray-100 absolute top-4 right-6">{step.id}</span>
                <h3 className="text-xl font-bold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;