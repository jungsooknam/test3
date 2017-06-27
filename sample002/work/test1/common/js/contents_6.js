//contents
NumPage=Number(CodePage);NowPage=NumPage;
TotalPage=PageInfo.length-1;
//alert("NumPage="+NumPage+" / TotalPage="+TotalPage);

//플래시 완료시 호출
function moveControlComplete(){
	scoComplete();
}


swfName="../common/swf/player_6.swf";
function rtn_localSW(){return localSW;}
function rtn_xmlDir(){return xmlDir;}
function rtn_keyDir(){return keyDir;}

function rtn_CodeChap(){return CodeChap;}
function rtn_CodePage(){return CodePage;}

//전체 페이지/전체페이지
function rtn_NowPage(){return NowPage;}
function rtn_TotalPage(){return TotalPage;}

function rtn_Script(){return PageInfo[NowPage][0];}
function rtn_GrpNum(){return PageInfo[NowPage][1];}
function rtn_BgSwf(){return PageInfo[NowPage][2];}
function rtn_Sudden(){return PageInfo[NowPage][3];}
function rtn_contMain(){return PageInfo[NowPage][4];}
function rtn_contSub(){return PageInfo[NowPage][5];}
function rtn_zoom(){return PageInfo[NowPage][6];}

function rtn_FlvConnURL(){return FlvConnURL;}
function rtn_FlvDir(){return FlvDir;}

function writeContents(){
	var ContentsHTML="<div>"+SwfViewRtn(swfName,'mainflash',1000,540)+"</div>";
	document.write(ContentsHTML);
}

function popDic(){
	MM_openBrWindow('../common/swf/keyword.htm','popkeyword','resizable=no,width=800,height=540,top=0,left=0');
}

function popHelp(){
	MM_openBrWindow('../common/swf/help.htm','popHelp','resizable=no,width=900,height=540,top=0,left=0');
}

function goURL( $url ){
	window.open($url).focus();
}


function goExit(){
	ans = confirm("현재의 학습내용을 종료하시겠습니까?");
	if(ans==true){
		if( localSW != true ){//포팅용
			study_time_regist()
			top.close();
		}else{
			window.close();
		}
	}
}


function goPrePage(){
	if(NumPage==1){alert('첫 페이지 입니다.');
	}else{NumPage--;location.href="C"+TransTen(NumPage)+".html";}
}
function goNxtPage(){
	if(NumPage==TotalPage){alert('마지막 페이지 입니다.');
	}else{NumPage++;location.href="C"+TransTen(NumPage)+".html";}
}
function goGrp(_n){
	var tPg=0;for(var i=1;i<=TotalPage;i++){if(PageInfo[i][1]==_n){tPg=i;break;}}
	if(tPg!=0){location.href="C"+TransTen(tPg)+".html";}
}

function popAll(_n){
	var tPopName=CodeChap+"_"+CodePage+"_pop"+_n;
	var popSize='';
	popSize=confPopSize(CodeChap+""+CodePage+"_"+_n);
	var PopSplit=popSize.split(",");       
	var PopW=PopSplit[PopSplit.length-4].substr(6,3);
	var PopH=PopSplit[PopSplit.length-3].substr(7,3);
	MM_openBrWindow(CodeChap+"_"+CodePage+'_pop'+_n+'.html?popName='+tPopName+"&PopW="+PopW+"&PopH="+PopH+"&CodeChap="+CodeChap,CodePage+'_pop'+_n,popSize);
	
}
function downAll(_n){
	var downURL="../"+confDownURL(CodeChap+""+CodeSec+""+CodePage+"_"+_n);MM_openBrWindow('../common/down.htm?URL='+downURL,'download','width=450,height=260,top=0,left=0');
	//alert( "프로토에서는 지원하지 않습니다." );
}
for(var i=1;i<=5;i++){
	var popNum=TransTen(i);
	eval("pop"+popNum+"=function(){popAll('"+popNum+"');}");
	eval("down"+popNum+"=function(){downAll('"+popNum+"');}");
}

