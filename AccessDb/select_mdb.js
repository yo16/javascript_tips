
var dbPath1 = 'C:\\zProgramming\\JavaScript\\practice\\AccessDb\\test.mdb';

// 接続
// ActiveXObjectはMicrosoftの製品なので
// 通常はchromeで使えない！
var dbCon = new ActiveXObject('ADODB.Connection');
var strConnect;
strConnect = 'PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb)};DBQ=' + dbPath1 + ';';
dbCon.Open(strConnect);

// 実行
var objRes = dbCon.Execute('select count(*) from Tab1;');

// 結果を取得
var res = objRes(0) - 0;

// 結果を表示
alert(res);

// 接続解除
dbCon.Close();

