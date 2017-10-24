// mdbファイルパス
var DBPATHs = [
	'\\\\PHS219\\User556\\200_ESPRi-Ⅱサポート\\210_共通\\Q&A対応記録\\DB\\SupportLog.mdb',
	'Z:\\01_3DY\\99_3DY個人\\池田 容一郎\\20_作業\\20140526_1_サポートログ分析ツール\\3_作成\\1_10_Mcb2Qry\\SupportLogAnalyze.mdb',
	'C:\\tmp\\ikeda_local\\tool\\javascript\\ADO\\SupportLog.mdb'
];

// コネクションオブジェクト
var dbCon;


$(document).ready(function(){
	
	// Executeボタン押下
	$('#btnExecute').click(executeQuery);
	
	
	// 終了処理を登録
	$(window).bind("beforeunload", closeDb);
	
	// DBパスを表示
	$('#spnUsingDbPath').text(DBPATHs[0]);
	
	// DBへ接続
	openDb();
	
	// for debug
//	$('#areaQuery').val('select Log.logNo from Log where LogY=14 and LogNo=2878;');
});

// DB接続
function openDb()
{
	var strPath = $('#spnUsingDbPath').text();
	
	dbCon = new ActiveXObject('ADODB.Connection');
	dbCon.Open('PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb)};DBQ=' + strPath + ';');
}

// DB切断
function closeDb()
{
	if( dbCon ){
		dbCon.Close();
		dbCon = null;
	}
}


// 実行
function executeQuery(){
	// 時刻取得
	var dt1 = new Date();
	
	// クエリを取得
	var strQuery = $('#areaQuery').val();
	
	try{
		// トランザクションを開始
		dbCon.BeginTrans;
		
		// 実行
		var resultCount = new Number(0);
		dbCon.Execute( strQuery, resultCount );
alert(typeof(resultCount));
		
		// Commit
		dbCon.CommitTrans;
	}
	catch(e){
		// エラー処理
		dbCon.RollbackTrans;
		
		alert('---- SQL Error ----\n'
			+ 'name:' + e.name + '\n'
			+ 'message:' + e.message + '\n'
			+ 'constructor:' + e.constructor + '\n'
		);
		return;
	}
	finally{
	}
	
	// 時刻取得
	var dt2 = new Date();
	var timestr = '' + dt1.toLocaleString() + ' + ' + (dt2.getMilliseconds()-dt1.getMilliseconds()) +'[ms]';
	
	// 結果を表示
	$('#spnResult')
		.append($('<div></div>')
			.append($('<div></div>')
				.addClass('ExecutedTimestamp')
				.text( timestr )
			)
			.append($('<span></span>')
				.addClass('ExecutedQuery')
				.text(strQuery)
			)
			.append($('<br />'))
			.append($('<span></span>')
				.addClass('ExecuteAffected')
				.text('RecordsAffected='+resultCount)
			)
		)
		.append($('<hr />'));
	;
}

// DB変更ツールをトグル
function toggleDbPathChangeTools()
{
	if( $('#selSelectDb').is(':hidden') ){
		showDbPathChangeTools();
	}else{
		hideDbPathChangeTools();
	}
}
// DB変更ツールを表示
function showDbPathChangeTools()
{
	$('#selSelectDb').fadeIn();
	$('#txtSelectDb').fadeIn();
	$('#btnSelectDb').fadeIn();
	
	// テキストボックスへ設定
	$('#txtSelectDb').val($('#dbPath').text());
}
// DB変更ツールを非表示
function hideDbPathChangeTools()
{
	$('#selSelectDb').fadeOut();
	$('#txtSelectDb').fadeOut();
	$('#btnSelectDb').fadeOut();
}

// パスを変更
function changePath(){
	$('#txtSelectDb').val(
		$('#selSelectDb option:selected').text()
	);
}

// DB変更
function changeDb()
{
	var newPath = $('#txtSelectDb').val();
	
	// 空だったらやめとく
	if( newPath.length == 0 ) return;
	// 存在チェックやりたいけど、めんどくさいからいいや。
	
	closeDb();
	openDb(newPath);
	$('#dbPath').text(newPath);
	
	hideDbPathChangeTools();
}


// cssを設定
function setCss()
{
	$('#tabResult tbody tr:odd td').css('background-color', '#fff');
	$('#tabResult tbody tr:even td').css('background-color', '#f3f3ff');

}