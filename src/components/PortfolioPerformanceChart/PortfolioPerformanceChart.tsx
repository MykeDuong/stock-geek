import type { NextComponentType } from 'next'
import { useRef, useEffect } from 'react'
import { createChart } from 'lightweight-charts'

const PortfolioPerformanceChart: NextComponentType = () => {

  const chartContainer = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!chartContainer.current) return;
      
    const chart = createChart(chartContainer.current)
  
    const portfolioSeries = chart.addBaselineSeries();
  }, [])



  return (
    <div>
      <div
        className=""
        ref={chartContainer}
      >

      </div>
    </div>
  )
}

export default PortfolioPerformanceChart