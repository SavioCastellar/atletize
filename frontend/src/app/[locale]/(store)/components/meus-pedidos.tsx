'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { User, Settings } from 'lucide-react'
import { Session } from 'next-auth'
import { supabase } from '@/app/api/auth/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface MeusPedidosProps {
  session: Session
}

const MeusPedidos = ({ session }: MeusPedidosProps) => {
  const [tabValue, setTabValue] = useState('orders')
  const router = useRouter()
  const [orders, setOrders] = useState<any>([])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', session.user?.id)
      .order('created', { ascending: false })

    if (error) {
      toast.error('Erro ao encontrar os pedidos')
    } else {
      setOrders(data)
    }
  }

  useEffect(() => {
    if (!session || !session.user || !session.user?.email || !session.user?.name) {
      router.push('/signin')
    }
    fetchOrders()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList>
          <TabsTrigger value="orders">
            <User className="mr-2" size={16} />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2" size={16} />
            Configurações
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <h2 className="text-2xl font-semibold mb-4">Seus pedidos</h2>
          {orders.length === 0 ? (
            <p>Você não realizou compras ainda.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div key={order.id} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <span>
                      <strong>Número do pedido:</strong> {order.id}
                    </span>
                    <span>
                      <strong>Status:</strong> {order.status}
                    </span>
                  </div>
                  <div>
                    <strong>Valor total:</strong> R${(order.total / 100).toFixed(2)}
                  </div>
                  <div>
                    <strong>Date:</strong>{' '}
                    {new Date(order.created).toLocaleDateString()}
                  </div>
                  {/* Include more order details if needed */}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="settings">
          {/* Settings Tab Content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MeusPedidos
