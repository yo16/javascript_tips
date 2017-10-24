/**
 * @CompareNull
 * Nullを比較したい場合
 */
function CompareNull()
{
	// obj1は、オブジェクトが入っている
	var obj1 = new Date();
	alert( obj1 == null );		// false
	
	// obj2は、nullになっている
	var obj2 = null;
	alert( obj2 == null );		// true
}
