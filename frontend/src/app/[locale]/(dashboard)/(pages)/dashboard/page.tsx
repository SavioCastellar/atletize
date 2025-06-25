'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, XAxis, YAxis, Bar, Line, BarChart, LineChart, Tooltip, Legend } from "recharts"
import { Activity, Users, Eye, MousePointer } from "lucide-react"

// Types for the dashboard data
interface DashboardData {
  summary: {
    pageViews: {
      total: number
      percentChange: string
    }
    activeUsers: {
      total: number
      percentChange: string
    }
    clickRate: {
      rate: string
      percentChange: string
    }
    activeSessions: {
      total: number
      percentChange: string
    }
  }
  charts: {
    pageViews: Array<{
      name: string
      views: number
    }>
    userActivity: Array<{
      name: string
      active: number
      new: number
    }>
  }
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/analytics')

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        setError('Could not load dashboard data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <h1 className='text-4xl font-normal text-zinc-900'>Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <h1 className='text-4xl font-normal text-zinc-900'>Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading dashboard data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-4xl font-normal text-zinc-900'>Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Acessos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.summary.pageViews.total.toLocaleString()}</div>
            <p className={`text-xs ${parseFloat(dashboardData.summary.pageViews.percentChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(dashboardData.summary.pageViews.percentChange) >= 0 ? '+' : ''}
              {dashboardData.summary.pageViews.percentChange}% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.summary.activeUsers.total.toLocaleString()}</div>
            <p className={`text-xs ${parseFloat(dashboardData.summary.activeUsers.percentChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(dashboardData.summary.activeUsers.percentChange) >= 0 ? '+' : ''}
              {dashboardData.summary.activeUsers.percentChange}% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.summary.clickRate.rate}%</div>
            <p className={`text-xs ${parseFloat(dashboardData.summary.clickRate.percentChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(dashboardData.summary.clickRate.percentChange) >= 0 ? '+' : ''}
              {dashboardData.summary.clickRate.percentChange}% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.summary.activeSessions.total.toLocaleString()}</div>
            <p className={`text-xs ${parseFloat(dashboardData.summary.activeSessions.percentChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(dashboardData.summary.activeSessions.percentChange) >= 0 ? '+' : ''}
              {dashboardData.summary.activeSessions.percentChange}% do último mês
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className='font-normal text-xl'>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.charts.pageViews}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className='font-normal text-xl'>Atividade de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.charts.userActivity}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="hsl(var(--primary))" />
                <Bar dataKey="new" fill="hsl(var(--primary-foreground))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
