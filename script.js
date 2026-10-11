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

console.log(subscribeBtn)
console.log(subscribeMessage)

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