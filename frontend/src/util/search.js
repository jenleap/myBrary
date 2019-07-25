import axios from 'axios';

const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?";


export const searchBooksDb = (query, callback) => {
    axios.get(`${googleBooksUrl}q=${query}`)
        .then((results) => {
            let books = results.data.items.map((b) => {
                //console.log(b.volumeInfo);
                let authorsList = "";
                let description = "";
                b.volumeInfo.authors.forEach(i => authorsList = authorsList + ", " + i);
                authorsList = authorsList.slice(2, authorsList.length);
                if (b.volumeInfo.description) {
                    description = b.volumeInfo.description;
                }
                let snippet = description.slice(0, 30).concat("...");
                return {
                    title: b.volumeInfo.title,
                    authors: authorsList,
                    cover: b.volumeInfo.imageLinks.thumbnail,
                    description: description,
                    snippet: snippet
                }
            });
            console.log(books);
            callback(books);
        })
        .catch((err) => {
            console.log(err);
        }) 
};
