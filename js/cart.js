'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const counter = document.createElement('div');
    counter.classList.add('counter');
    counter.textContent = sessionStorage.getItem("counter");
    if(+sessionStorage.getItem("counter")){
        cart.prepend(counter);
    }

});