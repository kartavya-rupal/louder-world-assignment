"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { X } from "lucide-react";

export default function LeadModal({ eventId, redirectUrl, onClose }: any) {
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        if (!email || !consent) return;
        setIsLoading(true);
        try {
            await api.post(`/events/${eventId}/lead`, { email, consent });
            window.location.href = redirectUrl;
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg border border-border max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Get Ticket</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="consent"
                            checked={consent}
                            onChange={() => setConsent(!consent)}
                            className="w-4 h-4 rounded border border-border cursor-pointer mt-1 accent-primary"
                        />
                        <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
                            I agree to receive event updates and promotional emails
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-secondary/30">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        disabled={!email || !consent || isLoading}
                        className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}
