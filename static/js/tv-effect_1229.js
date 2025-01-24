(function () {
  const SELECTOR_SCREEN = '.screen_tv';
  const SELECTOR_CONTENT_INNER = '.content_inner';
  const SELECTOR_VIDEO = '.video-container video';

  let timeline;

  // Build the TV effect animation timeline
  function buildTimeline() {
    timeline = new TimelineMax({
      paused: true,
    });

    timeline
      .to(SELECTOR_SCREEN, 0.2, {
        width: '300vw',
        height: '6px',
        background: '#ffffff',
        ease: Power2.easeOut,
      })
      .to(SELECTOR_SCREEN, 0.2, {
        width: '0',
        height: '0',
        background: '#ffffff',
      });
  }

  // Start the TV effect animation
  function startTVEffect() {
    timeline.restart();
  }

  // Hide the loader and show the content
  function hideLoaderAndShowContent() {
    const loader = document.querySelector(SELECTOR_SCREEN);
    const content = document.querySelector(SELECTOR_CONTENT_INNER);

    if (loader) loader.style.display = 'none';
    if (content) content.style.display = 'block';
  }

  // Initialize video loader functionality
  function initializeVideoLoader() {
    const videoElement = document.querySelector(SELECTOR_VIDEO);

    if (videoElement) {
      videoElement.addEventListener('canplay', () => {
        // Hide loader and show video content when the video is ready
        hideLoaderAndShowContent();
      });

      videoElement.addEventListener('error', () => {
        console.error('Error loading video.');
        hideLoaderAndShowContent(); // Fallback to hide loader if video fails to load
      });

      // Attempt to autoplay the video if muted
      videoElement.play().catch((error) => {
        console.warn('Autoplay failed. Waiting for user interaction...');
        document.addEventListener('click', () => {
          videoElement.play().catch((playError) => {
            console.error('Playback failed after user interaction:', playError);
          });
        }, { once: true }); // Ensures the event listener is removed after the first interaction
      });
    } else {
      console.warn('Video element not found.');
      hideLoaderAndShowContent(); // Fallback for missing video
    }
  }

  // Automatically start the TV effect and initialize video loader on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    buildTimeline();
    startTVEffect();
//    initializeVideoLoader();
  });
})();
