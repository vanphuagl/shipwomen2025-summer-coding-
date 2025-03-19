"use strict";

// ===== get height app =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== query =====
const [
  sidebar,
  sidebarControl,
  btnEnter,
  slideGroupFade,
  sidebarTitleDefault,
  sidebarTitleClassic,
] = [
  document.querySelector("[data-sidebar]"),
  document.querySelector("[data-sidebar-control]"),
  document.querySelector("[btn-enter]"),
  document.querySelectorAll("[data-slide-fade]"),
  document.querySelectorAll("[data-sidebar-title-default]"),
  document.querySelectorAll("[data-sidebar-title-classic]"),
];
const [prevsFirstView, prevsGroup] = [
  document.querySelector("[btn-prevs-firstview]"),
  document.querySelector("[btn-prevs-group]"),
];

// ===== main =====
const main = () => {
  // init swiper
  new Swiper(".js-mainvisual-swiper", {
    loop: true,
    effect: "fade",
    allowTouchMove: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });

  //
  const groupSwiper = new Swiper(".js-group-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    on: {
      init: (sw) => {
        if (sw.realIndex === 0) {
          slideGroupFade.forEach((item) => {
            item.classList.add("--hide");
          });
        } else {
          slideGroupFade.forEach((item) => {
            item.classList.remove("--hide");
          });
        }
      },
      slideChange: (sw) => {
        const index_currentSlide = sw.realIndex;
        const currentSlide = sw.slides[index_currentSlide];

        // ====
        if (currentSlide.hasAttribute("shifted-classic")) {
          sidebarTitleDefault.forEach((item) => {
            item.classList.remove("--show");
          });
          sidebarTitleClassic.forEach((item) => {
            item.classList.add("--show");
          });
        } else {
          sidebarTitleDefault.forEach((item) => {
            item.classList.add("--show");
          });
          sidebarTitleClassic.forEach((item) => {
            item.classList.remove("--show");
          });
        }
        // ====
        if (index_currentSlide === 0) {
          prevsGroup.style.display = "none";
          prevsFirstView.style.display = "block";
        } else {
          prevsGroup.style.display = "block";
          prevsFirstView.style.display = "none";
        }
      },
    },
  });

  const shipsSwiper = new Swiper(".js-ships-swiper", {
    navigation: {
      nextEl: null,
      prevEl: null,
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
    on: {
      slideChange: (sw) => {
        if (sw.realIndex === 1) {
          slideGroupFade.forEach((item) => {
            item.classList.remove("--hide");
          });
        } else {
          slideGroupFade.forEach((item) => {
            item.classList.add("--hide");
          });
        }
      },
    },
  });

  // enter slide
  btnEnter.addEventListener("click", () => {
    shipsSwiper.slideNext();
  });

  // event next/prev
  prevsFirstView.addEventListener("click", () => {
    shipsSwiper.slidePrev();
  });

  // back to top
  document.body.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-btn-backtotop")) {
      groupSwiper.slideTo(0, 1200);
      setTimeout(() => {
        shipsSwiper.slidePrev();
      }, 1000);
    }
  });
};

// ===== popup ====
// close
const closePopupAll = () => {
  sidebar.classList.remove("--hide");
  const popups = document.querySelectorAll("[data-popup]");
  const itemCredits = document.querySelectorAll("[data-items]");
  itemCredits.forEach((item) => {
    item.style.opacity = "1";
  });
  popups.forEach((item) => {
    item.classList.remove("--show");
  });
};

// show
const itemElements = document.querySelectorAll("[data-items]");
itemElements.forEach((itemElement) => {
  const itemNumber = itemElement.getAttribute("data-items");
  const popupElement = document.querySelector(`[data-popup="${itemNumber}"]`);
  itemElement.addEventListener("click", () => {
    closePopupAll();
    if (popupElement) {
      itemElement.style.opacity = "0";
      sidebar.classList.add("--hide");
      popupElement.classList.add("--show");
    }
  });
});

// ===== lazy loading =====
const ll = new LazyLoad({
  threshold: 0,
});

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};