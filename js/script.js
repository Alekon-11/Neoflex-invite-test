'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const parent = document.querySelector('.main');
    let cart = document.querySelector('#cart');
    let counter = document.createElement('div');

    parent.addEventListener('click', (e) => {
        let cards = document.querySelectorAll('.card');

        if(e.target && e.target.classList.contains('card__buy-btn')){
            cards.forEach(item => {
                if(item === e.target.parentNode.parentNode){
                    // getData('data.json')
                    // .then(data => {
                    //     getCardData(data[0], item);
                    //     getCardData(data[1], item);
                    //     sessionStorage.setItem(item.getAttribute('data-id'), 1);      // <---- Работа с JSON 
                    //     addCounter(cart);
                    // })
                    // .catch(() => {
                    //     console.log('Error');
                    // });
                    getCardData(headphones,item);
                    getCardData(wirelessHeadphones,item);
                    sessionStorage.setItem(item.getAttribute('data-id'), 1);
                    addCounter(cart);
                }
            });
        }
    });

    function getCardData(list,card){
        let arr = list.map(item => item.article);
        arr.forEach((item,num) => {
            if(item == card.getAttribute('data-id')){
                sessionStorage.setItem(`article:${item}`, JSON.stringify(list[num]));
            }
        });
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

    //-------------------------------------------------------------- Получение данных через data.json 

    async function getData(data){
        const res = await fetch(data);
        if(!res.ok){
            throw new Error(alert('Invalid server path! Try later :)'));
        }

        return await res.json();
    }

    getData('data.json')
    .then(data => {
        setGoods(data[0], '.headphones');
        setGoods(data[1], '.wireless-headphones');
        return data;
    })
    .catch(() => {
        console.log('Error');
    });

    //-------------------------------------------------------------- Получение данных через массив

    const headphones = [
        {
            img: "images/headphones/AppleBYZ.png",
            alt: 'apple-byz',
            naming: "Apple BYZ S852I",
            price: 2927,
            rate: 4.7,
            article: "sf8t0001",
            oldPrice: 3527
        },
        {
            img: "images/headphones/AppleEarPods.png",
            alt: 'apple-earPods',
            naming: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0002"
        },
        {
            img: "images/headphones/AppleEarPodsBox.png",
            alt: 'apple-earPods',
            naming: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0003"
        },
        {
            img: "images/headphones/AppleBYZ.png",
            alt: 'apple-byz',
            naming: "Apple BYZ S852I",
            price: 2927,
            rate: 4.7,
            article: "sf8t0004",
            discount: 20
        },
        {
            img: "images/headphones/AppleEarPods.png",
            alt: 'apple-earPods',
            naming: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0005"
        },
        {
            img: "images/headphones/AppleEarPodsBox.png",
            alt: 'apple-earPods',
            naming: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0006"
        }
    ];

    const wirelessHeadphones = [
        {
            img: "images/wireless-headphones/AppleAirPods.png",
            alt: 'apple-airPods',
            naming: "Apple AirPods",
            price: 9527,
            rate: 4.7,
            article: "sf8t0007"
        },
        {
            img: "images/wireless-headphones/GERLAX-GH-04.png",
            alt: 'gerlax-gh04',
            naming: "GERLAX GH-04",
            price: 6527,
            rate: 4.7,
            article: "sf8t0008"
        },
        {
            img: "images/wireless-headphones/BOROFONE-BO4.png",
            alt: 'borofone-bo4',
            naming: "BOROFONE BO4",
            price: 7527,
            rate: 4.7,
            article: "sf8t0009"
        }
    ];

    class CartItem{
        constructor(img, alt, naming, price, rate, article){
            this.img = img;
            this.alt = alt;
            this.naming = naming;
            this.price = price;
            this.rate = rate;
            this.article = article;
        }

        addGoods(parentSelector){
            const parent = document.querySelector(parentSelector);

            const card = document.createElement('div');
            card.setAttribute('data-id', `${this.article}`);
            card.classList.add('card','goods__card');
            card.innerHTML = `<div class="card__photo"><img src="${this.img}" alt="${this.alt}"></div>
                              <div class="card__properties">
                                  <h4 class="card__naming">${this.naming}</h4>
                                  <div class="card__price">${this.price} ₽</div>
                                  <div class="card__rate"><img src="icons/rate.svg" alt="rate-star">${this.rate}</div>
                                  <button type="button" class="card__buy-btn">Купить</button>
                              </div>`;
            parent.append(card);
        }
    }

    function setGoods(list, parentSelector){
        for(let i = 0; i < list.length; i++){
            const {img, alt, naming, price, rate, article} = list[i];
            new CartItem(img, alt, naming, price, rate, article).addGoods(parentSelector);
        }
        list.forEach((item,num) => {
            creatMod(num, '.card', '.card__price', 'card__price_old', 'price-old', item.oldPrice, `${item.oldPrice} ₽`);
            creatMod(num, '.card', '.card__price', 'card__price_discount', 'price-discount', item.discount, `-${item.discount}%`);
        });
    }


    function creatMod(n, cardSelector, priceSelector, priceClass, modClass, itemKey, content){
        if(itemKey){
            let cards = document.querySelectorAll(cardSelector);
            let price = cards[n].querySelector(priceSelector);
            let mod = document.createElement('div');
            price.classList.add(priceClass);
            mod.classList.add(modClass);
            mod.textContent = content;
            price.append(mod);
        }
    }

    setGoods(headphones, '.headphones');
    setGoods(wirelessHeadphones, '.wireless-headphones');

});