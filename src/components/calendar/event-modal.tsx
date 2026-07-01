import type { EventClickArg } from "@fullcalendar/core";
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";

type Props = {
	args: EventClickArg | null;
	toggleEventModal: boolean;
	setToggleEventModal: (arg: boolean) => void;
};

export default function EventModal({
	args,
	toggleEventModal,
	setToggleEventModal,
}: Props) {
	return (
		<>
			<Dialog
				open={toggleEventModal}
				onClose={() => setToggleEventModal(false)}
				className="relative z-[10000]"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="max-w-3xl space-y-4 border bg-white p-12 rounded-lg shadow-xl">
						<DialogTitle className="font-bold">
							Event Details Example
						</DialogTitle>
						<Description>
							This is an example of what we can achieve if we click on an event
						</Description>
						<p>You've clicked on the event for {args?.event.title}</p>
						<p>We could display any event data we wanted here. Cool.</p>
						<div className="flex gap-4">
							<button onClick={() => setToggleEventModal(false)}>Close</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
