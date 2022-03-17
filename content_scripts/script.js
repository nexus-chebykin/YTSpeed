(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function change_speed(new_speed) {
        document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = new_speed;
    }

    function reset() {
        change_speed(1);
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "change_speed") {
            change_speed(message.speed);
        } else if (message.command === "reset") {
            reset();
        }
    });
})();