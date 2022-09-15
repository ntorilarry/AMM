import React, { useState, useEffect } from "react"
import { Chart } from "chart.js"
import { Doughnut } from "react-chartjs-2"

const ChartDoughnut = () => {
	const [chartData, setchartData] = useState({})
	const chart = () => {
		setchartData({
			labels: ["Process", "in Process"],
			datasets: [
				{
					labels: "Date of Week",
					data: [75, 25],
					backgroundColor: ["#0177FB", "#F3F2F2"],
					borderRadius: [20, 0],
				},
			],
		})
	}

	useEffect(() => {
		chart()
	}, [])

	return (
		<Doughnut
			className='text-center w-full'
			data={chartData}
			options={{
				maintainAspectRatio: false,
				responsive: true,
				responsiveAnimationDuration: 2,
				cutoutPercentage: 65,
				elements: {
					arc: {},
				},
				legend: {
					labels: {
						usePointStyle: true,
						boxWidth: 6,
					},
					align: "center",
					position: "bottom",
				},
				tooltips: {
					mode: "index",
					intersect: false,
				},
			}}
		/>
	)
}

export default ChartDoughnut
