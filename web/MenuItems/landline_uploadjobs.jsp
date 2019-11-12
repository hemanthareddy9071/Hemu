<%-- 
    Document   : landline_uploadjobs
    Created on : Mar 22, 2018, 12:22:02 PM
    Author     : ramesh.a
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
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

        <!-- Kendo CSS -->
        <link rel="stylesheet" href="css/kendo/kendo.common-material.min.css" />
        <link rel="stylesheet" href="css/kendo/kendo.material.min.css" />
        <link rel="stylesheet" href="css/kendo/kendo.dataviz.min.css" />
        <link rel="stylesheet" href="css/kendo/kendo.dataviz.material.min.css" />
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/menu.js"></script>

        <!-- Kendo script starts-->
        <script src="js/kendo/kendo.all.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/common.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/login.js"></script>
        <script src="js/kendo/grid_landline_uploaded_jobs.js"></script>
         <script src="js/encrypt.js"></script>
        <script src="js/sessionValidation.js"></script>
        <script>
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

            $(document).ready(function () {
                var errMsg = $('#message').val();
                if (errMsg == "" || errMsg == null) {
                } else {
                    alert(errMsg);

                }

            });

        </script>
    </head>
    <body onload="parent.resizeFrame('frameBody');timeoutfmsUploadForms();">
        <form name="uploadStatusForm">
<!--            <input type="hidden" id="message" value="<s:property value="message"/>" />
            <input type="hidden" id="FRC_ENABLE" value="<s:property value="#session.FRC_ENABLE"/>" />
            <input type="hidden" name="respMsg" id="respMsg" value="<s:property value="#session.respMsg"/>"/>-->
            <div id="">
                <div id="page_header_bar" class="row" >
                    <div class="col-xs-12">
                        <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                            <span class="bluetxt"><a href='#' onclick="parent.pageLoad('fmsDashboard.do');"> Home </a></span>       <span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"> Landline Uploaded Jobs</span></div>
                        <h1 class="page_heading" id="uploadStatusId" style="display: inline; padding-right:0px;"></h1>
                        <h1 class="page_heading" id="toal_Uploaded_jobs" style="display: inline; padding-left: 0px;"></h1>
                    </div>
                </div>
                <div class="clear mrg65B"></div>
                <div class="row" id="page_content_block">

                    <div class="col-lg-12 pad10A">
                        <!--<div class="alert alert-info">
                               <p>Note: - You can view the upload status of the past six months</p>
                               </div>-->

                        <div class="margin0">
                            <div class="pull-left">                
                                <div class="pull-left"><label>Customer Name</label>
                                    <input type="text"  class="form-control"  value="" id="cust_Name_id"> </div>
                                <div class="pull-left mrg15L pad20T">
                                    <a class="primarybt1"  title="Search" onclick="custNameSearch();">Search</a> </div>
                            </div>
                            <div class="pull-right"> </div>
                        </div>
                        <div class="clear mrg15B"></div>

                        <div id="grid"></div>

                    </div>
                </div>
            </div>
        </form> 
    </body>
</html>

