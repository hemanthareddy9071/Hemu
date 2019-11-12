<%-- 
    Document   : FMS_kyc_step1
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : ramesh.a
--%>

<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <% response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
        %>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />

        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>

        <script src="js/bootstrap.min.js"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kycCaf.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            var alrtRegpaynotComp="<s:text name="register.preview.paypending"/>";
        </script>
        
        <script>

            function fmsJOBUploadkyc() {
                $("#waitMask").show();
                var reqData={};
                reqData.KYCType = "FMSKYC";
                          $.ajax({
                            url: 'registerWingsUser.do',
                            type: 'POST',
                            async: false,
                            dataType: 'json',
                            data: {"reqData": encrypt(JSON.stringify(reqData))},
                            success: function (data) {
                              $("#waitMask").hide();
                                if (data.response.success) {
                                    if('S' ==data.response.responseData.PYMT){
                                        window.location.href=data.response.responseData.PYMT_URL;
                                    }else{
                                        alert(alrtRegpaynotComp);
                                               setTimeout(function () {
                                               window.location.href='Login.do';
                                                }, 100);    
                                    }

                            } else {
                                alert(data.response.message);
                                $("#waitMask").hide();
                                
                            }
                        }, error: function (data) {
                            $("#waitMask").hide();
                            alert( JSON.stringify(data));
                        }
                    });

            }
            
            function backInStep4() {
                var reqData = {};
                reqData.stage = "preview";
                reqData.kycpageStatus = "1";
                document.kycPreviewForm.method = "post";
                document.kycPreviewForm.action = "sendBackToStep2.do";
                document.kycPreviewForm.reqData.value = encrypt(JSON.stringify(reqData));
                document.kycPreviewForm.submit();
            }
        </script>
    </head>
    <body onload="setKYCPreviewData();" >
        <form name="kycPreviewForm">
            <input type="hidden" name="reqData" id="reqData"/>
            <input type="hidden" id="reqSessionId" value="" />
            <input type="hidden" id="FMS_KYC_Cust_Data" value="<s:property value="#session.FMS_KYC_Cust_Data"/>"/>
            <input type="hidden" id="kycformFieldsMetaData" value="<s:property value="#session.kycformFieldsMetaData"/>" />
            <input type="hidden" id="PYMT_URL" value="<s:property value="#session.PYMT_URL"/>" />
            <input type="hidden" id="PYMT" value="<s:property value="#session.PYMT"/>" />

            <input type="hidden" id="STATES" value="<s:property value="#session.STATES"/>" />
            <input type="hidden" id="fmsDDData" value="<s:property value="#session.fmsDDData"/>" />
            <input type="hidden" id="main_locality" value="<s:property value="#session.main_locality"/>" />
            <input type="hidden" id="sub_locality" value="<s:property value="#session.sub_locality"/>" />
            <input type="hidden" id="DISTRICTS" value="<s:property value="#session.DISTRICTS"/>" />
            <input type="hidden" id="EXCHNAGE_DTLS" value="<s:property value="#session.EXCHNAGE_DTLS"/>" />
            <input type="hidden" id="poi_same_chk" value="" />
            <input type="hidden" id="fms_kyc_Stp1Data" value="" />
            <input type="hidden" id="JOB_STATUS" value="<s:property value="#session.JOB_STATUS"/>" />

        </form>
        <div id="">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='Login.do' ><s:text name="register.preview.nav1"/>  </a></span>       <span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"><s:text name="register.preview.nav2"/></span></div>
                    <h1 class="page_heading"><s:text name="register.preview.headline"/> </h1>
                </div>
            </div>
            <div class="clear mrg65B"></div>

            <div class="row" id="page_content_block" >
                <div class="mask" style="display:none" id="waitMask">
                <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                </div>
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-12 PreviewTables">

                            <h4 class="mrg10B" style=" color: #008cc7 !important;"><s:text name="register.preview.custdtls"/></h4>
                            <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td><s:text name="register.preview.custttl"/></td>
                                    <td id="pre_cust_tilte"></td>
                                    <td><s:text name="register.preview.fstname"/></td>
                                    <td id="pre_first_name"></td>
                                    <td><s:text name="register.preview.lastname"/></td>
                                    <td id="pre_cust_last_name"></td>
                                </tr>

                                <tr>

                                    <td><s:text name="register.preview.mobno"/> </td>
                                    <td id="pre_cust_mobile_no"></td>

                                    <td><s:text name="register.preview.email"/></td>
                                    <td id="pre_email"></td>
                                </tr>
                                <tr>

                                    <td id="pre_label"> </td>
                                    <td id="pre_cust_home_no"></td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                </tr>
                            </table>

                        </div>
                        <div class="col-md-12">
                            <div class=""> <a onclick="fmsJOBUploadkyc();"class="primarybt"><s:text name="register.preview.conformpay"/></a> <a href="#" onclick="backInStep4();" class="secondarybt"><s:text name="register.preview.back"/></a>  </div>
                           
                            <!--<div class=""> <a href="FMS_kyc_step5.html"  class="primarybt">Confirm</a> <a href="FMS_kyc_step3.html" class="secondarybt">Back</a> </div>-->
                        </div>

                        <div class="clear mrg10B"></div>
                    
                    </div>
                </div>
            </div>
        </div>
        <br/><br/><br/>
    </body>
</html>