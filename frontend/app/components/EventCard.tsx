"use client";

import { useState } from "react";
import LeadModal from "./LeadModal";
import { MapPin, Calendar, Ticket } from "lucide-react";

export default function EventCard({ event }: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border overflow-hidden h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-40 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-light text-primary">📅</div>
                        <p className="text-sm text-muted-foreground mt-2">Event</p>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-4 line-clamp-2">
                        {event.title}
                    </h3>

                    <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{event.dateTime}</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{event.venue}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <Ticket className="w-4 h-4" />
                        Get Tickets
                    </button>
                </div>
            </div>

            {open && (
                <LeadModal
                    eventId={event._id}
                    redirectUrl={event.sourceUrl}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
