var mediaElements = document.querySelectorAll('video, audio');

for (var i = 0, total = mediaElements.length; i < total; i++) {
  new MediaElementPlayer(mediaElements[i], {
          previewMode: true,
          muteOnPreviewMode: true,
          fadeOutAudioInterval: 200,
          fadeOutAudioStart: 10,
          fadePercent: 0.02,
    features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen', 'preview'],
  });
}
