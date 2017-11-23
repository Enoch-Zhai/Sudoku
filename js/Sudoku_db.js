this.valueList = [];
var tHours = 0;
var tMinutes = 0;
var tSeconds = 0;
var tMilliSeconds = 0;

var int;

document.getElementById( "Sudoku-Cells" ).addEventListener( "click", inputValue );

document.getElementById( "Sudoku-Number" ).addEventListener( "click", selectNumber );

function inputValue( oEvent ) {
	
	var oSelectedInput = oEvent.srcElement;
	var sInputId = oSelectedInput.id;
	var oTargetElement = document.getElementById( "Sudoku-Cells" );
	var oChildElement = "<div>\
	\
	</div>";
}

function selectNumber( oEvent ) {

	var oSelectedNumber = oEvent.srcElement;
	var sNumberId = oSelectedNumber.id;
	
}

function onInitial() {
	var oDifficultySelected = document.getElementById("Sudoku-difficulty");
	var nDifficultyIndex = oDifficultySelected.selectedIndex;
	var nDifficultyValue = oDifficultySelected.options[ nDifficultyIndex ].value;

	if ( int > 0 ) {
		int = clearInterval( int );
	} 

	var oSudoku = Array.apply( null, { length: 81 } ).map( function( _, index ) {
		return {
			id: index,
			number: [0],
			blockId: index
		};	
	});

	oSudoku = generateSudoku( oSudoku, nDifficultyValue );

	for( nIt = 0; nIt < oSudoku.length && nIt < 81; nIt++ ) {	

		nRowNum = Math.floor( nIt  / 9 ) + 1;
		nColNum = nIt % 9 + 1;
		sColId = "Sudoku-Col" + nRowNum + nColNum;
		oElement = document.getElementById( sColId );
		oElement.value = oSudoku[ nIt ].number[ 0 ];
		if ( oElement.value === '' ) {
			oElement.disabled = false;
		} else {
			oElement.disabled = true;
		} 
		
	}

	int = setInterval("setTime()", 100);
}

function generateSudoku( cells, nDifficultyValue ) {
	// var dDate = new Date();
	this.cells = cells;
	initBlockId();
	randomSetNum();
	solveSodu();
	removeSomeNumer( nDifficultyValue );
	// console.log( new Date() - dDate );
	this.valueList.splice( 0, this.valueList.length );
	return cells;
}

function setTime() {
	var oElement = document.getElementById("myTime");

	tMilliSeconds += 100;
	if ( tMilliSeconds >= 1000 ) {
		tMilliSeconds = 0;
		tSeconds += 1;
	}

	if ( tSeconds >= 60 ) {
		tSeconds = 0;
		tMinutes += 1;
	}

	if ( tMinutes >= 60 ) {
		tMinutes = 0;
		tHours += 1;
	}

	oElement.value = ( tHours < 10 ? '0' + tHours : tHours ) + ':' + 
					 ( tMinutes < 10 ? '0' + tMinutes : tMinutes )  + ":" + 
					 ( tSeconds < 10 ? '0' + tSeconds : tSeconds )  + "." + 
					 ( tMilliSeconds / 100 );
}

function removeSomeNumer( nLevel ) {
	var cells = this.cells;
	var nValueTmpList= [];
	var nIt, nItTmp, nPosition;
	nValueTmpList.splice( 0, nValueTmpList.length );
	switch( nLevel ) {
		case "1":
			for ( nIt = 0; nIt < 47; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
					nIt--;
					continue;
				}
				nValueTmpList.push( nPosition );
				cells[ nPosition ].number[ 0 ] = '';
			}
			break;
		case "2":
			for ( nIt = 0; nIt < 55; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
					nIt--;
					continue;
				}
				nValueTmpList.push( nPosition );
				cells[ nPosition ].number[ 0 ] = '';
			}
			break;
		case "3":
			for ( nIt = 0; nIt < cells.length; nIt++ ) {
				if ( nIt % 2 == 0 ) {
					nValueTmpList.push( nPosition );
					cells[ nIt ].number[ 0 ] = '';
				} 
			}

			for ( nIt = 0; nIt < 4; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( cells[ nPosition ].number[ 0 ] != '' ) {
					cells[ nPosition ].number[ 0 ] = '';
				} else {
					nIt--;
				}
			}
			break;
		case "4":
			for ( nIt = 0; nIt < 9; nIt++ ) {
				for ( nItTmp = 0; nItTmp < 6; nItTmp++ ){
					nPosition = nIt * 9 + getRandomNumber();
					if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
						nItTmp--;
						continue;
					} else {
						cells[ nPosition ].number[ 0 ] = '';
						nValueTmpList.push( nPosition );
					}
				}
			}
			break;
		case "5":
			for ( nIt = 0; nIt < 9; nIt++ ) {
				for ( nItTmp = 0; nItTmp < 6; nItTmp++ ){
					nPosition = nIt * 9 + getRandomNumber();
					if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
						nItTmp--;
						continue;
					} else {
						cells[ nPosition ].number[ 0 ] = '';
						nValueTmpList.push( nPosition );
					}

				}
			}

			for ( nIt = 0; nIt < 8; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( cells[ nPosition ].number[ 0 ] != '' ) {
					cells[ nPosition ].number[ 0 ] = '';
				} else {
					nIt--;
				}
			}	


	}
}

