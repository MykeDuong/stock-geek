import type { NextComponentType } from 'next'
import { useRef, useEffect, useState } from 'react'
import type { BarPrice } from 'lightweight-charts';
import { createChart, ColorType } from 'lightweight-charts'
import { trpc } from '../../utils/trpc';

const colors = {
	backgroundColor: 'transparent',
	lineColor: '#395144',
	SPLineColor: '#941D1D',
	textColor: 'black',
	areaTopColor: 'transparent',
	areaBottomColor: 'transparent',
}

interface HistoricalDataInterface {
	time: Date;
	value: number;
}

const PortfolioPerformanceChart: NextComponentType = () => {

	// States
	const [portfolioData, setPortfolioData] = useState<HistoricalDataInterface[]>([]);
	const [SPFiveHundredData, setSPFiveHundredData] = useState<HistoricalDataInterface[]>([]);

	const [portfolioAvailable, setPortfolioAvailable] = useState(false)
	const [dataAvailable, setDataAvailable] = useState(false)

	// Queries/Mutations
		
	const SPFiveHundredQuery = trpc.ticker.getSPFiveHundred.useQuery({ startingPoint: portfolioData[0] ? portfolioData[0].time : new Date() }, {
		enabled: portfolioAvailable,
		onSuccess: (data) => {
			setSPFiveHundredData(data);
		}
	})

	trpc.portfolio.getTimeSeriesValues.useQuery(undefined, {
		onSuccess: (data) => {
			setPortfolioData(data.map(row => ({
				time: row.date,
				value: row.value
			})))
		}
	})

	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (portfolioData.length === 0) return
		setPortfolioAvailable(true)
	}, [portfolioData])

	useEffect(() => {
		if (SPFiveHundredData.length === 0) return
		setDataAvailable(true)
	}, [SPFiveHundredData])

	useEffect(() => {
		if (!container.current || !dataAvailable) return;

		const chart = createChart(container.current, {
			layout: {
				background: { type: ColorType.Solid, color: colors.backgroundColor },
				textColor: colors.textColor,
			},
			rightPriceScale: {
				scaleMargins: {
					top: 0.3, // leave some space for the legend
					bottom: 0.25,
				},
			},
			crosshair: {
				// hide the horizontal crosshair line
				horzLine: {
					visible: false,
					labelVisible: false,
				},
			},
			// hide the grid lines
			grid: {
				vertLines: {
					visible: false,
				},
				horzLines: {
					visible: false,
				},
			},
			width: container.current.clientWidth,
			height: container.current.clientHeight,
		});

		chart.timeScale().fitContent();

		const portfolioSeries = chart.addAreaSeries({ 
			lineColor: colors.lineColor, 
			topColor: colors.areaTopColor, 
			bottomColor: colors.areaBottomColor 
		});
		portfolioSeries.setData(portfolioData.map(row => {
			return {
				...row,
				time: row.time.toLocaleDateString('en-US', { timeZone: 'America/New_York' }),
			}
		}));

		const SPSeries = chart.addAreaSeries({ 
			lineColor: colors.SPLineColor, 
			topColor: colors.areaTopColor, 
			bottomColor: colors.areaBottomColor 
		});
		SPSeries.setData(SPFiveHundredData.map(row => {
			return {
				value: row.value / SPFiveHundredData[0]!.value * 10000,
				time: row.time.toLocaleDateString('en-US', { timeZone: 'America/New_York' }),
			}
		}));

		const handleResize = () => {
			if (!container.current) return;
			chart.applyOptions({ 
				width: container.current.clientWidth,
				height: container.current.clientHeight
			});
		}
		
		const portfolioLegend = 'Portfolio Performance:';
		const SPLegend = "S&P 500 Performance:";

		const legend = document.createElement('div');
		legend.className = `absolute left-[12px] top-[12px] z-10 text-lg font-raleway`;
		container.current.appendChild(legend);
		
		const firstRow = document.createElement('div');
		firstRow.innerHTML = portfolioLegend;
		firstRow.className = 'text-green-700';
		legend.appendChild(firstRow);

		const secondRow = document.createElement('div');
		secondRow.innerHTML = SPLegend;
		secondRow.className = 'text-red-700';
		legend.appendChild(secondRow);

		chart.subscribeCrosshairMove(param => {
			let portfolioValueFormatted = '';
			let SPValueFormatted = '';
			if (param.time) {
				const portfolioValue = param.seriesPrices.get(portfolioSeries);
				portfolioValueFormatted = (portfolioValue as BarPrice)?.toFixed(2);

				const SPValue = param.seriesPrices.get(SPSeries);
				SPValueFormatted = (SPValue as BarPrice)?.toFixed(2);
			}
			// legend is a html element which has already been created
			firstRow.innerHTML = `${portfolioLegend} <strong>${portfolioValueFormatted}</strong>`;
			secondRow.innerHTML = `${SPLegend} <strong>${SPValueFormatted}</strong>`;
		});

		window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
	}, [dataAvailable])

	return (
		<div
			className="h-full w-full relative"
			ref={container}
		/>
	)
};

export default PortfolioPerformanceChart