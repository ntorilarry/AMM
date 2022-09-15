import React, { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { dataStatistics } from "../data/chartData"

const ChartBar = () => {
	const [chartData, setchartData] = useState({})
	const chart = () => {
		setchartData({
			labels: dataStatistics.map((item) => item.year),
			datasets: [
				{
					labels: "Statistic Data",
					data: dataStatistics.map((item) => item.data),
					backgroundColor: "#EFF2FF",
					barThickness: 20,
					hoverBackgroundColor: "#0177FB",
					borderRadius: 2,
				},
			],
		})
	}
	useEffect(() => {
		chart()
	}, [])

	return (
		<div className='w-full'>
			<Bar
				data={chartData}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					responsiveAnimationDuration: 2,
					legend: {
						display: false,
					},
					tooltips: {
						mode: "index",
						intersect: false,
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
									zeroLineColor: "#F3F2F2",
								},
								ticks: {
									beginAtZero: true,
								},
							},
						],
						yAxes: [
							{
								display: true,
								position: "left",
								ticks: {
									beginAtZero: true,
									min: 0,
									max: 800,
									stepSize: 200,
								},
								gridLines: {
									display: false,
									zeroLineColor: "transparent",
								},
							},
						],
					},
				}}
			/>
		</div>
	)
}

export default ChartBar
