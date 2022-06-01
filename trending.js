
let key = "91e68b5bd9c651c933d952fc164482ca"
let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}`

async function getData() {
    try {

        let res = await fetch(url)
        let data = await res.json()
        console.log(data.results)
        display(data.results)

    } catch (err) {
        console.log(err)
    }
}
getData()


// function for creating elements
function creat(a) {
    return document.createElement(a)
}

function display(data) {
    data.forEach(function (elem) {
        const container = document.querySelector('#container');

        const movieBox = creat('div');
        movieBox.setAttribute("class", "movieBox")

        const poster = creat('img');
        poster.setAttribute("class", "poster")
        poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`

        const title = creat('h3');
        title.setAttribute("class", "title")
        title.innerText = elem.title

        let release_date_Span = creat('span')
        release_date_Span.innerText = elem.release_date

        let release_date = creat('p')
        release_date.setAttribute("class", "release_date")
        release_date.innerText = "Release date: "
        release_date.append(release_date_Span)

        let popularity_span = creat('span')
        popularity_span.innerText = elem.popularity

        let popularity = creat('p')
        popularity.setAttribute("class", "popularity")
        popularity.innerText = "Popularity: "
        popularity.append(popularity_span)

        movieBox.append(poster, title, release_date, popularity)
        container.append(movieBox)
    })

}

// Go Back to home page

let backHome = () =>{
    window.location.href = "./index.html"
}