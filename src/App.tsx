import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Display from "./components/Display";

function App() {
	const [valueScreen, setValueScreen] = useState("0");
	const [memory, setMemory] = useState("");
	const [operationIsFinished, setOperationIsFinished] = useState(false);
	const regexOperators = /[-+*/]/;
	const lastDigit = valueScreen[valueScreen.length - 1];

	const addOperator = (operator: string) => {
		if (operationIsFinished) {
			setOperationIsFinished(false);
			setMemory(valueScreen);
		}
		if (valueScreen === "") {
			return setValueScreen("0" + operator);
		}
		if (regexOperators.test(lastDigit)) {
			const operation = valueScreen.substring(0, valueScreen.length - 1);
			return setValueScreen(operation + operator);
		}
		setValueScreen((actualValue) => actualValue + operator);
	};

	const addDigit = (digit: string) => {
		if (valueScreen.length >= 10) {
			return;
		}
		if (operationIsFinished) {
			setMemory(valueScreen);
			setValueScreen(digit);
			return setOperationIsFinished(false);
		}
		if (valueScreen === "0") {
			return setValueScreen(digit);
		}
		setValueScreen((actualValue) => actualValue + digit);
	};

	const addDecimal = () => {
		const factors = valueScreen.split(regexOperators);
		const lastFactor = factors[factors.length - 1];
		if (lastFactor.includes(".")) {
			return;
		}
		if (regexOperators.test(lastDigit)) {
			return setValueScreen((actualValue) => actualValue + "0.");
		}
		if (operationIsFinished || valueScreen === "") {
			return setValueScreen("0.");
		}
		setValueScreen((actualValue) => actualValue + ".");
	};

	const clear = () => {
		setOperationIsFinished(false);
		setValueScreen("0");
		if (valueScreen === "0") {
			setMemory("");
		}
	};

	const backSpace = () => {
		if (valueScreen.length > 0) {
			setValueScreen((value) => value.substring(0, value.length - 1));
			setOperationIsFinished(false);
		}
	};

	const equals = () => {
		try {
			const result = eval(valueScreen);
			setValueScreen(filterOutput(result.toString()));
			setOperationIsFinished(true);
		} catch {
			setMemory("ERRO");
		}
	};

	const filterOutput = (output: string): string => {
		if (output.length > 10) {
			return output.substring(0, 10);
		}
		return output;
	};

	return (
		<div className="App">
			<Display value={valueScreen} memory={memory} />
			<div className="buttons">
				<Button type="btn--primary" label="AC" id="clear" callback={clear} />
				<Button type="btn--primary" label="⌫" id="backSpace" callback={backSpace} />
				<Button type="btn--primary" label="(" id="left-parenthesis" callback={() => addDigit("(")} />
				<Button type="btn--primary" label=")" id="right-parenthesis" callback={() => addDigit(")")} />
				<Button type="btn--secondary" label="7" id="7" callback={() => addDigit("7")} />
				<Button type="btn--secondary" label="8" id="8" callback={() => addDigit("8")} />
				<Button type="btn--secondary" label="9" id="9" callback={() => addDigit("9")} />
				<Button type="btn--primary" label="/" id="divide" callback={() => addOperator("/")} />
				<Button type="btn--secondary" label="4" id="4" callback={() => addDigit("4")} />
				<Button type="btn--secondary" label="5" id="5" callback={() => addDigit("5")} />
				<Button type="btn--secondary" label="6" id="6" callback={() => addDigit("6")} />
				<Button type="btn--primary" label="x" id="multiply" callback={() => addOperator("*")} />
				<Button type="btn--secondary" label="1" id="1" callback={() => addDigit("1")} />
				<Button type="btn--secondary" label="2" id="2" callback={() => addDigit("2")} />
				<Button type="btn--secondary" label="3" id="3" callback={() => addDigit("3")} />
				<Button type="btn--primary" label="-" id="subtract" callback={() => addOperator("-")} />
				<Button type="btn--secondary" label="0" id="0" callback={() => addDigit("0")} />
				<Button type="btn--secondary" label="." id="decimal" callback={addDecimal} />
				<Button type="btn--primary" label="=" id="equal" callback={equals} />
				<Button type="btn--primary" label="+" id="add" callback={() => addOperator("+")} />
			</div>
		</div>
	);
}

export default App;
