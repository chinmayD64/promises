console.log(`person 1 shows ticket`);
console.log(`person 2 shows ticket`);

const getTickets = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`ticket`);
    },2000);
}) 

const getPopcorn = getTickets.then((t) => {
    console.log(`wife brings the ${t}`);
    console.log(`husband: Lets go in`);
    console.log(`wife: No i am hungry`);
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`${t}, popcorn`)
        }, 2000);
    })
})

const getCheeze = getPopcorn.then((t) => {
    console.log(`husband: I got some popcorns. Now let's go in.`);
    console.log(`wife: I need cheeze on my popcorn`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${t}, cheeze`);
        }, 2000)
    })
})

const getColdDrink = getCheeze.then((t) => {
    console.log(`Husband: this is your popcorn with cheeze`)
    console.log(`Husband: i need a cold drink`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${t}, cold drink`);
        }, 2000)
    })
})

getColdDrink.then((t) => {
    console.log(`wife: Here's your cold drink`);
    console.log(`husband: Now we have ${t}, Should we go in`);
    console.log(`wife: Yep`);
    console.log(`person 3 shows ticket`);
})

console.log(`person 4 shows ticket`);
console.log(`person 5 shows ticket`);