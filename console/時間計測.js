function doTest()
{
	
	var cvs = document.getElementById("canvasTest");
	var pos1 = {x:10, y:20};
	var pos2 = {x:30, y:40};
	
	var num = 10000000;

console.log("------------");

	console.time("isInCanvas");
	for( var i=0; i<num; i++ ){
		if( isInCanvas(pos1, pos2, cvs) ){
			// 
		}
	}
	console.timeEnd("isInCanvas");
	
	console.time("isInCanvas2");
	for( var i=0; i<num; i++ ){
		if( isInCanvas2(pos1, pos2, cvs) ){
			// 
		}
	}
	console.timeEnd("isInCanvas2");
	
	console.time("isInCanvas3");
	for( var i=0; i<num; i++ ){
		if( isInCanvas3(pos1, pos2, cvs) ){
			// 
		}
	}
	console.timeEnd("isInCanvas3");
	
	console.time("isInCanvas4");
	for( var i=0; i<num; i++ ){
		if( isInCanvas4(pos1, pos2, cvs) ){
			// 
		}
	}
	console.timeEnd("isInCanvas4");
}

function isInCanvas(pos1, pos2, cvs)
{
	if(
		( (pos1.x<0) && (pos2.x<0) ) ||
		( (cvs.width<pos1.x) && (cvs.width<pos2.x) ) ||
		( (pos1.y<0) && (pos2.y<0) ) ||
		( (cvs.height<pos1.y) && (cvs.height<pos2.y) )
	){
		return false;
	}
	return true;
}

function isInCanvas2(pos1, pos2, cvs)
{
	// min/maxをそろえる
	if(
		( Math.max(pos1.x,pos2.x) < 0 ) ||
		( Math.min(pos1.x,pos2.x) > cvs.width ) ||
		( Math.max(pos1.y,pos2.y) < 0 ) ||
		( Math.min(pos1.y,pos2.y) > cvs.height )
	){
		return false;
	}
	return true;
	
	// →遅いことが多い
}

function isInCanvas3(pos1, pos2, cvs)
{
	// if文を分ける
	if( (pos1.x<0) && (pos2.x<0) ){
		return false;
	}
	if( (cvs.width<pos1.x) && (cvs.width<pos2.x) ){
		return false;
	}
	if( (pos1.y<0) && (pos2.y<0) ){
		return false;
	}
	if( (cvs.height<pos1.y) && (cvs.height<pos2.y) ){
		return false;
	}
	return true;
	
	// →あんまり変わらない
}

function isInCanvas4(pos1, pos2, cvs)
{
	// 線分交差アルゴリズムを使う
	if( judgeIentersected( pos1.x, pos1.y, pos2.x, pos2.y, 0, 0, cvs.width, 0 )){
		return false;
	}
	if( judgeIentersected( pos1.x, pos1.y, pos2.x, pos2.y, 0, 0, 0, cvs.height )){
		return false;
	}
	if( judgeIentersected( pos1.x, pos1.y, pos2.x, pos2.y, cvs.width, 0, cvs.width, cvs.height )){
		return false;
	}
	if( judgeIentersected( pos1.x, pos1.y, pos2.x, pos2.y, 0, cvs.height, cvs.width, cvs.height )){
		return false;
	}
	return true;
	
	// → ４倍以上遅い
}
// 線分abと線分cdが交差しているかどうか
var judgeIentersected = function(ax, ay, bx, by, cx, cy, dx, dy) {
  var ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
  var tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
  var tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
  var td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);

  return tc * td < 0 && ta * tb < 0;
};
