// Keep the screen on while a recipe is open, so the device doesn't lock while cooking
let wakeLock = null;

const requestWakeLock = async () => {
    if (!("wakeLock" in navigator) || wakeLock) return;
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
            wakeLock = null;
        });
    } catch (error) {
        console.warn("Wake lock unavailable:", error);
    }
};

// The browser releases the lock when the tab is hidden, so acquire it again when it becomes visible
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        requestWakeLock();
    }
});

requestWakeLock();
