
// Trending button to go on the trending page
let GoTrending = () => {
    window.location.href = "./trending.html"
}

// Slideshow Start 
let slideIndex2 = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex2++;
    if (slideIndex2 > slides.length) {
        slideIndex2 = 1
    }
    slides[slideIndex2 - 1].style.display = "block";
    setTimeout(showSlides, 4000); // change image in every 4 seconds
}
// Slideshow End

// API of Movie
let getData = async () => {
    const search = document.querySelector('#search').value;
    let key = "2c6bb4d"
    let url = `https://www.omdbapi.com/?s=${search}&apikey=${key}`

    try {
        let res = await fetch(url)
        let data = await res.json()
        if (data.Search != undefined) {
            console.log(data.Search)
            display(data.Search)
        }
        else {
            const movieDiv = document.querySelector('#movieDiv');
            movieDiv.innerHTML = null

            const noResultDiv = document.createElement('div');
            noResultDiv.setAttribute("id", "noResultDiv")
            noResultDiv.innerHTML = null

            const p = document.createElement('p');
            p.innerText = "No Result Found"
            noResultDiv.append(p)

            movieDiv.append(noResultDiv)
        }

    }
    catch (err) {
        console.log(err)
    }
}

// for display recommendation data
let display = (data) => {
    const list = document.createElement('div');
    list.setAttribute("id", "list")
    list.innerHTML = null

    const movieDiv = document.querySelector('#movieDiv');
    movieDiv.innerHTML = null
    data.forEach(function (elem) {

        const recommendDiv = document.createElement('div'); // creat div for poster
        recommendDiv.setAttribute("class", "recommendDiv")
        recommendDiv.addEventListener("click", function () {
            getMovieDetails(elem)
        })

        const posterimg = document.createElement('img');
        posterimg.setAttribute("class", "posterimg")
        posterimg.src = elem.Poster

        const title = document.createElement('h4');
        title.innerText = elem.Title
        recommendDiv.append(posterimg, title)

        list.append(recommendDiv)

        movieDiv.append(list)
    })
}

let id;

// added debauncing with delay of 0.5s
let debauncing = (func, delay) => {
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function () {
        func()
    }, delay)
}

// function for getting data and append
let getMovieDetails = (elem) => {
    localStorage.setItem("clickedMovie", JSON.stringify(elem))
    let clickedMovie = JSON.parse(localStorage.getItem("clickedMovie"))
    getClickedMovieData(clickedMovie)
}

// function for display details after click on recommendation list
function getClickedMovieData(data) {

    const Slideshow = document.querySelector('#Slideshow');
    Slideshow.innerHTML = ""

    const movieDiv = document.querySelector('#movieDiv');
    movieDiv.style.display = "none"

    const movieDetail = document.querySelector('#movieDetail');
    movieDetail.innerHTML = ""

    const moviebox = document.createElement('div');
    moviebox.setAttribute("id", "moviebox")

    const imgDiv = document.createElement('div');
    imgDiv.setAttribute("id", "imgDiv")

    const img = document.createElement('img');
    img.src = data.Poster

    imgDiv.append(img)

    const movietitleDiv = document.createElement('div');
    movietitleDiv.setAttribute("id", "movietitleDiv")

    const titleSpan = document.createElement('span');
    titleSpan.innerText = data.Title

    const title = document.createElement('h4');
    title.innerText = "Title: "
    title.append(titleSpan)

    const yearSpan = document.createElement('span');
    yearSpan.innerText = data.Year

    const year = document.createElement('p');
    year.innerText = "Release Data: "
    year.append(yearSpan)

    const imdbspan = document.createElement('span');
    imdbspan.innerText = data.imdbID

    const imdb = document.createElement('p');
    imdb.innerText = "Imdb: "

    imdb.append(imdbspan)

    movietitleDiv.append(title, year, imdb)

    moviebox.append(imgDiv, movietitleDiv)
    movieDetail.append(moviebox)
}

// function for display recommendation list after clicking on input
function serachDiv() {
    const movieDiv = document.querySelector('#movieDiv');
    movieDiv.style.display = "flex"
}

// function for unhide recommendation list after clicking outside
document.addEventListener('mouseup', function(e) {
    var movieDiv = document.getElementById('movieDiv');
    if (!movieDiv.contains(e.target)) {
        movieDiv.style.display = 'none';
    }
});