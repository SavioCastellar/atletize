'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface YearRangePickerProps {
  startYear: string
  endYear: string
  onStartYearChange: (year: string) => void
  onEndYearChange: (year: string) => void
}

export const YearRangePicker: React.FC<YearRangePickerProps> = ({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
}) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  )

  // Parse startYear and handle invalid values
  const startYearValue = parseInt(startYear, 10)
  const isValidStartYear = !isNaN(startYearValue)

  return (
    <div className="flex items-center gap-2">
      <Select value={startYear} onValueChange={onStartYearChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Ano de início" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-xl">-</span>
      <Select
        value={endYear}
        onValueChange={onEndYearChange}
        disabled={!isValidStartYear}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Ano de fim" />
        </SelectTrigger>
        <SelectContent>
          {years
            .filter((year) => !isValidStartYear || year >= startYearValue)
            .map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
