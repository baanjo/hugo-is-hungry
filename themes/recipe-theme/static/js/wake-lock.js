// Keep the screen on while a recipe is open, so the device doesn't lock while cooking
let wakeLock = null;
let requesting = false;

const requestWakeLock = async () => {
    if (!("wakeLock" in navigator) || wakeLock || requesting) return;
    requesting = true;
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
            wakeLock = null;
        });
    } catch (error) {
        console.warn("Wake lock unavailable:", error);
    } finally {
        requesting = false;
    }
};

// iOS Safari only grants the lock after a user gesture, so also try on the first interactions
["click", "touchend", "keydown"].forEach(type => {
    document.addEventListener(type, requestWakeLock, {passive: true});
});

// The browser releases the lock when the tab is hidden, so acquire it again when it becomes visible
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        requestWakeLock();
    }
});

requestWakeLock();
