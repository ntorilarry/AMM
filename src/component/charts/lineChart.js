import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { activitiesData } from "../data/chartData"

const ChartLine = () => {
	const [chartdata, setchartdata] = useState({})
	const chart = () => {
		setchartdata({
			labels: activitiesData.map((item) => item.day),
			datasets: [
				{
					label: "Theory",
					data: activitiesData.map((item) => item.theoryData),
					tension: 0.5,
					fill: false,
					borderColor: "#269AFF",
					pointBackgroundColor: "#0A0BEB",
					pointBorderColor: "#FAFFFF",
					pointBorderWidth: 1,
					pointRadius: 4,
					borderWidth: 2,
					backgroundColor: ["transparent"],
				},
				{
					label: "Practice",
					data: activitiesData.map((item) => item.practiceData),
					tension: 0.3,
					borderColor: "#F5A840",
					pointBackgroundColor: "#FFA824",
					pointBorderColor: "#FAFFFF",
					pointBorderWidth: 1,
					pointRadius: 4,
					borderWidth: 2,
					backgroundColor: ["transparent"],
				},
			],
		})
	}

	useEffect(() => {
		chart()
	}, [])

	return (
		<div className='h-[300px]'>
			<Line
				data={chartdata}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					responsiveAnimationDuration: 2,
					legend: {
						labels: {
							usePointStyle: true,
							boxWidth: 6,
						},
						align: "end",
						position: "bottom",
					},
					tooltips: {
						mode: "index",
						intersect: false,
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: true,
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
									max: 60,
									stepSize: 15,
									callback: function (value, index, ticks) {
										return value + " Hr"
									},
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

export default ChartLine
