import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { type EventClickArg, type EventContentArg } from "@fullcalendar/core";
import EventModal from "./event-modal";

import { tailNumbers, events } from "../../data";
import { useState } from "react";

const fmt = (d: Date) =>
	d.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

function renderEventContent(arg: EventContentArg) {
	const { subtype, airportIcao, mxEventType, departureIcao, arrivalIcao } =
		arg.event.extendedProps;
	const start = arg.event.start ? fmt(arg.event.start) : "";
	const end = arg.event.end ? fmt(arg.event.end) : "";
	return (
		<div className="px-1 text-xs text-white flex flex-col justify-center h-full overflow-hidden">
			<span className="font-medium truncate">{arg.event.title}</span>
			{subtype === "flight" && departureIcao && (
				<>
					<span className="opacity-80 truncate">
						{departureIcao} → {arrivalIcao}
					</span>
					<span className="opacity-80 truncate">
						{start} - {end}
					</span>
				</>
			)}
			{subtype === "maintenance" && (
				<>
					<span className="opacity-80 truncate">{airportIcao}</span>
					<span className="opacity-80 truncate">{mxEventType}</span>
				</>
			)}
		</div>
	);
}

export const Calendar = () => {
	const [toggleEventModal, setToggleEventModal] = useState<boolean>(false);
	const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(
		null
	);

	return (
		<>
			<FullCalendar
				schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
				plugins={[resourceTimelinePlugin]}
				initialView="resourceTimelineMonth"
				height="100%"
				headerToolbar={{
					start: "title",
					center:
						"resourceTimelineDay resourceTimelineWeek resourceTimelineMonth",
					end: "today prev,next",
				}}
				slotLabelFormat={{
					day: "numeric",
					weekday: "short",
				}}
				views={{
					resourceTimelineDay: {
						slotDuration: "01:00:00",
						slotLabelFormat: {
							hour: "numeric",
							minute: "2-digit",
							omitZeroMinute: true,
							meridiem: "short",
						},
					},
				}}
				resourceAreaHeaderContent="Aircraft"
				resources={tailNumbers}
				events={events}
				eventContent={renderEventContent}
				eventMaxStack={5}
				eventClick={(args) => {
					setSelectedEvent(args);
					setToggleEventModal(true);
				}}
			/>
			<EventModal
				args={selectedEvent}
				toggleEventModal={toggleEventModal}
				setToggleEventModal={setToggleEventModal}
			/>
		</>
	);
};
