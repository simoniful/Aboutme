WebFontConfig = {
  google: {
    families: ['Hind']
  },
  custom: {
  families: ['Nanum Gothic'],
  urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css']
  }
};
  
// 야간모드

var Body = {
  setBackgroundColor: function(color) {
    document.querySelector('body').style.backgroundColor = color; 
  }
}

var sectionTitle = {
  setColor: function(color){
    var alist = document.querySelectorAll('.quote-title');
    var i = 0;
    while(i < alist.length) {
      alist[i].style.color = color;
      i = i + 1;
    }
  }
}

var banner = {
  setColor: function(color) {
    document.querySelector('.the-image-area').style.backgroundColor = color;
  }
}

var sectionText = {
  setColor: function(color){
    var alist = document.querySelectorAll('.motiv_wrap span, .mbti_title, quote-text span');
    var i = 0;
    while(i < alist.length) {
      alist[i].style.color = color;
      i = i + 1;
    }
  }
}

function nightDayHandler(self) {
  if (self.value === 'Night') {
    Body.setBackgroundColor('#37373d');
    self.value = 'Day';
    sectionTitle .setColor('white');
    banner.setColor('#747474');
    sectionText.setColor('#bbb');
  } else {
    Body.setBackgroundColor('#ffffff');
    self.value = 'Night';
    sectionTitle .setColor('#333');
    banner.setColor('#efefef');
    sectionText.setColor('#888');
  }
}

// 프로그래스 바

document.addEventListener(
  "scroll",
  function() {
    // 크롬, IE x축 방향으로 스크롤한 거리 구하기 
    var scrollTop = window.pageYOffset;
    // 창 사이즈 읽어오기 : 전체 높이 - 눈에 보이는 높이 
    var scrollBottom = document.body.scrollHeight - document.documentElement.clientHeight;
    // 보이는 창을 제외한 전제 진행 정도 파악 
    scrollPercent = scrollTop / scrollBottom * 100 + "%";
    // css 요소에 전달
    document
      .getElementById("_progress")
      .style.setProperty("--scroll", scrollPercent);
  },
  // preventDefault()를 호출할 수 없도록 하고 경고창을 미연에 차단
  { passive: true }
);


// 스크롤 이미지 페이드 인 
  
const sliderImages = document.querySelectorAll(".slide-in");

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide(e) {
  sliderImages.forEach((slideImage) => {
    // 25% way through the image 
    const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2 ;
    // bottom of image 
    const imageBottom = slideImage.offsetTop + slideImage.height;

    const isHalfShown = slideInAt > slideImage.offsetTop;

    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      slideImage.classList.add("active");
    } else {
      slideImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));



// 창 감지에 따른 요소 페이드 인 

function isElementUnderBottom(elem, triggerDiff) {
  // 함수 화면 아래 요소 유무 확인
  const { top } = elem.getBoundingClientRect();
  // 요소의 절대 위치 각종 좌표 값이 들어있는 객체 반환
  const { innerHeight } = window;
  // 윈도우 내부 창 전체
  return top > innerHeight + (triggerDiff || 0);
}

function handleScroll() {
  const elems = document.querySelectorAll('.up-on-scroll');
  // 해당 클래스 가져옴
  elems.forEach(elem => {
    if (isElementUnderBottom(elem, -60)) {
      elem.style.opacity = "0";
      elem.style.transform = 'translateY(70px)';
    } else {
      elem.style.opacity = "1";
      elem.style.transform = 'translateY(0px)';
    }
  })
  // css 효과 실행
}

window.addEventListener('scroll', handleScroll);









