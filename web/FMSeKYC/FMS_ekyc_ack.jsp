<%@page import="com.in10s.commons.WfPropertyManager"%>
<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
    <head>
        <%
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            JSONObject custData = null;
            int IRAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"));
            int ISDAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD"));
            int baseAmount = Integer.parseInt(CRSAppResources.WINGS_PAY_AMOUNT);
            try {
                custData = (JSONObject) request.getAttribute("CUST_DATA");

            } catch (Exception e) {
            }
            if (custData != null) {
                if (custData.getJSONArray("Data").size() > 0) {
                    AppLogger.info("custData$$$:: " + custData.toString() + "Size of arr::" + custData.getJSONArray("Data").size());
                    custData = custData.getJSONArray("Data").getJSONObject(0);
                } else {
                    AppLogger.info("custData is Empty : " + custData.toString());
                }
            }
        %>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title> BSNL </title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/responsive_bootstrap_carousel_mega_min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" media="all">
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/grid_mobile_list.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/responsive_bootstrap_carousel.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>

        <script>
            var isdAmt = '<%=ISDAmount%>';
            isdAmt = Number(isdAmt);
            var irAmt = '<%=IRAmount%>';
            irAmt = Number(irAmt);
            var custInfoISDIRReq = '<%= custData%>';
            var baseAmount = '<%=baseAmount%>';
            var payIntFail = "<s:text name="wings.service.payinfail"/>";
            var unableProcReq = "<s:text name="wings.service.unbleproreq"/>";
            var isdirMsg = "<s:text name="wings.service.isd.ir.msg"/>";
            var irMsg = "<s:text name="wings.service.ir.msg.form"/>";
            var isdMsg = "<s:text name="wings.service.isd.msg.form"/>";
        </script>
    </head>

    <body onload="showCustDataFrISDIR();">
        <div class="header"><i class="logo"></i></div>
        <div class="clear"></div>
        <div class="row">
            <div class="main">
                <div class="col-md-4"></div>
                <div class="col-xs-12 pad0A col-md-4">
                    <div class="box pad15A">
                        <div class="center">
                            <div class="iconBlock"> <img src="<%=CSS_JS_PATH%>images/wings.jpg" style="height: 70px; width:auto;"></div>
                            <h3><s:text name="wings.service.payment"/></h3>          
                        </div>
                        <div class="">
                            <div class="col-md-12">
                                <!-- <h4 class="mrg10B">Provisional Receipt</h4>-->
                                <table class="table table-noborder table-condensed table_bold">
                                    <tr>
                                        <td><s:text name="wings.service.name"/> </td>
                                        <td id="UID_FIRST_NAME"></td>
                                        <td ><s:text name="wings.service.mobno"/> </td>
                                        <td id="SEL_MOB_NO"></td> 
                                    </tr>

                                    <tr>
                                        <td><s:text name="wings.service.cafno"/> </td>
                                        <td id="CAF_NO"></td>
                                        <td><s:text name="wings.service.regDate"/> </td>
                                        <td id="DATE_ALLOTMENT"></td>   
                                    </tr>

                                    <tr>
                                        <td><s:text name="wings.service.regMobno"/> </td>
                                        <td id="CUST_MOBILE_NO"></td> 
                                        <td><s:text name="wings.service.regEmail"/></td>
                                        <td id="EMAIL"><br></td>
                                    </tr>

                                    <tr>
                                        <td><s:text name="wings.service.aadharno"/></td>
                                        <td id="POI_NUMBER"><br></td>
                                        <td>Paid Amount </td> 
                                        <td id="AMOUNT"></td>
                                    </tr>

                                </table>
                                <div class="clear mrg10B"></div>
                                <!--<div class="col-md-4 form-group" >-->
                                <label>Other facilities</label>
                                <div class="pad5T">
                                    <input name="International" id="chkISD" type="checkbox" value="ISD">
                                    <label for="ISD">ISD</label>
                                    <input type="checkbox" name="International" id="chkIR" value="IR" >
                                    <label for="IR">International Roaming</label>
                                </div>
                                <!--</div>-->
                                <div class="clear mrg10B"></div>
                                <label id="paybleAmount"></label>
                                <div class="clear mrg10B"></div>
                                <div>
                                    <a id="btnok" href="Login.do"  class="primarybt">Ok</a>
                                    <button id="takePayment" style="display: none" onclick="submitISDIRReq();" class="primarybt"><s:text name="wings.service.pay"/></button>
                                    <a  id='backButton'   href='backToGrid.do' class="secondarybt" ><s:text name="aadhar.bck.btn"/></a>
                                </div>




                            </div>
                        <!--<div class="small mrg10T"><s:text name="wings.service.decl"/></div>-->
                        </div>

                    </div>
                         <div class="clear mrg10B"></div>
                    <div class="modal fade" id="popInternationalRoaming">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header orange">
                                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span> </button>-->
                                    <h4 class="modal-title">Message</h4>
                                </div>
                                <div class="modal-body">
                                    <p id="info_msg"></p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="primarybt" data-dismiss="modal">Ok</button>
                                    <!--<button type="button" class="secondarybt" data-dismiss="modal">Close</button>-->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
       <div class="clear mrg10B"></div>
        <div class="footer">Copyright © 2018 Intense Technologies Limited. All rights reserved.</div>
        <script>
            var pendingAmt = 0;
            var payableAmt = 0;
            var payflag = true;
            var isdflag = false;
            var irflag = false;
            baseAmount = Number(baseAmount);
            $(document).ready(function () {
                if (custInfoISDIRReq != null) {
                    var custInfo = JSON.parse(custInfoISDIRReq);
                    if (custInfo.PYMT_STATUS != undefined) {
                        if (custInfo.PLAN_AMOUNT == undefined || custInfo.PLAN_AMOUNT == "") {
                        } else {
                            baseAmount = Number(custInfo.PLAN_AMOUNT);
                            payableAmt = Number(custInfo.PLAN_AMOUNT);
                        }
                        if (custInfo.WINGS_ISD == '1') {
                            $('#chkISD').prop('checked', true).attr('disabled', true);
                            $('#chkIR').attr('disabled', true);
                            baseAmount = baseAmount + isdAmt;
                            isdflag = true;
                           // irflag = true;
                        }
                        if (custInfo.WINGS_IR == '1') {
                            $('#chkIR').prop('checked', true).attr('disabled', true);
                            $('#chkISD').attr('disabled', true);
                            baseAmount = baseAmount + irAmt;
                           // isdflag = true;
                            irflag = true;
                        }
                        if (!(custInfo.PYMT_STATUS.toUpperCase() == "SUCCESS")) {
                            $('#AMOUNT').text('Rs.0/-');
                            pendingAmt = baseAmount;
                            payflag = false;
                            $('#paybleAmount').text('Payable Amount Rs.' + pendingAmt + '/-');
                            $('#takePayment').show();
                            $('#btnok').hide();
                        } else {
                             var paid_amout=baseAmount;
                            $('#AMOUNT').text('Rs.'+paid_amout+'/-');
                        }
                    } else {
                    }
                }
               
            });
                $('#chkIR').change(function () {
                var chkISD = $('#chkISD').is(':checked');
                var chkIR = $('#chkIR').is(':checked');
                
                if (payflag) {
                    payableAmt = 0;
                }
                var paybleAmt = payableAmt + irAmt;
                if (chkIR && !chkISD) {
                    $('#popInternationalRoaming').modal('show');
                    $('#info_msg').text(irMsg);
                    if (paybleAmt > 0) {
                        $('#takePayment').show();
                        $('#btnok').hide();
                        $('#paybleAmount').text('Payable Amount Rs.' + paybleAmt + '/-');
                    } else {
                        $('#takePayment').text('Update');
                        $('#takePayment').show();
                        $('#btnok').hide();
                        $('#paybleAmount').text('');
                    }
                } else {
                    uncheck(this);
                }
            });
            $('#chkISD').change(function () {
                $('#chkIR').prop('checked', true);
                var chkISD = $('#chkISD').is(':checked');
                var paybleAmt=0;
                if (payflag) {
                    payableAmt=0;
                    if (irflag) {
                        payableAmt = 0;
                        irAmt = 0;
                    }
                }
                 paybleAmt = payableAmt + irAmt + isdAmt;
             
                var chkIR = $('#chkIR').is(':checked');
                if (paybleAmt > 0) {
                    if (chkISD && !chkIR) {
                        $('#chkIR').prop('checked', true);
                        $('#popInternationalRoaming').modal('show');
                        $('#info_msg').text(irMsg);
                        $('#takePayment').show();
                        $('#btnok').hide();
                        $('#paybleAmount').text('Payable Amount Rs.' + paybleAmt + '/-');
                    } else if (chkIR && chkISD) {
                        $('#popInternationalRoaming').modal('show');
                        $('#info_msg').text(isdMsg);
                        $('#paybleAmount').text('Payable Amount Rs.' + paybleAmt + '/-');
                        $('#takePayment').show();
                        $('#btnok').hide();

                    } else if (!chkISD && chkIR) {
                        $('#info_msg').text(isdMsg);
                        $('#takePayment').show();
                        $('#btnok').hide();
                        var amount = payableAmt + irAmt;
                        $('#paybleAmount').text('Payable Amount Rs.' + amount + '/-');
                    }
                } else {
                    if (chkISD) {
                        $('#chkIR').prop('checked', true);
                        $('#popInternationalRoaming').modal('show');
                        $('#info_msg').text(irMsg);
                        $('#takePayment').text('Update');
                        $('#takePayment').show();
                        $('#btnok').hide();
                        $('#paybleAmount').text('');
                    }else{
                         $('#takePayment').hide();
                         $('#btnok').show();
                         
                    }

                    
                }
            });
            function uncheck() {
                $("#chkISD").prop("checked", false);
                if (payableAmt != 0) {
                    $('#takePayment').show();
                    $('#btnok').hide();
                    $('#paybleAmount').text('Payable Amount Rs.' + payableAmt + '/-');
                } else {
                    $('#takePayment').hide();
                    $('#btnok').show();
                    $('#paybleAmount').text('');
                }
            }
        </script>
    </body>

</html>
