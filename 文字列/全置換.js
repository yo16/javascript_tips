// 自作
function allReplace(text, sText, rText) {
	// 全置換する関数。（textの、sTextをrTextに置換）
	while (true) { // 無限ループ。
		dummy = text;
		text = dummy.replace(sText, rText); // 置換。
		if (text == dummy) {
			break;       // 置換しても変化しなければループを抜ける。
		}
	}
	return text;  // 置換後の文字列を返して終了。
}


// どこかから持ってきた
String.prototype.replaceAll = function( org, dest ){
	return this.replace(new RegExp(''+org, 'gi'), dest);
}

