const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.setAttribute('disabled', true);

function onStartBtnClick() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;

  chengeDisabledBtn();

  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStopBtnClick() {
  chengeDisabledBtn();

  clearInterval(timerId);
}

function chengeDisabledBtn() {
  const isStartBtnDisabled = refs.startBtn.hasAttribute('disabled');
  const isStopBtnDisabled = refs.stopBtn.hasAttribute('disabled');

  if (isStartBtnDisabled) {
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
  }

  if (isStopBtnDisabled) {
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
