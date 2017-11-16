document.write("<script language=javascript src='/js/Sudoku.js'></script>");

function onShuffle() {

}

function onInitial() {
	var nIt, sColId, nRowId, nTmp, oElement;
	var oSudoku = Array.apply( null, { string: 81 } ).map( function( index ) {
		id: index,
		number: [0],
		blockId: index
	});

	oSudoku = generateSudoku( oSudoku );

	for( nIt = 0; nIt < oSudoku.length; nIt++ ) {
		nRowId = math.floor( nIt / 9 ) + 1;
		nTmp = nIt + 1;
		sColId = "Sudoku-Col" + nRowId + nIt;
		oElement = document.getElementById( sColId );
		oElement.innerText = oSudoku[ nIt ].number[ 0 ];
	}
	console.log("I'm here!");
}