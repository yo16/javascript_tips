
// -----------------------------------------------------
// replaceAllを実装
// -----------------------------------------------------
String.prototype.replaceAll = function( org, dest ){
	return this.replace(new RegExp(''+org, 'gi'), dest);
}
