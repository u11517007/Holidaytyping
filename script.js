let currentMonthIdx = 0;
let currentWordIdx = 0;
let isBossMode = false;
let bossTimer = null;
let bossTimeLeft = 45; // 預設魔王關時間 45 秒
let isRetry = false; // 紀錄是否為重試狀態（重試時自動加時）
const unlockedMonths = JSON.parse(localStorage.getItem('unlockedMonths')) || [0]; // 保存解鎖進度

// 介面元素
const passportStamps = document.getElementById("passportStamps");
const typingCard = document.getElementById("typingCard");
const bossCard = document.getElementById("bossCard");
const typeInput = document.getElementById("typeInput");
const bossTypeInput = document.getElementById("bossTypeInput");
const wordDisplay = document.getElementById("wordDisplay");
const bossWordDisplay = document.getElementById("bossWordDisplay");
const timerProgress = document.getElementById("timerProgress");
const stampModal = document.getElementById("stampModal");

// 1. 初始化護照收集區
function initPassport() {
  passportStamps.innerHTML = "";
  festivals.forEach((f, idx) => {
    const slot = document.createElement("div");
    slot.className = `stamp-slot ${idx === currentMonthIdx ? 'active' : ''} ${unlockedMonths.includes(idx) ? '' : 'locked'} ${idx < currentMonthIdx && unlockedMonths.includes(idx) ? 'completed' : ''}`;
    slot.textContent = `${idx + 1}月`;
    
    const icon = document.createElement("div");
    icon.className = "stamp-icon";
    icon.style.backgroundImage = `url(${f.img})`;
    slot.appendChild(icon);

    if (!slot.classList.contains('locked')) {
        slot.onclick = () => switchMonth(idx);
    }
    passportStamps.appendChild(slot);
  });
}

// 2. 切換月份 (沉浸式背景切換)
function switchMonth(idx) {
  currentMonthIdx = idx;
  currentWordIdx = 0;
  isBossMode = false;
  isRetry = false; // 切換新月份時重置重試狀態
  
  // 切換沉浸式背景
  document.body.style.backgroundImage = `url(${festivals[currentMonthIdx].img})`;
  document.getElementById("festivalName").textContent = festivals[currentMonthIdx].name;
  
  initPassport(); // 更新護照狀態
  loadTypingCard();
}

// 3. 載入打字卡片 (一般練習模式)
function loadTypingCard() {
  typingCard.classList.remove("hidden");
  bossCard.classList.add("hidden");
  renderWord(wordDisplay, festivals[currentMonthIdx].words);
  typeInput.focus();
}

// 4. 渲染打字題目與字母顏色
function renderWord(displayEl, wordList) {
  const target = wordList[currentWordIdx];
  if (!target) return;
  
  document.getElementById("wordMeaning").textContent = target.m;
  document.getElementById("progress").textContent = `${currentWordIdx + 1} / ${wordList.length}`;
  
  displayEl.innerHTML = "";
  for (let char of target.w) {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    displayEl.appendChild(span);
  }
}

// 5. 監聽打字即時比對 (整合一般與 BOSS 戰邏輯)
typeInput.addEventListener("input", () => handleTyping(typeInput, wordDisplay, festivals[currentMonthIdx].words));
bossTypeInput.addEventListener("input", () => handleTyping(bossTypeInput, bossWordDisplay, festivals[currentMonthIdx].words));

function handleTyping(inputEl, displayEl, wordList) {
  const targetWord = wordList[currentWordIdx].w.toLowerCase();
  const inputVal = inputEl.value.toLowerCase();
  const letterSpans = displayEl.querySelectorAll(".letter");

  let hasError = false;

  // 比對每一個字母與智慧提示邏輯
  for (let i = 0; i < letterSpans.length; i++) {
    // 重置下劃線提示
    letterSpans[i].style.borderBottom = "none";

    if (i < inputVal.length) {
      if (inputVal[i] === targetWord[i]) {
        letterSpans[i].className = "letter correct";
      } else {
        letterSpans[i].className = "letter wrong";
        hasError = true;
      }
    } else {
      letterSpans[i].className = "letter";
    }
  }

  // 💡【修改點 1：智慧字母提示】當打錯字時，在下一個應該打的字母下方標註黃色提示線
  if (hasError && letterSpans[inputVal.length - 1]) {
    // 高亮顯示當前卡住或打錯的字母位置
    letterSpans[inputVal.length - 1].style.borderBottom = "3px solid #ffb703";
  }

  // 完全打對單字
  if (inputVal === targetWord) {
    currentWordIdx++;
    inputEl.value = ""; // 清空輸入框
    
    if (currentWordIdx < wordList.length) {
      renderWord(displayEl, wordList);
    } else {
      // 本月份單字全數完成
      handleMonthComplete();
    }
  }
}

