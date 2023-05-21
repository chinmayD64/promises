console.log(`person 1 shows ticket`);
console.log(`person 2 shows ticket`);

const preMovie = async () => {
    const getTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`tickets`)
        }, 2000)
    })

    const getPopcorn = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`popcorn`)
        }, 4000);
    })

    const getCheeze = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`cheeze`);
        }, 6000)
    })

    const getColdDrink = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`cold drink`)
        })
    })

    const tickets = await getTickets;

    console.log(`wife gets ${tickets}`)  
    console.log(`husband: Lets go in`);
    console.log(`wife: No i am hungry`);

    const popcorns = await getPopcorn;

    console.log(`husband: I got some ${popcorns}. Now let's go in.`);
    console.log(`wife: I need cheeze on my ${popcorns}`);

    const cheeze = await getCheeze;

    console.log(`husband: Here's your ${popcorns} with ${cheeze}, Bring me some cold drink`);

    const coldDrink = await getColdDrink;

    console.log(`wife: Here's your ${coldDrink}`);
    console.log(`husband: Now we have ${cheeze}, ${popcorns}, ${coldDrink} and ${tickets}, Should we go in`);
    console.log(`wife: Yep`);
    console.log(`person 3 shows ticket`);
}

preMovie()
console.log(`person 4 shows ticket`);
console.log(`person 5 shows ticket`);