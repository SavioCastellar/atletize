"use client"

import { Card } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"
import { UserCircle2, Verified } from "lucide-react"
import Image from "next/image"
import { generatePDF } from "@/lib/pdf-generator"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ThreeDCard } from "@/components/ui/3d-card"
import { NOME_ATLETICA_ABREVIADO } from "@/app/constants"

interface IdCardProps {
  user: any
}

export function IdCard({ user }: IdCardProps) {
  const handleDownload = async () => {
    try {
      await generatePDF("university-card")
      toast("ID Card has been downloaded successfully!")
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.")
    }
  }

  const endDate = new Date(user?.subscriptions?.end_date!).getTime()

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-end items-center">
        <Button
          className="bg-purple-700 hover:bg-purple-600 text-white border-0 cursor-pointer"
          onClick={handleDownload}
        >
          Baixar carteirinha
        </Button>
      </div>
      <Card className="p-6 relative overflow-hidden max-w-3xl" id="university-card">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:40px_40px]" />

        {/* University Logo and Header */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {/* <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"> */}
              <Verified className={`w-8 h-8 ${user?.subscriptions?.plan === 'ouro' ? 'text-[#facc15]' : user?.subscriptions?.plan === 'prata' ? 'text-slate-300' : 'text-[##7c2d12]'}`} />
              {/* </div> */}
              <div>
                <h2 className="text-white font-bold text-xl">{NOME_ATLETICA_ABREVIADO}</h2>
                <h3 className={`font-semibold ${user?.subscriptions?.plan === 'ouro' ? 'text-[#facc15]' : user?.subscriptions?.plan === 'prata' ? 'text-slate-300' : 'text-[##7c2d12]'}`}>
                  {user.subscriptions.plan?.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <Image src="/logo.png" width={48} height={48} alt="University Logo" />
            </div>
          </div>

          {/* Main Content */}
          <ThreeDCard className="bg-white rounded-xl backdrop-blur-sm overflow-hidden">
            <div className="h-10 bg-black/10" />
            <div className="px-6 py-2">
              <div className="flex space-x-6">
                {/* Photo Section */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 ring-4 ring-muted-foreground/20 flex items-center justify-center">
                    {user?.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="w-20 h-20 text-gray-400" />
                    )}
                  </div>
                  <div className="mt-2">
                    <QRCodeSVG
                      value={endDate > Date.now() ? `Associado validado!` : 'Plano expirado!'}
                      size={70}
                      level="H"
                      marginSize={2}
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <p className="text-md text-slate-400 font-semibold uppercase">Nome</p>
                    <h3 className="text-xl font-bold text-slate-900">
                      {user?.name ?? "Nome do Sócio"}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-md text-slate-400 font-semibold uppercase">Matrícula</p>
                      <p className="text-lg text-slate-800 font-mono font-medium">
                        {user?.enrollmentCode || "XXXXXX"}
                      </p>
                    </div>

                    <div>
                      <p className="text-md text-slate-400 font-semibold uppercase">Curso</p>
                      <p className="text-lg text-slate-800 font-normal">
                        {user?.course || "Curso do Sócio"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Valid for Academic Year 2024-2025
                </p>
              </div> */}
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Security Strip */}
        </div>
      </Card>
    </div>
  )
}
