/*
 * 三角形と点の距離
 * 
 * 2016/12/28 (c) y.ikeda
 */

// メイン
// ループを細かく分けてるのは、処理時間を計測するため
function calcMain()
{
	// テスト回数
	var testNum = 100000;
	
	// 座標点範囲
	var minPos = -10;
	var maxPos = 10;
	
	
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
	
/*
// debug
aryQ[0][0] = [0,0,0];
aryQ[0][1] = [1,0,0];
aryQ[0][2] = [0,1,0];
aryQ[0][3] = [-1,0,1];
*/
	
	// テスト実施
	console.time("距離計算");
	for( var i=0; i<testNum; i++ ){
		// ３点からなる三角形と１点の距離を計算
		var distance = getTriangleDistance(aryQ[i][0], aryQ[i][1], aryQ[i][2], aryQ[i][3]);
//		console.log(distance);
	}
	console.timeEnd("距離計算");
}

function test1()
{
	
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


