import axios from 'axios';

const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?";


export const searchBooksDb = (query, callback) => {
    axios.get(`${googleBooksUrl}q=${query}`)
        .then((results) => {
            console.log(results);
            let books = results.data.items.map((b) => {
                let authorsList = "";
                b.volumeInfo.authors.forEach(i => authorsList = authorsList + ", " + i);
                authorsList = authorsList.slice(2, authorsList.length);
                return {
                    title: b.volumeInfo.title,
                    authors: authorsList,
                    cover: b.volumeInfo.imageLinks.thumbnail,
                    description: b.volumeInfo.description,
                    snippet: b.searchInfo.textSnippet
                }
            });
            callback(books);
        })
        .catch((err) => {
            console.log(err);
        }) 
};
