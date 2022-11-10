const staticCarQuiz = "car-quiz-site-v1";
const assets = [
    "/",
    "/index.html",
    "/about/about.html",
    "/about/about.css",
    "/css/style.css",
    "/js/app.js",
    "/js/questions.js",
    "/quiz/quiz.css",
    "/quiz/quiz.html",
    "/quiz/questionsLvl1.json",
    "/quiz/questionsLvl2.json",
    "/quiz/questionsLvl3.json",
    "/quiz/question/question.css",
    "/quiz/question/question.html",
    "/images/mainPage.jpg",
    "/images/icons/",
    "/images/questionImg/lvl1/q1.jpg",
    "/images/questionImg/lvl1/q2.jpg",
    "/images/questionImg/lvl2/q1.jpg",
    "/images/questionImg/lvl2/q2.jpg",
    "/images/questionImg/lvl3/q1.jpg",
    "/images/questionImg/lvl3/q2.jpg"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCarQuiz).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});