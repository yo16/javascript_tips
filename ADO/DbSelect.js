// コネクションオブジェクト
var dbCon;

$(document).ready(function(){
	
	// 検索ボタン押下
	$('#btnSelect').click(executeThrowQuery);
	
	// DBパス変更
	$('#selSelectDb').change(changePath);
	
	// DBパス押下
	$('#dbPath').click(toggleDbPathChangeTools);
	
	// DB変更実行ボタン押下
	$('#btnSelectDb').click(changeDb);
	
	// 終了処理
	$(window).bind("beforeunload", closeDb);
	
	// DBパスを表示
	$('#dbPath').text(
		$('#selSelectDb option:selected').text()
	);
	$('#selSelectDb').hide();
//	$('#btnUsePath').hide();
	$('#txtSelectDb').hide();
	$('#btnSelectDb').hide();
	
	// DB接続
	openDb($('#selSelectDb option:selected').text());
	
	// for debug
//	$('#areaQuery').val('select Log.logNo from Log where LogY=14 and LogNo=2878;');
});

// DB接続
function openDb(dbPath)
{
	var agentstr = navigator.userAgent;
	if( agentstr.indexOf('x64;') > 0 ){
		alert('IE 64bit版では動作しません！');
		// ACE.OLEDB.12が64bit版がないため。別途インストールすればできる。
	}
	
	dbCon = new ActiveXObject('ADODB.Connection');

// 32bit	dbCon.Open('PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb)};DBQ=' + dbPath + ';');
// 64-accdb?
	dbCon.Open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source='+ dbPath + ';Jet OLEDB:Engine Type=6;');
// 64-mdb?	dbCon.Open('PROVIDER=Microsoft.ACE.OLEDB.4.0;DATA SOURCE='+ dbPath + ';Jet OLEDB:Engine Type=5;');
}

// DB切断
function closeDb()
{
	dbCon.Close();
	dbCon = null; 
}


// 検索実行
function executeThrowQuery(){
	// tableタグを初期化
	$('#tabResult thead').remove();
	$('#tabResult tbody').remove();
	$('#tabResult').append($('<thead></thead>'));
	$('#tabResult').append($('<tbody></tbody>'));
	
	// クエリを取得
	var strQuery = $('#areaQuery').val();
	
	// 検索実行
	var dbRes = new ActiveXObject('ADODB.Recordset');
	try{
		dbRes.Open( strQuery, dbCon, 1, 1);
		// 見つからない場合は抜ける
		if( dbRes.EOF ){
			alert("Data Not Found.");
			return;
		}
		dbRes.MoveFirst();
	}
	catch(e){
		// エラー処理
		alert('---- SQL Error ----\n'
			+ 'name:' + e.name + '\n'
			+ 'message:' + e.message + '\n'
			+ 'constructor:' + e.constructor + '\n'
		);
		return;
	}
	
	// 結果を表示
	var bFirst = true;
	var nColNum = dbRes.Fields.count;
	while( !dbRes.EOF )
	{
		// 最初はヘッダ行を作る
		if( bFirst ){
			var tagTrH = $('<tr></tr>');
			for( var i=0; i<nColNum; i++ )
			{
				tagTrH.append(
					$('<th></th>')
						.text(dbRes.Fields(i).name)
				);
			}
			$('#tabResult thead').append(tagTrH);
			
			bFirst = false
		}
		
		// データ行を作る
		var tagTr = $('<tr></tr>');
		for( var i=0; i<nColNum; i++ )
		{
			tagTr.append(
				$('<td></td>')
					.text(dbRes.Fields(i).Value)
					.addClass('resultTd')
			);
		}
		$('#tabResult tbody').append(tagTr);
		
		dbRes.MoveNext();
	}
	
	// 行ごとに色をつける
	setCss();
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