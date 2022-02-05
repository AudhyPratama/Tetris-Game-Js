document.addEventListener('DOMContentLoaded',() => { //untuk memberikan konfigurasi pada file
    const grid = document.querySelector('.grid'); // untuk membuat variabel pada div grid
    let squares = Array.from(document.querySelectorAll('.grid div')); // untuk membuat array pada setiap div
    const ScoreDisplay = document.querySelector('#score'); // untuk membuat variabel score pada div id score
    const StartBtn = document.querySelector('#start-button'); // untuk membuat variabel pada div id start button
    const width = 10;

    console.log(squares);
})