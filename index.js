// Youtube script
let ac = {
  video: document.getElementsByClassName('html5-main-video')[0],
  frames: [],
  absoluteTime: null, /* unix timestamp at start of first frame */

  /**
   * Creates a new frame from the current position in the video, using
   * the current absolute time
   */
  createFrame: function() {
    this.frames.push({ 
      beginAt: ac.video.currentTime,
      start: ac.timeLapsed(),
      stop: null // set later when stopped/seeking/ended
    })
  },

  /**
   * Updates the stop time for the last frame with the current absolute
   * timestamp
   */
  stopLastFrame: function() {
    let lastFrame = this.frames[this.frames.length - 1]
    lastFrame.stop = this.timeLapsed()
  },

  /**
   * @returns Number of milliseconds passed since absoluteTime (our absolute
   * time reference)
   */
  timeLapsed: function() {
    return Date.now() - this.absoluteTime
  },
}

ac.video.addEventListener('play', (e) => {
  if(ac.frames.length == 0) ac.absoluteTime = Date.now() // mark reference time

  ac.createFrame()
})

ac.video.addEventListener('pause', (e) => ac.stopLastFrame())
ac.video.addEventListener('ended', (e) => ac.stopLastFrame())
ac.video.addEventListener('seeked', (e) => {
  ac.stopLastFrame()

  if(!ac.video.paused) {
    // Add a new frame from the current position, since we're still playing
    ac.createFrame()
  }
})

/**
 * TODO:
 * - Handle buffering / video loading
 * - Handle playbackRate
 * - Extensive testing
 */
