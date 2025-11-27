import Genre from './classes/Genre.js'; //importar la clase
import {  URL_GENRES , URL_BOOKS/*, URL_FILTER*/  } from './helpers/api.js' //importar URL de apis
const genreSelect = document.querySelectorAll('select')[0]; //Seleccionar el selector de generos
const bookSelect = document.querySelectorAll('select')[1]; //Seleccionar el selector de generos
const bookJson = await fetchBooks(URL_BOOKS);
const img = document.querySelector("img");
//elijo la primera opcion
const firstOptionGenre = genreSelect[0];
const firstOptionBook = bookSelect[0];

// Funcion para obtener los generos mediante la URL
async function fetchGenres(url){ 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener géneros:", error);
        throw error;
    }

}

async function fetchBooks(url){ 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        throw error;
    }

}

// Funcion para parsear a objeto Literal los datos
function parseToObjects(data){
    //Devolver la promesa ya que pide explicitamente una promesa
    return new Promise((resolve, reject) => {
            if (!data || data.length === 0){
                return reject(new Error('No hay datos de géneros // parseToGenreError'));
            }else{
            const genres = data.map(item => new Genre(item.text, item.value)); //map te devuelve el array del mismo tamaño modificado
            //const books = data.map(item => (item.name));
            resolve(genres/*, books*/);
            }
    });
}
// Función para añadir los datos de generos en el selector
function genreSelectOptions(genres) {
    genreSelect.innerHTML = '';
    genreSelect.append(firstOptionGenre);
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.value;
        option.textContent = genre.text;
        genreSelect.appendChild(option);
    });
}

function bookSelectOptions(books) {
    bookSelect.innerHTML = '';
    bookSelect.append(firstOptionBook);
    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.name;
        option.textContent = book.name;
        bookSelect.appendChild(option);
    });
}

//Funcion del evento para añadir al selecto
async function funtionalSelects(){
    try {
        const genresData = await fetchGenres(URL_GENRES); //Para obtener los generos de la api
        const genreObjects = await parseToObjects(genresData); //Parsear dichos datos a objeto literal
        genreSelectOptions(genreObjects); //Añadirlos al selector
        genreSelect.addEventListener("change", (e) =>{  
        const bookFilter = bookJson.filter(b => b.genre === genreSelect.value)
        bookSelectOptions(bookFilter);
        if(firstOptionGenre.value === e.target.value){
                img.src = "/public/default.png" 
        }
        
        bookSelect.addEventListener("change" , (e) =>{
            let BookTitle = e.target.value;
            let CoverTitle =  bookJson.find((b) => b.name === BookTitle);
            if(BookTitle === firstOptionBook.value){
                img.src = "/public/default.png" 
            }else{
                img.src = CoverTitle.cover;
            }
        })
        });
    } catch (error) {
        console.error(error);
    }
}

funtionalSelects();
