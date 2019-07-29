import axios from 'axios';

const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?";


export const searchBooksDb = (query, callback) => {
    axios.get(`${googleBooksUrl}q=${query}`)
        .then((results) => {
            let books = results.data.items.map((b) => {
                //console.log(b.volumeInfo);
                console.log(b);
                let authorsList = "";
                let description = "";
                let cover = "";

                if (b.volumeInfo.authors) {
                    b.volumeInfo.authors.forEach(i => authorsList = authorsList + ", " + i);
                    authorsList = authorsList.slice(2, authorsList.length);
                } else {
                    authorsList = "No author info"
                }
                
                if (b.volumeInfo.description) {
                    description = b.volumeInfo.description;
                }
                let snippet = description.slice(0, 30).concat("...");

                if (b.volumeInfo.imageLinks) {
                    cover = b.volumeInfo.imageLinks.thumbnail;
                }

                return {
                    title: b.volumeInfo.title,
                    authors: authorsList,
                    cover: cover,
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
