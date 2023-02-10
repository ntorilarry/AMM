import React, { useState, useEffect } from "react"
import axios from "axios";
import { Bar } from "react-chartjs-2"

const ChartBar = () => {
	const [data, setData] = useState([]);
	const [successData, setSuccessData] = useState([]);
	const [pendingData, setPendingData] = useState([]);
	const [failedData, setFailedData] = useState([]);
	const [loading, setLoading] = useState(true);

	const get_chart_data = () => {
		const success_months = (data.month_data_successful).map((item) => item.month)
		const pending_months = (data.month_data_pending).map((item) => item.month)
		const failed_months = (data.month_data_failed).map((item) => item.month)
		console.log(success_months)
		console.log(pending_months)
		console.log(failed_months)
		const success_info = []
		const pending_info = []
		const failed_info = []
		for(let i=1; i<=12; i++) {
			if(success_months.includes(i)){
				for (let info of data.month_data_successful) {
					if(info.month == i){
						success_info.push(info.count)
						break
					}		
				};
			}else{
				success_info.push(0)	
			}

			if(pending_months.includes(i)){
				for (let info of data.month_data_pending) {
					if(info.month == i){
						pending_info.push(info.count)
						break
					}		
				};
			}else{
				pending_info.push(0)	
			}
			

			if(failed_months.includes(i)){
				for (let info of data.month_data_failed) {
					if(info.month == i){
						failed_info.push(info.count)
						break
					}		
				}
			}else{
				failed_info.push(0)		
			}
		}
		setSuccessData(success_info)
		setPendingData(pending_info);
		setFailedData(failed_info)
	};

	const barChartData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
		  {
			data: successData,
			label: "Successful",
			borderColor: "#00cc00",
			backgroundColor: "#00cc00",
			// barThickness: 25,
			fill: true
		  },
		  {
			data: pendingData,
			label: "Pending",
			borderColor: "#e6e600",
			backgroundColor: "#e6e600",
			// barThickness: 25,
			fill: true
		  },
		  {
			data: failedData,
			label: "Failed",
			borderColor: "#e62e00",
			backgroundColor: "#e62e00",
			// barThickness: 25,
			fill: true
		  }
		]
	};

	const fetchData = async () => {
		try {
			const { data: response } = await axios.get(
			"http://127.0.0.1:3000/api/v1/dashboard",
			{
				headers: {
					"Content-Type": "application/json",
					"X-Channel": "portal",
					"X-Portal-ApiKey": "61fd0c77d18af8f78b94b21a"
				},
			}
			);
			console.log(response);
			setData(response.data);
		} catch (error) {
			console.error(error.message);
			}
	};

	useEffect(() => {
		setLoading(true);
		fetchData();
		setTimeout(() => {
			get_chart_data()
			setLoading(false);
		}, 5000)
		
	}, []);

	

	return (
		<div className='w-full'>
			{loading && <div>Loading</div>}
			{!loading && (
				<Bar
				type="bar"
				width={130}
				height={150}
				options={{
				  title: {
					display: true,
					text: "Transaction history",
					fontSize: 15
				  },
				  legend: {
					display: true, //Is the legend shown?
					position: "top" //Position of the legend.
				  }
				}}
				data={barChartData}
			  />)}
		</div>
	)
}

export default ChartBar
