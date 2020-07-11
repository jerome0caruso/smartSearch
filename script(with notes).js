
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; // will become the main array for all the city's

fetch(endpoint)//grabs data from url (JSON)
.then(blob => blob.json()) //with the raw data it received, returns another promise and converts json to an
.then(data => cities.push(...data))//array of objects, then push with spread op. To create 1 big array in cities
                                   //no need for a loop?

function findMatches(wordToMatch, cities) {
    let regex = new RegExp(wordToMatch, "gi");//creates a regex ex."/bos/gi"
    return cities.filter(place => place.city.match(regex) || place.state.match(regex));//Does city or ST match the reg, if y return them.
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities); //runs the match-Fn and uses the value(input) as an argument
    const html = matchArray.map(place => { //Iterating over array of cities that returned from match
        let regex = new RegExp(this.value, "gi")//creates a regex ex."/new/gi" of what person typed
        let cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)//replaces input with input wrapped in a span
        let stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)//for the highlight feature
        //This inserts the matches into the UI list
        return `
        <li>
            <span class="name"> ${cityName}, ${stateName}</span>
            <span class="population"> ${numWithComma(place.population)}</span>
        </li>
        `                                                  
    }).join("") //joins the array into one string
    suggestions.innerHTML = html;
}
function numWithComma(num){//regex adds a comma after ever three numbers
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const searchInput = document.querySelector(".search");//grabs UI search input
const suggestions = document.querySelector(".suggestions");//grabs UI for the list

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);