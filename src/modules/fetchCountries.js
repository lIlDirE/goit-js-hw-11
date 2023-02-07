BASE_URL = `https://pixabay.com/api/?key=33366333-0003f8d7ddc57df9984e9b7db&q=`;
PROPERTIES = `&image_type=photo&pretty=true+&per_page=40`;
let counter = 0;
let previousRequest;

export function returnFetch(request){
	if (previousRequest == request){
		return fetch(`${BASE_URL}+${request}+${PROPERTIES}+${pageCounterRepeat()}`)	
		.then((response) => {
			if(response.ok){
				return response.json();
			} throw new Error(response.statusText);
		});
	} else{
		previousRequest = request;
		return fetch(`${BASE_URL}+${request}+${PROPERTIES}+${pageCounterNew()}`)
		.then((response) => {
			if(response.ok){
				return response.json();
			} throw new Error(response.statusText);
		});
	}
}

function pageCounterNew(){
	counter = 1;
	return `&page=${counter}`;
}

function pageCounterRepeat(){
	counter += 1;
	return `&page=${counter}`;
}