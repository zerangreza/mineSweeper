
const board = document.querySelector ('.board');
var width = 50;
var height = 25;

// expert minesweeper is 30x16 with 99 bombs and total of 480 cells.
var bombRatio = 4.8
// var bombsAmount = Math.floor ((width*height)/bombRatio);
var bombsAmount = 160;
var totalCells = width * height;
var cells = [];
var bombs = [];
var neighbours = [];
var checkedCells = [];
var checkList = [];
var flags =bombsAmount;

var isGameOver = false;




for (let i=0; i<totalCells; i++){
    const cell = document.createElement ('div');
    cell.setAttribute ('id', i);
    board.appendChild (cell);
    // cell.innerHTML = i;
    cells.push (i);
    cell.classList.add(".one");


    cell.addEventListener ("click", function(e){
        click (cell);
    })

    cell.oncontextmenu = function(e){
        e.preventDefault();
        rightClick (cell);
    }
    
}





function rightClick (cell){

    let cellId = cell.id;
    let c = cell.getAttribute ('data');

    if ( checkedCells.includes (cellId) ){
        return;
    }
    if ( (c != "flaged") && (c != "question") && (0 < flags < bombsAmount) ){

        cell.innerHTML =  '&#128681;';
        // cell.classList.add("bomb");
        console.log ("flag");
        cell.setAttribute  ('data', "flaged");
        flags --;
    }
    else if (c == "flaged"){
        cell.innerHTML =  '?'.bold();
        // cell.classList.add("bomb");
        console.log ("question");
        cell.setAttribute  ('data', "question");
        flags ++;
    }
    else if (c == "question"){
        cell.innerHTML =  '';
        // cell.classList.add("bomb");
        console.log ("unflag");
        cell.setAttribute  ('data', "");
        flags ++;
    }
}





function click (cell){

    if (cell.getAttribute ('data') == "flaged"){
        // console.log("kkk");
        return;
    }else {

        console.log("nnn", checkList);

        let cellId = cell.id;
        // let cellId = cell.getAttribute ('id')
    
        console.log("id", cellId);
        // let isCellChecked = cell.getAttribute ('data');
    
    
        // if ( isCellChecked == "checked" ){
        if ( checkedCells.includes (cellId) ){
            console.log("aa");
        
            // let c = cell.getAttribute ('id');
    
            checkList.splice ( 0, 1);
    
            if ( checkList.length != 0){
                let cell2 = document.getElementById (checkList [0]);
                click (cell2);
            }      
        }
    
        // if ( isCellChecked != "checked" ){
        if ( !(checkedCells.includes (cellId)) ){
            console.log("bb");
    
            let bombsNumber = checkNeighbours (cell, cellId); 
            
    
            if (bombsNumber != 0 ){
    
                console.log("bbb");
                cell.classList.add ("one");   
                // console.log("id", cellId);
                // console.log("bombs", bombsNumber);
                cell.innerHTML = bombsNumber;
                // cell.setAttribute ('data', "checked");
                checkedCells.push (cellId);
    
                if ( checkList.length != 0){
                    let cell2 = document.getElementById (checkList [0]);
                    click (cell2);
                }      
            }
            if (bombsNumber == 0 ){
                console.log("ccc");
    
                cell.classList.add ("three");   
                // console.log("id", cellId);
                // console.log("bombs", bombsNumber);
                cell.innerHTML = bombsNumber;
                // cell.setAttribute ('data', "checked");
                checkedCells.push (cellId);
    
    
                let neighbourArray = trackNeighbours (cellId);
    
                for (let i=0; i<neighbourArray.length; i++){
    
                    if ( !(checkedCells.includes (neighbourArray [i])) && !(checkList.includes (neighbourArray [i])) ){
                        checkList.push (neighbourArray [i]);
                    }
                }
    
                if ( checkList.length != 0){
                    let cell2 = document.getElementById (checkList [0]);
                    click (cell2);
                }     
    
            }
    
        }
    


    }

}
    




function createBombs (){
    
    while (bombs.length < bombsAmount) {
        let randomNumber = Math.floor (Math.random() * totalCells);
        if (bombs.indexOf(randomNumber) == -1){
            bombs.push(randomNumber);
        }
        let z = document.getElementById(randomNumber)
    //     z.innerHTML = '&#128163;';
    //     z.classList.add("bomb");
    // }
    }
}

createBombs();



function showBombs (bombs){
    for (let i=0; i<bombs.length; i++){
        const b = document.getElementById (bombs[i]);
        b.innerHTML =  '&#128163;';
        b.classList.add("bomb");
        console.log ("show bombs");
    }
}










