(function () {
  document.documentElement.classList.add('pre-entry');

  var overlay = document.getElementById('entry-overlay');
  var enterBtn = document.getElementById('enter-btn');
  var audio = document.getElementById('bg-audio');
  var soundToggle = document.getElementById('sound-toggle');

  function enterSite() {
    document.documentElement.classList.remove('pre-entry');
    overlay.classList.add('entered');
    audio.play().catch(function () {
      // autoplay blocked; user can start it via the sound toggle
    });
    setTimeout(function () {
      overlay.setAttribute('hidden', '');
    }, 1200);
    enterBtn.removeEventListener('click', enterSite);
  }

  enterBtn.addEventListener('click', enterSite);

  soundToggle.addEventListener('click', function () {
    if (audio.paused) {
      audio.play().catch(function () {});
      soundToggle.classList.remove('muted');
      soundToggle.setAttribute('aria-label', 'Silenciar música');
    } else {
      audio.pause();
      soundToggle.classList.add('muted');
      soundToggle.setAttribute('aria-label', 'Activar música');
    }
  });

  var bgLayers = {};
  document.querySelectorAll('.bg-layer').forEach(function (layer) {
    bgLayers[layer.getAttribute('data-bg')] = layer;
  });

  var panels = document.querySelectorAll('.panel[data-bg-target]');
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target.getAttribute('data-bg-target');
          Object.keys(bgLayers).forEach(function (key) {
            bgLayers[key].classList.toggle('active', key === target);
          });
        }
      });
    },
    { threshold: 0.55 }
  );

  panels.forEach(function (panel) {
    observer.observe(panel);
  });
})();
