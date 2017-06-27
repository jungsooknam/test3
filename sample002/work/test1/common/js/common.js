//config
//document.title="보험업법 마스터";//title적용

var localSW=false; //false:로컬용, false:포팅용

///////////////////////////////////////////////////////////////////////////
var FlvConnURL="local";
var FlvDir="../../mov/";//flv local

//var FlvConnURL="rtmp://58.87.43.79:1935/free";
//var FlvDir="/flv:5869/";//flv local
///////////////////////////////////////////////////////////////////////////

var xmlDir="../common/config/flv_url.xml";//xmlURL
var keyDir="../config/keyword_data.xml";//xmlURL

function confPopSize(_n){//popup size return
	var tRtn="";switch(_n){
	//case '0104_01':tRtn="width=890,height=600,left=0,top=0";break;
	default : tRtn="width=800,height=600,left=0,top=0";
	}return tRtn;
}
function confDownURL(_n){//download URL
	var tRtn="#";switch(_n){
	//case '010302_01':tRtn="down/download01_06.zip";break;
	}return tRtn;
}
function confNoteNo(_n){//Note Number
	//1+차시(2자리문자)+절(숫자)
	//return "1"+_n.substr(0,2)+Number(_n.substr(2,2));
}


//common
function MM_openBrWindow(theURL,winName,features){window.open(theURL,winName,features).focus();}
function TransTen(inum){return(inum<10?("0"+inum):(inum));}//자리수변환
function SwfViewRtn(swfURL,swfID,W,H){//swf
var SwfHTML="";SwfHTML+="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='"+W+"' height='"+H+"' id='"+swfID+"'>";
SwfHTML+="<param name='movie' value='"+swfURL+"'><param name='menu' value='false'><param name='quality' value='high'><param name='allowScriptAccess' value='always'><param name='allowFullScreen' value='true' />";
SwfHTML+="<embed src='"+swfURL+"' menu='false' quality='high' allowScriptAccess='always' allowFullScreen='true' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+W+"' height='"+H+"' name='"+swfID+"'></embed>";
SwfHTML+="</object>";return SwfHTML;}
function SwfView(swfURL,swfID,W,H){document.write(SwfViewRtn(swfURL,swfID,W,H));}

//cookie
var expDays=30;var exp = new Date();exp.setTime(exp.getTime()+(expDays*24*60*60*1000));
function inCookie(name,value){
	document.cookie = name + "=" +value+"; expires=" + exp.toGMTString() + "; path=/;"
	//document.cookie = name + "=" +value+"; expires=" + exp.toGMTString() + ";";
}
function outCookie(name){var from_idx=document.cookie.indexOf(name+'=');if(from_idx != -1){from_idx+= name.length+1;to_idx = document.cookie.indexOf(';', from_idx);if(to_idx == -1)to_idx=document.cookie.length;return unescape(document.cookie.substring(from_idx, to_idx));}else{return ""}}
function enEnter(_t){var tTxt2="";var tTxt=_t;for(i=0;i<tTxt.length;i++)(tTxt.charCodeAt(i)==13)?tTxt2+="¿":tTxt2+=tTxt.charAt(i);return tTxt2}//enter 인코딩
function deEnter(_t){var tTxt2="";var tTxt=_t;for(i=0;i<tTxt.length;i++)(tTxt.charAt(i)=="¿")?tTxt2+=String.fromCharCode(13):tTxt2+=tTxt.charAt(i);return tTxt2}//enter 디코딩
function ckSaveNote(name,value){var tTxt=enEnter(value);inCookie(name,tTxt);}//노트 cookie save
function ckLoadNote(name){var tTxt=deEnter(outCookie(name));return tTxt;}//노트 cookie load


var tLocal=document.location.href.split("/");
tLocal=tLocal[tLocal.length-1];
var CodePage=tLocal.substr(1,2);