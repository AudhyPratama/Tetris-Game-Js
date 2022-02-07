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
    
    let currentPosition = 4;
    let currentRotation = 0;

    // bagian menampilkan balok-balok yang datang dengan fungsi random number generator
    let random = Math.floor(Math.random() * theTetrominoes.length); // mengambil angka acak berdasarkan array balok
    let current = theTetrominoes [random][currentRotation]; // Menggambarkan kondisi awal balok dalam bentuk 2 dimensi

    //buat gambar poisi awal balok 
    function draw() { // fungsi gambar balok dengan div tetromino
        current.forEach(index => { // gambar lokasi tetromino sesuai bentuk array
            squares[currentPosition + index].classList.add('tetromino');
        });
    };

    //hapus gambar poisi awal balok 
    function undraw() {
        current.forEach(index => { // hapus lokasi tetromino sesuai bentuk array
            squares[currentPosition + index].classList.remove('tetromino');
        });
    };

    // membuat timeframe agar balok dapat bergerak kebawah
    timerId = setInterval (moveDown, 1000); // perintah gerak kebawah dalam interval 1s (1000ms)

    // fungsi gerak kebawah
    function moveDown() {
        undraw(); // hapus posisi awal
        currentPosition += width; // posisi setelah bergerak kebawah
        draw(); // gambar posisi baru
        freeze();
    };

    // fungsi freeze (diam ditempat)
    function freeze() { // fungsi agar balok tidak keluar grid papan tetris
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken')); // memberi kelas taken pada setiap balok yang salah satunya menuju ke kelas taken
            
            // ulangi proses pembuatan balok
            random = Math.floor(Math.random() * theTetrominoes .length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        };
    };

draw();

});