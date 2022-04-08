'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const finalPrice = document.querySelector('.place-order__final-price');
    let parent = document.querySelector('.main');
    let cart = document.querySelector('#cart');
    let index = 1;
//-------------------------------------------------------------------------------------

    parent.addEventListener('click', (e) => {
        let cardsCounter = document.querySelectorAll('.selected-goods__counter');
        if(e.target && e.target.matches('[data-counter="plus"]')){
            cardsCounter.forEach((item, num) => {
                if(item === e.target.parentNode){
                    
                }
            });
        }
    });

//-------------------------------------------------------------------------------------
    
    function setFinalPrice(list){
        let cardsPrice = document.querySelectorAll(list);
        let arr = [];
        cardsPrice.forEach(item => {
            arr.push(+item.textContent.replace(/\D/ig,''));
        });
        if(arr.length <= 0){
            return 0;
        }else{
            return arr.reduce((sum,cur) => sum + cur);
        }
    }

//-------------------------------------------------------------------------------------

    function getAllArticle(){
        let total = [];
        for(let key in sessionStorage){
            total.push(key);
        }
        return total.filter(item => /article/i.test(item));
    }

    function addCounter(parent){
        let counter = document.createElement('div');

        if(getAllArticle().length){
            counter.classList.add('counter');
            counter.textContent = getAllArticle().length;
            parent.append(counter);
        }
    }

    addCounter(cart);

    class CartItem{
        constructor(img,naming,price,article){
            this.img = img;
            this.naming = naming;
            this.price = price;
            this.article = article;
        }

        addGoods(parentSelector, addingClass){
            const parent = document.querySelector(parentSelector);

            const card = document.createElement('div');
            card.setAttribute('data-id', `${this.article}`);
            card.classList.add(addingClass);
            card.innerHTML = `<div class="selected-goods__img">
                                    <img src="${this.img}" alt="">
                                </div>
                                <div class="selected-goods__naming">${this.naming}</div>
                                <div class="selected-goods__price">${this.price} ₽</div>
                                <div class="selected-goods__counter">
                                    <button data-counter="minus"></button>
                                    <span>1</span>
                                    <button data-counter="plus"></button>
                                </div>
                                <div class="selected-goods__total">${this.price} ₽</div>
                                <button class="remove selected-goods__remove">
                                    <img src="icons/remove.png" alt="remove">
                                </button>`;
            parent.append(card);
        }
    }

    function setCartItems(list, setPrice){
        list.forEach(item => {
            let {img, naming, price, article} = JSON.parse(sessionStorage.getItem(`${item}`));
            new CartItem(img, naming, price, article).addGoods('.selected-goods__wrapper', 'selected-goods__item');
        });

        finalPrice.textContent = `₽ ${setPrice('.selected-goods__total')}`;

    }

    setCartItems(getAllArticle(), setFinalPrice);

});