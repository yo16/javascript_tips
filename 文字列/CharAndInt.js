/**
 * @CharAndInt
 * 文字列と整数型の変換
 */
function CharAndInt()
{
	// ----------------------
	// 文字列から数値
	// 整数を意識したいときはparseInt
	// 小数でも整数でもいいときはNumber
	// もっとラフなときは、-0（マイナスゼロ）
	// ----------------------
	
	// parseInt
	// 文字列→整数
	alert( parseInt("123") === 123 );		// true
	
	// parseFloat
	// 文字列→小数
	alert( parseFloat("123.45") === 123.45);		// true
	
	// Number
	alert( Number("123") === 123 );		// true
	alert( Number("123.45") === 123.45 );		// true
	
	// -0
	alert( ("123"-0) === 123 );		// true
	alert( ("123.45"-0) === 123.45 );		// true
	
	// ----------------------
	// toString
	// 数値→文字列
	// ----------------------
	alert( (123).toString() === "123" );	// true
	alert( (123.45).toString() === "123.45" );	// true
	alert( ''+(123.45) === "123.45" );	// true
	
	// ここまで書いておいてナンだけど、
	// JavaScriptは自動的に変換してくれるので
	// こんなに厳密にやらないといけないことは稀。
	
}