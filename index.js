const buildings = Array.from(document.querySelectorAll('[data-building]'))
const panels = Array.from(document.querySelectorAll('[data-transcript-panel]'))

let userAgent = navigator.userAgent
let browserName

if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome'
} else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox'
} else if (userAgent.match(/safari/i)) {
    browserName = 'safari'
} else if (userAgent.match(/opr\//i)) {
    browserName = 'opera'
} else if (userAgent.match(/edg/i)) {
    browserName = 'edge'
} else {
    browserName = 'No browser detection'
}
console.log('browser', browserName)

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

        const audio = document.createElement('audio')

        audio.src = './assets/audio/draft.mp3'

        audio.autoplay = true
        audio.controls = true
        audio.muted = false

        media.appendChild(audio)
    })
})

panels.map((panel) => {
    const btn = panel.querySelector('[data-transcript-btn]')

    btn.addEventListener('click', () => {
        panel.classList.toggle('closed')
    })
})