// 6. 處理月份完成與解鎖機制
function handleMonthComplete() {
  if (!isBossMode) {
    // 一般單字打完，進入月底 BOSS 戰
    isBossMode = true;
    currentWordIdx = 0;
    typingCard.classList.add("hidden");
    bossCard.classList.remove("hidden");
    renderWord(bossWordDisplay, festivals[currentMonthIdx].words);
    bossTypeInput.focus();
    startBossTimer();
  } else {
    // BOSS 戰完成 -> 蓋章通關！
    clearInterval(bossTimer);
    showStampModal("PASSED!", true);
    
    // 解鎖下一個月份
    if (currentMonthIdx < festivals.length - 1 && !unlockedMonths.includes(currentMonthIdx + 1)) {
        unlockedMonths.push(currentMonthIdx + 1);
        localStorage.setItem('unlockedMonths', JSON.stringify(unlockedMonths)); // 保存解鎖進度
    }
  }
}

// 7. BOSS 戰限時挑戰（含重試彈性加時）
function startBossTimer() {
  // 如果是重試狀態，給予 65 秒慈悲加時，否則預設 45 秒
  const totalTime = isRetry ? 65 : 45;
  bossTimeLeft = totalTime;
  timerProgress.style.width = '100%';

  clearInterval(bossTimer); // 確保沒有重複計時器
  bossTimer = setInterval(() => {
    bossTimeLeft -= 0.1;
    timerProgress.style.width = (bossTimeLeft / totalTime) * 100 + '%';
    if (bossTimeLeft <= 0) {
      clearInterval(bossTimer);
      showStampModal("FAILED!", false); // 時間到，觸發友善重試彈窗
    }
  }, 100);
}

// 8. 💡【修改點 2：慈悲重試機制】顯示通關或友善重試 Modal
function showStampModal(text, isPassed) {
  document.getElementById("stampModalText").textContent = text;
  document.getElementById("stampGraphic").style.backgroundImage = `url(${festivals[currentMonthIdx].img})`;
  
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const nextBtn = document.getElementById("nextBtn");

  if (!isPassed) {
    // 友善失敗提示，降低挫折感
    modalTitle.textContent = "差一點點就成功了！";
    modalDesc.textContent = "魔王感受到你的努力，多給了你額外時間與字母提示！";
    nextBtn.textContent = "帶著加時再試一次 💪";
    nextBtn.onclick = () => {
      stampModal.classList.add("hidden");
      isRetry = true; // 標記為重試狀態
      currentWordIdx = 0; // 重置魔王關單字進度
      renderWord(bossWordDisplay, festivals[currentMonthIdx].words);
      bossTypeInput.value = "";
      bossTypeInput.focus();
      startBossTimer(); // 開啟加時版魔王戰
    };
  } else {
    // 通關獎勵提示
    modalTitle.textContent = "本月任務完成！";
    modalDesc.textContent = "恭喜獲得本節慶護照印章！解鎖下一個月份！";
    nextBtn.textContent = "解鎖下個月 ➔";
    nextBtn.onclick = () => {
      stampModal.classList.add("hidden");
      bossCard.classList.add("hidden");
      initPassport(); // 更新護照面板
      if (currentMonthIdx < festivals.length - 1) {
        switchMonth(currentMonthIdx + 1);
      }
    };
  }
  stampModal.classList.remove("hidden");
}

function closeTypingCard() {
    typingCard.classList.add("hidden");
}

// 初始啟動
switchMonth(currentMonthIdx);