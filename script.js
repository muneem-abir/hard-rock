const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');


function searchSongs(term){
    fetch(`https://api.lyrics.ovh/suggest/${term}`)
        .then(res => res.json())
        .then(data => {
            showSongs(data);
        })
}
function showSongs(data){
    let output = '';
    data.data.forEach(song => {
        output += `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                </div>
            </div>
        `;
    });
    result.innerHTML = `${output}`;
}


form.addEventListener('submit', e =>{
    e.preventDefault();
    const searchText = search.value.trim();
    if(!searchText){
        alert('Please type something to search');
    }
    else{
        searchSongs(searchText);
    }
})
result.addEventListener('click', e => {
    const clickedBtn = e.target;
    if(clickedBtn.tagName === 'BUTTON'){
        const artist = clickedBtn.getAttribute('data-artist');
        const songTitle = clickedBtn.getAttribute('data-songtitle');

        getLyrics(artist , songTitle);
    }

})
function getLyrics(artist ,songTitle){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics;
            result.innerHTML = `
            <div class="single-lyrics text-center">
            <button class="btn go-back">&lsaquo;</button>
            <h2 class="text-success mb-4">${songTitle} - ${artist}</h2>
            <pre class="lyric text-white">${lyrics}</pre>
            </div>
            `;
        })
}