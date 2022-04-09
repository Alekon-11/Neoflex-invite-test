'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const finalPrice = document.querySelector('.place-order__final-price');
    const parent = document.querySelector('.main');
    let cart = document.querySelector('#cart');
    let counter = document.createElement('div');

    parent.addEventListener('click', (e) => {
        let cards = document.querySelectorAll('.selected-goods__item');
        if(e.target && e.target.matches('[data-counter="plus"]')){
            cards.forEach(item => {
                if(item === e.target.parentNode.parentNode){
                    let current = item.querySelector('span');
                    ++current.textContent; 
                    setQuantityItems(item, '.selected-goods__price', '.selected-goods__total',current);
                }
            });
        }
        if(e.target && e.target.matches('[data-counter="minus"]')){
            cards.forEach(item => {
                if(item === e.target.parentNode.parentNode){
                    let current = item.querySelector('span');
                    --current.textContent;
                    setQuantityItems(item, '.selected-goods__price', '.selected-goods__total',current);
                }
            });
        }
    });

    parent.addEventListener('click', (e) => {
        let cards = document.querySelectorAll('.selected-goods__item');
        if(e.target && e.target.parentNode.classList.contains('remove')){
            cards.forEach(item => {
                if(item === e.target.parentNode.parentNode){
                    removeItem(item);
                }
            });
        }
    });

    function setQuantityItems(elem, priceSelector, totalselectorm, num){
        let price = elem.querySelector(priceSelector);
        let total = elem.querySelector(totalselectorm);
        if(num.textContent <= 0){
            removeItem(elem);
        }
        total.textContent = `${price.textContent.replace(/\D/ig,'') * num.textContent} ₽`;
        finalPrice.textContent = `₽ ${setFinalPrice(totalselectorm)}`;
        sessionStorage.setItem(`${elem.getAttribute('data-id')}`, num.textContent);

    }

    function removeItem(elem){
        elem.remove();
        sessionStorage.removeItem(`article:${elem.getAttribute('data-id')}`);
        sessionStorage.removeItem(elem.getAttribute('data-id'));
        finalPrice.textContent = `₽ ${setFinalPrice('.selected-goods__total')}`;
        addCounter(cart);
    }
    
    function setFinalPrice(list){
        let cardsPrice = document.querySelectorAll(list);
        let arr = [];
        cardsPrice.forEach(item => {
            arr.push(+item.textContent.replace(/\D/ig,''));
        });
        if(arr.length <= 0){
            return 0;
        }else{
            return arr.reduce((sum,current) => sum + current);
        }
    }

    function getAllArticle(){
        let total = [];
        for(let key in sessionStorage){
            total.push(key);
        }
        return total.filter(item => /article/i.test(item));
    }

    function addCounter(parent){
        if(getAllArticle().length){
            counter.classList.add('counter');
            counter.textContent = getAllArticle().length;
            parent.append(counter);
            return;
        }
        counter.remove();
    }

    addCounter(cart);

    class CartItem{
        constructor(img,naming,price,article,quantity){
            this.img = img;
            this.naming = naming;
            this.price = price;
            this.article = article;
            this.quantity = quantity;
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
                                    <span>${this.quantity}</span>
                                    <button data-counter="plus"></button>
                                </div>
                                <div class="selected-goods__total">${this.price} ₽</div>
                                <button class="remove selected-goods__remove">
                                    <img src="icons/remove.png" alt="remove">
                                </button>`;
            parent.append(card);
        }
    }

    function setCartItems(list){
        list.forEach(item => {
            let {img, naming, price, article} = JSON.parse(sessionStorage.getItem(`${item}`));
            new CartItem(img, naming, price, article, sessionStorage.getItem(article)).addGoods('.selected-goods__wrapper', 'selected-goods__item');
        });

        document.querySelectorAll('.selected-goods__item').forEach(item => {
            let current = item.querySelector('span');
            setQuantityItems(item, '.selected-goods__price', '.selected-goods__total',current);
        });

    }

    setCartItems(getAllArticle());

});