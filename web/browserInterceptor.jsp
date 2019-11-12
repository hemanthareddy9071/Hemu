<%-- 
    Document   : browserInterceptor
    Created on : Mar 12, 2018, 11:07:17 AM
    Author     : pardha.s
--%>

<%

  String SBrowserId = (String)session.getAttribute("BID");
//  System.out.println(" SBrowserId in BrowserJsp..: :"+SBrowserId);  

%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>BSNL</title>
        
        <script src="script/md5.js"></script>
        <script src="script/detector.js"></script>
        <script src="script/sha256.js"></script>


       
    </head>
    <body>
       <input type="hidden" name="SBID" id="SBID" value='<%=SBrowserId%>'>

            <script type="text/javascript">

                function fGetBID(){
                    var BFP = pstfgrpnt();
                    var BID= sha256_digest(escape(BFP));
                    return BID;
                }
                var SBID = document.getElementById("SBID").value;
                if(SBID != null && SBID!="null")
                {
                    var bid=fGetBID();
                    if(SBID!=bid){
                        window.top.location.href="ErrorPage.do";
                    }
                }else{
                    //  alert('hai')
                }

            </script>
    </body>
</html>

