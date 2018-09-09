let windowX = window.innerWidth;
let windowY = window.innerWidth;

window.addEventListener('resize', function () {
    windowX = window.innerWidth;
    windowY = window.innerWidth;
});

function distance(i, j) {
    return Math.sqrt((i.x - j.x) ** 2 + (i.y - j.y) ** 2);
}

function sortXYlocs(data) {
    const distanced = data
        .map(datum => ({
            datum,
            index: window.event
                .map((oldDatum, index) => ({
                        distance: distance(oldDatum, datum),
                        index
                    })
                    .sort((a, b) => a.distance - b.distance)[0].index)
        }));

    distanced.forEach(({
        datum,
        index
    }) => window.event[index] = datum);
}

window.addEventListener('load', function () {
    var tracker = new tracking.ColorTracker();
    tracker.setColors(['magenta', 'yellow', 'cyan']);
    tracking.track('#video', tracker, {
        camera: true
    });

    tracker.on('track', function (event) {
        event.data.sort((a, b) => a.x - b.x);
        window.trackEvents.forEach((e, i) => {
            const d = event.data[i];
            if (d) {
                const x = windowX - (d.x / 300 * windowX);
                const y = d.y / 200 * windowY;
                e.x = x;
                e.y = y;
                e.retries = 100;
            } else {
                if (e.retries !== undefined && e.retries > 0) {
                    e.retries--;
                } else {
                    delete e.x;
                    delete e.y;
                }
            }
        })
    });
});