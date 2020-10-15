'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // console.log(Date.now - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // ボタンの状態を設定(初期)
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }

  // ボタンの状態を設定(カウント中)
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }

  // ボタンの状態を設定(停止時)
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }

  // デフォルト設定
  setButtonStateInitial();

  // カウントアップ機能
  start.addEventListener('click', () => {
    setButtonStateRunning()
    startTime = Date.now();
    countUp();
  });

  // カウントストップ機能
  stop.addEventListener('click', () => {
    setButtonStateStopped()
    clearTimeout(timeoutId);
    // カウント再開時の設定
    elapsedTime += Date.now() - startTime;
  });

  // カウントリセット機能
  reset.addEventListener('click', () => {
    setButtonStateInitial()
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}