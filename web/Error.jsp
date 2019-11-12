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
        <script type="text/javascript">
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

            function redirect() {
                document.location.href = "Login.do";
            }
        </script>

    </head>
    <body onload="redirect();">

    </body>
</html>
