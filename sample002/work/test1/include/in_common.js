
/**********************************************************************************/	
//����� ����

var G_LMS_TEST_GUBUN 	= false; 	// ���� �ý��� ���� üũ(������)�̸� true, �ƴϸ� false�� ������ ��
var G_LMS_PCHECK_GUBUN 	= true; 	// ���� ������ üũ �ϸ� ture, ���������� �ϸ� false
var G_LMS_DRM_GUBUN 	= false; 	// ������ ���������ϸ� ture, ���ϸ� false
var G_LMS_DRM_TYPE		= false; 	// ��Ű, ������ �Ѵ� �����ϸ� true, �����Ӹ� �����ϸ� false
var G_LMS_POARTING_TEST = false; 	// ������ false�� ����
var thisType = 2;

var G_LMS_TEST_FILE 	= "/content/porting_test.asp";
var G_LMS_PCHECK_FILE1 	= "/content/page_approval_request.asp";    	
var G_LMS_PCHECK_FILE2 	= "/page_approval_request.asp"; 
var G_LMS_TPDATE_FILE1	= "/content/study_time_update.asp";
var G_LMS_TPDATE_FILE2	= "/study_time_update.asp";
var G_COOKIE_PRAMETER_SAVE_NAME = "CYBERMBA_INSURANCE_LMS_PARAMETER";

var strComplete;
var strCompleteLastPage;

/**********************************************************************************/
//��Ű ����
function IN_SETCOOKIE(name,value,expires,path,domain,secure) {

	document.cookie = name + "=" + escape (value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : ""); 
}


/**********************************************************************************/
//��Ű �� �о����

function IN_GETCOOKIEVAL(offset) {
	
	var endstr = document.cookie.indexOf (";", offset);
	
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}


/**********************************************************************************/
//��Ű ���
function IN_GETCOOKIE(name) {
	
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	
	var i = 0;
	while (i < clen) {
	    var j = i + alen;
	    if (document.cookie.substring(i, j) == arg)
	      return IN_GETCOOKIEVAL(j);
	    i = document.cookie.indexOf(" ", i) + 1;
	    if (i == 0) break; 
	}
	return null;
}


/**********************************************************************************/
//LMS���� ���޹��� ������ ���� ���ϱ� ���� �Լ�
// as_name : LMS���� �Ѿ�� ���� ��
function IN_GETVALUE4LMS(as_name)
{
    var return_val = "";
    var lms_val = IN_GETCOOKIE(G_COOKIE_PRAMETER_SAVE_NAME);
    
    if (!lms_val)
    {
        if ( G_LMS_POARTING_TEST ) alert("IN_GETVALUE4LMS(): LMS���� ���� ������ ������ ���� �����ϴ�.");
        return;
    }
    
    var params = lms_val.split("&");    
    var param;    
    for ( var i=0 ; i < params.length; i++)
    {
        param = params[i].split("=");
        
        if (param[0] == as_name)
        {
            return_val = param[1];
            break;
        }
    }    
    return unescape(return_val);
}


/**********************************************************************************/
//LMS���� ���޹��� ������ ������ ���ؼ� ���ڿ��� ��ȯ��
function IN_GET_VALUES4LMS()
{
	var return_val = "";
	var lms_val = IN_GETCOOKIE(G_COOKIE_PRAMETER_SAVE_NAME);
	//alert(lms_val)
	if (!lms_val)
	{
	    if ( G_LMS_POARTING_TEST ) alert("IN_GET_VALUES4LMS(): LMS���� ���� ������ ������ ���� �����ϴ�.");
	    return;
	}
	
	var params = lms_val.split("&");    
	var param;    
	for ( var i=0 ; i < params.length; i++)
	{
	    param = params[i].split("=");
	    
	    if (param[0] != "returnURL" && param[0] != "returnPTarget")
	    {
	        return_val += "&" + param[0] + "=" + param[1];
	    }
	}    
	return return_val;
}


