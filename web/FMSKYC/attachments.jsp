<%-- 
    Document   : attachments_web
    Created on : Mar 14, 2018, 6:19:36 PM
    Author     : jangachary.s
--%>
<%@page import="java.io.File"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@include  file="../browserInterceptor.jsp" %>--%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/dropzone.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <script src="<%=CSS_JS_PATH%>js/BID/detector.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/BID/md5.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/BID/sha256.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <style>
            .leftli {
                float:left;

            }
            *:focus {outline: 1px #0187D0 solid !important;}
        </style>
        <script>

            function fGetBID() {

                try {
                    var BFP = pstfgrpnt();
                    var BID = sha256_digest(escape(BFP));
                    var sessionId = $("#sessionId").val();
                    var strSesAndBID = sessionId + "@#@" + BID;
                    $("#reqSessionId").val(strSesAndBID);
                    return BID;
                } catch (e) {
                    alert("PR : " + e);
                }
                //                return BID;
            }

            function showMsg() {

                parent.resizeFrameHeight('frameBody', document.documentElement.scrollHeight);
                parent.$('#wait').hide();
                var errMsg = $('#message').val();
                if (errMsg == "" || errMsg == null) {
                } else {
                    alert(errMsg);
                }
                POAsameAsPOI();
            }
            function POAsameAsPOI() {
                try {
                    var booleanForSameAs = $("#poi_same_chk").val();
                    if (booleanForSameAs === 'true') {
                        $("#POA_Expansion").hide();
                        $("#attachmentPOIID").text('POI / POA');
                    } else {
                        $("#POA_Expansion").show();
                        $("#attachmentPOIID").text('POI');
                    }
                } catch (e) {
                    alert(e)
                }
            }
        </script>
    </head>

    <%        String filePath = (String) session.getAttribute("SessionFilePath");
        File file = new File(filePath);
    %>

    <body  >



        <!--loadDefaultKycVal();setPreviousValues();-->
        <form name="attachmentForm">
            <input type="hidden" name="reqData" id="reqData"/>
            <input type="hidden" id="reqSessionId" value="" />
            <input type="hidden" name="SessionFilePath" id="SessionFilePath" value="<s:property value="#session.SessionFilePath"/>"/>
            <input type="hidden" name="kycpageStatus" id="kycpageStatus" value="<s:property value="#session.kycpageStatus"/>"/>
            <input type="hidden" id="message" value="<s:property value="#session.msgErr"/>" />
            <input type="hidden" id="poi_same_chk" value="<s:property value="#session.poi_same_chk"/>" />

<!--            <input type="hidden" id="RES_MIN_WIDTH" value="<s:property value="#session.RES_MIN_WIDTH"/>" />
            <input type="hidden" id="RES_MIN_HEIGHT" value="<s:property value="#session.RES_MIN_HEIGHT"/>" />
            <input type="hidden" id="RES_MAX_WIDTH" value="<s:property value="#session.RES_MAX_WIDTH"/>" />
            <input type="hidden" id="RES_MAX_HEIGHT" value="<s:property value="#session.RES_MAX_HEIGHT"/>" />-->
            <input type="hidden" id="IMAGESIZE" value="<s:property value="#session.IMAGESIZE"/>" />


        </form>
        <div id="">


            <div class="row">

                <div id="">
                    <div id="page_header_bar" class="row" >
                        <div class="col-xs-12">
                            <div class="breadcrumtxt"> <span class="bluetxt"><a href="Login.do"> Home </a></span> <span class="larrow">&gt;</span> <span class="bluetxt"> KYC Wings</span></div>
                            <h1 class="page_heading">Attachments</h1>
                        </div>
                    </div>
                    <div class="clear mrg65B"></div>
                    <div class="row box mrg25B" id="page_content_block" >
                        <div class="alert alert-info">
                            <a href="#" onclick="gotoReciept('skip');" class="primarybt" title="Skip">Skip</a> 
<!--                            <p>  Please <a href="#" onclick="parent.pageLoad('downloadimageuploadtool.do');" style="text-decoration: underline;">click here</a> to download the latest version of image upload tool.</p>
                            <br/>
                            Token :<b> <span id="token"><file.getName()%></span></b>, please <a href="#" id="copyBtn" style="text-decoration: underline;">click  here</a> to copy the token.
                            <span id="copied"></span>-->

                        </div>
                        <div class="col-md-6">
                            <div >
                                <h4 id="attachmentPOIID"></h4>
                                <h4 class="" >POI</h4>
                                <div class="imagePanel" id="POI">
                                    <!--<div class="imgPreview1">-->

                                    <div class="imgPreview1" id="POIImage">
                                        <div class="filtereditshow1">
                                            <div class="topRightLinks">
                                                <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                    <i class="fa fa-expand" aria-hidden="true"></i></a>
                                                <a href="#" title="Remove" class="remove_ic">
                                                    <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                        <img  id="POIimg" class="img-responsive" src="" />
                                    </div>


                                    <div  class="dropzone"  id="POIDnd">
                                        <div class="dropzone_text"><i class="fa fa-arrow-down fa-5x" aria-hidden="true"></i></div>
                                        <a href="#" title="Refresh" class="refresh_ic">
                                            <i class="fa fa-refresh fa-lg" aria-hidden="true"></i> </a> </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" id="POA_Expansion">
                            <h4 class="" >POA</h4>
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


                                <div class="dropzone" id="POADnd">
                                    <div class="dropzone_text">
                                        <i class="fa fa-arrow-down fa-5x" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" title="Refresh" class="refresh_ic">
                                        <i class="fa fa-refresh fa-lg" aria-hidden="true"></i> 
                                    </a> 
                                </div>
                            </div>
                        </div>
                        <!--<div class="clear mrg20B"></div>-->
                        <div class="col-md-6">
                            <h4 class="">Photograph </h4>
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


                                <div class="dropzone" id="SUBSCRIBER_PHOTODnd">
                                    <div class="dropzone_text"><i class="fa fa-arrow-down fa-5x" aria-hidden="true"></i></div>
                                    <a href="#" title="Refresh" class="refresh_ic"><i class="fa fa-refresh fa-lg" aria-hidden="true"></i> </a> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h4 class="">CAF </h4>
                            <div class="imagePanel" id="CAF">
                                <div class="imgPreview1" id="CAFImage">
                                    <div class="filtereditshow1">
                                        <div class="topRightLinks">
                                            <a href="#" title="Elarge" class="elarge_ic"  data-toggle="modal" data-target="#divImg">
                                                <i class="fa fa-expand" aria-hidden="true"></i></a>
                                            <a href="#" title="Remove" class="remove_ic">
                                                <i class="fa fa-times" aria-hidden="true"></i> </a></div></div>
                                    <img  id="CAFimg" class="img-responsive" src="" />
                                </div>


                                <div  class="dropzone" id="CAFDnd">
                                    <div class="dropzone_text"><i class="fa fa-arrow-down fa-5x" aria-hidden="true"></i></div>
                                    <a href="#" title="Refresh" class="refresh_ic"><i class="fa fa-refresh fa-lg" aria-hidden="true"></i> </a> </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="col-lg-12 pad10A">
                            <div class="form-group pad20R"> <a href="#" onclick="gotoReciept('next')" class="primarybt" title="Next">Next</a>  </div>
                            <!--<div class="clear pad15T"></div><a href="#" onclick="attachBack()" class="secondarybt" title="Back">Back</a>-->
                            <div  class="mrg20L mrg20R" >
                                <span> <b style="color:red">NOTE:</b> &nbsp;&nbsp;1. Max Image Size Should be : <label id ="imageSize" ><s:property value="#session.IMAGESIZE"/></label>&nbsp;&nbsp;KB</span>

                                <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. To fetch the updated document types list, click on <b>Get Document Types</b> button<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. To Browse/Capture an image delete the existing image.
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <!-- Upload  popup div starts-->
        <div id="divImg" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="enlargeTitle"></h4>
                    </div>
                    <div class="modal-body pad10A"> <img id="enlargeImg" src="" class="img-responsive" /> </div>
                    <div class="modal-footer">
                        <button type="submit" class="primarybt" data-dismiss="modal" >Ok</button>
                        <button type="submit" class="secondarybt" data-dismiss="modal" >Cancel</button>
                    </div>
                </div>
            </div>



        </div>
        <!-- Upload   popup div ends-->
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/dropzone.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
                                var imageIds = "";
                                var poiData = "";
                                var poaData = "";
                                var cafData = "";
                                var photoData = "";
//                                var minWidth = 0;
//                                var minHeight = 0;
//                                var maxWidth = 0;
//                                var maxHeight = 0;
                                Dropzone.autoDiscover = false;
                                $(document).ready(function () {

                                    $("#POIImage").hide();
                                    $("#POAImage").hide();
                                    $("#SUBSCRIBER_PHOTOImage").hide();
                                    $("#CAFImage").hide();

//                                    minWidth = $("#RES_MIN_WIDTH").val();
//                                    minHeight = $("#RES_MIN_HEIGHT").val();
//                                    maxWidth = $("#RES_MAX_WIDTH").val();
//                                    maxHeight = $("#RES_MAX_HEIGHT").val();




                                    if ($("#kycpageStatus").val() === '2' || $("#kycpageStatus").val() === 2) {
                                        parent.$("#wait").show();
                                    }


//                                    loadImages();
                                    var reqData = {};
                                    var dz = "";
                                    var imageSize = $("#IMAGESIZE").val();
                                    var fileSize = imageSize * 0.001;


                                    reqData.reqSessionId = parent.$("#reqSessionId").val();


                                    var dropzone = $(".dropzone").dropzone({
                                        url: "fmsuploadImage.do",
                                        paramName: "upload",
                                        acceptedFiles: "image/*",
                                        addRemoveLinks: true,
                                        maxFilesize: fileSize,

                                        init: function () {
                                            this.on("drop", function (e) {
                                                dz = this;
                                                parent.$("#wait").show();
                                            });

                                            this.on("thumbnail", function (file) {
                                                console.log(file)
                                                dz = this;
//                                                var width = file.width;
//                                                var height = file.height;
//                                                if ((width < minWidth || width > maxWidth) && (height < minHeight || height > maxHeight)) {
////                                                    this.removeFile(file);
//                                                    file.rejectDimensions();
//                                                } else {
//                                                    file.acceptDimensions();
//                                                }
                                            });

                                            this.on('sending', function (file, xhr, formData) {
                                                dz = this;
                                                this.options.paramName = "upload";
                                                reqData.imageName = this.element.parentNode.id;
                                                formData.append("reqData", JSON.stringify(reqData));
                                            });
                                            this.on("error", function (file, message) {
                                                dz = this;
                                                this.removeFile(file);
                                                alert("Image size is more than " + imageSize + " kb");
                                            });
                                            this.on("addedfile", function (e) {
                                                dz = this;
                                                parent.$("#wait").show();
                                            });
                                            this.on("success", function (file) {
                                                dz = this;
                                                this.removeFile(file);
//                                                loadImages();
                                            });
                                        }
//                                        ,
//                                        accept: function (file, done) {
//                                            file.acceptDimensions = done;
//                                            file.rejectDimensions = function () {
//
//                                                console.log(file.previewElement)
//
//                                                if ((_ref = file.previewElement) != null && _ref.parentNode != null) {
////                                                    debugger;
//                                                    dz.removeFile(file);
//                                                }
////                                                dz.removeFile(file);
//                                                parent.$("#wait").hide();
////                                                alert("Image size is more than " + imageSize + " kb");
//                                                alert("check image height and width");
////                                                done("check image height and width");
//
//                                            };
//                                        }
                                    });

                                });

                                $(document).on('click', '.remove_ic', function ()
                                {
                                    var imageId = $(this).parent().closest('.imagePanel').attr('id');
                                    deleteImage(imageId);
//                                    $(".imagePanel#" + imageId).children('.imgPreview1').remove();
//                                    $("#POIDnd").show();                                  
                                    $("#" + imageId + "img").attr('src', "");
                                    $("#" + imageId + "Image").hide();
                                    $("#" + imageId + "Dnd").show();
                                });

                                $(document).on('click', '.refresh_ic', function ()
                                {
                                    var imagePanels = $(".imagePanel");
                                    var i = 0;
                                    imageIds = "";
                                    $('.imagePanel').each(function () {


                                        var imageId = imagePanels[i].id;
                                        var imageSrc = $(this).find('img').attr('src');
                                        if (imageSrc == '') {
                                            imageIds = imageIds + imageId + ",";
                                        }
                                        i++;
                                    });
//                                    loadImages();
                                });
                                $(document).on('click', '.elarge_ic', function ()
                                {
                                    $("#enlargeImg").attr('src', '');
                                    var imageId = $(this).parent().closest('.imagePanel').attr('id');
                                    var imageData = "";


                                    switch (imageId) {
                                        case "POI":
                                            imageData = poiData;
                                            break;
                                        case "POA":
                                            imageData = poaData;
                                            break;
                                        case "CAF":
                                            imageData = cafData;
                                            break;
                                        case "SUBSCRIBER_PHOTO":
                                            imageData = photoData;
                                            break;
                                    }
                                    $("#enlargeTitle").text(imageId);
                                    $("#enlargeImg").attr('src', 'data:image/png;base64,' + imageData);
                                });




                                $(document).ready(function () {
                                    $("#copyBtn").click(function () {
                                        var $temp = $("<input>");
                                        $("body").append($temp);
                                        $temp.val($("#token").text().trim()).select();
                                        document.execCommand("copy");
                                        $temp.remove();
                                        alert("Token copied!");
                                    });
                                    //end of for copy to clipboard


                                });
//                                $(".elarge_ic").click(function () {
//                                    $(".imgMask").show();
//                                });
//                                $(".imgClose").click(function () {
//                                    $(".imgMask").hide();
//                                });
                                //        $(".remove_ic").click(function () {
                                //            $(".imgPreview").hide();
                                //        });



                                function loadImages() {
                                    var token = parent.$("#loginuser").text();
                                    imageIds = imageIds.substring(0, imageIds.length - 1).trim();
                                    var reqData = {};
                                    reqData.reqSessionId = parent.$("#reqSessionId").val();
                                    reqData.token = token;
                                    reqData.imageIds = imageIds;
                                    if (imageIds != '') {
                                        $.ajax({
                                            url: "fmscheckAttachments.do",
                                            type: 'POST',
                                            async: false,
                                            data: {"reqData": encrypt(JSON.stringify(reqData))},
                                            success: function (data) {
                                                //sessionCheck(data);
//                                                alert(JSON.stringify(reqData));
                                                var res = JSON.parse(JSON.stringify(data.response.responseData));
                                                var imageIdsArray = imageIds.trim().split(",");
                                                for (i = 0; i < imageIdsArray.length; i++) {
                                                    if (res[imageIdsArray[i]] != null) {
                                                        var resdaidata = res[imageIdsArray[i]];
                                                        $("#" + imageIdsArray[i] + "Dnd").hide();


                                                        switch (imageIdsArray[i]) {
                                                            case "POI":

                                                                $("#POIimg").attr('src', 'data:image/png;base64,' + resdaidata);
                                                                $("#POIDnd").hide();
                                                                $("#POIImage").show();
                                                                poiData = resdaidata;
                                                                break;
                                                            case "POA":

                                                                $("#POAimg").attr('src', 'data:image/png;base64,' + resdaidata);
                                                                $("#POADnd").hide();
                                                                $("#POAImage").show();
                                                                poaData = resdaidata;
                                                                break;
                                                            case "CAF":

                                                                $("#CAFimg").attr('src', 'data:image/png;base64,' + resdaidata);
                                                                $("#CAFDnd").hide();
                                                                $("#CAFImage").show();
                                                                cafData = resdaidata;
                                                                break;
                                                            case "SUBSCRIBER_PHOTO":



                                                                $("#SUBSCRIBER_PHOTOimg").attr('src', 'data:image/png;base64,' + resdaidata);
                                                                $("#SUBSCRIBER_PHOTODnd").hide();
                                                                $("#SUBSCRIBER_PHOTOImage").show();
                                                                photoData = resdaidata;
                                                                break;
                                                        }

                                                    }
                                                }
                                            }, error: function (data) {
//                                                console.log("error  " + JSON.stringify(data));
                                            }
                                        });
                                    }
                                    parent.$("#wait").hide();
                                }
                                function gotoReciept(type) {
                                    //                                
                                    var reqData = {};
                                    if(type=='skip'){
                                      reqData.skipAttachments = true;  
                                    }
//                                    reqData.reqSessionId = parent.$("#reqSessionId").val();
                                    reqData.kycpageStatus = "1";
                                    document.attachmentForm.method = "post";
                                    document.attachmentForm.action = "ValidationImages.do";
                                    document.attachmentForm.reqData.value = encrypt(JSON.stringify(reqData));
                                    document.attachmentForm.submit();
                                }
                               




                                function attachBack() {
                                    var reqData = {};
                                    reqData.kycpageStatus = "2";
                                    reqData.reqSessionId = parent.$("#reqSessionId").val();
                                    reqData.stage = "attachements";
                                    document.attachmentForm.method = "post";
                                    document.attachmentForm.action = "sendBackToStep2.do";
                                    document.attachmentForm.reqData.value = encrypt(JSON.stringify(reqData));
                                    document.attachmentForm.submit();
                                }

                                function deleteImage(imageId) {
                                    var reqData = {};
                                    reqData.imageId = imageId;
                                    $.ajax({
                                        url: "fmsdeleteAttachment.do",
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


                                setInterval(function () {
//                                    console.log(new Date());
                                    var imagePanels = $(".imagePanel");
                                    var i = 0;
                                    imageIds = "";
                                    $('.imagePanel').each(function () {
                                        var imageId = imagePanels[i].id;
                                        var imageSrc = $(this).find('img').attr('src');
                                        if (imageSrc == '') {
                                            imageIds = imageIds + imageId + ",";
                                        }
                                        i++;
                                    });
                                    loadImages();
                                }, 200);

        </script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
    </body>
</html>
