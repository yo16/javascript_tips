
// **********************************************************************
// DB Open
// **********************************************************************
var dbCon_SupportLog = null;
function dbOpen_SupLog()
{
	// frameがある場合は、frameからオブジェクト情報を得る
	if( parent.frmLeft ){
		if( parent.frmLeft.dbCon_FLSupportLog ){
			dbCon_SupportLog = parent.frmLeft.dbCon_FLSupportLog;
		}
	}
	
	// Objがない場合は作る
	if( !dbCon_SupportLog ){
		dbCon_SupportLog = new ActiveXObject('ADODB.Connection');
	}
	
	// 開いていない場合は開く
	if( dbCon_SupportLog.state == 0 ){
		var agentstr = navigator.userAgent;
		if( agentstr.indexOf('x64;') > 0 ){
			alert('IE 64bit版では動作しません！');
			// ACE.OLEDB.12が64bit版がないため。別途インストールすればできる。
		}
		dbCon_SupportLog.Open('PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb)};DBQ=' + DBPATH_SUPPORTLOG + ';');
		
		// 終了時にdbCloseを呼ぶ処理を追加
		$(window).on("beforeunload", function(e){
//			dbClose_SupLog();
		});
	}
	
	// frameの場合は結果を書き戻す
	if( parent.frmLeft ){
		parent.frmLeft.dbCon_FLSupportLog = dbCon_SupportLog;
	}
	
	return dbCon_SupportLog;
}

// **********************************************************************
// DB Close
// **********************************************************************
function dbClose_SupLog()
{
	if( dbCon_SupportLog != null ){
		dbCon_SupportLog.Close();
		dbCon_SupportLog = null; 
	}
}

