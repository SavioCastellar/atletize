"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Shield, Trophy, Users, Star, Heart, Target } from "lucide-react";
import { supabase } from "@/app/api/auth/supabase/client";

const initialStats = [
  { icon: Users, label: "Sócios", value: "40+" },
  { icon: Star, label: "Atletas", value: "250" },
];

const values = [
  {
    icon: Heart,
    title: "Paixão",
    description: "Todos os dias, em tudo o que fazemos, a paixão pelo esporte nos guia."
  },
  {
    icon: Shield,
    title: "Tradição",
    description: "Nosso legado é o que nos motiva a sermos melhores a cada dia."
  },
  {
    icon: Target,
    title: "Excelência",
    description: "Buscamos a excelência em tudo o que fazemos, dentro e fora das quadras."
  },
];

export default function Identity() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    async function fetchMedals() {
      const { data, error } = await supabase
        .from('tournaments_modalities')
        .select('gold');

      if (error) {
        console.error('Error fetching medals:', error);
        return;
      }

      const totalGoldMedals = data.reduce((acc, curr) => {
        return acc + (curr.gold || 0);
      }, 0);

      setStats([
        { icon: Trophy, label: "Títulos", value: totalGoldMedals.toString() },
        ...initialStats
      ]);
    }

    fetchMedals();
  }, []);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-8 bg-white relative overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="sticky top-8">
              <h2 className="text-5xl font-bold text-neutral-900 mb-8">Nossa Identidade</h2>
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-xl font-medium text-neutral-900 mb-4">O Escudo</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Descreva a história por trás do escudo da atlética.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-xl font-medium text-neutral-900 mb-4">O Carcará</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Descreva a história por trás do mascote da atlética.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-950 p-4 rounded-lg border border-gray-600"
                    >
                      <stat.icon className="w-6 h-6 text-secundaria mb-2" />
                      <span className="block text-2xl font-bold text-gray-200">
                        {stat.value}
                      </span>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="space-y-6">
                  {values.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <value.icon className="w-5 h-5 text-secundaria" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-neutral-900 mb-1">
                          {value.title}
                        </h4>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[4/3] relative rounded-lg overflow-hidden drop-shadow-lg"
            >
              <Image
                src="/mascot.jpg"
                alt="Club Crest"
                fill
                className="object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-secundatext-secundaria/20 to-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/theme-bg.png"
                  alt="Training Ground"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/theme-bg.png"
                  alt="Academy"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950/5 to-transparent"
      />
    </section>
  );
}
