WebFontConfig = {
  custom: {
  families: ['Nanum Gothic'],
  urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css']
  }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

var Body = {
  setBackgroundColor: function (color) {
    document.querySelector('body').style.backgroundColor = color; 
  }
}

var homefoot = {
  setColor:function (color){
    var alist = document.querySelectorAll('span');
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
    homefoot.setColor('white');
  } else {
    Body.setBackgroundColor('#efefef');
    self.value = 'Night';
    homefoot.setColor('#333');
  }
}

// 텍스트 스크램블

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
    // 생성자
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  'Remember , ',
  'Hope is a good thing .',
  'maybe the best of things and ',
  'no good thing ever dies .',
  'I will keep an eye out for you',
  'and chessboard ready .'
]

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1600)
  })
  counter = (counter + 1) % phrases.length;
}

next();
