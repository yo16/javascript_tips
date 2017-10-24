lastIndexOf(str[, start])
対象の文字列の最後から引数に指定した文字列を検索します。

パラメータ:
  str  検索する文字列
  start  検索を開始する位置
戻り値:
  指定した文字列が含まれていた場合は最初に見つかった位置。見つからなかっ
  た場合は-1を返す。

"canal".lastIndexOf("a")   // 3 を返します
"canal".lastIndexOf("a",2) // 1 を返します
"canal".lastIndexOf("a",0) // -1 を返します
"canal".lastIndexOf("x")   // -1 を返します