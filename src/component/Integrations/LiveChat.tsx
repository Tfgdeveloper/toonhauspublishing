import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ENV } from "@/data/Site";

type TawkCallback = (err?: unknown) => void;

type TawkApi = {
    onLoad?: () => void;
    onChatMessageAgent?: (message?: unknown) => void;
    onChatMaximized?: () => void;
    maximize?: () => void;
    isChatMaximized?: () => boolean;
    setAttributes?: (attrs: Record<string, string>, cb?: TawkCallback) => void;
    addEvent?: (name: string, metadata?: Record<string, string>, cb?: TawkCallback) => void;
};

declare global {
    interface Window {
        Tawk_API?: TawkApi;
        Tawk_LoadStart?: Date;
    }
}

const SCRIPT_ID = "tawk-to-script";
const MAX_RETRIES = 10;
const FLASH_TITLE = "💬 New message!";

// Tawk's API methods only work after the widget has loaded,
// so calls made before then are queued and run on load.
let tawkLoaded = false;
const loadQueue: Array<() => void> = [];

function whenTawkLoaded(fn: () => void) {
    if (tawkLoaded) fn();
    else loadQueue.push(fn);
}

function installTawk(propertyId: string, widgetId: string) {
    if (document.getElementById(SCRIPT_ID)) return;

    const api = (window.Tawk_API = window.Tawk_API || {});
    window.Tawk_LoadStart = new Date();

    const prevOnLoad = api.onLoad;
    api.onLoad = () => {
        prevOnLoad?.();
        tawkLoaded = true;
        loadQueue.splice(0).forEach((fn) => fn());
    };

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);
}

function useAutoOpenOnAgentMessage(enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;
        const api = window.Tawk_API;
        if (!api) return;

        let pendingOpen = false;
        let titleTimer: number | null = null;
        let originalTitle = document.title;
        const retryTimers = new Set<number>();

        const isMaximized = () => {
            try {
                return api.isChatMaximized?.() ?? false;
            } catch {
                return false;
            }
        };

        const stopTitleFlash = () => {
            if (titleTimer === null) return;
            window.clearInterval(titleTimer);
            titleTimer = null;
            document.title = originalTitle;
        };

        const startTitleFlash = () => {
            if (titleTimer !== null) return;
            originalTitle = document.title;
            let on = false;
            titleTimer = window.setInterval(() => {
                document.title = on ? originalTitle : FLASH_TITLE;
                on = !on;
            }, 1000);
        };

        const forceOpen = (attempt = 0) => {
            try {
                api.maximize?.();
            } catch {
                return;
            }
            const t = window.setTimeout(() => {
                retryTimers.delete(t);
                if (isMaximized()) {
                    pendingOpen = false;
                    stopTitleFlash();
                    return;
                }
                if (attempt < MAX_RETRIES) forceOpen(attempt + 1);
            }, 300);
            retryTimers.add(t);
        };

        const onTabVisibility = () => {
            if (document.hidden) return;
            if (pendingOpen) forceOpen(0);
            else stopTitleFlash();
        };

        // Tawk uses single callback properties rather than .on()/.off(),
        // so keep any existing handlers and restore them on cleanup.
        const prevAgentMsg = api.onChatMessageAgent;
        const prevMaximized = api.onChatMaximized;

        api.onChatMessageAgent = (message) => {
            prevAgentMsg?.(message);
            pendingOpen = true;
            whenTawkLoaded(() => forceOpen(0));
            if (document.hidden) startTitleFlash();
        };

        api.onChatMaximized = () => {
            prevMaximized?.();
            pendingOpen = false;
            stopTitleFlash();
        };

        document.addEventListener("visibilitychange", onTabVisibility);

        return () => {
            api.onChatMessageAgent = prevAgentMsg;
            api.onChatMaximized = prevMaximized;
            document.removeEventListener("visibilitychange", onTabVisibility);
            retryTimers.forEach((t) => window.clearTimeout(t));
            retryTimers.clear();
            stopTitleFlash();
        };
    }, [enabled]);
}

export default function TawkChat() {
    const { pathname } = useLocation();
    const propertyId = String(ENV.tawkPropertyId ?? "").trim();
    const widgetId = String(ENV.tawkWidgetId ?? "").trim();
    const enabled = propertyId.length > 0 && widgetId.length > 0;

    useEffect(() => {
        if (enabled) installTawk(propertyId, widgetId);
    }, [enabled, propertyId, widgetId]);

    useAutoOpenOnAgentMessage(enabled);

    // Tell agents which page the visitor is on as they navigate the SPA.
    useEffect(() => {
        if (!enabled) return;
        const href = window.location.href;
        whenTawkLoaded(() => {
            // Attribute keys: letters, numbers and dashes only; values max 255 chars.
            window.Tawk_API?.setAttributes?.({ "current-page": href.slice(0, 255) }, () => {});
        });
    }, [pathname, enabled]);

    return null;
}