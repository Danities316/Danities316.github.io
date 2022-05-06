//const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const endpoint = 'https://danities316.github.io/data/town.json';
const town = [];

fetch(endpoint)
.then(blob =>blob.json())
.then(data => {
town.push(...data)

})
.catch(err => console.log(err));
//console.log(town)

function findStates(wordToMatch, town){
   return town.filter(lga => {
    // console.log(lga.lgas[0])
     // here we need to figure out if the city or state matches what was searched
     //wordMatch is the pattern while 'gi' global match and ignore case 
    const regex = new RegExp(wordToMatch, 'gi');
   return lga.state.match(regex)  || lga.lgas[0].match(regex)
    
    //|| lga.lgas.match(regex);
  })
}


function numberWithCommas(y){
  return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const matchArray = findStates(this.value, town);
  const html = matchArray.map(lga =>{
    const regex = new RegExp(this.value, 'gi');
   const stateName = lga.state.replace(regex, `<span class='hl'> ${this.value} </span>`)
    const lgaName  = lga.lgas[0].replace(regex, `<span class='hl'> ${this.value} </span>`)
    return `
    <li>
      <span class = "name">${lgaName}, ${stateName}</span>
     
    </li>
    `;

  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
