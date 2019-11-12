<%-- 
    Document   : InvalidateSession1
    Created on : Feb 28, 2018, 3:03:19 PM
    Author     : pardha.s
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">


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
                //parent.invalidSessionLogout();
                parent.document.location.href = "InvalidateSession.do";
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
    <body onload="redirect();">
<!--        <h4></h4>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr align="center" valign="center">

                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <th class="heading">Error Page</th>
                    </table>
                </td>
            </tr>
            <tr align="center" valign="center">
                <td style="color:#E0A21B;font-size:20px;">The following are may cause the reasons:</td>
            </tr>
            <tr align="left" valign="center">
                <td align="center" valign="top" >
                    <table width="400" border="0" cellspacing="0" cellpadding="0">
                        <tr style="height:10px;"></tr>
                        <tr>
                            <td align="left" valign="top" style="padding-left:20px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                    <tr><td height="10px"></td></tr>
                                    <tr>
                                        <td nowrap class="data" valign="middle" >*Your session has become invalid due to session timeout.</td>
                                    </tr>
                                    <tr><td height="10px"></td></tr>
                                    <tr>
                                        <td nowrap class="data" valign="middle" >*Your session has become invalid because of invalid request.</td>
                                    </tr>
                                    <tr><td height="10px"></td></tr>
                                    <tr>
                                        <td nowrap class="data" valign="middle" >*Another user has invalidated your session by logging in with the same UserID.</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="color:#E0A21B;font-size:20px;" align="center" valign="top" >
                    <br>
                    <a href="javascript:redirect()" >Click Here To LOGIN</a>
                </td>
            </tr>

        </table>-->
    </body>
</html>
