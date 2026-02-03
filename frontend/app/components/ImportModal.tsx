"use client";

import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { X } from "lucide-react";

export default function ImportModal({ event, onClose }: any) {
    const { data: session } = useSession();
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const importEvent = async () => {
        setIsLoading(true);
        try {
            await api.patch(
                `/dashboard/events/${event._id}/import`,
                { notes },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.email}`,
                    },
                }
            );
            onClose();
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg border border-border max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground line-clamp-1">
                        {event.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Add Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any notes about this event..."
                            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                            rows={4}
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-foreground">
                            This event will be imported to your dashboard and you&apos;ll be able to manage tickets and attendees.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-secondary/30">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={importEvent}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Importing..." : "Import Event"}
                    </button>
                </div>
            </div>
        </div>
    );
}
