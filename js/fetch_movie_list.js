// API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjcwODRkYzgxMjZhN2Q0YTJjNTY0NTI0ZjFlNjg5NCIsInN1YiI6IjY0NzQ2MDNjOTQwOGVjMDBhN2ZiNGFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8q-ScrA47MKBVXKXv7LALyn7qYF6qcrIM7fD3u1_200',
    },
};

const fetchData = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        options
    );
    const data = await res.json();
    return data.results;
};
export const makeMovieCards = async () => {
    const movies = await fetchData();
    const cardContainer = document.getElementById('cards-container');
    const movieInfo = [];
    cardContainer.innerHTML = movies
        .map((movie) => {
            movieInfo.push({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                rate: movie.vote_average,
                poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                date: movie.release_date,
            });
            return `
      <div class="card">
        <div class="card-rate">
            <img class="card-rate-left-star"
                src="img/star-black.png" alt="ratings" />
            <p>${movie.vote_average}</p>
        </div>
        <img class="card-poster"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster" />
        <div class="card-movie-info">
            <h2 class="card-movie-title">${movie.title}</h2>
            <h3 class="card-movie-genre">Action</h3>
        </div>
        <div class="card-play-trailer-button" id="card-play-trailer-button">
            <img src="img/play.png" alt="play button" />
            <h4>Play Trailer</h4>
        </div>
    </div>
      `;
        })
        .join('');
    // 카드 누르면 아이디값 나오게 하기
    // document.querySelectorAll('.card').forEach((el) => {
    //     el.addEventListener('click', (e) => {
    //         const targetId = e.currentTarget.getAttribute('_id');
    //         for (let i = 0; i < movieInfo.length; i++) {
    //             if (movieInfo[i].id == targetId) {
    //                 localStorage.setItem('id', movieInfo[i].id);
    //                 localStorage.setItem('title', movieInfo[i].title);
    //                 localStorage.setItem('overview', movieInfo[i].overview);
    //                 localStorage.setItem('rate', movieInfo[i].rate);
    //                 localStorage.setItem('poster', movieInfo[i].poster);
    //                 localStorage.setItem('date', movieInfo[i].date);
    //                 break;
    //             }
    //         }
    //         window.location.href = './상세페이지.html';
    //     });
    // });
};

// 검색한 영화만 나오게 하기
// export function filter() {
//     let search = document.getElementById('search').value.toLowerCase();
//     let card = document.getElementsByClassName('card');
//     const searchResultArr = [];
//     for (let i = 0; i < card.length; i++) {
//         let titleInputValue = card[i]
//             .getElementsByClassName('movie-title')[0]
//             .textContent.toLowerCase();
//         if (titleInputValue.includes(search)) {
//             card[i].style.display = 'flex';
//             searchResultArr.push(titleInputValue);
//         } else {
//             card[i].style.display = 'none';
//         }
//     }
//     if (!searchResultArr.length) {
//         alert('일치하는 결과가 없습니다.');
//         document.querySelectorAll('.card').forEach((element) => {
//             element.style.display = 'flex';
//             document.getElementById('search').value = '';
//         });
//     }
// }
