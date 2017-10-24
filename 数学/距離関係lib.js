/*
 * 距離関係lib
 * 
 * 2016/12/28 (c) y.ikeda
 */

// ２本の線分の距離を返す
// 参考：https://tgws.plus/ul/ul31.html
function getLinesDistance(p1, p2, q1, q2)
{
	// 同一点とみなす距離
	// 正確には距離ではなく、座標値だけど、まぁ気にしない
	var tol = 0.008;
	
	// 線分の縮退を確認
	var isDegeneracy_p = true;
	for( var i=0; i<3; i++ ){
//console.log("p*"+p1[i] + ":" + p2[i]);
		if( Math.abs(p1[i]-p2[i]) > tol ){
			isDegeneracy_p = false;
			break;
		}
	}
	var isDegeneracy_q = true;
	for( var i=0; i<3; i++ ){
//console.log("q*"+q1[i] + ":" + q2[i]);
		if( Math.abs(q1[i]-q2[i]) > tol ){
			isDegeneracy_q = false;
			break;
		}
	}
	
	// ２線分が両方とも点に縮退している場合
	if( isDegeneracy_p && isDegeneracy_q ){
		// p1とq1の距離
		return getDistance2Points(p1, q1);
	
	// 一方の線分が点に縮退している場合
	}else if( isDegeneracy_p || isDegeneracy_q ){
		if( isDegeneracy_p ){
			// pに縮退している
			return getDistancePointAndLineSegment(q1, q2, p1);
		}else{
			// qに縮退している
			return getDistancePointAndLineSegment(p1, p2, q1);
		}
	}
	
	// 縮退していない場合
	else{
		
		// ２ベクトル(p1->p2とq1->q2)が同一平面にないとして
		// 外積ベクトル方向で、最短距離を持つベクトルdを求める
		
		// 外積ベクトル
		var nvec = getCross( getSa( p2, p1 ), getSa( q2, q1 ) );
		nvec = getScalar( 1/getVecSize(nvec), nvec );	// 正規化
		
		// ２直線(線分ではない)の距離と距離ベクトル
		// ベクトルの大きさはd
		var vec_p1q1 = getSa( q1, p1 );
		var d = getDot( nvec, vec_p1q1 ) / getVecSize(nvec);
		var dvec = getScalar(
			d,nvec
		);
		
		// qから距離ベクトルを引くことにより、q1->q2を
		// dvecを法線ベクトルとしてpが乗る平面へ移動する
		var q1dash = getSa( q1, dvec );
		var q2dash = getSa( q2, dvec );
		
		// 線分としてのねじれの位置判定
		var isNejire = false;
		var val1 = getDot(
			getCross(
				getSa(p2, p1),
				getSa(q1dash, p1)
			),
			getCross(
				getSa(p2, p1),
				getSa(q2dash, p1)
			)
		);
		if( val1 < 0 ){	// 条件１
			val2 = getDot(
				getCross(
					getSa(q2dash, q1dash),
					getSa(p1, q1dash)
				),
				getCross(
					getSa(q2dash, q1dash),
					getSa(p2, q1dash)
				)
			);
			if( val2 < 0 ){	// 条件２
				isNejire = true;
			}
		}
		if( isNejire ){
			return getDot(
					nvec,
					getSa(q1,p1)
				)
				/ getVecSize(nvec);
		}else{
			// ねじれでない場合は、端点と相手の線分の距離のどれか
			var d = [
				getDistancePointAndLineSegment_squared(p1, p2, q1),
				getDistancePointAndLineSegment_squared(p1, p2, q2),
				getDistancePointAndLineSegment_squared(q1, q2, p1),
				getDistancePointAndLineSegment_squared(q1, q2, p2)
			];
			var min = d[0];
			for( var i=1; i<4; i++ ){
				if( d[i] < min ){
					min = d[i];
				}
			}
			return Math.sqrt(min);
		}
	}
	
	
	return 1;
}

