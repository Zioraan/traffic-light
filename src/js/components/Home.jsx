import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [colors, setColors] = useState(["red", "yellow", "green"]);
	const [purpleActive, setPurpleActive] = useState(false);
	const [current, setCurrent] = useState(colors[0]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [timerActive, setTimerActive] = useState(false);
	const [timer, setTimer] = useState(0);

	const updatePurple = () => {
		if(!purpleActive) {
			setColors([...colors, "purple"])
		}
		else {
			if (currentIndex === colors.length - 1) {
				setColorDirectly(0)
			}
			setColors(["red", "yellow", "green"])
			
		}
		setPurpleActive(!purpleActive)
		return
	}

	const setColorDirectly = (index) => {
		setCurrentIndex(index);
		setCurrent(colors[index])
		return
	}

	useEffect(() => {
		let interval;

		if (timerActive) {
			interval = setInterval(() => {
				setTimer((prevTimer) => {
					const newTimer = prevTimer + 1;
					if (newTimer % 5 === 0) {
						const nextIndex = currentIndex === colors.length - 1 ? 0 : currentIndex + 1;
						setColorDirectly(nextIndex);
					}
					
					return newTimer;
				});
			}, 1000);
		} else {
			setTimer(0);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [timerActive, colors.length, currentIndex])


	return (
		<div className="text-center d-flex flex-column align-items-center">
			<div className="d-flex mt-2">
				<button className="btn btn-danger mx-2" onClick={currentIndex === 0 ? () => setColorDirectly(colors.length - 1) : () => setColorDirectly(currentIndex - 1)}>Previous Color</button>
				<button className="btn btn-primary mx-2" onClick={() => updatePurple()}>{purpleActive ? "Remove Purple Light" : "Add Purple Light"}</button>
				<button className="btn btn-success mx-2" onClick={currentIndex === colors.length - 1 ? () => setColorDirectly(0) : () => setColorDirectly(currentIndex + 1)}>Next Color</button>
				<button className={"btn " + (timerActive ? "btn-danger" : "btn-info")} onClick={() => setTimerActive(!timerActive)}>{timerActive ? "Stop Timer" : "Start Timer"}</button>
			</div>
			<div>
				{timerActive ? <h1>{timer}</h1> : null}
			</div>
			<div className="traffic-light-rod mt-5"></div>
            <div className="traffic-light-box d-flex flex-column align-items-center">
				<div className={"traffic-light red-light " + (current === "red" ? "active-red" : "")} onClick={() => setColorDirectly(0)}></div>
				<div className={"traffic-light yellow-light " + (current === "yellow" ? "active-yellow" : "")} onClick={() => setColorDirectly(1)}></div>
				<div className={"traffic-light green-light " + (current === "green" ? "active-green" : "")} onClick={() => setColorDirectly(2)}></div>
				{purpleActive === true ? <div className={"traffic-light purple-light " + (current === "purple" ? "active-purple" : "")} onClick={() => setColorDirectly(3)}></div> : null}
			</div>	
			
		</div>
	);
};

export default Home;