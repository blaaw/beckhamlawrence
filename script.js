    (function () {
      var root = document.documentElement, btn = document.getElementById('theme');
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { 
          localStorage.setItem('theme', next) 
        } catch (e) {}
      });

      var cards = [].slice.call(document.querySelectorAll('.mini'));
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { 
        cards.forEach(function (c) { 
          c.classList.add('in') 
        }); 
        return 
      }

      var io = new IntersectionObserver(function (es) { 
        es.forEach(function (e) { 
          if (e.isIntersecting) { 
            e.target.classList.add('in'); 
            io.unobserve(e.target) 
          } 
        }) 
      }, 
      { 
        rootMargin: '0px 0px -12% 0px', 
        threshold: 0 
      });

      cards.forEach(function (c) { 
        io.observe(c) 
      });
      var tick = false;
      
      function update() {
        cards.forEach(function (c, i) {
          var n = cards[i + 1]; if (!n) return;
          var d = n.getBoundingClientRect().top - c.getBoundingClientRect().top;
          var p = Math.min(1, Math.max(0, 1 - (d - 22) / c.offsetHeight));
          c.style.scale = (1 - .05 * p).toFixed(3);
        });
        tick = false;
      }
      addEventListener('scroll', function () { 
        if (!tick) { 
          tick = true; 
          requestAnimationFrame(update) 
        } 
      }, 
      { 
        passive: true 
      });
      update();
    })();
