let news = document.querySelector("#news")
let searchText = document.querySelector("#search")
let hackerNews = []
let filteredNews = []
let firstLoad = 0;

// Get Post Immediately Page Loads
function getPosts(){
    fetch('https://hn.algolia.com/api/v1/search?tags=front_page')
    .then((res) => res.json())
    .then((data) => {
        hackerNews = data.hits
        firstLoad = 1

        if(firstLoad == 1) {
            let output = ''
            hackerNews.forEach(function({title, url, author, points, objectID, created_at}){
                output += `
                <ul key=${objectID} class='news'>
                <li><b>${title}</b></li>
                <li>Author: ${author}</li>
                <li>Points: ${points}</li>
                <li>Date: ${created_at}</li>
                <button><a href=${url} target="_blank" rel="noreferrer">Read More</a></button>
                </ul>`
                
            })
            
            news.innerHTML = output
        }
    })
    .catch(err => console.log("Failed to GET Response From Server. Check your Network Connection."))
};

getPosts();

// Search through posts when a user begin search
searchText.addEventListener('keyup', function (event) {
    let searchData = ''     
    filteredNews = hackerNews?.filter( news =>{
        searchData = event.target.value;
        if(searchData === null)
        return news
        if(news?.title.toLowerCase().includes(searchData.toLowerCase())||news?.author.toLowerCase().includes(searchData.toLowerCase())){
            return news
        }

    })

    firstLoad = 2

    let output = ''
    filteredNews.forEach(function({title, url, author, points, objectID, created_at}){
        output += `
        <ul key=${objectID} class='news'>
        <li><b>${title}</b></li>
        <li>Author: ${author}</li>
        <li>Points: ${points}</li>
        <li>Date: ${created_at}</li>
        <button><a href=${url} target="_blank" rel="noreferrer">Read More</a></button>
        </ul>`
        
    })
    
    news.innerHTML = output
})
