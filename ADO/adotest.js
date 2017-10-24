
function echo_test()
{
	var strFilePathL = "C:\\tmp\\ikeda_local\\tool\\javascript\\ADO\\SupportLog2014.mdb"
	var strFilePath = "SupportLog2014.mdb"
	var objADO = new ActiveXObject("ADODB.Connection");
//	objADO.Open("Driver={Microsoft Access Driver (*.mdb)}; DBQ=" + strFilePath + ";");
//	objADO.Open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + strFilePath + ";");
//	objADO.Open("DBQ=" + strFilePath + ";");
//	objADO.Open("PROVIDER=MSDASQL;DSN=" + strFilePath + ";");
	objADO.Open("PROVIDER=MSDASQL;DRIVER={Microsoft Access Driver (*.mdb)};DBQ=" + strFilePathL + ";");


	var objRS = objADO.Execute("SELECT COUNT(*) FROM LOG;");
	WScript.echo("a" + objRS(0));
	
	
	objADO.Close();
	objADO = null; 

}


echo_test();
