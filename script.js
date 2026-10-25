const serviceName = "이벤트 안내 서비스"
let isSubcribed = false;
let submitCount = 0;

function makeSubcribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다.";
    }

    return "이메일을 입력한 뒤 신청해주세요";
}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeBtn = document.querySelector("#subscribeBtn");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscribeEmail = emailInput.value.trim();

    if(subscribeEmail === ""){
        subscribeMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubcribed = true;
    submitCount += 1;
    subscribeMessage.textContent = makeSubcribeMessage(subscribeEmail, isSubcribed);

    subscribeMessage.classList.add("is-success");

    subscribeBtn.textContent = "신청 완료";
    subscribeBtn.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
    
}
themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput(){
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);

    nicknameCount.textContent = currentLength + " / " + maxLength;
}
nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange(){
    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed ? "알림 설정을 시작할 수 있습니다." : "동의 후 알림을 설정을 시작할 수 있습니다.";
    if(agreed){
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }
}
agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab){
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });

    panels.forEach(function (panel){
        panel.classList.remove("is-active");
        panel.hidden = true;
    })
}

function activateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-activate");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event){
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab){
    tab.addEventListener("click", handleTabClick);
});

const eventFlow = document.querySelector("#event-noti-flow");
const flowSteps = eventFlow.querySelectorAll(".step");
const progressItems = eventFlow.querySelectorAll(".progress__item");
const titleInput = document.querySelector("#game-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const timingOption = document.querySelector("#timing-option");
const timingOptions = document.querySelector("#timing-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButon = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryTiming = document.querySelector("#summary-timing");
const summaryEmail = document.querySelector("#summary-email");
const emailInputOption = document.querySelector("#email-input");
const emailError = document.querySelector("#email-error");
const emailMessage = document.querySelector("#emailMessage");
const emailPrev = document.querySelector("#email-prev");
const emailNext = document.querySelector("#email-next");

const range = (n) => Array.from({length:n}, (_, i) => i+1);
//Array [1, 2, .... 24]
const duartionValues = range(24);

const formData = {
    title:"", 
    duration: "13", 
    timing: false, 
    timingValue: "이벤트 시작 전",
    email : ""
};

function showStep(index) {
    flowSteps.forEach((step, i) => {step.hidden = i != index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const emailDialog = document.querySelector("#email-dialog");
const emailCancel = document.querySelector("#email-cancel");
const emailConfirm = document.querySelector("#email-confirm");

function revokeEamilAgreement() {
    agreeCheck.checked = false;
    eventFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    emailDialog.showModal();
});

emailCancel.addEventListener("click", () =>{
    emailDialog.close();
    revokeEamilAgreement();
});

emailDialog.addEventListener("cancel", revokeEamilAgreement);
emailConfirm.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    emailDialog.close();
    eventFlow.hidden = false;
    showStep(0);
    eventFlow.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();
    if(!value){
        titleError.textContent = "게임의 이름을 입력해주세요";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

function validateEmail() {
    const value = emailInputOption.value.trim();
    if(!value){
        emailError.textContent = "이메일을 입력해주세요";
        emailInputOption.classList.add("has-error");
        emailInputOption.focus();
        return false;
    }
    emailError.textContent = "";
    emailInputOption.classList.remove("has-error");
    formData.email = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    showStep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = duartionValues[durationRange.value] + "시";
});

timingOption.addEventListener("change", () => {
    timingOptions.hidden = !timingOption.checked;
});

emailPrev.addEventListener("click", () => {showStep(1)});
emailNext.addEventListener("click", () => {
    if(!validateEmail()) return;
    setSummary();
    showStep(3);
});

optionPrev.addEventListener("click", () => {showStep(0)});
optionNext.addEventListener("click", () => {
    formData.duration = duartionValues[durationRange.value];
    formData.timing = timingOption.checked;
    const count = document.querySelector('input[name="timing"]:checked');
    formData.timingValue = count.value;
    showStep(2);
});

function setSummary(){
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.duration + "시";
    summaryTiming.textContent = formData.timing ? formData.timingValue + "" : "미포함";
    summaryEmail.textContent = formData.email;
}

summaryPrev.addEventListener("click", () => {showStep(0)});
finishButton.addEventListener("click", () => {showStep(4)});
restartButon.addEventListener("click", () => {
    formData.title = "";
    formData.duration = "13";
    formData.timing = false;
    formData.timingValue = "이벤트 시작 전";
    formData.email = "";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    durationRange.value = "13";
    durationValue.value = "13시";
    timingOption.checked = false;
    timingOptions.hidden = true;
    document.querySelector('input[name="timing"][value="이벤트 시작 전"]').checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryTiming.textContent = "";
    summaryEmail.textContent = "";
    showStep(0);
});