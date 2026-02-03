"use client";

import ImportModal from "./ImportModal";
import { useState } from "react";
import { Download, ChevronRight } from "lucide-react";

export default function EventTable({ events }: any) {
    const [selected, setSelected] = useState<any>(null);

    const getStatusBadge = (status: string) => {
        const statusStyles: Record<string, string> = {
            active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
            upcoming: "bg-blue-50 text-blue-700 border border-blue-200",
            completed: "bg-gray-50 text-gray-700 border border-gray-200",
            cancelled: "bg-red-50 text-red-700 border border-red-200",
        };

        return statusStyles[status.toLowerCase()] || "bg-muted text-muted-foreground border border-border";
    };

    if (events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">No Events Yet</h2>
                    <p className="text-muted-foreground text-sm">
                        Start by importing events from the public events page
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-foreground mb-1">Your Events</h1>
                    <p className="text-muted-foreground">Manage and track all your imported events</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50">
                                    <th className="text-left px-6 py-4 font-semibold text-foreground">Event Title</th>
                                    <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                                    <th className="text-right px-6 py-4 font-semibold text-foreground w-16">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event: any, index: number) => (
                                    <tr
                                        key={event._id}
                                        className="border-b border-border hover:bg-secondary/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground line-clamp-1">
                                                    {event.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground mt-1">
                                                    {event.dateTime}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelected(event)}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Import
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                    Showing {events.length} event{events.length !== 1 ? "s" : ""}
                </div>
            </div>

            {selected && (
                <ImportModal event={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}
