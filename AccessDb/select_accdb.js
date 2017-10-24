
var dbPath1 = 'C:\\zProgramming\\JavaScript\\practice\\AccessDb\\test.accdb';


alert('結局、解決方法は見つかっていない！');
// ここからhttp://www.microsoft.com/ja-jp/download/details.aspx?id=13255
// ドライバを入れればいいみたい。
// だけどそれって汎用的でないし、ユーザ環境では使えない。


// 接続
// ActiveXObjectはMicrosoftの製品なので
// 通常はchromeで使えない！
var dbCon = new ActiveXObject('ADODB.Connection');
var strConnect;
//strConnect = 'PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=' + dbPath1 + ';';
strConnect = 'Provider=Microsoft.ACE.OLEDB.12.0;Data Source=' + dbPath1 + ';Jet OLEDB:Engine Type=6;';
dbCon.Open(strConnect);

// 実行
var objRes = dbCon.Execute('select count(*) from Tab1;');

// 結果を取得
var res = objRes(0) - 0;

// 結果を表示
alert(res);

// 接続解除
dbCon.Close();

