import { Trophy } from 'lucide-react';
import React from 'react'

function DonationCard() {
  const donations = [
    { name: 'Carimbo Miguel', amount: 'R$ 357,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 307,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 207,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 197,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 157,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 107,50' },
    { name: 'Carimbo Miguel', amount: 'R$ 70,50' },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-dark rounded-xl shadow-lg border-8 border-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-center mb-4 gap-4">
        <Trophy size={32} color="#B89C54" />
        <h1 className="text-xl font-noraml text-background">Ranking de Doações</h1>
      </div>

      {/* Donation List */}
      <div className="space-y-3">
        {donations.map((donation, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-600 rounded-md py-1 pl-4 pr-8 gap-16"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-background text-sm font-medium">{donation.name}</span>
            </div>
            <span className="text-background text-sm font-medium">{donation.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonationCard
