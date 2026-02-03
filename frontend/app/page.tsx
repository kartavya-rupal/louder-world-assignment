"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Calendar } from "lucide-react";
import EventCard from "./components/EventCard";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading events...</p>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 py-12 border-b border-border">
          <div className="flex items-start gap-3 mb-2">
            <Calendar className="w-8 h-8 text-primary mt-1" />
            <div>
              <h1 className="text-4xl font-semibold text-foreground">
                Discover Events
              </h1>
              <p className="text-muted-foreground mt-1">
                Find and get tickets to amazing events near you
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-12">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                No Events Available
              </h2>
              <p className="text-muted-foreground">
                Check back soon for upcoming events
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                Showing {events.length} event{events.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: any) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
