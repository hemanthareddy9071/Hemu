<%-- 
    Document   : changepassword
    Created on : Jan 24, 2018, 4:14:14 PM
    Author     : jangachary.s
--%>

<%@page import="com.in10s.core.CRSLoginValidator"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="net.sf.json.JSONObject"%>


<%
    CRSLoginValidator obj = new CRSLoginValidator();
    obj.clearSession();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />

        <script src="js/login.js"></script>
        <script src="js/common.js"></script>
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/validation.js"></script>
        <script src="js/encrypt.js"></script>
        <script src="js/sessionValidation.js"></script>
        <script>
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

            function passwordCancel() {
                $("#OldPwd").val("");
                $("#NewPwd").val("");
                $("#ConfirmNewPwd").val("");
                navigateToHome();
            }
            function navigateToHome() {
                var strLoginResponse = $("#loginResponse").val();
                var loginResponse = JSON.parse(strLoginResponse);
                var lobType = loginResponse.lobType;
                if (lobType === 'LL') {
                    parent.pageLoad('fmsDashboard.do');
                } else {
                    parent.pageLoad('Dashboard.do');
                }
            }
        </script>
    </head>
    <body  onload="parent.resizeFrame('frameBody');
            loadUserName();">

        <form name="dashboardForm">
            <input type="hidden" id="loginResponse" value="<s:property value="#session.loginResponse"/>" />


            <div id="">

                <div id="" class="container">

                    <div id="content-wrapper">
                        <div id="page_header_bar" class="row" >
                            <div class="col-xs-12">
                                <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                                    <span class="bluetxt"><a href="#" onclick="navigateToHome();"> Home </a></span>  <span class="larrow">&gt;</span> <span class="bluetxt"> Change Password</span><span class="bluetxt" id="navChangePwdId"> </span></div>
                                <h1 class="page_heading" id="changepasswordId"></h1>
                            </div>
                        </div>
                        <div class="clear mrg65B"></div>
                        <div class="row" id="page_content_block" >
                            <div class="col-lg-12 pad10A">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span id="message"></span>
                                        <div class="form-group">
                                            <label id="currentPasswordId" >Old Password</label><span class="redtxt">*</span>
                                            <input   type="password"  name="" id="OldPwd" autocomplete="on" class="txtinput">
                                        </div>
                                        <div class="form-group">
                                            <label  id="newPasswordId" >New Password</label><span class="redtxt">*</span>
                                            <input   type="password" name="" id="NewPwd"  autocomplete="on" class="txtinput">
                                        </div>
                                        <div class="form-group">
                                            <label  id="confirmPasswordId">Confirm Password </label><span class="redtxt">*</span>
                                            <input   type="password" name="" id="ConfirmNewPwd" autocomplete="on" class="txtinput">
                                        </div>
                                        <div class="form-group"> <a href="#" class="primarybt" id="btnGetInfo" onclick="PasswordChange();">Save </a>
                                            <a href="#" class="secondarybt" onclick="passwordCancel();"  id="cancelId"> Cancel</a> 
                                        </div>



                                    </div>
                                    <div class="col-md-6 ticklist pad25L ">
                                        <h3>Important Message</h3>
                                        <ul>
                                            <li>Be at least eight (8) characters but no more than fifteen (15) characters.</li>
                                            <li>Contain at least one alpha character (a-z; A-Z).</li>
                                            <li>Contain at least one numeric (0-9).</li>
                                            <li>Contain at least one special character.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!--        <div class="mask">
                    <img src="images/m-wait.gif" />
                </div>-->
        <!--<script src="js/jquery.min.js"></script>-->
        <!--        <script src="js/bootstrap.min.js"></script>-->
        <!--<script src="js/scripts.js"></script>-->
        <script>
            $("#btnGetInfo").click(function () {
                $("#divGetInfo").show();
            });
        </script>
    </form>
</body>
</html>

