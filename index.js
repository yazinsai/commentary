(function() {
  // Youtube script
  let commentary = {
    video: document.getElementsByClassName('html5-main-video')[0],
    frames: [],
    startTime: null, /* unix timestamp at start of first frame */

    /**
     * Creates a new frame from the current position in the video, using
     * the current absolute time
     */
    addFrame: function() {
      this.frames.push({ 
        currentVideoTime: this.video.currentTime,
        start: this.timeSinceStart(),
        stop: null // set later when stopped/seeking/ended
      })
    },

    /**
     * Updates the stop time for the last frame with the current absolute
     * timestamp
     */
    stopLastFrame: function() {
      let lastFrame = this.frames[this.frames.length - 1]
      lastFrame.stop = this.timeSinceStart()
    },

    /**
     * @returns Number of milliseconds passed since startTime (our absolute
     * time reference)
     */
    timeSinceStart: function() {
      return Date.now() - this.startTime
    },
  }

  commentary.video.addEventListener('playing', (e) => {
    if(commentary.frames.length == 0) {
      commentary.startTime = Date.now() // mark reference time
    }
  
    // Create a new frame
    commentary.addFrame()
  })
  
  ['pause', 'ended', 'seeked'].forEach(
    (trigger) => {
      commentary.video.addEventListener(trigger, (e) => commentary.stopLastFrame())
    })
})()

/**
 * TODO:
 * - Handle buffering / video loading
 * - Handle playbackRate
 * - Extensive testing
 */
