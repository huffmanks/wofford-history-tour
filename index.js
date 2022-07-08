// @    ENV: PROD
// @    NAME: 'DOMContentLoaded' start
// @    NOTE: Uncomment below and ending }) at the bottom
// window.addEventListener('DOMContentLoaded', () => {
//     const h2 = document.querySelector('#page-builder h2')
//     h2.remove()

const buildings = Array.from(document.querySelectorAll('[data-building]'))
const tabs = Array.from(document.querySelectorAll('[data-building-tab]'))

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${returnedSeconds}`
}

const displayDuration = (audioDurationEl, audio) => {
    audioDurationEl.textContent = calculateTime(audio.duration)
}

const setAudioTrackMax = (audioTrackEl, audio) => {
    audioTrackEl.max = Math.floor(audio.duration)
}

const createVideo = (image, mediaOptions, media) => {
    image.classList.toggle('hide')
    mediaOptions.classList.toggle('hide')

    const video = document.createElement('video')

    video.src = './assets/videos/draft.mp4'
    video.poster = './assets/images/posters/hugh-black-poster.jpg'

    video.autoplay = true
    video.controls = true
    video.muted = false

    media.appendChild(video)
}

const createAudio = (mediaOptions, audioPlayer, audioDurationEl, audioTrackEl, media) => {
    mediaOptions.classList.toggle('hide')
    audioPlayer.classList.toggle('hide')

    const audio = document.createElement('audio')

    audio.src = './assets/audio/draft.mp3'

    audio.autoplay = true
    audio.muted = false

    media.appendChild(audio)

    if (audio.readyState > 0) {
        displayDuration(audioDurationEl, audio)
        setAudioTrackMax(audioTrackEl, audio)
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration(audioDurationEl, audio)
            setAudioTrackMax(audioTrackEl, audio)
        })
    }
}

buildings.map((building) => {
    const media = building.querySelector('[data-media]')
    const image = media.querySelector('img')
    let audioEl

    const buildingOverlay = building.querySelector('.building-overlay')
    const mediaOptions = building.querySelector('[data-media-options]')
    const watchBtn = building.querySelector('[data-watch]')
    const listenBtn = building.querySelector('[data-listen]')

    const audioPlayer = building.querySelector('[data-audio-player]')
    const audioPlayBtn = audioPlayer.querySelector('[data-audio-play]')
    const audioPlayIcon = audioPlayer.querySelector('[data-audio-play] img')
    const audioVolumeBtn = audioPlayer.querySelector('[data-audio-volume]')
    const audioVolumeIcon = audioPlayer.querySelector('[data-audio-volume] img')

    const audioTimeEl = audioPlayer.querySelector('[data-audio-time]')
    const audioDurationEl = audioPlayer.querySelector('[data-audio-duration]')

    const audioTimelineEl = audioPlayer.querySelector('.audio-timeline')
    const audioTrackEl = audioPlayer.querySelector('[data-audio-track]')

    watchBtn.addEventListener('click', () => {
        createVideo(image, mediaOptions, media)

        buildingOverlay.classList.toggle('out')

        const videoEl = media.querySelector('video')

        videoEl.addEventListener('ended', () => {
            videoEl.remove()

            buildingOverlay.classList.toggle('out')
            image.classList.toggle('hide')
            mediaOptions.classList.toggle('hide')
        })
    })

    listenBtn.addEventListener('click', () => {
        createAudio(mediaOptions, audioPlayer, audioDurationEl, audioTrackEl, media)

        buildingOverlay.classList.toggle('out')

        audioEl = media.querySelector('audio')

        audioEl.addEventListener('timeupdate', () => {
            updateAudioPlayer()
        })

        audioEl.addEventListener('ended', () => {
            audioEl.remove()

            buildingOverlay.classList.toggle('out')
            mediaOptions.classList.toggle('hide')
            audioPlayer.classList.toggle('hide')
        })
    })

    const updateAudioPlayer = () => {
        audioTrackEl.value = Math.floor(audioEl.currentTime)
        audioTimeEl.textContent = calculateTime(audioTrackEl.value)
        audioTimelineEl.style.setProperty('--track-before-width', `${(audioTrackEl.value / audioTrackEl.max) * 100}%`)
    }

    audioPlayBtn.addEventListener('click', () => {
        if (audioEl.paused) {
            audioEl.play()
            audioPlayIcon.src = './assets/icons/controls-pause.png'
        } else {
            audioEl.pause()
            audioPlayIcon.src = './assets/icons/controls-play.png'
        }
    })

    audioVolumeBtn.addEventListener('click', () => {
        if (audioEl.muted) {
            audioEl.muted = false
            audioVolumeIcon.src = './assets/icons/controls-volume.png'
        } else {
            audioEl.muted = true
            audioVolumeIcon.src = './assets/icons/controls-volume-mute.png'
        }
    })

    audioTrackEl.addEventListener('input', () => {
        audioTimeEl.textContent = calculateTime(audioTrackEl.value)

        audioTimelineEl.style.setProperty('--track-before-width', (audioTrackEl.value / audioTrackEl.max) * 100 + '%')
    })

    audioTrackEl.addEventListener('change', () => {
        audioEl.currentTime = audioTrackEl.value

        if (!audioEl.paused) {
            updateAudioPlayer()
        }
    })
})

tabs.map((tab) => {
    const tabBtns = Array.from(tab.querySelectorAll('[data-building-tab-btn]'))
    const tabEls = Array.from(tab.querySelectorAll('[data-building-tab-content]'))

    tabBtns.map((button) => {
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
// }) Prod 'DOMContentLoaded' end
