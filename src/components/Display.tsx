export default function Display({ value, memory }) {
      return (
            <div className="screen">
                  <p className="memory">{memory}</p>
                  <p id="display" className="display">
                        {value}
                  </p>
            </div>
      );
}
