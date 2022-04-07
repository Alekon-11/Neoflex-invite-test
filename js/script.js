'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    let parent = document.querySelector('.main');
    let cart = document.querySelector('#cart');

    function addCounter(parent){
        let counter = document.createElement('div');
        let total = [];

        for(let key in sessionStorage){
            total.push(key);
        }
        
        total = total.filter(item => /article/ig.test(item)).length;

        if(total){
            counter.classList.add('counter');
            counter.textContent = total;
            parent.append(counter);
        }
    }

    addCounter(cart);

    parent.addEventListener('click', (e) => {
        let cards = document.querySelectorAll('.card');

        if(e.target && e.target.classList.contains('card__buy-btn')){
            cards.forEach(item => {
                if(item === e.target.parentNode.parentNode){
                    getCardData(headphones,item);
                    getCardData(wirelessHeadphones,item);
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
    //-------------------------------------------------------------- Получение данных через data.json 

    // async function getData(data){
    //     const res = await fetch(data);
    //     if(!res.ok){
    //         throw new Error(alert('Invalid server path! Try later :)'));
    //     }

    //     return await res.json();
    // }

    // getData('dataTest.json')
    // .then(data => {
    //     setGoods(data[0], '.headphones');
    //     setGoods(data[1], '.wireless-headphones');
    // })
    // .catch(() => {
    //     console.log('Error');
    // });

    //-------------------------------------------------------------- Получение данных через массив

    const headphones = [
        {
            img: "images/headphones/AppleBYZ.png",
            alt: 'apple-byz',
            title: "Apple BYZ S852I",
            price: 2927,
            rate: 4.7,
            article: "sf8t0001"
        },
        {
            img: "images/headphones/AppleEarPods.png",
            alt: 'apple-earPods',
            title: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0002"
        },
        {
            img: "images/headphones/AppleEarPodsBox.png",
            alt: 'apple-earPods',
            title: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0003"
        },
        {
            img: "images/headphones/AppleBYZ.png",
            alt: 'apple-byz',
            title: "Apple BYZ S852I",
            price: 2927,
            rate: 4.7,
            article: "sf8t0004"
        },
        {
            img: "images/headphones/AppleEarPods.png",
            alt: 'apple-earPods',
            title: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0005"
        },
        {
            img: "images/headphones/AppleEarPodsBox.png",
            alt: 'apple-earPods',
            title: "Apple EarPods",
            price: 2327,
            rate: 4.5,
            article: "sf8t0006"
        }
    ];

    const wirelessHeadphones = [
        {
            img: "images/wireless-headphones/AppleAirPods.png",
            alt: 'apple-airPods',
            title: "Apple AirPods",
            price: 9527,
            rate: 4.7,
            article: "sf8t0007"
        },
        {
            img: "images/wireless-headphones/GERLAX-GH-04.png",
            alt: 'gerlax-gh04',
            title: "GERLAX GH-04",
            price: 6527,
            rate: 4.7,
            article: "sf8t0008"
        },
        {
            img: "images/wireless-headphones/BOROFONE-BO4.png",
            alt: 'borofone-bo4',
            title: "BOROFONE BO4",
            price: 7527,
            rate: 4.7,
            article: "sf8t0009"
        }
    ];

    class Headphones{
        constructor(img, alt, title, price, rate, article){
            this.img = img;
            this.alt = alt;
            this.title = title;
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
                                  <h4 class="card__title">${this.title}</h4>
                                  <div class="card__price">${this.price} ₽</div>
                                  <div class="card__rate"><img src="icons/rate.svg" alt="rate-star">${this.rate}</div>
                                  <button type="button" class="card__buy-btn">Купить</button>
                              </div>`;
            parent.append(card);
        }
    }

    function setGoods(list, parentSelector){
        for(let i = 0; i < list.length; i++){
            const {img, alt, title, price, rate, article} = list[i];
            new Headphones(img, alt, title, price, rate, article).addGoods(parentSelector);
        }
    }

    setGoods(headphones, '.headphones');
    setGoods(wirelessHeadphones, '.wireless-headphones');


});