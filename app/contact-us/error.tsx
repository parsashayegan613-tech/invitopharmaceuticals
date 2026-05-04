"use client";

import Link from "next/link";

export default function ContactError({ reset }: { error: Error; reset: () => void }) {
    return (
        <main className="mx-auto max-w-2xl px-4 py-16">
            <h1 className="mb-4 text-3xl font-semibold text-foreground">Contact form is temporarily unavailable</h1>
            <p className="mb-6 text-muted-foreground">
                Email info@invitvo.com or call +1-780-709-5678, or retry the form.
            </p>
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className="rounded bg-primary px-4 py-2 text-primary-foreground"
                >
                    Try again
                </button>
                <Link className="rounded border border-border px-4 py-2" href="mailto:info@invitvo.com">
                    Email InVitvo
                </Link>
                <Link className="rounded border border-border px-4 py-2" href="tel:+17807095678">
                    Call InVitvo
                </Link>
            </div>
        </main>
    );
}
