// Ensure combineMonthlyData is defined as follows:
const combineMonthlyData = (cases: MonthlyData[], reports: MonthlyData[]): ChartData[] => {
  const monthsMap = new Map<number, ChartData>()

  cases.forEach(({ month, count }) => {
    monthsMap.set(month, {
      month: getMonthName(month),
      monthNumber: month,
      cases: count,
      reports: 0,
    })
  })

  reports.forEach(({ month, count }) => {
    const existing = monthsMap.get(month)
    if (existing) {
      existing.reports = count
    } else {
      monthsMap.set(month, {
        month: getMonthName(month),
        monthNumber: month,
        cases: 0,
        reports: count,
      })
    }
  })

  return Array.from(monthsMap.values()).sort((a, b) => a.monthNumber - b.monthNumber)
}

// Correct usage:
const combinedData = combineMonthlyData(casesResponse, reportsResponse)
setChartData(combinedData) // ✅ This is correct