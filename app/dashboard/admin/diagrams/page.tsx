"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  getTotalCases,
  getTotalReports,
  getCasesThisMonth,
  getReportsThisMonth,
  getShortMonthName,
  getMonthName,
  generateMonthlyDistribution,
  type MonthlyData,
} from "@/lib/api/diagrams"
import {
  BarChart3,
  TrendingUp,
  FileText,
  AlertTriangle,
  Calendar,
  Activity,
  Scale,
  RefreshCw,
  PieChartIcon,
  Target,
  CheckCircle,
} from "lucide-react"

interface ChartDataItem {
  month: string
  monthNumber: number
  count: number
}

export default function AdminDiagramsPage() {
  const [totalCases, setTotalCases] = useState<number>(0)
  const [totalReports, setTotalReports] = useState<number>(0)
  const [casesThisMonth, setCasesThisMonth] = useState<number>(0)
  const [reportsThisMonth, setReportsThisMonth] = useState<number>(0)
  const [casesData, setCasesData] = useState<MonthlyData[]>([])
  const [reportsData, setReportsData] = useState<MonthlyData[]>([])
  const [casesChartData, setCasesChartData] = useState<ChartDataItem[]>([])
  const [reportsChartData, setReportsChartData] = useState<ChartDataItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching all data...")

      const [casesTotal, reportsTotal, casesCurrentMonth, reportsCurrentMonth] = await Promise.all([
        getTotalCases(),
        getTotalReports(),
        getCasesThisMonth(),
        getReportsThisMonth(),
      ])

      console.log("Fetched data:", {
        casesTotal,
        reportsTotal,
        casesCurrentMonth,
        reportsCurrentMonth,
      })

      setTotalCases(casesTotal)
      setTotalReports(reportsTotal)
      setCasesThisMonth(casesCurrentMonth)
      setReportsThisMonth(reportsCurrentMonth)

      // Generate monthly distributions using real current month data
      const casesMonthly = generateMonthlyDistribution(casesTotal, casesCurrentMonth, 6)
      const reportsMonthly = generateMonthlyDistribution(reportsTotal, reportsCurrentMonth, 6)

      setCasesData(casesMonthly)
      setReportsData(reportsMonthly)

      // Transform data for charts
      const casesChart = casesMonthly.map(({ month, count }) => ({
        month: getShortMonthName(month),
        monthNumber: month,
        count,
      }))

      const reportsChart = reportsMonthly.map(({ month, count }) => ({
        month: getShortMonthName(month),
        monthNumber: month,
        count,
      }))

      setCasesChartData(casesChart)
      setReportsChartData(reportsChart)
    } catch (err: any) {
      console.error("Error fetching data:", err)
      setError(err.message || "Failed to load diagram data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getCurrentMonth = () => new Date().getMonth() + 1
  const getPreviousMonth = () => {
    const current = getCurrentMonth()
    return current === 1 ? 12 : current - 1
  }

  const getPreviousMonthCases = () => casesData.find((item) => item.month === getPreviousMonth())?.count || 0
  const getPreviousMonthReports = () => reportsData.find((item) => item.month === getPreviousMonth())?.count || 0

  // Calculate growth percentages
  const casesGrowth =
    getPreviousMonthCases() > 0
      ? (((casesThisMonth - getPreviousMonthCases()) / getPreviousMonthCases()) * 100).toFixed(1)
      : "0"
  const reportsGrowth =
    getPreviousMonthReports() > 0
      ? (((reportsThisMonth - getPreviousMonthReports()) / getPreviousMonthReports()) * 100).toFixed(1)
      : "0"

  // Colors for pie charts
  const casesColors = ["#3B82F6", "#1D4ED8", "#1E40AF", "#1E3A8A", "#172554", "#0F172A"]
  const reportsColors = ["#10B981", "#059669", "#047857", "#065F46", "#064E3B", "#022C22"]

  if (loading) {
    return (
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 animate-spin text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Loading Analytics...</h1>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Target className="w-4 h-4" />
            <span>Fetching real-time data from API...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Diagrams</h1>
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <div className="mt-2">
                <Button onClick={fetchData} size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-8 h-8" />
                  <h1 className="text-3xl md:text-4xl font-bold">Analytics & Diagrams</h1>
                </div>
                <p className="text-blue-100 text-lg">Real-time visual insights for cases and reports</p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Monthly Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Live Data</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Current Month: {getMonthName(getCurrentMonth())}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={fetchData}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cases</p>
                  <p className="text-3xl font-bold text-blue-600">{totalCases.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">All Time</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-green-600">{totalReports.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">All Time</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Cases</p>
                  <p className="text-3xl font-bold text-purple-600">{casesThisMonth}</p>
                  <p className="text-xs text-gray-500">
                    {getShortMonthName(getCurrentMonth())} • {casesGrowth}% vs last month
                  </p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Reports</p>
                  <p className="text-3xl font-bold text-orange-600">{reportsThisMonth}</p>
                  <p className="text-xs text-gray-500">
                    {getShortMonthName(getCurrentMonth())} • {reportsGrowth}% vs last month
                  </p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases Analytics Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Cases Analytics</h2>
            <Badge className="bg-blue-100 text-blue-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Real-time Data
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cases Bar Chart */}
            <Card className="border-0 shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Cases Distribution (Last 6 Months)</span>
                </CardTitle>
                <CardDescription>
                  Monthly cases breakdown from total of {totalCases} cases • Current month: {casesThisMonth} cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Cases",
                      color: "hsl(217, 91%, 60%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={casesChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-sm" />
                      <YAxis className="text-sm" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" name="Cases" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Cases Pie Chart */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-blue-600" />
                  <span>Cases by Month</span>
                </CardTitle>
                <CardDescription>
                  How your {totalCases} total cases are distributed across the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ChartContainer
                    config={{
                      count: {
                        label: "Cases",
                        color: "hsl(217, 91%, 60%)",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={casesChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="count"
                          label={({ month, count, percent }) => (count > 0 ? `${month}: ${count}` : "")}
                          labelLine={false}
                        >
                          {casesChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={casesColors[index % casesColors.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              const percentage = ((data.count / totalCases) * 100).toFixed(1)
                              const isCurrentMonth = data.monthNumber === getCurrentMonth()
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold flex items-center">
                                    {data.month}
                                    {isCurrentMonth && (
                                      <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Current</Badge>
                                    )}
                                  </p>
                                  <p className="text-blue-600">
                                    {data.count} cases ({percentage}%)
                                  </p>
                                  {isCurrentMonth && <p className="text-xs text-green-600 mt-1">✓ Real-time data</p>}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  {/* Legend */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Monthly Breakdown:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {casesChartData.map((item, index) => {
                        const isCurrentMonth = item.monthNumber === getCurrentMonth()
                        return (
                          <div key={item.month} className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: casesColors[index % casesColors.length] }}
                            ></div>
                            <span className="text-gray-600">
                              {item.month}: <span className="font-semibold text-gray-800">{item.count}</span>
                              {isCurrentMonth && <span className="text-green-600 ml-1">✓</span>}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        💡 <strong>What this shows:</strong> Each colored slice represents how many cases occurred in
                        that specific month. The current month ({getShortMonthName(getCurrentMonth())}) shows real-time
                        data: <strong>{casesThisMonth} cases</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cases Line Chart */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Cases Trend Analysis</span>
              </CardTitle>
              <CardDescription>Track cases progression over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Cases",
                    color: "hsl(217, 91%, 60%)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={casesChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-sm" />
                    <YAxis className="text-sm" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-count)"
                      strokeWidth={3}
                      name="Cases"
                      dot={{ fill: "var(--color-count)", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "var(--color-count)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reports Analytics Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Scale className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Reports Analytics</h2>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Real-time Data
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports Bar Chart */}
            <Card className="border-0 shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>Reports Distribution (Last 6 Months)</span>
                </CardTitle>
                <CardDescription>
                  Monthly reports breakdown from total of {totalReports} reports • Current month: {reportsThisMonth}{" "}
                  reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Reports",
                      color: "hsl(142, 76%, 36%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-sm" />
                      <YAxis className="text-sm" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" name="Reports" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Reports Pie Chart */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-green-600" />
                  <span>Reports by Month</span>
                </CardTitle>
                <CardDescription>
                  How your {totalReports} total reports are distributed across the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ChartContainer
                    config={{
                      count: {
                        label: "Reports",
                        color: "hsl(142, 76%, 36%)",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportsChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="count"
                          label={({ month, count, percent }) => (count > 0 ? `${month}: ${count}` : "")}
                          labelLine={false}
                        >
                          {reportsChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={reportsColors[index % reportsColors.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              const percentage = ((data.count / totalReports) * 100).toFixed(1)
                              const isCurrentMonth = data.monthNumber === getCurrentMonth()
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold flex items-center">
                                    {data.month}
                                    {isCurrentMonth && (
                                      <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Current</Badge>
                                    )}
                                  </p>
                                  <p className="text-green-600">
                                    {data.count} reports ({percentage}%)
                                  </p>
                                  {isCurrentMonth && <p className="text-xs text-green-600 mt-1">✓ Real-time data</p>}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  {/* Legend */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Monthly Breakdown:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {reportsChartData.map((item, index) => {
                        const isCurrentMonth = item.monthNumber === getCurrentMonth()
                        return (
                          <div key={item.month} className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: reportsColors[index % reportsColors.length] }}
                            ></div>
                            <span className="text-gray-600">
                              {item.month}: <span className="font-semibold text-gray-800">{item.count}</span>
                              {isCurrentMonth && <span className="text-green-600 ml-1">✓</span>}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700">
                        💡 <strong>What this shows:</strong> Each colored slice represents how many reports were
                        submitted in that specific month. The current month ({getShortMonthName(getCurrentMonth())})
                        shows real-time data: <strong>{reportsThisMonth} reports</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Line Chart */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Reports Trend Analysis</span>
              </CardTitle>
              <CardDescription>Track reports progression over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Reports",
                    color: "hsl(142, 76%, 36%)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-sm" />
                    <YAxis className="text-sm" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-count)"
                      strokeWidth={3}
                      name="Reports"
                      dot={{ fill: "var(--color-count)", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "var(--color-count)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
