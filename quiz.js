let questionIndex = 0;
let correctChoiceCounter = 0;
let currentAnswer = undefined;

// Soru listesi
let Questions = [{
        id: "1",
        text: "Derya'nın aklından tuttuğu sayının asal çarpanlarının en küçüğü 2, en büyüğü 5'tir.Buna göre, Derya'nın aklından tuttuğu sayı aşağıdakilerden hangisi olamaz?",
        answers: [{
                text: "100",
                isCorrect: false,
            },
            {
                text: "125",
                isCorrect: false,
            },
            {
                text: "150",
                isCorrect: false,
            },
            {
                text: "175",
                isCorrect: true,
            },
        ],
    },
    {
        id: "2",
        text: "Tsunami Felaketinde En Fazla Zarar Gören Güney Asya Ülkesi Aşağıdakilerden Hangisidir?",
        answers: [{
                text: "Endonezya ",
                isCorrect: true,
            },
            {
                text: "Srilanka ",
                isCorrect: false,
            },
            {
                text: "Tayland ",
                isCorrect: false,
            },
            {
                text: "Hindistan",
                isCorrect: false,
            },
        ],
    },
    {
        id: "3",
        text: "Aşağıda Verilen İlk Çağ Uygarlıklarından Hangisi Yazıyı İcat Etmiştir?",
        answers: [{
                text: "Hititler",
                isCorrect: false,
            },
            {
                text: "Elamlar ",
                isCorrect: false,
            },
            {
                text: "Sümerler",
                isCorrect: true,
            },
            {
                text: "Urartular",
                isCorrect: false,
            },
        ],
    },
    {
        id: "4",
        text: "Bir Sebepten Dolayı Tek Kulağına Küpe Takan Osmanlı Padişahı Kimdir?",
        answers: [{
                text: "Kanuni Sultan Süleyman",
                isCorrect: false,
            },
            {
                text: "Yavuz Sultan Selim",
                isCorrect: true,
            },
            {
                text: "Orhan Bey",
                isCorrect: false,
            },
            {
                text: "Fatih Sultan Mehmet",
                isCorrect: false,
            },
        ],
    },
    {
        id: "5",
        text: "'Labirentin Gölgesinde' ve 'Sembollerin Gölgesinde' adlı fantastik romanların yazarı kimdir?",
        answers: [{
                text: "Haldun Taner",
                isCorrect: false,
            },
            {
                text: "Mehmet Rauf",
                isCorrect: false,
            },
            {
                text: "Yahya Karakurt",
                isCorrect: true,
            },
            {
                text: "Yaşar Kemal",
                isCorrect: false,
            },
        ],
    },
];

// quizPageBody HTML elementinin içerisine her soru değiştiğinde
// yerleştirebilmek sorularımızın kapsayıcısı olan elementimizi aldık
let questionBody = document.querySelector("#quizPageBody");

// bu metot ile soru değişikliğinde aktif olan soruyu
// yani questionIndex index'ine sahip olan soruyu yeni soru olarak
// işleyip  questionBody elementinin içerisine eliyoruz
const questionRender = () => {
    let answersHtml = "";

    Questions[questionIndex].answers.forEach((item) => {
        answersHtml += `<div class="quiz_answers-answer" 
    data-iscorrect="${item.isCorrect}" 
    onclick="selectedChoice(this)">
     ${item.text}
    </div>`;
    });

    let questionHtml = `<div class="scope">
    <img class="loading" id="loading" src="./assets/images/loading.gif" alt="">
    <div class="quiz_question">
    <h3>Soru ${questionIndex + 1}</h3>
    <p>
     ${Questions[questionIndex].text}
    </p>
    </div>
    <div class="quiz_answers">
    ${answersHtml}
    </div> 
    </div>`;

    questionBody.innerHTML = questionHtml;
};

// önceki bir seçim varsa bu kaldırılır
// daha sonra seçilen cevap belirlenir
const selectedChoice = (e) => {
    if (questionIndex != Questions.length) {
        let questionAnswers = Array.from(
            document.getElementsByClassName("quiz_answers-answer")
        );
        for (let i = 0; i < questionAnswers.length; i++) {
            if (questionAnswers[i].classList.contains("selected")) {
                questionAnswers[i].classList.remove("selected");
                break;
            }
        }
        e.classList.add("selected");
        currentAnswer = e;
    }
};

