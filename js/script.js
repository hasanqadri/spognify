//Created By CodingNepal
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
var formData = {'mood': "", 'activity': '', 'social': false, 'lyrics': false, 'isArtist': false, 'artist': ''}
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    authDomain: "spognify.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://spognify-default-rtdb.firebaseio.com/",
    storageBucket: "spognify.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
const dbRef = database.ref();
var finalSuggestion = "";

function writeFormData(genre, uid, formData) {
    firebase.database().ref('genres/' + genre + '/' + uid).set({
        mood: formData['mood'],
        activity: formData['activity'],
        social: formData['social'],
        lyrics: formData['lyrics'],
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
    formData['mood'] = mood.toLowerCase();
});
nextBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var activity = document.getElementById("activity").value;
    formData['activity'] = activity.toLowerCase();


});
nextBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-75%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    var social = document.getElementById("social").checked;
    if (social) {
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
    var lyric = document.getElementById("lyric").checked;
    if (lyric) {
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
    var isArtist = document.getElementById("isArtist").checked;
    if (isArtist) {
        formData['isArtist'] = true;
        var artist = document.getElementById("artist").value;
        formData['arist'] = artist.toLowerCase();
    }

    //Decide genre similarity based on form input
    var genreSimilarity = {}
    var ref = firebase.database().ref("genres");
    var key;
    var childData;
    var currSimilarity;
    ref.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                key = childSnapshot.key;
                genreSimilarity[key] = -1
                childSnapshot.forEach(function(gChildSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    // childData will be the actual contents of the child
                    childData = gChildSnapshot.val();
                    console.log(childData)
                    console.log(formData)
                    var mo = similarity(formData['mood'], childData['mood'])
                    var ac = similarity(formData['activity'], childData['activity'])
                    var so = (formData['social'] === childData['social']) ? .5 : 0
                    var ly = (formData['lyrics'] === childData['lyrics']) ? .6 : 0
                    var is = (formData['isArtist'] === childData['isArtist']) ? .2 : 0
                    var ar = similarity(formData['artist'], childData['artist'])
                    currSimilarity = mo + ac + so + ly + is + ar
                    if (genreSimilarity[key] < currSimilarity) {
                        genreSimilarity[key] = currSimilarity;
                    }
                });
            });
            console.log(genreSimilarity)
            finalSuggestion = Object.getOwnPropertyNames(genreSimilarity).reduce(function(a, b){ return genreSimilarity[a] > genreSimilarity[b] ? a : b });
            console.log(finalSuggestion)
            document.getElementById("finalSuggest").textContent = finalSuggestion.charAt(0).toUpperCase() + finalSuggestion.slice(1);
        });

});

nextBtnSixth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-150%";
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

});

submitBtn2.addEventListener("click", function(){
    event.preventDefault();
    slidePage.style.marginLeft = "-175%";
    var rec = document.getElementById("rec").value;

    //Date.now() serves as unique id. Write data to db with genre
    writeFormData(rec, Date.now(), formData)

});


//Stackoverflow for checking string similarity
//https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}