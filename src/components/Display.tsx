type DisplayProps = {
	value: string;
	memory: string;
};
export default function Display({ value, memory }: DisplayProps) {
	return (
		<div className="screen">
			<p className="memory">{memory}</p>
			<p id="display" className="display">
				{value}
			</p>
		</div>
	);
}
