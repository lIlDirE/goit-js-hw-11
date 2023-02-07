import '../css/styles.css';
import { returnFetch } from './fetchCountries';
import Notiflix from 'notiflix';
const inputForm = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more");
const gallery = document.querySelector('.gallery');
let searchedImage = '';

inputForm.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", moreImages);

function handleSubmit(event){
	event.preventDefault();
	if (event.target[0].value == "") {
		return Notiflix.Notify.failure("Please add the any searched word!");
	  } else if(event.target[0].value != searchedImage){
		searchedImage = event.target[0].value;
		returnFetch(searchedImage).then(getPromise).catch(newError);
		gallery.innerHTML = '';
		event.currentTarget.reset();
	  } else{
		
	  }
}	

async function getPromise(event){
	let markup = ``;
	if (event.total == 0){
		Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
	} else if(event.hits.length < 40){
		loadMore.style.display = 'none';
		Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
		} else{
		markup = await createCard(event.hits);
		gallery.innerHTML += markup;
		loadMore.style.display = 'block';
	}
}

function moreImages(){
	if (searchedImage === "") {
		return Notiflix.Notify.failure("Please add the any searched word!");
	  } else {
		returnFetch(searchedImage).then(getPromise).catch(newError); 
	  }
}

function createCard(arr = []) {
	return arr.map(
		({previewURL, likes, views, comments, downloads}) =>
	`<div class="photo-card">
		<img src="${previewURL}" alt="" loading="lazy" />
		<div class="info">
			<p class="info-item">
			<b>Likes ${likes}</b>
			</p>
			<p class="info-item">
			<b>Views ${views}</b>
			</p>
			<p class="info-item">
			<b>Comments ${comments}</b>
			</p>
			<p class="info-item">
			<b>Downloads ${downloads}</b>
			</p>
  		</div>
	</div>`).join('')
}

function newError(event){
	console.log(event);
}