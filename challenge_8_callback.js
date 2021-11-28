// Callback function are those function that are passed as reference to another 
// function and called inside that other function.
const sum = function(a,b, add_x){
    const s = add_x(a,b);
    console.log(s);
};

const add = function(x,y){
    return x+y;
}

sum(7,5,add);