function trackNeighbours (cellId){

    let cellIdNum = parseInt (cellId);
    let cellIds = [];


    if (cellIdNum == 0){
        cellIds = [cellIdNum+1, cellIdNum+width, cellIdNum+width+1];
    }else if (cellIdNum == (width-1)){
        cellIds = [cellIdNum-1, cellIdNum+width, cellIdNum+width-1];
    }else if (cellIdNum == ((width*height)-width)){
        cellIds = [cellIdNum-width, cellIdNum-width+1, cellIdNum+1];
    }else if (cellIdNum == ((width*height)-1)){
        cellIds = [cellIdNum-width-1, cellIdNum-width, cellIdNum-1];

    }else if (cellIdNum < (width-1)){
        cellIds = [cellIdNum-1, cellIdNum+width-1, cellIdNum+width, cellIdNum+width+1, cellIdNum+1];
    }else if (cellIdNum > ((width*height)-width)){
        cellIds = [cellIdNum-1, cellIdNum-width-1, cellIdNum-width, cellIdNum-width+1, cellIdNum+1];
    }else if (cellIdNum % width == 0 ){
        cellIds = [cellIdNum-width, cellIdNum-width+1, cellIdNum+1, cellIdNum+width+1, cellIdNum+width];
    }else if (cellIdNum % width == (width - 1) ){
        cellIds = [cellIdNum-width, cellIdNum-width-1, cellIdNum-1, cellIdNum+width-1, cellIdNum+width];
    }else {
        cellIds = [
            cellIdNum-width-1,
            cellIdNum-width,
            cellIdNum-width+1,
            cellIdNum-1,
            cellIdNum+1,
            cellIdNum+width-1,
            cellIdNum+width,
            cellIdNum+width+1
        ]
    }

    console.log ("neighbourssss:" , cellIdNum, "matriss:", cellIds );
    return cellIds;
}











function trackCorners(){
    let cornerArray = [0,(width-1),((width*height)-width),(width*height)-1];
    return cornerArray;
}

var cornerArray = trackCorners ();

// console.log ((width*height)-width);
// console.log ((width*height)-1);
// console.log (cornerArray);


var leftSideArray = [];
var rightSideArray = [];

function trackEdgeSides(){

    for (let i=0; i<height ; i++){
        let leftSide = i * width;
        leftSideArray.push(leftSide);

        let rightSide = (width * (i+1)) - 1;
        rightSideArray.push(rightSide);
    }
    
}
trackEdgeSides();
console.log (leftSideArray);
// console.log (rightSideArray);



var topSideArray = [];
var bottomSideArray = [];

function trackEdgeRows(){

    for (let i=0; i<width ; i++){
        topSideArray.push(i);

        let bottomSide = ((width*height)-width) + i;
        bottomSideArray.push(bottomSide);
    }
    
}
trackEdgeRows();
// console.log (topSideArray);
// console.log (bottomSideArray);
// console.log (bottomSideArray);









// check the 8 adjcent neighbours of each cell
function checkNeighbours(cell, cellId){
// function checkNeighbours(){

    // for (let j=0; j<cellId.length; j++){

        let i = parseInt (cellId);
        let bNumber = 0;
        // console.log ("cell id" , j)

        if (bombs.includes(i)){   

            // const cell = document.getElementById(i);
            // cell.classList.add (".bomb");
            console.log("Game Over");
            isGameOver = true;
            showBombs(bombs);
            bNumber = 9;
            
            
        }else{

            // compare with 3 neighbours
            if (cornerArray.includes(cells[i])){

                if (i == cornerArray[0]){

                    if ( bombs.includes(i+1)){
                        bNumber ++;
                    }if (bombs.includes(i+width)){
                        bNumber ++;      
                    }if (bombs.includes(i+width+1)){
                        bNumber ++;
                    }


                }else if (i == cornerArray[1] ){
                    // console.log(cells[i]);

                    if ( bombs.includes(i-1)){
                        bNumber ++;
                    } if (bombs.includes(i+width)){
                        bNumber ++;
                    } if (bombs.includes(i+width-1)){
                        bNumber ++;
                    }

                }else if (i == cornerArray[2] ){
                    // console.log(cells[i]);

                    if ( bombs.includes(i-width)){
                        bNumber ++;
                    } if (bombs.includes(i-width+1)){
                        bNumber ++;
                    } if (bombs.includes(i+1)){
                        bNumber ++;
                    }



                }else if (i == cornerArray[3] ){
                    // console.log(cells[i]);


                    if ( bombs.includes(i-1)){
                        bNumber ++;
                    } if (bombs.includes(i-width)){
                        bNumber ++;
                    } if (bombs.includes(i-width-1)){
                        bNumber ++;
                    }

                }

            // compare with 5 neighbours
            }else if (leftSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (rightSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width-1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (topSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+width-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (bottomSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                }

            // compare with 8 neighbours
            }else{

                if ( bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                } if ( bombs.includes(i+width-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                }

                
            }
        }

        return bNumber;

}



