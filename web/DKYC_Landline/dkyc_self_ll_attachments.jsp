<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.commons.WfPropertyManager"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<title>BSNL</title>
<%
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            String CamCapture_URL = "";
            JSONObject objDKYCDocsInfo = null;
            JSONObject objLoginInfo = new JSONObject();
            JSONArray objImgArr = null;
            try{
            JSONObject logInfo = (JSONObject) request.getAttribute("LOGIN_INFO");
            if(logInfo != null){
            objLoginInfo = logInfo;
              AppLogger.debug("request LoginData in DKYC LAND LINE attachments page::"+objLoginInfo); 
            }
            
            }catch(Exception e){}
            try{
            JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_DOC_INFO");
            if(requestPar != null){
             AppLogger.debug("request dkyc doc info::"+requestPar); 
             if(requestPar.containsKey("FIELDS_INFO") && !requestPar.getJSONObject("FIELDS_INFO").isEmpty()){
              objDKYCDocsInfo = requestPar.getJSONObject("FIELDS_INFO");
              objImgArr = requestPar.getJSONArray("DOCS_INFO");
             }
            }
            }catch(Exception e){
            e.printStackTrace();
            }
            
   try{
//    String CamCapture_URL = CRSAppResources.CamCapture_URL;
    //String CamCapture_URL = "";
    
   }catch(Exception e){
   e.printStackTrace();
   }
            
        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <!-- Kendo CSS -->
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_FormValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_Landline.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        