// ベクトルサイズ
function getVecSize(v)
{
	return Math.sqrt( getVecSize_squared(v) );
}
function getVecSize_squared(v)
{
	return v[0]*v[0] + v[1]*v[1] + v[2]*v[2];
}

// ベクトルの差を返す（"差"の英語がわからない・・・）
function getSa(v1, v2)
{
	return [v1[0]-v2[0], v1[1]-v2[1], v1[2]-v2[2]];
}

// ベクトルのスカラー倍
function getScalar(scalar, vec)
{
	return [scalar*vec[0], scalar*vec[1], scalar*vec[2]];
}

// 内積を返す
function getDot(v1, v2)
{
	return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
}

// 外積を返す
function getCross(v1, v2)
{
	return [
		v1[1]*v2[2]-v1[2]*v2[1],
		v1[2]*v2[0]-v1[0]*v2[2],
		v1[0]*v2[1]-v1[1]*v2[0]
	];
}


// 2点間の距離を返す
function getDistance2Points(p1,p2)
{
	return Math.sqrt(getDistance2Points_squared( p1, p2));
}
// 2点間の距離の２乗を返す
function getDistance2Points_squared(p1,p2)
{
	var ret = 
		(p1[0]-p2[0])*(p1[0]-p2[0]) + 
		(p1[1]-p2[1])*(p1[1]-p2[1]) + 
		(p1[2]-p2[2])*(p1[2]-p2[2])
	;
	
	return ret;
}

// 点と線分の距離を返す
// p1-p2が線分、q1が点
function getDistancePointAndLineSegment(p1, p2, q1)
{
	return Math.sqrt(getDistancePointAndLineSegment_squared(p1, p2, q1) );
}
function getDistancePointAndLineSegment_squared(p1, p2, q1)
{
	var ret = 0.0;
	
	// (P1->Q1)・(P1->P2)はよく使うので計算しておく
	var dotP1Q1_P1P2 = getDot( getSa(q1, p1), getSa(p2, p1) );
	
//console.log("aaa:"+dotP1Q1_P1P2);
//console.log(p1);
//console.log(q1);
	// p1側に外れている場合
	// P1Q1・P1P2<=0
	if( dotP1Q1_P1P2 <= 0 ){
		ret = getDistance2Points_squared(p1, q1);
//console.log("11:"+ret);
	
	// p2側に外れている場合
	}else if( dotP1Q1_P1P2 >= getDot( getSa(p2, p1), getSa(p2, p1) ) ){
		ret = getDistance2Points_squared(p2, q1);
//console.log("22:"+ret);
	
	
	// 間にある場合
	}else{
		var d2 = dotP1Q1_P1P2 / getDistance2Points(p1,p2);
		
		ret = getDistance2Points_squared(p1,q1)-d2*d2;
//console.log("33:"+ret);
	
	}
//console.log("zzz:"+ret);
	
	return ret;
}

// ２直線（線分ではない）の距離を返す
function getDistance2Lines(p1, p2, q1, q2)
{
	var v12 = getSa( q1, p1 );
	var nvec = getCross( getSa( p2, p1 ), getSa( q2, q1 ) );
	
	return getDot( nvec, v12 ) / getVecSize(nvec);
}



