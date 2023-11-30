/**
 * 기능 구현
 */
const text = document.getElementById('text');
const size = document.getElementById('size')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


document.querySelector('#ex-in').addEventListener('input',e=>{
    document.querySelector('#ex-out').innerHTML= e.target.value;
});