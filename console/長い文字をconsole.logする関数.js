
// console.logが1024バイトしか出力できないから
// 適度に分けながらconsole.logする
function conlog(str)
{
	// １行に出力するバイト数
	var divSize = 1000;
	
	// 分割する数
	var logCount = Math.floor(str.length / divSize) + 1;
	
	var logStr = "";
	for( var i=0; i<logCount; i++ ){
		if( logCount > 1 ){
			logStr = "(" + i + ") ";
		}else{
			logStr = "";
		}
		logStr += str.substr(i*divSize, divSize);
		
		console.log( logStr );
	}
}
