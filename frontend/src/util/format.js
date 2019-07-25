export const readBooks = (books) => {
    return books.map( b => {
        let isReading = false;
        for (let read of b.readings) {
            if (!read.finished) {
                isReading = true;
            }
        }

        return {
            ...b,
            currentlyReading: isReading
        }
    });
}