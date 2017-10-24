

$(document).ready(function(){
	$('#div23').scroll(function(){
		var l = $('#div23').scrollLeft();
		$('#frm21').scrollLeft(l);
		$('#div22').scrollLeft(l);
	});
	$('#div32').scroll(function(){
		var t = $('#div32').scrollTop();
		$('#div12').scrollTop(t);
		$('#div22').scrollTop(t);
	});
	// 変形部の初期サイズ
	var initialTableSize = {
		width  : $('#frm22').css('max-width').substr(0, $('#frm22').css('max-width').length-2)-0,
		height : $('#div22').css('max-height').substr(0, $('#div22').css('max-height').length-2)-0
	};
	console.log(initialTableSize);
	// 最初の位置の絶対座標
	var initialPos_divDrag = {
		x : $('#divDrag').offset().left,
		y : $('#divDrag').offset().top
	};
	console.log(initialPos_divDrag);
	$('#divDrag').draggable({
		start:function(event,ui){
			// なぜか初期サイズを取れないときの対応
			// これでもおかしな動きをするから、
			// ハードコーディングしちゃった方がいいかも
			if( isNaN(initialTableSize.width) || isNaN(initialTableSize.height ) ){
				initialTableSize.width  = $('#frm22').css('max-width').substr(0, $('#frm22').css('max-width').length-2)-0;
				initialTableSize.height = $('#div22').css('max-height').substr(0, $('#div22').css('max-height').length-2)-0;
				console.log('safe!');
				console.log(initialTableSize);
			}
		},
		drag:function(event,ui){
		},
		stop:function(event,ui){
			// 絶対位置を取得
			var curPos = {
				x : $('#divDrag').offset().left,
				y : $('#divDrag').offset().top
			};
			// 変形後の大きさを、最初の大きさに対してoffsetして求める
			var newSize = {
				width  : initialTableSize.width + curPos.x - initialPos_divDrag.x,
				height : initialTableSize.height + curPos.y - initialPos_divDrag.y
			};
			
			$('#frm21').css('max-width', ''+newSize.width+'px');
			$('#frm22').css('max-width', ''+newSize.width+'px');
			$('#div23').css('max-width', ''+newSize.width+'px');
			$('#divDrag').css('left','0px');
			$('#div12').css('max-height', ''+newSize.height+'px');
			$('#div22').css('max-height', ''+newSize.height+'px');
			$('#div32').css('max-height', ''+newSize.height+'px');
			$('#divDrag').css('top','0px');
		}
	});
});

