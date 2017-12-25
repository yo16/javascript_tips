/*
 * matrix_2d
 * 2016 (c) yo16
 * 
 * 和と積しかいらないので自作。
 * |a b|
 * |c d|
 * この行列式は、
 * [[a,c],[b,d]]
 * として表現する。
 *
 * |x|
 * |y|
 * このベクトルは
 * [x, y]
 * として表現する
 */

var matrix_2d = {
	// 内積
	// 計算できるタイプ
	// dot( スカラ, 2x1 )
	// dot( スカラ, 2x2 )
	// dot( 2x2, 2x1 )
	// dot( 2x2, 2x2 )
	// これ以外はエラー！
	dot : function(pm1, pm2){
		var type1 = getMatrixType(pm1);
		var type2 = getMatrixType(pm2);
		
		if(
			( type1.row == type1.col == 1 ) && 
			( (type2.row == 2) && (type2.col == 1) )
		){
			// dot( スカラ, 2x1 )
			return [pm1*pm2[0], pm1*pm2[1]];
		}else if(
			( type1.row == type1.col == 1 ) &&
			( (type2.row == 2) && (type2.col == 2) )
		){
			// dot( スカラ, 2x2 )
			return [
				[ pm1*pm2[0][0], pm1*pm2[0][1] ],
				[ pm1*pm2[1][0], pm1*pm2[1][1] ]
			];
		}else if(
			( (type1.row == 2) && (type1.col == 2) ) &&
			( (type2.row == 2) && (type2.col == 1) )
		){
			// dot( 2x2, 2x1 )
			return [
				pm1[0][0]*pm2[0] + pm1[1][0]*pm2[1],
				pm1[0][1]*pm2[0] + pm1[1][1]*pm2[1]
			];
		}else if(
			( (type1.row == 2) && (type1.col == 2) ) &&
			( (type2.row == 2) && (type2.col == 2) )
		){
			// dot( 2x2, 2x2 )
			return [
				[
					pm1[0][0]*pm2[0][0] + pm1[1][0]*pm2[0][1],
					pm1[0][1]*pm2[0][0] + pm1[1][1]*pm2[0][1]
				],
				[
					pm1[0][0]*pm2[1][0] + pm1[1][0]*pm2[1][1],
					pm1[0][1]*pm2[1][0] + pm1[1][1]*pm2[1][1]
				]
			];
		}
		
		return null;
	},
	
	// 和
	// 計算できるタイプ
	// sum( 2x1, 2x1 )
	// sum( 2x2, 2x2 )
	sum : function(pm1, pm2){
		var type1 = getMatrixType(pm1);
		var type2 = getMatrixType(pm2);
		
		if(
			( (type1.row == 2) && (type1.col == 1) ) &&
			( (type2.row == 2) && (type2.col == 1) )
		){
			// sum( 2x1, 2x1 )
			return [[pm1[0]+pm2[0], pm1[1]+pm2[1]]];
		}else if(
			( (type1.row == 2) && (type1.col == 2) ) &&
			( (type2.row == 2) && (type2.col == 2) )
		){
			// sum( 2x2, 2x2 )
			return [
				[
					pm1[0][0]+pm2[0][0],
					pm1[0][1]+pm2[0][1]
				],
				[
					pm1[1][0]+pm2[1][0],
					pm1[1][1]+pm2[1][1]
				]
			];
		}
		
		return null;
	}
};

function getMatrixType(pm)
{
	var ret = {row:1, col:1};
	
	if( !Array.isArray(pm) ){
		// 1x1
		m1Type.row = 1;
		m1Type.col = 1;
	}else{
		if( pm.length == 0 ) return null;
		if( !Array.isArray(pm[0]) ){
			// *x1
			m1Type.row = pm.length;
			m1Type.col = 1;
		}else{
			// *x*
			if( pm[0].length == 0 ) return null;
			m1Tpye.row = pm[0].length;
			m1Tpye.col = pm.length;
		}
	}
	return ret;
}
