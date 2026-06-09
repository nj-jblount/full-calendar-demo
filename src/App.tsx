// import { useState } from "react";
import { Calendar } from "./components/calendar/index.ts";

function App() {
	// const [calendarView, setCalendarView] = useState([]);

	return (
		<div className="flex h-screen p-5 box-border">
			<div className="flex-1 min-w-0 h-full">
				<Calendar />
			</div>
		</div>
	);
}

export default App;
