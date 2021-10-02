export const addItem = ( item , next ) => {

    let cart = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.push({ ...item, count : 1})

    // REMOVES DUPLICATES FROM ARRAY !!

    //Array.from() ---- this will create a new array,
    //new Set(cart) ---- this will store items in that array
    //this below whole will remove the duplicates from the array if exists;
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
}

export const itemTotal = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

export const getCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const updateCart = (id, count) => {
    let cart = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    cart.map((product, i) => {
        if(product._id === id){
            cart[i].count = count;
        }
    })

    localStorage.setItem("cart" , JSON.stringify(cart));
}

export const removeItemCart = (id) => {
    let cart = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    console.log(cart.length);

    cart.map((product, i) => {
        if(product._id === id) {
            cart.splice(i, 1);
        }
    })

    localStorage.setItem("cart" , JSON.stringify(cart));

    return cart; 
}

