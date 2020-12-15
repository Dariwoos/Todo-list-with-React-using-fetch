import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import DeletButton from "./DeletButton.jsx";
//create your first component
export function Home() {
	const [task, setTask] = useState([]);

	useEffect(() => {
		getTasks();
	}, []);

	const handelDown = e => {
		if (e.keyCode == 13 && e.target.value != "") {
			e.preventDefault();
			let emptyList = [...task, { label: e.target.value, done: false }];
			e.target.value = "";
			putTask(emptyList);
			setTask(emptyList);
		} /* la funcion handelDown : cuando das al ENTER se crea una nueva Task y se vacia
         el PlaceHolder sin que tener a recargar la pagina. empryList es la donde guardamos el data que nos viene de la lista Task con useState.
         ...task: con estos 3 puntos se guarda la lista. y el value va hacia la nueva lista 
        */
	};
	async function getTasks() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};
		try {
			let res = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Moha",
				requestOptions
			);
			let result = await res.json();
			//console.log("GET Result", result);
			//setTask(result.obj);
			setTask(result);
		} catch (error) {
			console.log("error", error);
		}
	}
	async function putTask(allTasks) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(allTasks);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		try {
			let res = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Moha",
				requestOptions
			);
			let result = await res.text();
			//console.log("GET Result", result);
			// setTask(result);
		} catch (error) {
			console.log("error", error);
		}
	}

	const deleteLine = id => {
		let emptyList = [...task];
		emptyList.splice(id, 1);
		putTask(emptyList);
		setTask(emptyList);
	}; /*la funcion de deleteLine : para poder borrar a un Task.
        emptyList esta donde guardabamos las Tasks y para poder borrar las Task hay que llamarla, obvio :3
        con .splice se borra un iteam de una lista es una funcion de las arrays.
        */
	return (
		<div className="text-center mt-5">
			<h1>What you have to do today?</h1>
			<div className="taskBody">
				<form>
					<input
						className="input"
						type="text"
						placeholder="Your task here"
						onKeyDown={handelDown}
					/>
				</form>
			</div>
			{task.map((todo, index) => {
				return (
					<DeletButton
						key={index}
						todo={todo.label}
						id={index}
						deleteLine={deleteLine}
					/>
				);
			})}
			<h4>You have {task.length} task.</h4>
		</div>
	);
}
export default Home;
