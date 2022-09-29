apiKey = 'AIzaSyBWKwHkhycZOswEI0qkKw2yLFRSifeRk4Y';

let main = async ( )=> {
    try{
        let query = document.getElementById("query").value ;

        if(query === ""){
            var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=${apiKey}` ;
        }else{
            var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apiKey}` ;
        }
        
        let response = await fetch(url) ;

        let snippet = await response.json() ;
        
        appendData(snippet.items) ;
    }catch(err){
        console.log(err) ;
    }    
}
main() ;

let appendData = (data) =>{

    let results = document.getElementById("results") ;

    results.innerHTML = null ;
    
    data.forEach(function(element){
        
        let title = element.snippet.title ;
        
        const div = document.createElement('div');
        
        const img = document.createElement('img');
        img.src = element.snippet.thumbnails.default.url ; ;

        const h3 = document.createElement('h3');
        h3.innerText = `${title}` ;

        div.append(img,h3) ;

        let videoId =  element.id.videoId || element.id ;
        let arr = [videoId,title] ;

        div.addEventListener("click", ()=>{
            playVideo(arr) ;
        }) ;

        results.append(div) ;
    }) ;
}

let playVideo = (data) => {
    document.location.href = "./playVideo.html" ;
    localStorage.setItem("videoId", JSON.stringify(data)) ;
}