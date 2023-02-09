import axios from "axios";

const BASE_URL = `https://pixabay.com/api/?key=33366333-0003f8d7ddc57df9984e9b7db&q=`;
const PROPERTIES = `&image_type=photo&pretty=true+&per_page=40`;
let counter = 0;
let previousRequest;

function checkingForOldRequest(request){
	if(previousRequest == request){
		return pageCounterNew();
	} else{
		return pageCounterNew();
	}	
}

export async function returnFetch(request){
	const response = await axios.get(
		`${BASE_URL}+${request}+${PROPERTIES}+${checkingForOldRequest(request)}`
	  );
	  	if(response.status == 200){
			return response.data.hits;
		} throw new Error(response.statusText);
}

function pageCounterNew(){
	counter = 1;
	return `&page=${counter}`;
}

function pageCounterRepeat(){
	counter += 1;
	return `&page=${counter}`;
}