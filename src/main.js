import Genre from './classes/Genre.js'; //importar la clase
import {  URL_GENRES   } from './helpers/api.js' //importar URL de apis

const genreSelect = document.querySelectorAll('select')[0]; //Seleccionar el selector de generos
const bookSelect = document.querySelectorAll('select')[1]; //Seleccionar el selector de generos
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

// Funcion para parsear a objeto Literal los datos
function parseToGenreObjects(data){
    //Devolver la promesa ya que pide explicitamente una promesa
    return new Promise((resolve, reject) => {
            if (!data || data.length === 0){
                return reject(new Error('No hay datos de géneros'));
            }else{
            const genres = data.map(item => new Genre(item.text, item.value)); //map te devuelve el array del mismo tamaño modificado
            resolve(genres);
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

//Funcion del evento para añadir al selecto
async function genres(){
    try {
        const genresData = await fetchGenres(URL_GENRES); //Para obtener los generos de la api
        const genreObjects = await parseToGenreObjects(genresData); //Parsear dichos datos a objeto literal
        genreSelectOptions(genreObjects); //Añadirlos al selector
        genreSelect.addEventListener("change", (e) =>{
            
        });
    } catch (error) {
        console.error(error);
    }
}

genres();
