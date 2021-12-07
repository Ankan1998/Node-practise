const sum = async (x,y)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (x<0 || y<0){
                return reject("Numbers are Negative")
            }
            resolve(x+y)
        }, 1000)
    })
}

const work = async(a,b)=>{
    const addition = await sum(a,b)
    const addition2 = await sum(addition,b)
    const addition3 = await sum(addition2,-8)
    return addition3
}

work(3,4).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log("Something went wrong: ", e)
})