const buildings = Array.from(document.querySelectorAll('[data-building]'))
const tabs = Array.from(document.querySelectorAll('[data-building-tab]'))

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

tabs.map((tab) => {
    const tabBtns = Array.from(tab.querySelectorAll('[data-building-tab-btn]'))
    const tabEls = Array.from(tab.querySelectorAll('[data-building-tab-content]'))

    console.log(tabBtns)

    tabBtns.map((button) => {
        console.log(button)
        button.addEventListener('click', () => {
            const tabNumber = button.dataset.buildingTabBtn
            const tabContent = tab.querySelector(`[data-building-tab-content="${tabNumber}"]`)

            const prevActiveBtn = tabBtns.filter((btn) => {
                return btn.classList.contains('active')
            })

            if (prevActiveBtn.length > 0 && prevActiveBtn[0] !== button) {
                prevActiveBtn[0].classList.remove('active')
            }

            const prevActiveTab = tabEls.filter((tab) => {
                return tab.classList.contains('show')
            })

            if (prevActiveTab.length > 0) {
                prevActiveTab[0].classList.remove('show')
            }

            button.classList.add('active')
            tabContent.classList.add('show')
        })
    })
})