/**********************************************************************************/
//LMS���� CS�� ȣ��� �� ó�� �ѹ��� ���
//���� ����� �Լ�.
function IN_initRun()
{			
	//���� ������ ���� ���
	if (!location.search) 
	{
	    if ( G_LMS_POARTING_TEST ) alert("IN_initRun(): LMS���� ���� ������ �����ϴ�.");    
	    return;
	}    
	var str_search = location.search.substr(1, location.search.length);    
	//��Ű�� ���� ����
	IN_SETCOOKIE(G_COOKIE_PRAMETER_SAVE_NAME, str_search, null, "/");
	
	if ( G_LMS_POARTING_TEST ) alert("Cookie�� ����� LMS ���� \r\n\r\n" + IN_GETCOOKIE(G_COOKIE_PRAMETER_SAVE_NAME));   
}
 
 
/**********************************************************************************/
// ������ üũ 	
function IN_sendProc(curpageID) {		
	
	var locFrame = eval("top.mainFrame2LMS.PGFrame");
	
	if(locFrame != undefined ){			
		locFrame.document.frm.content_id.value = curpageID;
      	locFrame.document.frm.porting_test.value = G_LMS_TEST_GUBUN;
      	locFrame.document.frm.submit();  
      	
    }else{
    	
    	IN_GET_XMLHTTP("1", "content_id="+chgToStr(curpageID)+IN_GET_VALUES4LMS());
    }
		  		   
}

/**********************************************************************************/
// �н��ð� ���
function study_time_regist() {	    
    
	IN_GET_XMLHTTP("2", "cal_type=XMLHTTP"+IN_GET_VALUES4LMS()); 
}   


/**********************************************************************************/
// ������üũ �� �н����� ������ ����	
function IN_GET_XMLHTTP(gbn,pVal){	
		
	var XmlHttpRequest = false;	    		
	try {
	    XmlHttpRequest = new XMLHttpRequest();    	    
	}
	catch (trymicrosoft) {
	    try {
	        XmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");    	       
	   }
	    catch (othermicrosoft) {
	        try {
	            XmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");    	           
	        }
	        catch (failed) {
	            XmlHttpRequest = false;
	        }
	    }
	}	
	
	if (document.location.hostname.substring(0,3) == "mms" ){
		
		if( gbn == "1" ) sendURL = G_LMS_PCHECK_FILE1;
		if( gbn == "2" ) sendURL = G_LMS_TPDATE_FILE1;
				
	}else{
			
		if( gbn == "1" ) sendURL = G_LMS_PCHECK_FILE2;
		if( gbn == "2" ) sendURL = G_LMS_TPDATE_FILE2;
	}		
		
	if( G_LMS_TEST_GUBUN && gbn == "1" ) sendURL = G_LMS_TEST_FILE    
	//alert("pVal : "+pVal+"sendURL : "+sendURL);
	XmlHttpRequest.open('POST', sendURL, true);
	XmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
	 
	XmlHttpRequest.send(pVal);	
}





/**********************************************************************************/
//������ ��������
function IN_ACCESS_TYPE() {
		
	if( G_LMS_DRM_GUBUN ){	
	
		IN_initRun();
	
		if( G_LMS_DRM_TYPE ){
			if(IN_GETVALUE4LMS("user_id") == undefined || eval("top.page_approval_frame") == undefined ){
				alert("���������� ������ �����Դϴ�.");
				location.href="/content/cookie_apply.asp";
			} 
		}else{
			if(eval("top.page_approval_frame") == undefined){
				alert("���������� ������ �����Դϴ�.");
				location.href="/content/cookie_apply.asp";
			}
		}	
	}
}


/**********************************************************************************/	
//���迬���� Tracking Script
function IN_PageTracking_TYPE(){	

	if ( G_LMS_PCHECK_GUBUN ){
		var chasi;
		var cURL = this.location.href;
		var content_id = cURL.substring( cURL.lastIndexOf('/') + 1, cURL.lastIndexOf('/') + 4);		
		//alert(content_id );
		IN_initRun();		
		IN_sendProc(content_id );
	}
}



/**********************************************************************************/	
//�������� �� tracking ����
if(localSW!=true){
	IN_ACCESS_TYPE();
	IN_PageTracking_TYPE();
}