<style>
.dropzone { background: rgba(255, 255, 255, 0.8) none repeat scroll 0 0; border: 1px dashed #666; margin: 10px; min-height: 330px; padding: 20px; text-align: center; vertical-align: middle; width: 100%; }
.imgPreview { background: rgba(255, 255, 255, 0.5) none repeat scroll 0 0; padding: 5px; border: 1px dashed #666; margin: 10px; min-height: 330px; text-align: center; vertical-align: middle; width: 100%; position: relative; border-radius: 10px; }
.box{height: auto !important; }
#footer-bar{position:fixed;}

.leftli {
                float:left;

            }
            *:focus {outline: 1px #0187D0 solid !important;}
            div.file_upload {
                position: relative;
                overflow: hidden;
            }
            div.file_upload input {
                position: absolute;
                font-size: 50px;
                opacity: 0;
                right: 0;
                top: 0;
            }
</style>
<script>
    var dkycDocsInfo ='<%=objDKYCDocsInfo%>';
    var dkycAttachments ='<%=objImgArr%>';
    var dkycLoginInfo ='<%=objLoginInfo%>';
      var doc_file_path=""; 
       var reqBackToImg=false;
       if(dkycDocsInfo != 'null'){
          dkycDocsInfo=JSON.parse(dkycDocsInfo);  
       }
       if(dkycLoginInfo != 'null'){
         dkycLoginInfo= JSON.parse(dkycLoginInfo);  
       }
    </script>
      <script >   
              
           var dkycfWingMobNum="<s:text name="dkyc.form.wngs.att"/>";
           var dkycfWinghomephone="<s:text name="dkyc.form.wngs.homephone"/>";
            var dkycfWingworkphone="<s:text name="dkyc.form.wngs.Workphone"/>";
             var dkycfWingfax="<s:text name="dkyc.form.wngs.fax"/>";
             var dkycfWingusercode="<s:text name="dkyc.form.wngs.usercode"/>";
             var dkycimgSz="<s:text name="dkyc.form.img.size"/>";
             var dkycimgType="<s:text name="dkyc.form.img.type"/>";
             var dkycimgValid="<s:text name="dkyc.form.img.uplod.all"/>";
                var dkyselfPoatype="<s:text name="dkyc.Self.PoaType"/>";
                var imgSizeDKYCLL="<s:text name="dkyc.ll.form.img.size.int"/>";
             
        </script>
      <script >   
              
          var imageIds = "";
            var windowPopUpRef = null;
            var CamCapture_URL = '<%=CamCapture_URL%>';
            var CapImgtimeInterval = null;
            var delImgtimeInterval = null;
            var objFieldsData = {};
             
        </script>
</head>
<body onload="setFormDD();setBackToAttach();fetchSessioonVal();">
    <form name="attachDKycForm" enctype="multipart/form-data">
         <input type="hidden" name="reqData" id="reqData"/>
         <input type="hidden" id="fmsDDData" value="<s:property value="#session.fmsDDData"/>" />
         <input type="hidden" id="DOCS_FILE_PATH" value="<s:property value="#session.DOCS_FILE_PATH"/>" />
         <input type="hidden" name="captureImgId" id="captureImgId"/>
         <input type="hidden" name="captureImgTime" id="captureImgTime"/>
    </form>
<div id="">
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
  <div id="page-wrapper" class="container nav-small">
    <div class="row">
      
      <div id="content-wrapper">
        <div id="page_header_bar" class="row">
          <div class="col-xs-12">
            <div class="breadcrumtxt">  </div>
            <h1 class="page_heading"><s:text name="dekyc.Digital.Attachments"/></h1>
          </div>
        </div>
        <div class="clear mrg65B"></div>
        <div class="row box mrg25B" id="page_content_block" >
            <div class="mask" style="display:none" id="wait">
            <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
        </div>
          <div class="alert alert-info">
            <p><s:text name="dkyc.ll.Digital.Uploadnote"/></p>
          </div>
          <div class="form-group pad20R right">
          <a  onclick="nxtToDKYCLLForm('LL_SKIP_ATTACH');" class="primarybt1" title="Skip"><s:text name="dkyc.ll.skip.docs"/></a>
          </div>
          <div class="row">
              <div>
              <div class="col-md-4">
                  <div >
              <h4 class="mrg15L"><s:text name="dekyc.Digital.Photograph"/></h4>
              <div class="imagePanel" id="SUBSCRIBER_PHOTO">
                                <div class="imgPreview1" id="SUBSCRIBER_PHOTOImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="SUBSCRIBER_PHOTOimg" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
                <div class="file_upload btn btn-default">
                 <s:text name="dekyc.Digital.Uploadimage"/>   
                    <input type="file" name="file"  id="SUBSCRIBER_PHOTO-Upload" value="" class="fileUploadButton"/>
                </div>
                 <!--<button type="button" class="btn btn-default" id="regi2" name="TakePics" onclick="openCamera('SUBSCRIBER_PHOTO');">Take a photo</button>-->   
                </div>
              </div>
            </div>
          </div>
                  <div class="col-md-4"> </div>
                  <div class="col-md-4">
            <h4 class="mrg15L">  <s:text name="dekyc.Digital.Note1"/> </h4>
            <div class="ticklist">
              <ul>
                <li><s:text name="dekyc.Digital.Uploadli1"/></li>
                <li><s:text name="dkyc.ll.Digital.Fileli2"/> </li>
                <li><s:text name="dekyc.Digital.Imageli3"/> </li>
                <li><s:text name="dekyc.Digital.Uploadli4"/>  </li>
              </ul>
            </div>
          </div>
          </div>
                        <hr class="hr">
          <div class="clear mrg20B"></div>
          <div class="col-md-4 form-group">
            <label><s:text name="dekyc.Digital.Selpoi"/> </label>
            <select id="poi_type" alt="Photo ID Proof document type" name="photo_proof"  class="form-control">
<!--              <option value="">-----------Select---------</option>
              <Option value='11'>CGHS/EGHS Card</option>
              <Option value='12'>Certificate issued by MLA MP GR 'A' Off</option>
              <Option value='25'>Defence Service Certificate</option>
              <Option value='7'>Driving Licence</option>
              <Option value='9'>Govt ID card</option>
              <Option value='15'>PAN Card</option>
              <Option value='24'>Paramilitary Force Card</option>
              <Option value='22'>Passbook of Bank or Post office</option>
              <Option value='4'>Passport</option>
              <Option value='13'>Photo ID card by Edu Institute</option>
              <Option value='10'>Photo ID card with Address</option>
              <Option value='20'>Photo Id by Postal Dept</option>
              <Option value='14'>Photo Id by Village Panchayath</option>
              <Option value='3'>Ration Card with Photo</option>
              <Option value='19'>Registered Sale or Lease Deed</option>
              <Option value='21'>Smart Card by CSD Defence</option>
              <Option value='23'>Unique Identification Authority of India (12Digts)</option>
              <Option value='6'>Voter ID Card</option>-->
            </select>
          </div>
          <div class="clear"></div>
              <div class="clear mrg20B"></div>
          <div class="col-md-4">
                        <div id='POIFDiv'>
                            
              <h4 class="mrg15L"><s:text name="dekyc.Digital.poiFornt"/></h4>
              <div class="imagePanel" id="POI">
                                <div class="imgPreview1" id="POIImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POIimg" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
                <div class="file_upload btn btn-default">
                 <s:text name="dekyc.Digital.Uploadimage"/>   
                    <input type="file" onclick="return callImg(this);" name="file" id="POI-Upload" value="" class="fileUploadButton"/>
                </div>
              <!--<button type="button" class="btn btn-default" id="regi2" name="TakePics" onclick="openCamera('POI');">Take a photo</button>-->

                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
              <div id='poiBDiv' style="display: none">
              <h4 class="mrg15L"><s:text name="dekyc.Digital.poiback"/> </h4>
              <div class="imagePanel" id="POIBack">
                                <div class="imgPreview1" id="POIBackImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POIBackimg" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
                <div class="file_upload btn btn-default">
                 <s:text name="dekyc.Digital.Uploadimage"/>   
                    <input type="file" onclick="return callImg(this);" name="file" id="POIBack-Upload" value="" class="fileUploadButton"/>
                </div>
                    <!--<button type="button" class="btn btn-default" id="regi2" name="TakePics" onclick="openCamera('POIBack');">Take a photo</button>-->
                </div>
              </div>
            </div>
          </div>
          <div class="clear mrg20B"></div>
                    <hr class="hr">
          <div class="clear mrg20B"></div>
          <div class="col-md-4 form-group">
              <input type="checkbox" name="checkPOA" id="checkPOA" onchange="chkPOASame()">
            <label><s:text name="dekyc.Digital.Poisameaspoi"/> </label>
          </div>
          <div class="col-md-4 form-group" id="poa_type_div">
            <label><s:text name="dekyc.Digital.SelPoa"/>  </label>
            <select id="poa_type" alt="Photo ID Proof document type" name="photo_proof"  class="form-control">
<!--              <option value="">-----------Select---------</option>
              <Option value='11'>CGHS/EGHS Card</option>
              <Option value='12'>Certificate issued by MLA MP GR 'A' Off</option>
              <Option value='25'>Defence Service Certificate</option>
              <Option value='7'>Driving Licence</option>
              <Option value='9'>Govt ID card</option>
              <Option value='15'>PAN Card</option>
              <Option value='24'>Paramilitary Force Card</option>
              <Option value='22'>Passbook of Bank or Post office</option>
              <Option value='4'>Passport</option>
              <Option value='13'>Photo ID card by Edu Institute</option>
              <Option value='10'>Photo ID card with Address</option>
              <Option value='20'>Photo Id by Postal Dept</option>
              <Option value='14'>Photo Id by Village Panchayath</option>
              <Option value='3'>Ration Card with Photo</option>
              <Option value='19'>Registered Sale or Lease Deed</option>
              <Option value='21'>Smart Card by CSD Defence</option>
              <Option value='23'>Unique Identification Authority of India (12Digts)</option>
              <Option value='6'>Voter ID Card</option>-->
            </select>
          </div>
          <div class="clear"></div>
          <div id="poa_attach" >
          <div class="col-md-4">
            <div id='POAFDiv'>
              <h4 class="mrg15L"><s:text name="dekyc.Digital.poaFront"/> </h4>
              <div class="imagePanel" id="POA">
                                <div class="imgPreview1" id="POAImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POAimg" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
                <div class="file_upload btn btn-default">
               <s:text name="dekyc.Digital.Uploadimage"/>   
                    <input type="file" onclick="return callImg(this);" name="file" id="POA-Upload" value="" class="fileUploadButton"/>
                </div>
                    <!--<button type="button" class="btn btn-default" id="regi2" name="TakePics" onclick="openCamera('POA');">Take a photo</button>-->
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
              <div id='poaBDiv' style="display: none" >
              <h4 class="mrg15L"> <s:text name="dekyc.Digital.poaback"/> </h4>
              <div class="imagePanel" id="POABack">
                                <div class="imgPreview1" id="POABackImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POABackimg" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
                <div class="file_upload btn btn-default">
             <s:text name="dekyc.Digital.Uploadimage"/>   
                    <input type="file" onclick="return callImg(this);" name="file" id="POABack-Upload" value="" class="fileUploadButton"/>
                </div>
                    <!--<button type="button" class="btn btn-default" id="regi2" name="TakePics" onclick="openCamera('POABack');">Take a photo</button>-->
                </div>
              </div>
            </div>
          </div>
          </div>
          <div id="poa_same_attach" style="display: none">
          <div class="col-md-4">
            <div id='POAFDivSame'>
              <h4 class="mrg15L"><s:text name="dekyc.Digital.poaFront"/> </h4>
              <div class="imagePanel" id="POA">
                                <div class="imgPreview1" id="POAImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POIimgSame" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
<!--                <div class="file_upload btn btn-default">
                    Upload an image
                    <input type="file" name="file" id="POA-Upload" value="" class="fileUploadButton"/>
                </div>-->
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
              <div id='poaBDivSame' style="display: none" >
              <h4 class="mrg15L"><s:text name="dekyc.Digital.poaback"/> </h4>
              <div class="imagePanel" id="POABack">
                                <div class="imgPreview1" id="POABackImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="POIBackimgSame" class="img-responsive" src="" />
                                </div>


                                
                            </div>
              <div class="pad10A text-center">
                <div class="btn-group btn-group-lg">
                  <!--<button type="button" class="btn btn-default" id="regi1" data-toggle="modal" data-target="#divUpload">Upload an image</button>-->
<!--                  <button type="button" class="btn btn-default" id="regi2">Take a photo</button>
                  <button type="button" class="btn btn-default" id="regi3">Scan</button>-->
<!--                <div class="file_upload btn btn-default">
                    Upload an image
                    <input type="file" name="file" id="POABack-Upload" value="" class="fileUploadButton"/>
                </div>-->
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="clear mrg20B"></div>
          <div>
          
         
          </div>
          </div>
          <div class="clear mrg20B"></div>
          <div class="form-group col-md-12 pad20L"> <a onclick="nxtToDKYCLLForm('LLDKYC');" class="primarybt" title="Next"><s:text name="dekyc.Digital.Next"/></a> 
              <a  onclick="nxtToDKYCLLForm('LL_SKIP_ATTACH');" class="primarybt1" title="Skip"><s:text name="dkyc.ll.skip.docs"/></a>
                    <a onclick="goToHome();" class="secondarybt" title="Cancel"><s:text name="dekyc.Digital.Cancel1"/></a>
          </div>
        </div>
        <div class="clear mrg45B"></div>
        <footer id="footer-bar" class="row" >
          <p id="footer-copyright" class="col-xs-12"><s:text name="dekyc.Digital.Copyright"/> </p>
        </footer>
      </div>
    </div>
  </div>
</div>


<!-- Upload  popup div starts-->
<div id="divUpload" class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><s:text name="dekyc.Digital.Uploaddocument"/> </h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label><s:text name="dekyc.Digital. Selectdocument"/></label>
          <span class="red">*</span>
          <input id="input_POI" type="file"  class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" />
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="submit" class="primarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Upload1"/></button>
        <button type="submit" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Cancel1"/></button>
      </div>
    </div>
  </div>
</div>
         <div class="modal fade" id="cancelConf" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header orange">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                            <h4 class="modal-title"><s:text name="dekyc.Digital.Confirmation"/></h4>
                        </div>
                        <div class="modal-body">
                            <p><s:text name="dekyc.form.DoUProcess"/></p>
                        </div>
                        <div class="modal-footer">
                            <button id="btnStudent" type="button" class="primarybt" data-dismiss="modal" onclick="confCancel()"><s:text name="dekyc.Digital.Submit"/></button>
                            <button type="button" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Close"/></button>
                        </div>
                    </div>
                </div>
            </div>
<!-- Upload   popup div ends-->
<!-- Upload   img div starts-->
 <div id="divImg" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="enlargeTitle"></h4>
                    </div>
                    <div class="modal-body pad10A"> <img id="enlargeImg" src="" class="img-responsive" /> </div>
                    <div class="modal-footer">
                        <button type="submit" class="primarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Ok"/></button>
                        <button type="submit" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Cancel1"/></button>
                    </div>
                </div>
            </div>
        </div>
<!-- Upload   img div ends-->



<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/dropzone.js"></script>
<script src="js/fileinput.js"></script>
<script>
  var isPOIBackReq=false;
  var isPOABackReq=false;
  var attachmentsFilePath='';
  
    history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
    var imgArr={
        'POI':'poi_type',
        'POIBack':'poi_type',
        'POABack':'poa_type',
        'POA':'poa_type'
    };
    
   function fetchSessioonVal(){
    if($('#DOCS_FILE_PATH').val()== undefined ){
            }else{
              doc_file_path =$('#DOCS_FILE_PATH').val(); 
            }
  }
    $("#poi_type").change(function() {
     chkFrPoB('poi_type');
     $('#checkPOA').prop("checked",false).trigger("change");
     });
    $("#poa_type").change(function() {
        if( $("#poi_type").val()== $("#poa_type").val()){
          $('#checkPOA').prop("checked",true).trigger("change");  
        }
    chkFrPoB('poa_type');
    });
    

                        $(".file_upload").on("click", ".fileUploadButton", function () {
                            this.value=null;
                        });
                       $(".file_upload").on("change", ".fileUploadButton", function () {
                                        var strIdRow = $(this).prop("id");
                                        var strId = $(this).prop("id").split('-')[0];
                                        var formData = new FormData();
                                        formData.append("upload", $(this).prop('files')[0]);
                                        if(validateUploadImage(strIdRow)){
                                        uploadImageAjaxCall(strId, formData);
                                        }
                                    });
                                    
                                    
                                    
                                    function validateUploadImage(imgId){
                                         var value = $("#"+imgId).val();
                                     var extension = value.substring(value.lastIndexOf('.') + 1);
                                     if(!(extension.toUpperCase() =='JPEG' || extension.toUpperCase() =='JPG' ) ){
                                         
                                         alert(dkycimgType);
                                         return false;
                                         
                                     }
                                         var iSize = ($("#"+imgId)[0].files[0].size / 1024); 
                                          iSize = (Math.round(iSize * 100) / 100);
                                            if(iSize >imgSizeDKYCLL)
                                            {
                                               alert(dkycimgSz +imgSizeDKYCLL +' KB'); 
                                               return false;
                                            }
                                         
                                        return true;
                                    }
                                    
                                    function uploadImageAjaxCall(strId, formData)
                                {
                                    var reqData = {};
                                    reqData.imageName = strId;
                                    reqData.imgFlodLoc = doc_file_path;
                                    formData.append("reqData", JSON.stringify(reqData));
                                    $.ajax({
                                        url: "uploadImage.do",
                                        type: "POST",
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        success: function (response) {
                                            try {                                               
                                                doc_file_path=response.response.message;
                                                var res = JSON.parse(JSON.stringify(response.response.responseData));
                                                $("#" + strId + "img").attr('src', 'data:image/png;base64,' + res);
                                                $("#" + strId + "imgSame").attr('src', 'data:image/png;base64,' + res);
                                                var date = new Date();
                                                var timestamp = date.getTime();
                                                $('#captureImgTime').val(timestamp);
                                            } catch (e) {

                                            }
                                        },
                                        error: function (jqXHR, textStatus, errorMessage) {
                                            //showMessage("Error", error_mssg["NET_ERROR"], 2);
                                            loadKUnMask();
                                        }
                                    });
                                }
                                  $(document).on('click', '.remove_ic', function ()
                                {
                                    
                                    var imageId = $(this).parent().closest('.imagePanel').attr('id');
                                    deleteImage(imageId);
//                                    $(".imagePanel#" + imageId).children('.imgPreview1').remove();
//                             
                                 
                                    $("#" + imageId + "img").attr('src', "");
//                                    $("#" + imageId + "Image").hide();
//                                    $("#" + imageId + "Dnd").show();
                                });
                                       $(document).on('click', '.elarge_ic', function ()
                                {
                                    $("#enlargeImg").attr('src', '');
                                    var imageId = $(this).parent().closest('.imagePanel').attr('id');
//                                    console.log(imageId);
                                    var imageData = $("#" + imageId + "img").attr('src');
                                    if($('#checkPOA').is(":checked")){
                                        if(imageId=='POA'){
                                       imageData = $("#POIimg").attr('src'); 
    
                                        }
                                        else if(imageId=='POABack'){
                                       imageData = $("#POIBackimg").attr('src'); 
    
                                        }
                                   }
                                    $("#enlargeTitle").text(imageId);
                                    $("#enlargeImg").attr('src', imageData);
                                });



                                $(".elarge_ic").click(function () {
                                    $(".imgMask").show();
                                });
                                $(".imgClose").click(function () {
                                    $(".imgMask").hide();
                                });
                                function deleteImage(imageId) {
                                    var reqData = {};
                                    reqData.imageId = imageId;
//                                    reqData.imagePath = attachmentsFilePath;
                                    $.ajax({
                                        url: "deleteAttachmentDKYC.do",
                                        type: 'POST',
                                        async: false,
                                        data: {"reqData": encrypt(JSON.stringify(reqData))},
                                        success: function (data) {
                                            //sessionCheck(data);
                                            var res = JSON.parse(JSON.stringify(data.response.responseData));

                                        }, error: function (data) {

                                        }
                                    });
                                }
   function openCamera(strImgType) {
                try {
                    var poi_type = $("#poi_type").val();
                    var poa_type = $("#poa_type").val();
                    if (strImgType == "POI") {
                        if (poi_type == "0") {
                            alert("Please select POI type");
                            $('#poi_type').focus();
                            return false;
                        }
                    }
                    if (strImgType == "POIBack") {
                        if (poi_type == "0") {
                            alert("Please select POI type");
                            $('#poi_type').focus();
                            return false;
                        }
                    } else if (strImgType == "POA") {
                        if (poa_type == "0") {
                            alert("Please select POA type");
                            $('#poa_type').focus();
                            return false;
                        }
                    } else if (strImgType == "POABack") {
                        if (poa_type == "0") {
                            alert("Please select POA type");
                            $('#poa_type').focus();
                            return false;
                        }
                    } else if (strImgType == "SUBSCRIBER_PHOTO") {
                        $("#captureImgTime").val('')
                    }


                    $("#captureImgId").val(strImgType);
                    var strWindowFeatures = "height=400,width=500,resizable=0,minimizable=0,fullscreen=0";
                    windowPopUpRef = window.open('/CamCapture/CapturePhoto.html', '', strWindowFeatures);
                    CapImgtimeInterval = setInterval(closeCheck, 500);
                } catch (e) {
                    //alert("PR Exception in openCamera");
                }
            }
            
   function closeCheck() {
                if (windowPopUpRef == null || windowPopUpRef.closed) {
                    //remove timer
                    clearInterval(CapImgtimeInterval);
                    captureImage();
                }
            }
            
   function captureImage() {
                try {
                    var strCamData = localStorage.getItem("camBase64Image");
                      if(strCamData!= null){
                        localStorage.removeItem("camBase64Image");
                        var iamgePathId = $("#captureImgId").val();
                        var reqData={};
                        var formData = new FormData();
                        reqData.imageName = iamgePathId;
                        reqData.imgFlodLoc = doc_file_path;
                        reqData.imageData = strCamData;
                        reqData.imageType = 'TAKE_PIC';
                        formData.append("reqData", JSON.stringify(reqData));
                        $.ajax({
                            url: "uploadImage.do", 
                            type: 'POST',
                            async: false,
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                var response = JSON.parse(JSON.stringify(data));
                                var status = response.response.success;
                                var resData = response.response.responseData;
                                if (status == true) {
                                    try {                                               
                                        doc_file_path=response.response.message;
                                        var res = resData;
                                        $("#" + iamgePathId + "img").attr('src', 'data:image/png;base64,' + res);
                                        $("#" + iamgePathId + "imgSame").attr('src', 'data:image/png;base64,' + res);
                                        var date = new Date();
                                        var timestamp = date.getTime();
                                        $('#captureImgTime').val(timestamp);
                                    } catch (e) {

                                    }
                                    
                                } else {
                                    alert("Problam occured while capturing image");
                                }
                            
                            }, error: function (data) {
                                alert("error : uploadForms" + JSON.stringify(data));
                            }
                        });
                    }
                } catch (e) {
                    //alert(e);
                    console.log("Exceeption in captureImage :" + e);
                }
            }
</script>
<script src="js/scripts.js"></script>
</body>
</html>
