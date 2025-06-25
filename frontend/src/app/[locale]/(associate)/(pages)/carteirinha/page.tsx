import { IdCard } from "../../components/IdCard"
import { StudentForm } from "../../components/StudentForm"
import { redirect } from "next/navigation"
import { fetchUserData } from "../../server/actions/fetch-user-data"
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'

export default async function Carteirinha() {
  const session = await getServerSession(nextAuthOptions)

  if (!session?.user?.id || !session?.user?.email || !session?.user?.name) {
    redirect('/signin')
  }

  const userData = await fetchUserData(session)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#12061B] to-black">
      {/* <Header session={session} isDark={true} /> */}
      <main className="py-8 px-3">
        <div className="space-y-8 flex flex-col items-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-100">
              {userData?.name ? 'Carteirinha de Sócio' : 'Cadastro de Sócio'}
            </h1>
            <p className="text-gray-400">
              {userData?.name ? 'Esta é sua carteirinha de sócio da Martelada' : 'Preencha os campos abaixo para gerar sua carteirinha de sócio'}
            </p>
          </div>
          <div className="w-full">
            {userData?.name ? (
              <IdCard user={userData} />
            ) : (
              <StudentForm user={userData} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
