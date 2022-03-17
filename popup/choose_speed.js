const speed_input = document.getElementsByClassName("speed_input")[0];
const button = document.getElementById("go");
speed_input.select();

function listenForClicks() {
    document.addEventListener("click", (e) => {
        function change_speed(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "change_speed", speed: speed_input.value
            });
        }

        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset"
            });
        }

        if (e.target.classList.contains("go")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(change_speed)
        } else if (e.target.classList.contains("reset")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(reset)
        }
    });
}
document.onkeydown = ((e) => {
    if (e.code === "Enter") {
        button.click();
        window.close();
    }
})

browser.tabs.executeScript({file: "/content_scripts/script.js"}).then(listenForClicks)
