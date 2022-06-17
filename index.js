const buildings = Array.from(document.querySelectorAll('[data-building]'))
const panels = Array.from(document.querySelectorAll('[data-transcript-panel]'))

buildings.map((building) => {
    const media = building.querySelector('[data-media]')
    const image = media.querySelector('img')

    const overlay = building.querySelector('[data-overlay]')
    const playBtn = building.querySelector('[data-play]')
    const listenBtn = building.querySelector('[data-listen]')

    playBtn.addEventListener('click', () => {
        image.classList.toggle('hide')
        overlay.classList.toggle('hide')

        const video = document.createElement('video')

        video.src = './assets/videos/draft.mp4'
        video.poster = './assets/images/draft.jpg'

        video.autoplay = true
        video.controls = true
        video.muted = false

        media.appendChild(video)
    })

    listenBtn.addEventListener('click', () => {
        overlay.classList.toggle('hide')

        const video = document.createElement('audio')

        video.src = './assets/audio/draft.mp3'

        video.autoplay = true
        video.controls = true
        video.muted = false

        media.appendChild(video)
    })
})

panels.map((panel) => {
    const btn = panel.querySelector('[data-transcript-btn]')

    btn.addEventListener('click', () => {
        panel.classList.toggle('closed')
    })
})
