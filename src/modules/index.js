import '../css/styles.css';
import { returnFetch } from './fetchCountries';
import Notiflix from 'notiflix';
const inputForm = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more");
const gallery = document.querySelector('.gallery');
let searchedImage = '';

inputForm.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", moreImages);

async function handleSubmit(event){
	event.preventDefault();
	if (event.target[0].value == "") {
		return Notiflix.Notify.failure("Please add the any searched word!");
	  } else {
		searchedImage = event.target[0].value.trim(); // если записать его перед if, поиск будет работать не корректно для кнопки loadMore если пользователь пойдет искать пустую строку
		event.currentTarget.reset();
		gallery.innerHTML = '';
		const hitsPromise = await returnFetch(searchedImage);
		getPromise(hitsPromise);
	  }
}	

function getPromise(event){
	let markup = ``;
	if (event.length == 0){
		Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
	} else if(event.length < 40){
		loadMore.style.display = 'none';
		Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
		} else {
		markup = createCard(event);
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
		({previewURL, tags, likes, views, comments, downloads}) =>
	`<div class="photo-card">
		<img src="${previewURL}" alt="${tags}" loading="lazy" />
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