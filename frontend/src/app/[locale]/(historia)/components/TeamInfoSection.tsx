"use client"

import { Timeline } from "@/components/ui/timeline"
import { Shield, Target, Trophy, Users, Zap } from "lucide-react"
import Image from "next/image"

export default function TeamInfoSection() {
  const timelineItems = [
    {
      title: "Team Formation",
      description: "In 2024, the Quantum Strikers emerged from a revolutionary vision to redefine athletic excellence. Our founding members, comprised of elite athletes and cutting-edge sports scientists, united to create a team that would bridge the gap between human potential and technological advancement.",
      icon: <Shield className="w-6 h-6 text-primary" />,
      image: "/bg.jpg"
    },
    {
      title: "Mission",
      description: "Our mission transcends traditional athletic boundaries. We combine advanced biomechanics, AI-driven training protocols, and human determination to push the limits of what's possible. Every Quantum Striker is equipped with next-generation performance tracking and enhancement technologies.",
      icon: <Target className="w-6 h-6 text-primary" />,
      image: "/bg.jpg"
    },
    {
      title: "Core Values",
      description: "Excellence in every motion, Innovation in our approach, Unity in our diversity, and Resilience in face of challenges. These aren't just values - they're the quantum principles that guide every decision, every training session, and every competition we undertake.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      image: "/bg.jpg"
    },
    {
      title: "Community Impact",
      description: "Through our Quantum Youth Initiative, we're nurturing the next generation of athletes. Our state-of-the-art training facilities are open to community programs, and our athletes regularly mentor young talents, sharing not just skills but the mindset of future champions.",
      icon: <Users className="w-6 h-6 text-primary" />,
      image: "/bg.jpg"
    },
    {
      title: "Future Vision",
      description: "We're not just preparing for the future - we're creating it. Our roadmap includes pioneering virtual reality training environments, developing AI-powered coaching systems, and establishing the world's first quantum-integrated athletic development center.",
      icon: <Trophy className="w-6 h-6 text-primary" />,
      image: "/bg.jpg"
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Mascot Section */}
      <section className=" px-4 bg-slate-100 py-4 rounded-xl">
        {/* Timeline Section */}
        <div>
          <h2 className="text-4xl font-bold text-start mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Nossa História
          </h2>
          <Timeline items={timelineItems} />
        </div>
      </section>
    </main>
  )
}
