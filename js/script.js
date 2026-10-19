const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const dialog = document.querySelector("#gadgetDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogIcon = document.querySelector("#dialogIcon");

document.querySelectorAll(".gadget-card").forEach((card) => {
  card.addEventListener("click", () => {
    dialogTitle.textContent = card.dataset.title;
    dialogDescription.textContent = card.dataset.description;
    dialogIcon.textContent = card.querySelector(".gadget-art").textContent.trim();
    dialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
document.querySelector("#dialogOk").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const questions = [
  { question: "Doraemon sợ con vật nào nhất?", options: ["Mèo", "Chuột", "Chó"], answer: "Chuột", explanation: "Chính xác! Doraemon rất sợ chuột." },
  { question: "Doraemon đến từ thời đại nào?", options: ["Thế kỷ 19", "Thế kỷ 22", "Thế kỷ 25"], answer: "Thế kỷ 22", explanation: "Đúng rồi! Doraemon là mèo máy đến từ thế kỷ 22." },
  { question: "Bảo bối nào giúp đi đến nơi khác nhanh chóng?", options: ["Cánh cửa thần kỳ", "Bánh mì ghi nhớ", "Đèn pin thu nhỏ"], answer: "Cánh cửa thần kỳ", explanation: "Chuẩn luôn! Cánh cửa thần kỳ đưa bạn đến địa điểm mong muốn." },
  { question: "Ai là người bạn thân mà Doraemon thường giúp đỡ?", options: ["Nobita", "Jaian", "Suneo"], answer: "Nobita", explanation: "Chính xác! Doraemon đến để giúp đỡ Nobita." }
];
let currentQuestion = 0;
const questionEl = document.querySelector("#quizQuestion");
const optionsEl = document.querySelector("#quizOptions");
const feedbackEl = document.querySelector("#quizFeedback");
const nextButton = document.querySelector("#nextQuestion");

function renderQuestion() {
  const item = questions[currentQuestion];
  questionEl.textContent = item.question;
  optionsEl.replaceChildren();
  feedbackEl.textContent = "";
  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.dataset.answer = option;
    button.addEventListener("click", () => {
      optionsEl.querySelectorAll("button").forEach((choice) => {
        choice.disabled = true;
        if (choice.textContent === item.answer) choice.classList.add("selected");
      });
      if (option === item.answer) {
        feedbackEl.textContent = "🎉 " + item.explanation;
      } else {
        feedbackEl.textContent = "Gần đúng rồi! " + item.explanation;
        feedbackEl.style.color = "#b36b00";
      }
    });
    optionsEl.append(button);
  });
}
nextButton.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  feedbackEl.style.color = "";
  renderQuestion();
});
renderQuestion();
