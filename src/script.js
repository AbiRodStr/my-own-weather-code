function handleSearchSubmit(event) {
  event.preventDefault();
}
let searchInput = document.querySelector("#searchFormInput");
console.log(searchInput.value);
let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);
