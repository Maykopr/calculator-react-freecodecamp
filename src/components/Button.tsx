type ButtonProps = {
	type: string;
	id: string;
	label: string;
	callback: () => void;
};
export default function Button({ type, id, label, callback }: ButtonProps) {
	return (
		<button className={`btn ${type}`} id={id} onClick={callback}>
			{label}
		</button>
	);
}
