import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/timer.css';

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const datesTimeDifference = selectedDates[0] - options.defaultDate;
    selectedDate = selectedDates[0];

    if (datesTimeDifference < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    chengeDisabledBtn();
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.addEventListener('click', onStartButtonClick);

refs.startButton.setAttribute('disabled', true);

function chengeDisabledBtn() {
  const isStartBtnDisabled = refs.startButton.hasAttribute('disabled');

  if (isStartBtnDisabled) {
    refs.startButton.removeAttribute('disabled');
    return;
  }

  refs.startButton.setAttribute('disabled', true);
}

function onStartButtonClick() {
  timer();
  chengeDisabledBtn();
}

function timer() {
  const intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const timeComponents = convertMs(deltaTime);

    setTimesContent(timeComponents);
    stopTimer(deltaTime);
  }, 1000);

  function stopTimer(value) {
    if (value < 1000) {
      clearInterval(intervalId);
      Notify.success('Щось почалося)))');
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setTimesContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
}
