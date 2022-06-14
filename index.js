const buildings = Array.from(document.querySelectorAll('[data-building]'))
const panels = Array.from(document.querySelectorAll('[data-panel]'))

buildings.map((building) => {
    const media = building.querySelector('[data-media]')

    const overlay = building.querySelector('[data-overlay]')
    const playBtn = building.querySelector('[data-play]')
    const listenBtn = building.querySelector('[data-listen]')

    playBtn.addEventListener('click', () => {
        media.removeChild(media.firstElementChild)

        overlay.classList.toggle('hide')

        const video = document.createElement('video')

        video.src = './assets/videos/draft.mp4'
        video.poster = './assets/images/papa.jpg'

        video.autoplay = true
        video.controls = false
        video.muted = false

        media.appendChild(video)
    })
})

panels.map((panel) => {
    const btn = panel.querySelector('[data-panel-btn]')
    const panelContent = panel.querySelector('[data-panel-content]')

    btn.addEventListener('click', () => {
        panelContent.classList.toggle('hide')
    })
})
