var xmlFilePath = "Prac1.xml";
$(function(){
	$("div#results").mouseover(function(){
		$("div#results").html("<h1>bbb</h1>");
	});
});


var xmlParser = {

	// ì«Ç›çûÇ›
	read:function() {
		var targetElm = document.getElementById("results");
		
		var url = "http://ms-redmine.excel.co.jp/redmine/projects/mshp-nohin/issues.atom?key=0f509115f1ba57ba06f710c17c990259210e4823";
//		$.get("Prac1.xml", function(data){
		$.get(url, function(data){
			alert(data);
		});
		
		$("div#results").html("<h1>aaa</h1>");
	}

};

setTimeout(xmlParser.read,100);
