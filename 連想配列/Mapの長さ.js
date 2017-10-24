// Mapの長さ
Map.prototype.length = function()
{
	var len = 0;
	this.forEach(function(){len++;});
	return len;
}

/*
new Map()と、{}は別物なので注意。
動作はほぼ同じ。

Mapには、sizeというプロパティがあるので、
この関数は無意味。というか、混乱の元なので使わないほうがいい。
*/
