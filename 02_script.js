// Example: Auto-fill location using Geolocation API
document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lng = position.coords.longitude.toFixed(4);
                locationInput.value = Lat: ${lat}, Lng: ${lng};
            },
            (error) => {
                console.warn("Geolocation error:", error.message);
            }
        );
    }
});