//geçişte yüklenme fotoğrafı koydum.
const loading = () => {
    document.getElementById("loading").style.display = "block";
};
// bir sonraki soruya geçmek için kullanılır
const nextQuestion = () => {
    // eğer bir soru seçimi yapıldıysa
    // bir aksyion veriyoruz aksi durumda hiçbirşey yapmadık
    if (currentAnswer != undefined) {
        // doğru soru seçildiyse seçilen elemen'a 'correct' class'ını ekleyip
        // doğru olarak gösterdi
        loading(); //soru seçimi yapmadığı zamanda loading gifi çalışıyordu. bu if'in içine aldım. soru seçimi olmadığı zaman çalışmıyor.
        if (currentAnswer.dataset.iscorrect == "true") {
            currentAnswer.classList.add("correct");
            correctChoiceCounter++;
        } else {
            /**
             * seçilen soru yanlış ise seçilen eleman'a 'wrong' classını ekledik
             * bu ekleme cevabının yanlış olduğunu gösteren kırmızı rengi ekledi
             * ve daha sonra cevaplarımız içinde doğru olanı bulup ona 'correct'
             * classını ekleyerek doğru olan cevabı gösterdik
             */
            currentAnswer.classList.add("wrong");
            let questionAnswers = Array.from(
                document.getElementsByClassName("quiz_answers-answer")
            );
            for (let i = 0; i < questionAnswers.length; i++) {
                if (questionAnswers[i].dataset.iscorrect == "true") {
                    questionAnswers[i].classList.add("correct");
                    break;
                }
            }
        }
        /**
         * eğer aktif soru son soru ise
         * kullanıcıya doğru bilgisini ve başarı oranını gösteriyoruz
         */
        if (Questions.length - 1 == questionIndex) {
            questionIndex += 1;
            setTimeout(() => {
                finishAlert();
                document.getElementById("loading").style.display = "none";
                /*Bu normal alertle olan kullanımı yani önceki hali
                                 let alert = window.confirm(`Toplam ${correctChoiceCounter} doğru yaptınız başarı oranınız : %${(correctChoiceCounter / Questions.length) * 100}`);
                                 if (alert == true) {
                                     window.location.reload();
                                 }
                                */
            }, 500);
        } else {
            // eğer son soru değil se 500ms sonra sonraki soruya geçiriyoruz
            setTimeout(() => {
                questionRender();
            }, 500);
        }
        questionIndex += 1;
        currentAnswer = undefined;
    }
};

const prevQuestion = () => {
    if (questionIndex != 0) {
        questionIndex -= 1;
        questionRender();
    }
};
// sayfa ilk açıldığında ilk soruyu getirmesi için
// "questionRender" metodumuzu bi kere çalıştırıyoruz
questionRender();
//Soru Numarasına tıkladığı zaman soruyu getiriyor
const choosequestion = Array.from(document.querySelectorAll(".item"));
choosequestion.forEach((item) => {
    item.addEventListener("click", (e) => {

        //tıklanılan soru numarasını active ediyor.
        choosequestion.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        });
        item.classList.add("active");

        //tek tek soruları getiriyor
        for (let i = 0; i < Questions.length; i++) {
            if (e.target.innerHTML == Questions[i].id) {
                /**
                 * document.querySelector(".quiz_question").innerHTML = Questions[i].text;
                 * document.querySelector(".quiz_answers").innerHTML = Questions[i].answers;
                 */
                let answersHtml = "";
                Questions[i].answers.forEach((item) => {
                    answersHtml += `<div class="quiz_answers-answer" 
                data-iscorrect="${item.isCorrect}" 
                onclick="selectedChoice(this)">
                ${item.text}
                </div>`;
                });

                const updateHtml = document.querySelector(".scope");
                updateHtml.innerHTML = `<div class="scope">
                <img class="loading" id="loading" src="./assets/images/loading.gif" alt="">
                <div class="quiz_question">
                <h3>Soru ${i + 1}</h3>
                <p>
                ${Questions[i].text}
                </p>
                </div>
                </div>
                <div class="quiz_answers">
                ${answersHtml}
                </div> `;
            }
        }
    });
});

//Sayfa ilk defa yüklenirken açılıcak sweetaAlert
const startAlert = () => {
    swal({
        title: "Hoşgeldiniz!",
        text: "Sınava başlamaya hazır mısın?",
        icon: "warning",
        button: "Hazırım",
    }).then(function(e) {
        if (e) {
            console.log(e);
        } else {}
    });
};
startAlert();

//Bütün sorular cevaplanınca açılıcak alert
const finishAlert = () => {
    swal({
        title: "Sınavınız Bitmiştir!",
        text: `Toplam Doğru Sayısı : ${correctChoiceCounter}  \n Başarı Oranınız : %${
      (correctChoiceCounter / Questions.length) * 100
    }`,
        icon: "success",
        buttons: ["Bitir", "Yeniden Başla"],
    }).then(function(e) {
        if (e) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            window.location = "https://stackoverflow.com/";
        }
    });
};