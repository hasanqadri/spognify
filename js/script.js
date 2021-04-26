<!-- Created By CodingNepal -->
// Refactored by Spognify
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const nextBtnSec = document.querySelector(".next-1");
const nextBtnThird = document.querySelector(".next-2");
const nextBtnFourth = document.querySelector(".next-3");
const nextBtnFifth = document.querySelector(".next-4");
const nextBtnSixth = document.querySelector(".next-5");
const submitBtn = document.querySelector(".submit");
const submitBtn2 = document.querySelector(".submit2");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
formData = {'mood': "", 'activity': '', 'social': false, 'lyrics': false, 'isArtist': false, 'artist': ''}
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "apiKey",
    authDomain: "spognify.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://spognify-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var database = firebase.database();
const dbRef = firebase.database().ref();

function writeFormData(genre, uid, formData) {
    firebase.database().ref('genres/' + genre + '/' + uid).set({
        mood: formData['mood'],
        activity: formData['activity'],
        social: formData['social'],
        lyrics: formData['lyrics']
        isArtist: formData['isArtist'],
        artist: formData['artist']
    });
}
nextBtnFirst.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var mood = document.getElementById("mood").value;
    formData['mood'] = mood;
});
nextBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var activity = document.getElementById("activity").value;
    formData['activity'] = activity;


});
nextBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-75%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var social = document.getElementById("social").value;
    if (social[0].checked) {
        formData['social'] = true;
    }
});
nextBtnFourth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-100%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var lyric = document.getElementById("lyric").value;
    if (lyric[0].checked) {
        formData['lyric'] = true;
    }
});
nextBtnFifth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-125%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var isArtist = document.getElementById("isArtist").value;
    if (isArtist[0].checked) {
        formData['isArtist'] = true;
        var artist = document.getElementById("artist").value;
        formData['arist'] = artist;
    }

    dbRef.child("genres").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
});

nextBtnSixth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-150%";
    bullet[current - 1].classList.add("active");
    progressCheck[current -1].classList.add("active");
    progressText[current -1].classList.add("active");
    current += 1;
    bullet[current - 1].classList.add("active");
    progressCheck[current -1].classList.add("active");
    progressText[current -1].classList.add("active");
    current += 1;
});

submitBtn.addEventListener("click", function(){
    event.preventDefault();
    slidePage.style.marginLeft = "-175%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var rec = document.getElementById("rec").value;

    //Date.now() serves as unique id. Write data to db with genre
    writeFormData(rec, Date.now(), formData)

});

submitBtn2.addEventListener("click", function(){
    event.preventDefault();
    slidePage.style.marginLeft = "-175%";
    bullet[current - 1].classList.add("active");
    progressCheck[current -1].classList.add("active");
    progressText[current -1].classList.add("active");
    current += 1;
});
