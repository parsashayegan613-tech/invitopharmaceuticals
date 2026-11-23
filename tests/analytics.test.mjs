import test from "node:test";
import assert from "node:assert/strict";
import { trackEvent } from "../src/lib/analytics.ts";

test("analytics is consent-gated, excludes internal visits, and cannot break inquiries", () => {
    const calls = [];
    const state = {};
    globalThis.window = { localStorage: { getItem: (key) => state[key] ?? null }, gtag: (...args) => calls.push(args) };
    try {
        assert.equal(trackEvent("contact_submit"), false);
        state.invitvo_analytics_consent = "declined";
        assert.equal(trackEvent("contact_submit"), false);
        assert.equal(calls.length, 0);
        state.invitvo_analytics_consent = "accepted";
        assert.equal(trackEvent("contact_submit", { inquiry_type: "investment", empty: "", absent: undefined }), true);
        assert.deepEqual(calls, [["event", "contact_submit", { inquiry_type: "investment" }]]);
        state.invitvo_analytics_exclude = "true";
        assert.equal(trackEvent("contact_submit"), false);
        assert.equal(calls.length, 1);
        delete state.invitvo_analytics_exclude;
        window.gtag = () => { throw new Error("Analytics unavailable"); };
        assert.equal(trackEvent("contact_submit"), false);
        window.localStorage.getItem = () => { throw new Error("Storage unavailable"); };
        assert.equal(trackEvent("contact_submit"), false);
    } finally {
        delete globalThis.window;
    }
    assert.equal(trackEvent("contact_submit"), false);
});
