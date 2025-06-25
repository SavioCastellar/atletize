import React from 'react'

interface MembershipCardProps {
  title: string
  icon: React.ReactNode
  price: string
  period: string
  features: string[]
  gradient: string
  shadowColor: string
  buttonGradient: string
  borderGradient: string
  featured?: boolean
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  title,
  icon,
  price,
  period,
  features,
  gradient,
  shadowColor,
  buttonGradient,
  borderGradient,
  featured = false
}) => {
  return (
    <div className={`relative group transition-all duration-500 -mr-8 ${featured ? 'scale-105 z-10' : 'z-0'}`}>
      {featured && (
        <div className="absolute z-20 -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secundaria to-secundaria-extralight text-black text-sm font-medium px-4 py-1 rounded-full backdrop-blur-xl border border-white/10">
          Popular
        </div>
      )}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl">
        <div className={`relative overflow-hidden rounded-2xl bg-black p-8 ${shadowColor} transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1`}>
          {/* Animated background gradient */}
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`} />
          {/* Animated border gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={`bg-gradient-to-r ${buttonGradient} p-2 rounded-lg text-white/90`}>
                {icon}
              </div>
              <h3 className="text-2xl font-bold text-white/90">
                {title}
              </h3>
            </div>

            <div className="flex items-end gap-1 mb-6">
              <span className="text-3xl font-bold text-white">{price}</span>
              <span className="text-gray-400 mb-1">{period}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-400 group/item">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500 group-hover/item:text-white/90 transition-colors duration-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="group-hover/item:text-white/90 text-sm transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${buttonGradient} text-white/90 font-semibold transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5 active:scale-[0.98] group relative overflow-hidden`}>
              <span className="relative z-10">Escolher Plano</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembershipCard
