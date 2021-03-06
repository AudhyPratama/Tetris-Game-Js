document.addEventListener('DOMContentLoaded',() => { //untuk memberikan konfigurasi pada file
    const grid = document.querySelector('.grid'); // untuk membuat variabel pada div grid
    let squares = Array.from(document.querySelectorAll('.grid div')); // untuk membuat array pada setiap div
    const scoreDisplay = document.querySelector('#score'); // untuk membuat variabel score pada div id score
    const startBtn = document.querySelector('#start-button'); // untuk membuat variabel pada div id start button
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'yellow',
        'lightskyblue'
    ]

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
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
    };

    //hapus gambar poisi awal balok 
    function undraw() {
        current.forEach(index => { // hapus lokasi tetromino sesuai bentuk array
            squares[currentPosition + index].classList.remove('tetromino');
            squares[currentPosition + index].style.backgroundColor = '';
        });
    };

    // membuat timeframe agar balok dapat bergerak kebawah
    // timerId = setInterval (moveDown, 1000); // perintah gerak kebawah dalam interval 1s (1000ms)

    // fungsi membaca inputan pada keyboard
    function control(k) {
        if(k.keyCode === 37){ // kode ASCII keyboard up
            moveLeft(); // panggil fungsi geser ke kiri
        } else if (k.keyCode === 38){
            rotate();
        } else if (k.keyCode === 39){
            moveRight();
        } else if (k.keyCode === 40){
            moveDown();
        }
    };

    document.addEventListener('keyup',control);

    // fungsi gerak kebawah
    function moveDown() {
        undraw(); // hapus posisi awal
        currentPosition += width; // posisi setelah bergerak kebawah
        draw(); // gambar posisi baru
        freeze(); // fungsi diam ditempat
    };

    // fungsi gerak kekiri dengan syarat posisi balok tidak berada di pojok kiri
    function moveLeft() {
        undraw(); // hapus gambar bagian awal
        const isAtLeftEdge = current.some (index => (currentPosition + index) % width ===0); // variabel untuk cek posisi apakah berada di pojok kiri papan tetris

        if (!isAtLeftEdge) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) { // jika posisi menyentuh bagian div 'taken' maka posisi tidak akan bergerak
            currentPosition +=1;
        };
        draw(); // gambar bagian baru
    };

    // fungsi gerak kekanan dengan syarat posisi balok tidak berada di pojok kanan
    function moveRight() {
        undraw(); // hapus gambar bagian awal
        const isAtRightEdge = current.some (index => (currentPosition + index) % width === width-1); // variabel untuk cek posisi apakah berada di pojok kanan papan tetris

        if (!isAtRightEdge) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) { // jika posisi menyentuh bagian div 'taken' maka posisi tidak akan bergerak
            currentPosition -=1;
        };
        draw(); // gambar bagian baru
    };

    ///FIX ROTATION OF TETROMINOS A THE EDGE 
    function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }

    function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
    }

    function checkRotatedPosition(P){
        P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
        if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
            if (isAtRight()){            //use actual position to check if it's flipped over to right side
                currentPosition += 1    //if so, add one to wrap it back around
                checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
            }
        } else if (P % width > 5) {
            if (isAtLeft()){
                currentPosition -= 1
                checkRotatedPosition(P)
            }
        }
    }

    // fungsi putar 
    function rotate() {
        undraw(); // hapus gambar bagian awal
        currentRotation++;
        if (currentRotation === current.length) { // jika rotasi = 4, maka kembali ke 0
            currentRotation = 0;
        };
        current = theTetrominoes[random][currentRotation];
        checkRotatedPosition();
        draw(); // gambar bagian baru
    }

    // fungsi freeze (diam ditempat)
    function freeze() { // fungsi agar balok tidak keluar grid papan tetris
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken')); // memberi kelas taken pada setiap balok yang salah satunya menuju ke kelas taken
            
            // ulangi proses pembuatan balok
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes .length); // mengambil angka acak berdasarkan array balok/tetromino
            current = theTetrominoes[random][currentRotation]; // meletakan balok/tetromino baru pada posisi awal
            currentPosition = 4; // posisi awal balok/tetromino
            draw(); // gambar posisi balok/tetromino
            displayShape();
            addScore();
            gameOver();
        };
    };

    // fungsi untuk menampilkan next tetromino
    const displaySquares = document.querySelectorAll('.mini-grid div'); // menampilkan balok di kotak kecil (mini div)
    const displayWidth = 4;
    const displayIndex = 0;

    const nextTetrominoes = [ // menampilkan isi tetromino pada kotak kecil
        [1, displayWidth+1, displayWidth*2+1, 2], // Balok Berbentuk L
        [0, displayWidth, displayWidth+1, displayWidth*2+1], // Balok Berbentuk Z
        [1, displayWidth, displayWidth+1, displayWidth+2], // Balok Berbentuk T
        [0, 1, displayWidth, displayWidth+1], // Balok Berbentuk Kotak/O
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // Balok Berbertuk I
    ]

    // tampilkan balok di mini dislay untuk balok selanjutnya
    function displayShape() {
        // untuk menghapus setiap balok yang ada di mini grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = ''
        });
        nextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        });
    };

    // tombol button
    startBtn.addEventListener('click', () =>{
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayShape(); 
        }
    });

    // sistem skor
    function addScore() {
        for (let i = 0; i < 199 ; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score+=10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = ''
                });
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // game over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId)
        }
    }




    // draw();
});