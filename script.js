const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("Input"),
synonyms = wrapper.querySelector(".synonyms .list"),
infoText = wrapper.querySelector(".info-text"),
volumeIcon = wrapper.querySelector(".word i"),
removeIcon = wrapper.querySelector(".search span"),
searchIcon = wrapper.querySelector(".fa-search ");
let audio;

function data(result, word){
    if(result.title){
        infoText.innerHTML = `can't find the meaning of <span>" ${word} "</span>. Please try to search another word`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
       
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);

        if( result[0].meanings[0].synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for(let i = 0; i < 5 ; i++) {
            let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${ result[0].meanings[0].synonyms[i]}</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
    
}
function search(word){
    searchInput.value = word;
    fetchApi(word);
}

function fetchApi(word){
    infoText.style.color = "#011";
    infoText.innerHTML = `Searching... the meaning of <span>" ${word} "<span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});
searchIcon.addEventListener("click",() => {
   let inputvalue = searchInput.value;
   console.log(inputvalue);
   fetchApi(inputvalue);
});

volumeIcon.addEventListener("click" , () => {
    audio.play();
});

removeIcon.addEventListener("click", () =>{
    searchInput.value="";
    searchInput.focus();
});

