

// 本番環境でconsoleがない場合にダミー関数を作り出す処理
if( typeof(console) == 'undefined' ){
	console = {
		log : function(){}
	};
}

