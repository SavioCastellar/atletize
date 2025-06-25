"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { UserCircle2, Verified } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/app/api/auth/supabase/client"
import { PiMedalFill } from "react-icons/pi"
import { useUploadThing } from "@/lib/uploadthing"
import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export function StudentForm({ user }: any) {
  const endDate = new Date(user?.subscriptions?.end_date!).getTime()
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [utUrl, setUtUrl] = useState<string>('')
  const [file, setFile] = useState<File>()
  const [formData, setFormData] = useState({
    name: "",
    enrollmentCode: "",
    course: "",
    photoUrl: "",
  })
  const router = useRouter();

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return

    setFile(files[0])
    setPhotoUrl(URL.createObjectURL(files[0]))
  }

  const uploadFileToUploadThing = async () => {
    try {
      const response = await startUpload([file!])
      if (response) {
        const uploadedUrl = response[0].url
        return uploadedUrl
      }
    } catch (error) {
      toast.error('Erro ao salvar imagem.')
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const uploadedUrl = await uploadFileToUploadThing()

    const { error } = await supabase
      .from('users')
      .update({
        name: formData.name,
        enrollment_code: formData.enrollmentCode,
        course: formData.course,
        photo_url: uploadedUrl,
      })
      .eq('id', user?.id)

    if (error)
      toast.error('Erro ao atualizar informações do sócio.')
    if (!error)
      toast.success('Informações armazenadas com sucesso!')

    router.refresh()
  }

  const { startUpload, isUploading } = useUploadThing('idCardPhotoUploader', {})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Create a toast to show the upload progress using sonner
  useEffect(() => {
    if (isUploading) {
      toast.info('Salvando informações...')
    }
  }, [isUploading])

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center md:flex-row gap-10">
        <div className="space-y-4 text-gray-400">
          <h2 className="text-xl font-semibold text-slate-100">Informações do Sócio</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              variant="forms"
              id="name"
              name="name"
              placeholder="Informe seu nome completo"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enrollmentCode">Código de matrícula</Label>
            <Input
              variant="forms"
              id="enrollmentCode"
              name="enrollmentCode"
              placeholder="Informe seu código de matrícula"
              value={formData.enrollmentCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Curso</Label>
            <Input
              variant="forms"
              id="course"
              name="course"
              placeholder="Informe seu curso"
              value={formData.course}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photoUrl">Foto</Label>
            <FileUpload onChange={handleFileUpload} />
          </div>
          <Button
            type="submit"
            className="bg-white/10 hover:bg-white/20 text-white border-0 cursor-pointer"
            disabled={!formData.name || !formData.enrollmentCode || !formData.course || !file}
            onClick={handleSubmit}
          >
            Salvar Informações
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-lg">
          <Card className="p-4 relative overflow-hidden" id="university-card">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:40px_40px]" />

            {/* University Logo and Header */}
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Verified className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">MARTELADA</h2>
                    <h3 className="text-blue-200 font-semibold">UFOP</h3>
                  </div>
                </div>
                <div>
                  <QRCodeSVG
                    value={endDate > Date.now() ? `Associado validado!` : 'Plano expirado!'}
                    size={60}
                    level="H"
                    marginSize={1}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white/95 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex space-x-6 pb-4">
                  {/* Photo Section */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 ring-4 ring-muted-foreground/20 flex items-center justify-center">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircle2 className="w-20 h-20 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400 font-medium uppercase">Nome</p>
                      <h3 className="text-xl font-bold text-slate-900">
                        {formData?.name || "Nome do Sócio"}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-400 font-medium uppercase">Matrícula</p>
                        <p className="text-slate-800 font-mono font-medium">
                          {formData?.enrollmentCode || "XXXXXX"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-400 font-medium uppercase">Curso</p>
                        <p className="text-slate-800 font-normal">
                          {formData?.course || "Curso do Sócio"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    {`Válido até: ${new Date(user?.subscriptions?.end_date!).toLocaleDateString('pt-br')}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-400">
                      {user?.subscriptions?.plan.toUpperCase()}
                    </p>
                    <PiMedalFill
                      color={user?.subscriptions?.plan === 'ouro' ? '#facc15' : user?.subscriptions?.plan === 'prata' ? '#a1a1aa' : '##7c2d12'}
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <h2 className="text-xl font-semibold text-slate-300/30">Prévia</h2>
        </div>
      </div>
    </div>
  )
}
