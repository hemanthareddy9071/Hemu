<%-- 
    Document   : newjsp
    Created on : Jan 4, 2019, 10:30:49 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <script>
            var docsAction='<label style="color: black" id="' + jobArr[idx].REG_MAIL + '" ><h3>Pending</h3></label>';
            
        </script>
        <div id="tab' + idx + '" class="tab-pane fade in active">  
            <div class="row">    
                <div class="col-md-5">    
                    <div class=""> 
                        <label id="reg_mob_ll" class="bold width50">  <label>  <s:text name="helpdesk.gridhtml.registeredmobile" />   </label>    </label>' + jobArr[idx].REG_MOB_NO + '     
                    </div>        
                    <div class="">    
                        <label id="reg_date_ll" class="bold width50">   
                            <label>          
                                <s:text name="helpdesk.gridhtml.registereddate" />   
                            </label>      
                        </label> ' + jobArr[idx].REG_DATE_TIME + '      
                    </div>   
                </div>     
                <div class="col-md-5">     
                    <div class="">          
                        <label id="reg_name_ll" class="bold width50">    
                            <label>         
                                <s:text name="helpdesk.gridhtml.name" />     
                            </label>    
                        </label>' + jobArr[idx].REG_CUST_NAME + '    
                    </div>      
                    <div class="">       
                        <label id="reg_email_ll" class="bold width50">   
                            <label>          
                                <s:text name="helpdesk.gridhtml.Email" />  
                            </label>      
                        </label>' + jobArr[idx].REG_MAIL + ' 
                    </div>   
                </div>    
                <div class="col-md-20 text-center">    
                    <div id="reg_info_ll" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> 
                    </div>    
                </div> 
            </div>  
            <hr class="hr"> 
            <div class="row">   
                <div class="col-md-5">    
                    <div class="">        
                        <label id="service_type_ll" class="bold width50">      
                            <label>            
                                <s:text name="helpdesk.gridhtml.ll.service.type" />   
                            </label>       
                        </label>' + jobArr[idx].SERVICE_TYPE + '        
                    </div> 
                    <div class="">     
                        <label id="docs_sts_ll" class="bold width50">     
                            <label>       
                                <s:text name="helpdesk.gridhtml.ll.docs" />     
                            </label>       
                        </label> ' + docStatus + '   
                    </div> 
                </div>     
                <div class="col-md-5">   
                    <div class="">      
                        <label id="pin_exch_ll" class="bold width50"> 
                            <label>       
                                <s:text name="helpdesk.gridhtml.ll.pincode" />   
                            </label>        
                        </label>' + jobArr[idx].PIN_CODE +  ' / ' + jobArr[idx].EXCHANGE_CODE + '    
                    </div>         
                        
                </div>      
                <div id="kyc_info_ll" class="col-md-20 text-center"> ' + docsAction + '
                </div>   
            </div>   
            <hr class="hr">  
            <div class="row">  
                <div class="col-md-5">    
                    <div class="">      
                        <label id="caf_date_ll" class="bold width50">     
                            <label>      
                                <s:text name="helpdesk.gridhtml.ll.cafkycdate" />  
                            </label>     
                        </label> ' + jobArr[idx].EKYC_DATE + '   
                    </div>      
                    <div class="">     
                        <label id="caf_no_ll" class="bold width50">   
                            <label>        
                                <s:text name="helpdesk.gridhtml.ll.cafno" />   
                            </label>       
                        </label> ' + jobArr[idx].APPLICATION_NO + '      
                    </div>    
                </div>    
                <div class="col-md-5">    
                    <div class="">     
                        <label id="name_ll" class="bold width50">    
                            <label>          
                                <s:text name="helpdesk.gridhtml.Name" />     
                            </label>         
                        </label>' + jobArr[idx].OB_CUST_NAME + '     
                    </div>       
                    	
                    <div class="">     
                        <label id="poi_type_ll" class="bold width50">    
                            <label>       
                                <s:text name="helpdesk.gridhtml.ll.idproof" />    
                            </label>             </label> ' + jobArr[idx].POI_TYPE + '  
                    </div>     
                </div>     
                <div id="ekyc_info_ll" class="col-md-20 text-center"> ' + cafONBStatus + '
                </div>  
            </div>   
            <hr class="hr">   
            <div class="row">   
                <div class="col-md-5">  
                    <div class="">   
                        <label id="act_req_dt_ll" class="bold width50">   
                            <label>       
                                <s:text name="helpdesk.gridhtml.ll.active.date" /> 
                            </label>  
                        </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '    
                    </div>    
                    <div class="">      
                        <label id="bill_acc_no_ll" class="bold width50">    
                            <label>      
                                <s:text name="helpdesk.gridhtml.ll.bill.acc" />    
                            </label>        
                        </label> ' + jobArr[idx].BILL_ACCNT_NUM + '      
                    </div>    
                </div>     
                <div class="col-md-5">   
                    <div class="">    
                        <label id="cust_acc_no_ll" class="bold width50">     
                            <label>     
                                <s:text name="helpdesk.gridhtml.ll.cust.acc" />   
                            </label>       
                        </label> ' + jobArr[idx].CUST_ACCNT_NUM + '    
                    </div>      
                    <div class="">        
                        <label id="remarks_ll" class="bold width50">    
                            <label>           
                                <s:text name="helpdesk.gridhtml.Remarks" />    
                            </label>             </label> ' + jobArr[idx].REMARKS + ' 
                    </div>    
                </div>     
                <div id="activation_info_ll" class="col-md-20 text-center"> ' + activationStatus + '
                </div> 
            </div>   
            <hr class="hr">  
            <div class="row">   
                <div class="col-md-5">      
                          
                    <div class="">       
                        <label id="circle_ll" class="bold width50">        
                            <label>           
                                <s:text name="helpdesk.gridhtml.Circle" />     
                            </label>       
                        </label> ' + jobArr[idx].CIRCLE_CODE + '         
                    </div>  
                    <div class="">       
                        <label id="service_id_ll" class="bold width50">       
                            <label>     
                                <s:text name="helpdesk.gridhtml.ll.service.id" />     
                            </label>             </label> ' + jobArr[idx].SERVICE_ID + ' 
                    </div> 
                       
                </div>     
                <div class="col-md-5">     
                    <div class="">      
                        <label id="alloted_service_no_ll" class="bold width50">    
                            <label>   
                                <s:text name="helpdesk.gridhtml.ll.allowedno" /> 
                            </label> 
                        </label> ' + jobArr[idx].WINGS_MOB_NO + '        
                    </div>      
                        
                    <div class="">       
                        <label id="clarity_remark_ll" class="bold width50">       
                            <label>     
                                <s:text name="helpdesk.gridhtml.ll.remark" />     
                            </label>             </label> ' + jobArr[idx].CLARITY_REMARKS + ' 
                    </div>     
                </div>       
               <!-- <div class="col-md-20"> ' + activationStatus + ' </div>-->
            </div>    
            <div class="row">    
                <div align="right">    
                    <!--<button type="button" id="action-'+jobArr[idx].CAF_NO+' " class="primarybt1" onclick="getCustInfoData(this);">Proceed</button>-->
                    <a href="Login.do" class="primarybt">cancel </a>   
                    <!--<input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'">--> 
                </div> 
            </div> 
        </div>
    </body>




</html>