function randomSetNum() {
	var cells = this.cells;
	var positionList = [];
	var nPosition, nTmpNumber, nIt;
	for ( nIt = 0; nIt < 11; nIt++ ) {
		nPosition = getRandomNumber81();
		nTmpNumber = getRandomNumber();
		
		if ( positionList.indexOf( nPosition ) < 0 && !isContradict( nPosition, nTmpNumber ) ) {
			positionList.push( nPosition );
			this.cells[nPosition].number[0] = nTmpNumber;
		} else {
			nIt--;
		}

	}

	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( cells[ nIt ].number[ 0 ] == 0 ) {
			cells[ nIt ].flag = true;
		}
	}
}

function solveSodu() {
	var cells = this.cells;
	var nIt, nItTmp, nValueListStart, nValueListEnd, oValue;
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( cells[ nIt ].flag ) {
		nValueListStart = this.valueList.length;

			for ( nItTmp = 1; nItTmp < 10; nItTmp++ ) {
				nTmpNumber = nItTmp;

				if (  !isContradict( nIt, nTmpNumber ) ) {
					this.valueList.push({ position: nIt, number: nTmpNumber});
				}
			}

			nValueListEnd = this.valueList.length;

			if ( nValueListStart < nValueListEnd ) {

				oValue = this.valueList.pop();
				cells[ oValue.position ].number[ 0 ] = oValue.number;
				cells[ oValue.position ].flag = false;

			} else {

				oValue = this.valueList.pop();
				for( nItTmp = oValue.position + 1; nItTmp <= nIt; nItTmp++ ) {
					if ( cells[ nItTmp ].flag === false ) {
						cells[ nItTmp ].number[ 0 ] = 0;
						cells[ nItTmp ].flag = true;
					}
					
				}
				cells[ oValue.position ].number[ 0 ] = oValue.number;
				nIt = oValue.position;

			}
			
		}
	}
	this.valueList.splice( 0, this.valueList.length );
}

function printNumber() {
	var cells = this.cells;
	var valueList = new Array(9);
	var nIt;
	for( nIt = 0; nIt < 9; nIt++ ) {
		console.log( ' ' + cells[ nIt * 9 ].number[ 0 ] + ' ' 
					     + cells[ nIt * 9 + 1 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 2 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 3 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 4 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 5 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 6 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 7 ].number[ 0 ] + ' '
					     + cells[ nIt * 9 + 8 ].number[ 0 ] + '\n');
	}
}

function clearNumber() {
	var cells = this.cells;
	var nIt;
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		cells[ nIt ].number.splice( 0, cells[ nIt ].number.length );
		cells[ nIt ].number.push( 0 );
	}
}

function getRandomNumber() {
	return Math.floor( Math.random() * 9 );
}

function getRandomNumber81() {
	return Math.floor( Math.random() * 81 );
}

function initBlockId( ) {
	var cells = this.cells;
	var nRow, nColumn, nIt;
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		nRow = getRow( nIt );
    	nColumn = getColumn( nIt );

		if ( nRow < 3 ) {
			cells[ nIt ].blockId = checkColumnPosition( nColumn );
		} else if ( nRow < 6 ) {
			cells[ nIt ].blockId = checkColumnPosition( nColumn ) + 3;
		} else {
			cells[ nIt ].blockId = checkColumnPosition( nColumn ) + 6;
		} 
	}
}

function checkColumnPosition( nColumn ) {
	if ( nColumn < 3 ) {
		return 1;
	} else if ( nColumn < 6 ) {
		return 2;
	} else {
		return 3;  
	}
}

function isContradict( position, tmpNumber ) {
	var nRow = getRow( position );
	var nColumn = getColumn( position );
	var nIt = 0;
	var cells = this.cells;

	// check the row consistence
	// console.log(nRow + '  ' + nColumn + ' aaaa\n');
	for( nIt = nRow * 9 ; nIt < nRow * 9 + 9 && nIt < 81; nIt ++ ) {
		// console.log(nIt + ' ' + cells[ nIt ].number[0] + ' ' + tmpNumber + '...\n' );
		if( cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}

	// check the column consistence
	for( nIt = nColumn ; nIt < 8 * 9 + nColumn && nIt < 81 ; nIt += 9 ) {
		if( cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}

	// check the block consistence
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( nIt != position && 
			cells[ nIt ].blockId == cells[ position ].blockId && 
			cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}	

	return false;
}

function getRow( position ) {
	return Math.floor( position / 9 );
}

function getColumn( position ) {
	return position % 9;
}