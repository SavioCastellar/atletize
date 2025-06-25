"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Medal, Crown } from "lucide-react"
import { SportCard } from "../../components/SportCard"

const MotionTrophy = motion(Trophy)
const MotionStar = motion(Star)
const MotionMedal = motion(Medal)
const MotionCrown = motion(Crown)

const sports = [
  {
    id: 1,
    name: "Vôlei",
    icon: "🏐",
    athletes: [
      {
        id: 1,
        name: "Karch Kiraly",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karch_Kiraly_2014.jpg/140px-Karch_Kiraly_2014.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 2,
        name: "Giba",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Gilberto_Godoy_Filho.jpg/200px-Gilberto_Godoy_Filho.jpg',
        votes: 0,
        team: "Brazil",
      },
      {
        id: 3,
        name: "Kim Yeon-koung",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/%EC%9B%94%EB%93%9C%EA%B7%B8%EB%9E%91%ED%94%84%EB%A6%AC2_%288%29.jpg/330px-%EC%9B%94%EB%93%9C%EA%B7%B8%EB%9E%91%ED%94%84%EB%A6%AC2_%288%29.jpg',
        votes: 0,
        team: "South Korea",
      }
    ]
  },
  {
    id: 2,
    name: "Natação",
    icon: "🏊",
    athletes: [
      {
        id: 4,
        name: "Michael Phelps",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Michael_Phelps_August_2016.jpg/250px-Michael_Phelps_August_2016.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 5,
        name: "Katie Ledecky",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Katie_Ledecky_2016.jpg/250px-Katie_Ledecky_2016.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 6,
        name: "Ian Thorpe",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ian_Thorpe_2012.jpg/330px-Ian_Thorpe_2012.jpg',
        votes: 0,
        team: "Australia",
      }
    ]
  },
  {
    id: 3,
    name: "Basquete",
    icon: "🏀",
    athletes: [
      {
        id: 7,
        name: "LeBron James",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/220px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg',
        votes: 0,
        team: "Los Angeles Lakers",
      },
      {
        id: 8,
        name: "Stephen Curry",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Steph_Curry_P20230117AS-1347_%28cropped%29.jpg/330px-Steph_Curry_P20230117AS-1347_%28cropped%29.jpg',
        votes: 0,
        team: "Golden State Warriors",
      }
    ]
  },
  {
    id: 4,
    name: "Futebol",
    icon: "⚽",
    athletes: [
      {
        id: 9,
        name: "Lionel Messi",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lionel-Messi-Argentina-2022-FIFA-World-Cup_sharpness.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_sharpness.jpg',
        votes: 0,
        team: "Inter Miami",
      },
      {
        id: 10,
        name: "Cristiano Ronaldo",
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
        votes: 0,
        team: "Al Nassr",
      }
    ]
  },
  {
    id: 5,
    name: "Tênis",
    icon: "🎾",
    athletes: [
      {
        id: 11,
        name: "Rafael Nadal",
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Rafael_Nadal_%2835209565922%29.jpg',
        votes: 0,
        team: "Spain",
      },
      {
        id: 12,
        name: "Novak Djokovic",
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Novak_Djokovic_Queen%27s_Club_2018.jpg',
        votes: 0,
        team: "Serbia",
      }
    ]
  },
  {
    id: 6,
    name: "Handebol",
    icon: "🤾",
    athletes: [
      {
        id: 13,
        name: "Nikola Karabatić",
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Nikola_Karabatic_2017.jpg',
        votes: 0,
        team: "France",
      },
      {
        id: 14,
        name: "Mikkel Hansen",
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Mikkel_Hansen_20171217.jpg',
        votes: 0,
        team: "Denmark",
      }
    ]
  },
  {
    id: 7,
    name: "Atletismo",
    icon: "🏃",
    athletes: [
      {
        id: 15,
        name: "Usain Bolt",
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Usain_Bolt_16082009_Berlin.JPG',
        votes: 0,
        team: "Jamaica",
      },
      {
        id: 16,
        name: "Allyson Felix",
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Allyson_Felix_in_2015.jpg',
        votes: 0,
        team: "USA",
      }
    ]
  },
  {
    id: 8,
    name: "Ginástica",
    icon: "🤸",
    athletes: [
      {
        id: 17,
        name: "Simone Biles",
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Simone_Biles_Rio_2016e.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 18,
        name: "Kohei Uchimura",
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Kohei_Uchimura_2011.jpg',
        votes: 0,
        team: "Japan",
      }
    ]
  },
  {
    id: 9,
    name: "Golfe",
    icon: "🏌️",
    athletes: [
      {
        id: 19,
        name: "Tiger Woods",
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tiger_Woods_driver_follow_through.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 20,
        name: "Rory McIlroy",
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Rory_McIlroy_2012.jpg',
        votes: 0,
        team: "Northern Ireland",
      }
    ]
  },
  {
    id: 10,
    name: "Boxe",
    icon: "🥊",
    athletes: [
      {
        id: 21,
        name: "Muhammad Ali",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Muhammad_Ali%2C_gtfy.00140_%28cropped%29.jpg/330px-Muhammad_Ali%2C_gtfy.00140_%28cropped%29.jpg',
        votes: 0,
        team: "USA",
      },
      {
        id: 22,
        name: "Mike Tyson",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/TysonJakePaul2024.png/330px-TysonJakePaul2024.png',
        votes: 0,
        team: "USA",
      }
    ]
  }
];


export default function Home() {
  return (
    <main className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 to-transparent"
        />
      </div>
      <div className="relative">
        {/* Header content */}
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            {/* Floating icons */}
            <div className="absolute inset-0 pointer-events-none">
              <MotionTrophy
                className="absolute left-1/4 top-0 text-emerald-400/50 w-12 h-12"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <MotionStar
                className="absolute right-1/4 top-1/3 text-emerald-400/50 w-10 h-10"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <MotionMedal
                className="absolute left-1/3 bottom-0 text-emerald-400/50 w-8 h-8"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <MotionCrown
                className="absolute right-1/3 bottom-1/4 text-emerald-400/50 w-9 h-9"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, 12, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </div>

            {/* Main title with gradient animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className="relative inline-block"
            >
              <motion.div
                // className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-300/30 blur-3xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                Destaques do Período
              </h1>
            </motion.div>

            {/* Animated subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                Deixe seu voto e celebre os melhores atletas nas diferentes modalidades
              </p>

              {/* Animated underline */}
              <motion.div
                className="h-0.5 bg-emerald-500/50 mt-4 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Sports grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <SportCard sport={sport} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
