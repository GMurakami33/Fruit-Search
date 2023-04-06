const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) { 
	let results = [];

	// run a for loop through the fruit array to check with the entry submitted
	for (let i = 0; i < fruit.length; i++ ) { 
		// make the fruit name lower case to check for match 
		const fruitName = fruit[i].toLowerCase(); 
		// if match, push to the new array 
		if (fruitName.includes(str.toLowerCase())) {
			// new variable to bold the input word in suggestions
			const highlightedName = fruitName.replace(str.toLowerCase(), '<b>' + str.toLowerCase() + '</b>');
			results.push(highlightedName);
		}
	}
	return results;
}

function searchHandler(e) {
	// find the value of what is being typed in
	let inputVal = e.target.value.toLowerCase();
	// call the seach function on the value beign typed in the searchbar
	let results = search(inputVal);
	// pass results array and current value to the showSuggestions function
	showSuggestions(results,inputVal);
}

function showSuggestions(results, inputVal) {
	// clear any existing suggestion
	suggestions.innerHTML = ''; 
	
	// filter the results to only include strings that contain the input value
	let filteredResults = results.filter(fruitName => {
		return fruitName.toLowerCase().includes(inputVal); 
	}); 

	// create ul element to hold the filtered suggestion 
	let ul = document.createElement('ul'); 

	if (filteredResults.length === 0) { 
		// if no filtered results, return early and do not display anything
		return; 
	} else { 
		// iterate through the filtered results and create li elements for each one
    filteredResults.forEach(fruitName => {
      let li = document.createElement('li');
      li.innerHTML = fruitName;
      ul.appendChild(li);
    });
	}
	suggestions.appendChild(ul); 
}

function useSuggestion(e) {
	// check that the user has clicked on an li element
	if (e.target.nodeName === 'LI') {
		// if so, then change the input to the fruit name that was clicked on
		input.value = e.target.textContent; 
	}
	// clears the suggestion list 
	suggestions.innerHTML = ''; 
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);