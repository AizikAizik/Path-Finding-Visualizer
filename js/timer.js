export const Timer = (function() {
    let basePeriod = 1000;
    let currentSpeed = 1;
    let timerElement;
    let timeoutRef;
    let count = 0;

    return {
        start: function (speed, id) {
            if (speed >= 0) {
                currentSpeed = speed;
            }
            if (id) {
                timerElement = document.getElementById(id);
            }
            Timer.run();
        },

        run: function () {
            if (timeoutRef) clearInterval(timeoutRef);
            if (timerElement) {
                timerElement.innerHTML = count;
            }
            if (currentSpeed) {
                timeoutRef = setTimeout(Timer.run, currentSpeed);
            }
            ++count;
        },

        setSpeed: function (speed) {
            currentSpeed = +speed;
            Timer.run();
        }
    }
})();