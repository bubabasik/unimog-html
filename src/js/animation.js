$( document ).ready(function() {
   /*Анимация заголовков*/
      let splitWords = function (selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
          el.dataset.splitText = el.textContent;
          el.innerHTML = el.textContent
            .split(/\s/)
            .map(function (word) {
              return word
                .split("-")
                .map(function (word) {
                  return '<span class="word">' + word + "</span>";
                })
                .join('<span class="hyphen">-</span>');
            })
            .join('<span class="whitespace"> </span>');
        });
      };
      let splitLines = function (selector) {
        var elements = document.querySelectorAll(selector);
        splitWords(selector);
        elements.forEach(function (el) {
          var lines = getLines(el);
          var wrappedLines = "";
          lines.forEach(function (wordsArr) {
            wrappedLines += '<span class="line"><span class="words">';
            wordsArr.forEach(function (word) {
              wrappedLines += word.outerHTML;
            });
            wrappedLines += "</span></span>";
          });
          el.innerHTML = wrappedLines;
        });
      };
      let getLines = function (el) {
        var lines = [];
        var line;
        var words = el.querySelectorAll("span");
        var lastTop;
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          if (word.offsetTop != lastTop) {
            if (!word.classList.contains("whitespace")) {
              lastTop = word.offsetTop;
              line = [];
              lines.push(line);
            }
          }
          line.push(word);
        }
        return lines;
      };
      splitLines(".anim-title");
      let revealText = document.querySelectorAll(".anim-title");
      gsap.registerPlugin(ScrollTrigger);
      let revealLines = revealText.forEach((element) => {
        const lines = element.querySelectorAll(".words");
        let tl = gsap.timeline({
          scrollTrigger: {
           trigger: element,
    	   start: "+100 bottom",
           toggleActions: "play none none none"
          }
        });
        tl.set(element, { autoAlpha: 1 });
        tl.from(lines, 1, {
          y: 100,
          ease: "power4.out",
          delay: 0.1,
          skewY: 7,
          stagger:0.2
        })
      });
      
	/*Плавнный скролл*/   
	SmoothScroll({
		// Время скролла 400 = 0.4 секунды
		animationTime    : 800,
		// Размер шага в пикселях 
		stepSize         : 75,
		// Ускорение 
		accelerationDelta : 30,  
		// Максимальное ускорение
		accelerationMax   : 2,   
		// Поддержка клавиатуры
		keyboardSupport   : true,  
		// Шаг скролла стрелками на клавиатуре в пикселях
		arrowScroll       : 50,
		// Pulse (less tweakable)
		// ratio of "tail" to "acceleration"
		pulseAlgorithm   : true,
		pulseScale       : 4,
		pulseNormalize   : 1,
		overscrollEffect: 'bounce',
		// Поддержка тачпада
		touchpadSupport   : true,
	})    

	/*Параллакс фото на Главной "Автомобильный дом Восток"*/
    var section = document.getElementsByClassName('triggerImg')[0]
    var img = document.getElementsByClassName('img__background')[0]
    gsap.to(img, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom", 
        scrub: 0.2,
        invalidateOnRefresh: true
      },
      y: section.offsetHeight - img.offsetHeight,
      ease: "none"
    });
    
	var windowWidth = $(window).width();
	if(windowWidth > 1200){
		/*Анимация ВИДЕО*/
		gsap.registerPlugin(ScrollTrigger);
		const tl = gsap.timeline({
		  scrollTrigger: {
			trigger: ".section_video",
			scrub: true,
			pin: true,
			start: "top top",
			end: "+=150%"
		  }
		})
		.to(".section_video video", {
		  scale: 0.66, 
		  y:"-50vh",
		  ease: "none",
		  delay: 0.4
		})
	}
});