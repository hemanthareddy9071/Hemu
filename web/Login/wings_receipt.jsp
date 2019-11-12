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
            JSONObject objPaymentTran= new JSONObject();
            JSONObject requestPar = (JSONObject) request.getAttribute("PAYMENT_TXN");
            int IRAmount= Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"));
            int ISDAmount= Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD"));
            if(requestPar != null){
               AppLogger.debug("response in wings_receipt.jsp"+requestPar.toString());  
            objPaymentTran=requestPar;
            
            }
        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
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
          var paymentDataEkyc='<%=objPaymentTran%>';
          var isdAmt='<%=ISDAmount%>';
          isdAmt = Number(isdAmt);
          var irAmt='<%=IRAmount%>';
           irAmt = Number(irAmt);
        </script>
    </head>
<body>
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div class="row">
  <div class="main">
    <div class="col-md-4"></div>
    <div class="col-xs-12 pad0A col-md-4">
      <div class="box pad15A">
        <div class="center">
          <div class="iconBlock"> <img src="<%=CSS_JS_PATH%>images/wings.jpg" style="height: 70px; width:auto;"></div>
          <h3><s:text name="wings.receipt.headline"/></h3>
        </div>
        <div class="">
            <div class="col-md-12">
                <table class="table table-noborder table-condensed table_bold">
                    <tr>
                        <td ><s:text name="wings.receipt.mobno"/> </td>
                        <td id="rcpt_mob_no"></td>   
                    </tr>
                    <tr>
                        <td><s:text name="wings.receipt.name"/> </td>
                        <td id="rcpt_name"></td>
                    </tr>
                    <tr>
                        <td><s:text name="wings.receipt.rcptno"/> </td>
                        <td id="ecpt_rcpt_no"></td>                   
                    </tr>
                    <tr>
                        <td><s:text name="wings.receipt.paydate"/> </td>
                        <td id="rcpt_paydate"></td>                
                    </tr>
                   
                    <tr>
                        <td><s:text name="wings.receipt.trans.status"/></td>
                        <td id="trans_status"><br></td>
                    </tr>
                    <tr id="amt_txn">
                        <td><s:text name="ekyc.ack.tarif.amt"/></td>
                        <td id="rcpt_trff_amount"><br></td>
                    </tr>
                    <tr id="sch_amt_txn">
                        <td><s:text name="ekyc.ack.wings.scheme.amt"/></td>
                        <td id="rcpt_scheme_amount">N/A<br></td>
                        
                    </tr>
                    
                    <tr id="isd_txn">
                        <td><s:text name="wings.receipt.isd.amount"/></td>
                        <td id="rcpt_isd_amount"><br></td>
                    </tr>
                    <tr id="ir_txn">
                        <td><s:text name="wings.receipt.ir.amount"/></td>
                        <td id="rcpt_ir_amount"><br></td>
                    </tr>
                     <tr id="f_amt_txn" >
                        <td><s:text name="wings.receipt.amount"/></td>
                        <td id="rcpt_amount"><br></td>
                    </tr>
                </table>
                <div class="clear mrg10B"></div>
                <a href="Login.do" class="primarybt"><s:text name="wings.service.ok"/></a>
            </div>

        </div>
      </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer">Copyright © 2018 Intense Technologies Limited. All rights reserved.</div>
<script>
    if(paymentDataEkyc != "" ){
    paymentDataEkyc= JSON.parse(paymentDataEkyc);
    var finalAmt=Number(paymentDataEkyc.TARIFF_PLAN_AMOUNT);
    finalAmt=finalAmt+Number(paymentDataEkyc.SCHEME_PLAN_AMOUNT);
    $('#rcpt_mob_no').text(paymentDataEkyc.SERVICE_NUMBER);
    $('#rcpt_name').text(paymentDataEkyc.CUST_NAME);
    $('#ecpt_rcpt_no').text(paymentDataEkyc.CAF_NO);
    $('#rcpt_paydate').text(paymentDataEkyc.PAYMENT_TIME);
    $('#trans_status').text(paymentDataEkyc.TXN_STATUS);
    $('#rcpt_trff_amount').text(paymentDataEkyc.TARIFF_PLAN_AMOUNT);
    $('#rcpt_scheme_amount').text(paymentDataEkyc.SCHEME_PLAN_AMOUNT);
   try{
        if(!('SUCCESS'== paymentDataEkyc.TXN_STATUS.toUpperCase())){
        $('#isd_txn').hide(); 
        $('#ir_txn').hide(); 
        $('#amt_txn').hide(); 
        $('#f_amt_txn').hide(); 
    }
   }catch(e){}
    $('#rcpt_isd_amount').text('N/A');
    $('#rcpt_ir_amount').text('N/A');
     if(paymentDataEkyc.WINGS_IR =='1'){
    $('#rcpt_ir_amount').text(irAmt);  
    finalAmt=finalAmt+irAmt;
    } if(paymentDataEkyc.WINGS_ISD =='1'){
    $('#rcpt_isd_amount').text(isdAmt);
    finalAmt=finalAmt+isdAmt; 
    }
    $('#rcpt_amount').text(finalAmt);
   //$('#rcpt_amount').text(paymentDataEkyc.AMOUNT);
    }else{
        alert("Transaction Details are empty");
    }
    
    
</script>
</body>
</html>
