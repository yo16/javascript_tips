/*
 * ２線間の距離
 * 2016/12/26 (c) yo16
 */

// メイン
// ループを細かく分けてあるのは、処理時間を計測するため
function calcMain()
{
	// テスト回数
	var testNum = 1000000;
	
	// 座標点範囲
	var minPos = -0.01;
	var maxPos = 0.01;
	
	
	console.log("計算回数:"+testNum);
	
	// 問題作成
	var aryQ = new Array( testNum );
	console.time("問題作成");
	for( var i=0; i<testNum; i++ ){
		aryQ[i] = makeQ(minPos, maxPos);
	}
	console.timeEnd("問題作成");
	
	// テスト印字
	if(0)
	{
	for( var i=0; i<testNum; i++ ){
		console.log("--- "+i+" ---");
		for( var j=0; j<4; j++ ){
			console.log("("+aryQ[i][j][0]+","+aryQ[i][j][1]+","+aryQ[i][j][2]+")");
		}
	}
	}
	
	// テスト実施
	console.time("距離計算");
	for( var i=0; i<testNum; i++ ){
		// ２線分の距離を計算
		var distance = getLinesDistance(aryQ[0][0], aryQ[0][1], aryQ[0][2], aryQ[0][3]);
	}
	console.timeEnd("距離計算");
}

// test
function test1()
{
	// ２点による線分×２本と、正解の距離
	var tests = [
		 [[10,0,0], [-10,0,0], [25,25,10], [-25,-25,10], 10]
		,[[0,50,-25], [0,0,25], [25,0,-25], [-20,0,-25], 35.3553]
		,[[0,15,10], [0,0,25], [25,0,-25], [-20,0,-25], 38.0788]
		,[[3.0231,14.6922,10], [0,0,25], [25,0,-25], [-20,0,-25], 37.9587]
		,[[0,0,-25], [0,0,25], [25,0,-25], [-20,0,-25], 0]
		,[[0,0,-30], [0,0,25], [25,0,-25], [-20,0,-25], 0]
		,[[0,4.7936,-29.7907], [0,0,25], [25,0,-25], [-20,0,-25], 4.3578]
		,[[25,0,0], [-25,0,0], [25,0,-25], [-20,0,-25], 25]
		,[[5.6940,27.6729,-3.2527],[0,0,25],[-25,0,0],[18.0592,22.5855,15.3756],0]
		,[[-25,0,0],[-7.7048,0,0],[11.3773,0,-25],[25,0,-25], 31.4504]
	]
	
	for( var i=0; i<tests.length; i++ ){
		var len = getLinesDistance(tests[i][0],tests[i][1],tests[i][2],tests[i][3]);
		
		console.assert(( Math.abs(len - tests[i][4]) < 0.01 ), "エラー！["+i+"] 正解="+tests[i][4]+" 結果="+len);
	}
	
	console.log("test ["+tests.length+"]cases finished");
}


// ランダムな３次元の４点を返す
// 座標値のmin/maxを引数として渡す
function makeQ(posMin, posMax)
{
	var ary = new Array(4);
	
	for( var i=0; i<4; i++ ){
		ary[i] = getRandomPoint(posMin, posMax);
	}
	
	return ary;
}


// 最小～最大の間の座標値を持つ３次元の点を返す
// 精度は1/100
function getRandomPoint(posMin, posMax)
{
	var dim = 3;
	var precision = 0.01;
	
	var pnt = new Array(dim);
	
	for( var i=0; i<dim; i++ )
	{
		pnt[i] = precision * Math.floor(
			(Math.random() * (posMax-posMin)/precision ) + posMin/precision
		);
	}
	
	return pnt;
}


