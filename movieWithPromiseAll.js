console.log(`person 1 shows ticket`);
console.log(`person 2 shows ticket`);

const preMovie = async () => {
    const getTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`tickets`)
        }, 2000)
    })

    const getPopcorn = new Promise((resolve, reject) => {
        resolve(`popcorn`)
    })

    const getCheeze = new Promise((resolve, reject) => {
        resolve(`cheeze`);
    })

    const getColdDrink = new Promise((resolve, reject) => {
        resolve(`cold drink`)
    })

    let tickets = await getTickets;
    console.log(`wife brought ${tickets}`);

    let [ popcorn, cheeze, coldDrink ] = await Promise.all([ getPopcorn, getCheeze, getColdDrink ]);
    console.log(`${popcorn}, ${cheeze}, ${coldDrink}`);

    return tickets
}

preMovie().then((t) => {console.log(`person 3 shows ${t}`)});

console.log(`person 4 shows ticket`);
console.log(`person 5 shows ticket`);