// ３点からなる三角形と１点の距離を計算
function getTriangleDistance(p1, p2, p3, q)
{
	// --------------------------------------
	// ３点からなる平面と１点の距離を求める
	// --------------------------------------
	// p1->p2
	var p12 = [
		p2[0]-p1[0],
		p2[1]-p1[1],
		p2[2]-p1[2]
	];
	var p12_len = p12[0]*p12[0] + p12[1]*p12[1] + p12[2]*p12[2];
	var p12_unit = [
		p12[0],
		p12[1],
		p12[2]
	];
	if( p12_len != 0 ){
		p12[0] = p12[0] / p12_len;
		p12[1] = p12[1] / p12_len;
		p12[2] = p12[2] / p12_len;
	}
	// p1->p3
	var p13 = [
		p3[0]-p1[0],
		p3[1]-p1[1],
		p3[2]-p1[2]
	];
	var p13_len = p13[0]*p13[0] + p13[0]*p13[0] + p13[0]*p13[0];
	var p13_unit = [
		p13[0],
		p13[1],
		p13[2]
	];
	if( p13_len != 0 ){
		p13_unit[0] = p13_unit[0]/p13_len;
		p13_unit[1] = p13_unit[1]/p13_len;
		p13_unit[2] = p13_unit[2]/p13_len;
	}
	
	// p1->p2(外積)p1->p3
	var crossP123 = [
		p12[1]*p13[2]-p12[2]*p13[1],
		p12[2]*p13[0]-p12[0]*p13[2],
		p12[0]*p13[1]-p12[1]*p13[0]
	];
	var crossP123_len = crossP123[0]*crossP123[0]+crossP123[1]*crossP123[1]+crossP123[2]*crossP123[2];
	// 正規化
	if( crossP123_len != 0 ){	// ゼロ割り回避
		crossP123 = [
			crossP123[0]/crossP123_len,
			crossP123[1]/crossP123_len,
			crossP123[2]/crossP123_len
		];
	}
	
	// 平面の式 ax+by+cz+d=0
	var a = crossP123[0];
	var b = crossP123[1];
	var c = crossP123[2];
	var d = (-1)*a*p1[0]-b*p1[1]-c*p1[2];
	// 距離
	var srfDistance = Math.abs(a*q[0]+b*q[1]+c*q[2]+d) / Math.sqrt(a*a+b*b+c*c);
	
	// --------------------------------------
	// qを外積の反対方向へ平行移動して、平面内に乗せる
	// その後、その点が三角形の内側にあるか外側にあるかを判断する
	// --------------------------------------
	var qMoved = [
		q[0]-crossP123[0]*srfDistance,
		q[1]-crossP123[1]*srfDistance,
		q[2]-crossP123[2]*srfDistance
	];
	// p1->qMovedを、p1->p2(u)とp1->p3(v)に分解する
	// moved = s*p12 + t*p13
	var s = (qMoved[1]*p12[0] - qMoved[0]*p12[1]) /
			(p12[0]*p13[1] - p12[1]*p13[0]);
	var t = (qMoved[1]*p13[0] - qMoved[0]*p13[1]) /
			(p13[0]*p12[1] - p12[0]*p13[1]);
	// 内外判定
	var isInTriangle = (s>0) && (t>0) && (s+t<1);
	
	// --------------------------------------
	// 内側の場合は、srfDistanceが最短距離。
	// 外側の場合は、３辺と点の距離の最小値。
	// --------------------------------------
	var ret = 0;
	if( isInTriangle ){
		// 内側の場合は、srfDistanceが最短距離。
		ret = srfDistance;
	}else{
		// 外側の場合は、３辺と点の距離の最小値。
		var d1 = getDistancePointAndLineSegment_squared(p1, p2, q);
		var d2 = getDistancePointAndLineSegment_squared(p1, p3, q);
		var d3 = getDistancePointAndLineSegment_squared(p2, p3, q);
		
		ret = Math.sqrt( Math.min(d1,d2,d3) );
	}
	
	return ret;
}


// LU分解を使った３次連立方程式


// n行n列のAのLU分解
// 参考:http://www.cenav.org/raspi4a/
// 
/*
Ax=bの行列を解くために、
Ax = LUx = b へ変換して、
簡単に計算するための、難しい計算(!?).
この関数ではLU分解したUを返す
getLMatrixでU行列を渡すことでL行列を得る.

下記を表すとき、
| a11 a21 a31 |
| a12 a22 a32 |
| a13 a23 a33 |
配列は[ [a11, a12, a13], [a21, a22, a23], [a31, a32, a33] ]で
A[1][2]でa23を表す。
*/
function getUMatrix(A)
{
	
}

function getLMatrix(U)
{
	
}
