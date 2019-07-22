exports.getReading = (books) => {
    return books.filter(b => {
        for (read of b.readings) {
            if (!read.finished) {
                return b;
            }
        }
    });
}