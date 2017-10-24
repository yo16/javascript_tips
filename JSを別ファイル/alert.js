// 外に定義した関数

function outerAlert(msg){
	alert(msg);
}


// 外部ファイルを読むことをここで定義するために、
// scriptエレメントをbodyへ追加
if (document.createElement) window.onload = function() {
	var ele = document.createElement("script");		// 新規に要素（タグ）を生成
	ele.setAttribute("src", "include.js");
	document.body.appendChild(ele);					// このページ (document.body) の最後に生成した要素を追加
}

