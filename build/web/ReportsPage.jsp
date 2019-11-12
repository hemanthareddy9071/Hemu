<%-- 
    Document   : Error
    Created on : Feb 28, 2018, 3:03:19 PM
    Author     : pardha.s
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<%
    //session.invalidate();
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>BSNL</title>
        <!-- Styling -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript">
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

            function redirect() {
                parent.document.location.href = "Login.do";
            }
        </script>
        <!--        <style type="text/css">
                    .heading{
                        font-size:30px;
                        color:#FA2205;
        
        
                    }
                    .data{
                        font-size:20px;
                        color:#355CB0;
                        height:5px;
        
                    }
                    body {background-color: white !important;}
                </style>-->
    </head>
    <body >
        <div>
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12 pad20T">
                    <h1 class="page_heading">Reports</h1>
                </div>
            </div>
            <div>
                <div class="col-md-12">
                    <div class="row" id="page_content_block" >
                            <div class="col-lg-12 pad10A">
                                <center><h3>Comming Soon...</h3></center>
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </body>
</html>
