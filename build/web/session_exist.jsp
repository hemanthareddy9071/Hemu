<%@page import="net.sf.json.JSONSerializer"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="com.in10s.commons.CRSAuthenticate"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="java.util.Map"%>
<%@page import="com.opensymphony.xwork2.util.ValueStack"%>
<%@page import="com.opensymphony.xwork2.ActionContext"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="/struts-tags" prefix="s" %>
<%
    session = request.getSession();
    JSONObject loginRes = (JSONObject) session.getAttribute("loginResponse");
%>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title> BSNL </title>

        <!-- Styling -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="css/responsive_bootstrap_carousel_mega_min.css" rel="stylesheet" media="all">

        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/login.js"></script>
        <script src="js/Application/services.js"></script>
        <script src="js/validation.js"></script>
        <script src="js/encrypt.js"></script>
        <script src="js/sessionValidation.js"></script>
        <script src="js/BID/detector.js"></script>
        <script src="js/BID/md5.js"></script>
        <script src="js/BID/sha256.js"></script>
        <script type="text/javascript">

            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

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
            function loadVideos() {
                var Lob = $("#lob_type").val();
                if (Lob == 'MOB') {
                    $("#Desk_mob").show();
                    $("#Mobile_mob").show();
                    $("#Desk_ll").hide();
                    $("#Mobile_ll").hide();
                    $("#loginLabel").text("Sancharsoft User ID or CTOP Number");
                    $("#Desk_Mobility").addClass('active in');

                } else {
                    $("#Desk_mob").hide();
                    $("#Mobile_mob").hide();
                    $("#Desk_ll").show();
                    $("#Mobile_ll").show();
                    $("#loginLabel").text("FMS portal User ID");
                    $("#Desk_Landline").addClass('active in');
                }
            }

            function sessionClear() {
                var userName = $("#loginId").val();
                var reqData = {};
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.userName = userName;

                document.sessionExistForm.method = "post";
                document.sessionExistForm.action = "logoutUser.do";
                document.sessionExistForm.reqData.value = encrypt(JSON.stringify(reqData));
                document.sessionExistForm.submit();
            }
        </script>
        <style>
            .bluetxt2 {color: #428bca; font-weight: bold !important;}   
            /*body {background-color: white !important;}*/
            body{background-color:#6a839c; color:#FFF;}
            .main h3, h3, a, a:hover {color:#FFF;}
            .modal-dialog { max-width: 800px; margin: 30px auto; }
            .modal-content { background-color: transparent; }
            .modal-body { position:relative; padding:0px; }
            .close { position:absolute; right:-30px; top:0; z-index:999; font-size:2rem; font-weight: normal; color:#fff; opacity:1; }
            #video { width: 100%; height: 100%; min-height: 440px; border: 0 !important; box-sizing: unset; }
            @media (max-height: 768px) {
                body {font-size:12px;}
                h1{font-size:28px !important;}
                h2{font-size:20px !important;padding-bottom: 5px;}
                h1.mrg45T{margin-top:20px !important;}
                .main {padding: 0 !important;}
                .portfolio_utube_carousel_wrapper {padding: 5px 50px 5px 50px;}
                .fa-5x{font-size: 3em;}
                .iconBlock {margin-bottom: 10px;}
            }
        </style>
    </head>

    <body onload="fGetBID();loadVideos()">
        <div class="header"><i class="logo"></i></div>
        <div class="clear"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h1 class="mrg45T">Sanchar Aadhaar</h1>

                </div>
                <div class="Absolute-Center is-Responsive">
                    <div class="col-sm-12 col-md-12">


                        <form name="sessionExistForm" >

                            <input type="hidden" id="lob_type" value="<%= loginRes.getString("lobType")%>"/>
                            <div class="iconBlock">
                                <i class="fa fa-user-circle fa-5x"  aria-hidden="true"></i>
                                <p class="mrg10T">Sancharsoft User ID or CTOP Number/FMS portal User ID</p>
                                <input type="hidden" name="loginId" id="loginId" value="<%= loginRes.getString("LoginID")%>"/>
                                <%--<s:property value="message" />--%>
                                <input type="hidden" id="sessionId" value="<%=session.getId()%>" />
                                <input type="hidden" name="reqData" id="reqData" />
                                <input type="hidden" id="reqSessionId" value="" />
                                <p class="mrg10B" id="loginInfoId"></p>
                                <p class="mrg20B" id="loginInfoOptionsId" ></p>
                                Another user is already logged in with the same browser.
                                <br/>
                                <br/>

                                <div class="form-group">
                                    <input type="radio" value="1" id="radio_1" name="radio_1" checked><label>Logout the other user</label>

                                    <label id="loginInfoOption1Id"></label>
                                </div>
                                <div class=" pad10B">
                                    <a href="#" class="primarybt" onClick="sessionClear();" id="submitId">Submit</a>
                                    <a href="Login.do" class="secondarybt" id="cancleId" onClick="cancelFun('sessionExistForm');">Cancel</a>
                                </div>


                            </div>  
                        </form>
                    </div>


                </div>

                <div class="clear"></div>
                <div class="videoStrip">
                    <div class="main col-sm-12">
                        <div class="pad10A pad15L pad0T">
                            <h3>Video Help</h3>
                            <ul class="nav nav-tabs">
                                <li class="active" id="Desk_mob"><a data-toggle="tab" href="#Desk_Mobility" >Mobility Desktop videos</a></li>
                                <li id="Desk_ll"><a data-toggle="tab" href="#Desk_Landline">Landline Desktop videos</a></li>
                                <li id="Mobile_mob"><a data-toggle="tab" href="#Mobile_Mobility">Mobility Mobile App videos</a></li>
                                <li id="Mobile_ll"><a data-toggle="tab" href="#Mobile_Landline">Landline Mobile App videos</a></li>
                            </ul>
                            <div class="tab-content">
                                <div id="Desk_Mobility" class="tab-pane fade">
                                    <div id="portfolio_4_columns_utube_carousel" class="carousel slide portfolio_utube_carousel_wrapper" data-ride="carousel" data-interval="10000" data-pause="hover">
                                        <div class="portfolio_utube_carousel_header"> <span>Mobility Desktop Videos Recommended Channel</span> </div>
                                        <!--========= Wrapper for slides =========-->
                                        <div class="carousel-inner" role="listbox">
                                            <!--========= First slide =========-->
                                            <div class="item active">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://youtu.be/sckv8COAE34">
                                                        <div class="portfolio_utube_item_image"> <img src="images/DESKTOP-EKYC-OUTSTATION-MNP.PNG" alt="portfolio video 001"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">8:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">MNP OUTSTATION</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://youtu.be/UOLaxufvAl0">
                                                        <div class="portfolio_utube_item_image"> <img src="images/DESKTOP-EKYC-OUTSTATION.PNG" alt="portfolio video 002"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">OUTSTATION</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://youtu.be/jt1er5358Po">
                                                        <div class="portfolio_utube_item_image"> <img src="images/Patanjali CAF Entry.PNG" alt="portfolio video 003"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">Patanjali CAF Entry</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://youtu.be/yqpRYlo_YZs">
                                                        <div class="portfolio_utube_item_image"> <img src="images/Patanjali CSC Approval.PNG" alt="portfolio video 004"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">Patanjali CSC Approval</a> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--========= Second Slide =========-->
                                            <!--                            <div class="item active">
                                                                            <div class="row">
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_005.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_006.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_007.png" alt="portfolio video 007"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_008.png" alt="portfolio video 008"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>-->
                                        </div>
                                        <!--======= Navigation Buttons =========-->
                                        <!--======= Left Button =========-->
                                        <a class="left carousel-control portfolio_utube_carousel_control_left" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="prev"> <span class="fa fa-angle-left portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
                                        <!--======= Right Button =========-->
                                        <a class="right carousel-control portfolio_utube_carousel_control_right" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="next"> <span class="fa fa-angle-right portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                                </div>
                                <div id="Desk_Landline" class="tab-pane fade">
                                    <div id="portfolio_4_columns_utube_carousel" class="carousel slide portfolio_utube_carousel_wrapper" data-ride="carousel" data-interval="10000" data-pause="hover">
                                        <div class="portfolio_utube_carousel_header"> <span>Landline Desktop Videos Recommended Channel</span> </div>
                                        <!--========= Wrapper for slides =========-->
                                        <div class="carousel-inner" role="listbox">
                                            <!--========= First slide =========-->
                                            <div class="item active">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/rPUG3QiOgsg">
                                                    <div class="portfolio_utube_item_image"> <img src="images/WEB-LANDLINE-EKYC.PNG" alt="portfolio video 001"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">8:29</a> </div>
                                                    <div class="portfolio_utube_item_caption"> <a href="#">EKYC</a> </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                    <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 002"> </div>
                                                    <div class="portfolio_utube_item_caption"> <a href="#">Re-Verification</a> </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                    <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 003"> </div>
                                                    <div class="portfolio_utube_item_caption"> <a href="#">CAF Entry</a> </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                    <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 004"> </div>
                                                    <div class="portfolio_utube_item_caption"> <a href="#">SIM Replacement</a> </div>
                                                </div>
                                                </div>
                                            </div>
                                            <!--========= Second Slide =========-->
                                            <!--                            <div class="item active">
                                                                            <div class="row">
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_005.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_006.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_007.png" alt="portfolio video 007"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_008.png" alt="portfolio video 008"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>-->
                                        </div>
                                        <!--======= Navigation Buttons =========-->
                                        <!--======= Left Button =========-->
                                        <a class="left carousel-control portfolio_utube_carousel_control_left" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="prev"> <span class="fa fa-angle-left portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
                                        <!--======= Right Button =========-->
                                        <a class="right carousel-control portfolio_utube_carousel_control_right" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="next"> <span class="fa fa-angle-right portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                                </div>

                                <!-- Mobile App -->
                                <div id="Mobile_Mobility" class="tab-pane fade">
                                    <div id="portfolio_4_columns_utube_carousel" class="carousel slide portfolio_utube_carousel_wrapper" data-ride="carousel" data-interval="10000" data-pause="hover">
                                        <div class="portfolio_utube_carousel_header"> <span>Mobility Mobile App Videos Recommended Channel</span> </div>
                                        <!--========= Wrapper for slides =========-->
                                        <div class="carousel-inner" role="listbox">
                                            <!--========= First slide =========-->
                                            <div class="item active">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 001">  </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">EKYC</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 002">  </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">Re-Verification</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 003"> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">CAF Entry</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" >
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 004">  </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">SIM Replacement</a> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--========= Second Slide =========-->
                                            <!--                            <div class="item active">
                                                                            <div class="row">
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_005.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_006.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_007.png" alt="portfolio video 007"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_008.png" alt="portfolio video 008"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>-->
                                        </div>
                                        <!--======= Navigation Buttons =========-->
                                        <!--======= Left Button =========-->
                                        <a class="left carousel-control portfolio_utube_carousel_control_left" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="prev"> <span class="fa fa-angle-left portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
                                        <!--======= Right Button =========-->
                                        <a class="right carousel-control portfolio_utube_carousel_control_right" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="next"> <span class="fa fa-angle-right portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                                </div>
                                <div id="Mobile_Landline" class="tab-pane fade">
                                    <div id="portfolio_4_columns_utube_carousel" class="carousel slide portfolio_utube_carousel_wrapper" data-ride="carousel" data-interval="10000" data-pause="hover">
                                        <div class="portfolio_utube_carousel_header"> <span>Landline Mobile App Videos Recommended Channel</span> </div>
                                        <!--========= Wrapper for slides =========-->
                                        <div class="carousel-inner" role="listbox">
                                            <!--========= First slide =========-->
                                            <div class="item active">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/rPUG3QiOgsg">
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 001"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">8:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">EKYC</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/aqyRWdTQmn8">
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 002"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">Re-Verification</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/tDHUrCafiY4">
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 003"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">CAF Entry</a> </div>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-2 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/XRXJVJY2uM4">
                                                        <div class="portfolio_utube_item_image"> <img src="images/comingsoon.jpg" alt="portfolio video 004"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                        <div class="portfolio_utube_item_caption"> <a href="#">SIM Replacement</a> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--========= Second Slide =========-->
                                            <!--                            <div class="item active">
                                                                            <div class="row">
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_005.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_006.png" alt="portfolio video 006"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_007.png" alt="portfolio video 007"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                                <div class="col-xs-12 col-sm-6 col-md-3 portfolio_utube_item" data-toggle="modal" data-target="#myModal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk">
                                                                                    <div class="portfolio_utube_item_image"> <img src="images/portfolio_video_008.png" alt="portfolio video 008"> <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="Duration">7:29</a> </div>
                                                                                    <div class="portfolio_utube_item_caption"> <a href="#">Lorem ipsum dolor sit amet</a> </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>-->
                                        </div>
                                        <!--======= Navigation Buttons =========-->
                                        <!--======= Left Button =========-->
                                        <a class="left carousel-control portfolio_utube_carousel_control_left" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="prev"> <span class="fa fa-angle-left portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
                                        <!--======= Right Button =========-->
                                        <a class="right carousel-control portfolio_utube_carousel_control_right" href="#portfolio_4_columns_utube_carousel" role="button" data-slide="next"> <span class="fa fa-angle-right portfolio_utube_carousel_control_icons" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--</div>
            </div>-->
            <!--    <div class="pad10A pad15L ticklist">
                    <h3>What’s New</h3>
                    <ul>
                        <li>Trade scheme for July-2017 published for Payment. Please verify before Approval/Payment</li>
                        <li> CAF commission for Jul-2017 published for Payment. Please verify before Approval/Payment</li>
                        <li>FOS data available for Jul’17 in SS. FM can generate and approve the FOS Incentive bills for Jul-2017</li>
                        <li>Trade scheme Incentive for channel partners is extended for another three months w.e.f 01-Aug-2017 to 31-Oct-2017 order copy</li>
                        <li>Flash :: MNP Incentive scheme for channel partners extended for another two months w.e.f 01-Jul-2017 to 31-Aug-2017</li>
                        <li>All unpaid Incentive/Commission bills for the month April-2017 released in this software after service tax updation (i..e 14.5% to 15%). Please verify before
                            Approval/Payment</li>
            
                    </ul>
            
                </div>
        
            <!--</div>
            </div>-->


            <div class="footer">Copyright &copy; 2018 Intense Technologies Limited. All rights reserved.</div>
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document" >
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                            <!-- 16:9 aspect ratio -->
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="" id="video"  allowscriptaccess="always">></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="js/jquery.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script>
                $(document).ready(function () {
                    // Gets the video src from the data-src on each button
                    var $videoSrc;
                    $('.portfolio_utube_item').click(function () {
                        $videoSrc = $(this).data("src");
                    });
                    console.log($videoSrc);

                    // when the modal is opened autoplay it  
                    $('#myModal').on('shown.bs.modal', function (e) {
                        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                        $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
                    })

                    // stop playing the youtube video when I close the modal
                    $('#myModal').on('hide.bs.modal', function (e) {
                        // a poor man's stop video
                        $("#video").attr('src', $videoSrc);
                    })
                    // document ready  
                });
            </script>
            <script src="js/responsive_bootstrap_carousel.js"></script>



    </body>
</html>
