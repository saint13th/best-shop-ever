(function () {
    const startButton = document.querySelector('#js-start');
    const stopButton = document.querySelector('#js-stop');

    // @ts-ignore
    const worker = new Worker(new URL("./worker.js", import.meta.url));

    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission((status) => {
            if (status === 'granted') {
                const notification = new Notification('OTUS', {
                    body: 'Первое уведомление'
                });

                setTimeout(() => notification.close(), 1 * 1000)
            }
        })
    }

    startButton && startButton.addEventListener('click', () => {
        worker.postMessage({ type: 'start' })
    })

    stopButton && stopButton.addEventListener('click', () => {
        worker.postMessage({ type: 'stop' })
    })

    let notification

    worker.addEventListener('message', (event) => {
        if (event.data.type === 'message') {
            const message = event.data.payload
            console.log(message)

            // закрываем предыдущее уведомление
            if (notification) {
                notification.close()
            }

            notification = new Notification(message)
        }
    })

}())