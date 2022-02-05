document.addEventListener('DOMContentLoaded',() => { //untuk memberikan konfigurasi pada file
    const grid = document.querySelector('.grid'); // untuk membuat variabel pada div grid
    let squares = Array.from(document.querySelectorAll('.grid div')); // untuk membuat array pada setiap div
    const ScoreDisplay = document.querySelector('#score'); // untuk membuat variabel score pada div id score
    const StartBtn = document.querySelector('#start-button'); // untuk membuat variabel pada div id start button
    const width = 10;

    // Bagian Balok/Tetrominoes
    const lTetromino = [ // Balok Berbentuk L
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [ // Balok Berbentuk Z
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ];
    
    const tTetromino = [ // Balok Berbentuk T
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];
    
    const oTetromino = [ // Balok Berbentuk Kotak/O
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];
    
    const iTetromino = [ // Balok Berbentuk Panjang/I
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]; // Pengelompokan Balok berdasarkan array
    
    let currentPosition = 4; // kondisi saat ini
    let current = theTetrominoes [0]; // Menggambarkan kondisi awal balok

    //buat poisi awal setelah balok dirotasi
    
});