

const date = new Date();



function zeroFill(val) {
    return val > 10 ? val : `0${val}`
}

function formatDate() {
    const year = date.getFullYear();
    let month = zeroFill(date.getMonth() + 1);
    let day = zeroFill(date.getDate());
    let hour = zeroFill(date.getHours());
    let minutes = zeroFill(date.getMinutes());
    let second = zeroFill(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`;
}


console.log(formatDate())



console.log( new Date(new Date().toUTCString()))
