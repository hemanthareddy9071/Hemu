/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;


import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.Serializable;
import java.net.URL;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.mvel2.MVEL;
import org.mvel2.ParserContext;
import org.mvel2.integration.PropertyHandler;
import org.mvel2.integration.PropertyHandlerFactory;
import org.mvel2.integration.VariableResolverFactory;
import org.mvel2.optimizers.OptimizerFactory;
import org.mvel2.templates.CompiledTemplate;
import org.mvel2.templates.TemplateCompiler;
import org.mvel2.templates.TemplateRuntime;

/**
 *
 * @author prashanth.a
 */
public class RMTextParser {

    public static final String DATE_FORMAT = "dd/MM/yyyy";
    public static ParserContext parserContext = new ParserContext();
    public static Map compiledTemplets = null;
    public static Map compiledExpresions = null;

    static {
        try {
            URL propUrl = RMTextParser.class.getClassLoader().getResource("/");
                String strFilePath = propUrl.getFile();
                strFilePath = strFilePath.substring(0, strFilePath.lastIndexOf("/"));
                strFilePath = strFilePath.substring(0, strFilePath.lastIndexOf("/"));
                strFilePath = strFilePath + "/lib/configurations/TextParserMethods.json";
                strFilePath = URLDecoder.decode(strFilePath, "utf-8");
            String jsonString = FileUtils.readFileToString(new File(strFilePath));
            //String jsonString = "{     'fnStrMid': {         'classname':'com.in10s.resource.util.RMTextParser',         'methodname':'subString',         'agrs':'string@int@int'     },'fnContains': {         'classname':'com.in10s.resource.util.RMTextParser',         'methodname':'fnContainsString',         'agrs':'string@string'     }}";
            JSONObject functions = (JSONObject) JSONSerializer.toJSON(jsonString);
            Iterator<String> itr = functions.keys();
            compiledTemplets = new HashMap();
            compiledExpresions = new HashMap();
            String key = "";
            parserContext = new ParserContext();
            OptimizerFactory.setDefaultOptimizer("reflective");
            PropertyHandlerFactory.registerPropertyHandler(JSONObject.class, new RMPropertyHandler());

            while (itr.hasNext()) {
                try {
                    key = itr.next();
                    JSONObject args = functions.getJSONObject(key);
                    String classname = args.getString("classname");
                    String method = args.getString("methodname");
                    Class[] classArsg = getArgs(args.getString("agrs"));
                    parserContext.addImport(key, getClassType(classname).getMethod(method, classArsg));
                } catch (Exception e) {
                    AppLogger.debug(":: Excetion whjile loading " + key);
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static class RMPropertyHandler implements PropertyHandler {

        @Override
        public Object getProperty(String name, Object contextObj, VariableResolverFactory variableFactory) {
            return ((JSONObject) contextObj).get(name);
        }

        @Override
        public Object setProperty(String name, Object contextObj, VariableResolverFactory variableFactory, Object value) {
            ((JSONObject) contextObj).put(name, value);
            return value;
        }
    }

    public static String parseText(String text, JSONObject input) {
        return parseText(text, input, null);
    }

    public static String parseText(String text, JSONObject input, CompiledTemplate compiledTemplate) {
        Map<String, Object> objects = new LinkedHashMap<String, Object>();
        Iterator<String> keys = input.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            Object o = input.get(key);
            if (o instanceof JSONArray) {
                JSONArray array = (JSONArray) o;
                List<JSONObject> list = new ArrayList<JSONObject>();
                for (int i = 0; i < array.size(); i++) {
                    try {
                        list.add(array.getJSONObject(i));
                    } catch (Exception e) {
                    }
                }
                o = list;
            }
            objects.put(key, o);
        }

        //PropertyHandlerFactory.registerPropertyHandler(JSONObject.class, new RMPropertyHandler());
        if (compiledTemplate == null) {
            compiledTemplate = TemplateCompiler.compileTemplate(text, parserContext);
        }

        return (String) TemplateRuntime.execute(compiledTemplate, objects);
    }

    public static boolean evalRule(String rule, JSONObject input) {
        return evalRule(rule, input, null);
    }

    public static boolean evalRule(String rule, JSONObject input, Serializable exp) {

//        logger.info("evaluating rule");
        //PropertyHandlerFactory.registerPropertyHandler(JSONObject.class, new DynaBeanPropertyHandler());
        //ParserContext parserContext = new ParserContext();
        Map<String, Object> objects = new LinkedHashMap<String, Object>();

        Iterator<String> keys = input.keys();

        while (keys.hasNext()) {
            String key = keys.next();
            objects.put(key, input.get(key));
        }

        //if (exp == null) {
        //    exp = MVEL.compileExpression(rule);
        //}
        if (exp == null) {
            exp = MVEL.compileExpression(rule);
        }

        //Boolean b = (Boolean) TemplateRuntime.eval("@{" + rule + "}", parserContext, objects);
        Boolean b = (Boolean) MVEL.executeExpression(exp, objects);

        //Boolean b = (Boolean) TemplateRuntime.eval("@{" + rule + "}", parserContext, objects);
        // Boolean b = (Boolean) MVEL.executeExpression(exp, objects);
//        logger.info("evaluating rule  retuned::" + b);
        return b.booleanValue();
    }

    private static Class<?> getClassType(String name) throws ClassNotFoundException {
        if (name.equals("int")) {
            return int.class;
        } else if (name.equalsIgnoreCase("float")) {
            return float.class;
        } else if (name.equalsIgnoreCase("long")) {
            return long.class;
        } else if (name.equalsIgnoreCase("double")) {
            return double.class;
        } else if (name.equalsIgnoreCase("char")) {
            return char.class;
        } else if (name.equalsIgnoreCase("short")) {
            return short.class;
        } else if (name.equalsIgnoreCase("byte")) {
            return byte.class;
        } else if (name.equalsIgnoreCase("boolean")) {
            return boolean.class;
        } else if (name.equalsIgnoreCase("string")) {
            return String.class;
        }
        return Class.forName(name);
    }

    public static Date toDateFromString(String strDate, String format) {
        Date date = null;

        try {
            if (format == null) {
                format = DATE_FORMAT;
            }
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            date = formatter.parse(strDate);
        } catch (ParseException ex) {
        }

        return date;
    }

    public static Class[] getArgs(String strArgumentsString) throws ClassNotFoundException {
        String[] strArguments = strArgumentsString.split("@");
        Class[] args = new Class[strArguments.length];
        for (int i = 0; i < strArguments.length; i++) {
            args[i] = getClassType(strArguments[i]);
        }
        return args;
    }

    public static String subString(String str, int start, int end) {
        if (end == -1 || end > str.length()) {
            end = str.length();
        }
        return str.substring(start, end);
    }
  public static String subStringTail(String str, int count) {
       if (count == -1 || count > str.length()) {
       return str;
       }
        return str.substring(str.length()-count);
    }
//fnConvertDate
    public static String fnCurrentTime(String dateFormat) {
        return dateToString(new Date(), dateFormat);
    }

    public static String fngenarateUUID(String string) {
        return UUID.randomUUID().toString();
    }

      public static String dateToString(Date date, String format) {
        return new SimpleDateFormat(format).format(date);
    }
//    public static String getAlternateNumber(String string) {
//        String str = PropertiesUtils.getProperty("UAEIntegrations.properties", "AlternateContactNumStartsWith");
//        if (str != null) {
//            JSONArray js = (JSONArray) JSONSerializer.toJSON(str);
//            for (int i = 0; i < js.size(); i++) {
//                if (string.startsWith(js.getString(i))) {
//                    string = "971" + string.substring(1, string.length());
//                    break;
//                }
//            }
//        }
//        return string;
//    }

    public static boolean startsWith(String string1, String string2) {
        return string1.startsWith(string2);
    }

    public static String toLower(String string1) {
        return string1.toLowerCase();
    }

    public static String toUpper(String string1) {
        return string1.toUpperCase();
    }

    public static boolean endsWith(String string1, String string2) {
        return string1.endsWith(string2);
    }

    public static String fnNationByCode(String dateFormat) {
        return null;
    }
    
    public static String fnEscapeXml(String value) {
        return StringEscapeUtils.escapeXml(value);
    }

    public static String fnEscapeSql(String value) {
        return StringEscapeUtils.escapeSql(value);
    }


    public static String fnConvertDate(String date, String orginalFormat, String TodateFormat) {
        Date dateObj = null;
        if (date.equalsIgnoreCase("sysdate")) {
            dateObj = new Date();
        } else {
            try {
                dateObj = toDateFromString(date, orginalFormat);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        return dateToString(dateObj, TodateFormat);
    }

    public static String fnConvertDateFromLong(long date, String TodateFormat) {
        Date dateObj = new Date(date);
        return dateToString(dateObj, TodateFormat);
    }

    public static String fnAvailConverDate(String date, String TodateFormat) {
        String dateObj = null;
        JSONArray availableFormats = (JSONArray) JSONSerializer.toJSON("['dd-MMM-yy','yyyy-MM-dd','dd-MMM-yyyy']");
        for (int i = 0; i < availableFormats.size(); i++) {
            try {
                dateObj = fnConvertDate(date, availableFormats.getString(i), TodateFormat);
            } catch (Exception e) {
            }
            if (dateObj != null) {
                break;
            }
        }
        return dateObj;
    }

    public static boolean fnContainsString(String string1, String string2) {
        return string1.contains(string2);
    }

    public static void main(String[] args) {
        JSONObject j = new JSONObject();
        j.put("CREATED_DATE", "05-08-2014 17:59:27");
        j = (JSONObject) JSONSerializer.toJSON("{\"DEDUPE_rejected\":\"true\",\"caf_no\":\"IN10S00251\",\"uid_no\":\"789456\",\"type_of_service\":\"01\",\"customer_status\":\"0005\",\"telemarketing\":\"\",\"cust_name\":\"STORECFLOW\",\"father_name\":\"sai\",\"dob\":\"1991-02-12\",\"nationality\":\"IN\",\"profession\":\"\",\"gender\":\"\",\"email\":\"\",\"pan\":\"\",\"alt_contactno\":\"\",\"mobile_connections\":\"\",\"preferred_language\":\"\",\"dnd_reg_req\":\"\",\"local_hno\":\"sssaa\",\"local_street\":\"adff\",\"local_locality\":\"asdd\",\"local_city\":\"BRDP\",\"local_state\":\"AP\",\"local_pincode\":\"741963\",\"perm_hno\":\"\",\"perm_street\":\"\",\"perm_locality\":\"\",\"perm_city\":\"\",\"perm_state\":\"\",\"perm_pincode\":\"\",\"poi_type\":\"Z00008\",\"poi_number\":\"12345\",\"poi_issue_date\":\"\",\"poi_issue_place\":\"\",\"poi_issuing_auth\":\"Election commission of India\",\"poa_type\":\"\",\"poa_number\":\"12345\",\"poa_issue_date\":\"\",\"poa_issue_place\":\"\",\"poa_issuing_auth\":\"Election commission of India\",\"loc_ref_name\":\"\",\"loc_ref_no\":\"\",\"loc_ref_addr\":\"\",\"calling_party_no\":\"789456158960\",\"passport_no\":\"789456\",\"visa_validity\":\"\",\"tariff_plan_applied\":\"1000205\",\"MOB_NO\":\"\",\"iccid_no\":\"8991874100000000065\",\"upc_code\":\"\",\"CUST_MOBILE_NO\":\"9229782352\",\"connection_type\":\"\",\"prev_serv_provider\":\"\",\"upc_date\":\"\",\"pos_agent_name\":\"\",\"pos_code\":\"0681000012\",\"orn_id\":\"IN10S00251\",\"order_type\":\"01\",\"CIRCLE_CODE\":\"AP\",\"salutation\":\"0002\",\"order_sub_type\":\"P\",\"alloted_no\":\"+918452875498\",\"local_buildingname\":\"asdd\",\"perm_buildingname\":\"\",\"dist_channel\":\"30\",\"milestone_id\":\"01\",\"milestone_status\":\"S\",\"milestone_comment\":\"ActivityName:AOApproval TimeCompleted:2016-01-05 UserName:RJIO AO user\",\"milestone_attributeName\":\"ACTIVATION_DATE_TIME\",\"milestone_attributeValue\":\"2016-01-05\",\"milestone_agentCode\":\"RJIO AO user\",\"perm_district\":\"\",\"last_tax_return\":\"\",\"reason_no_pan\":\"\",\"FILE_PATH\":\"/home/intense/DMSLogs/Images/IN10S00251\",\"CCI_STATUS\":\"2\",\"HUB_CODE\":\"SOUTH\",\"POS_NAME\":\"Maa Durga Mobile\",\"POS_ADDR\":\"RJIO,RJIOhno-12,building1,Society1,Loc1,sub loc1,KAYAPAT,opp HDFC,713334,Asansol,city,dist,state,IN\",\"POS_DT_USER_ID\":\"RJIO user\",\"POS_AO_USER_ID\":\"RJIO AO user\",\"POS_DIST_ID\":\"0660002303\",\"POS_LOCATION_EMAILID\":\"\",\"POS_LOCATION_MOBILENUMBER\":\"\",\"DIST_NAME\":\"Maa Durga Mobile\",\"DIST_ADDR\":\"RJIO,RJIOhno-12,building1,Society1,Loc1,sub loc1,KAYAPAT,opp HDFC,713334,Asansol,city,dist,state,IN\",\"middle_name\":\"\",\"last_name\":\"\",\"local_district\":\"CTTR\",\"operator_code\":{\"Z03\":\"BSNL #1\"},\"ischeckPOI\":true,\"INSTANCE_ID\":\"1711\",\"DE_accepted\":\"true\",\"DIST_USER_ID\":\"dist\",\"DISTRIBUTION_accepted\":\"true\",\"AO_USER_ID\":\"aox\",\"RVC_USER_ID\":\"RVCX\",\"RVC_r\":\"true\",\"DEDUPE_JOB\":\"2\",\"DEDUPE_COMMENT\":\"\",\"DEDUPE_DEDUPCNT\":\"0\",\"DEDUPE_DEDUPSTATUS\":\"F\",\"DEDUPE_JOB_ID\":\"128809\",\"DEDUPE_RULE\":\"\",\"DEDUPE_TRANSACTIONID\":\"1711\",\"DEDUPE_retrycount\":1,\"ACTIVATION_accepted\":\"true\",\"activation_date\":\"2016-01-05\",\"CRM_STAGE_CRM_STATUS\":false,\"CRM_STAGE_WEBEXP_STATUS\":true,\"CRM_STAGE_DEDUPE_STATUS\":true}");
        JSONObject input = new JSONObject();
        input.put("msg", j);
        System.out.println("::: " + parseText("{\"Dedup\":\"@if{msg.DEDUPE_DEDUPSTATUS!=null && (msg.DEDUPE_DEDUPSTATUS=='F' || msg.DEDUPE_DEDUPSTATUS=='R') && msg.DEDUPE_accepted!=null}ACCEPTED@else{msg.DEDUPE_DEDUPSTATUS!=null && (msg.DEDUPE_DEDUPSTATUS=='F' || msg.DEDUPE_DEDUPSTATUS=='R')&& msg.DEDUPE_rejected!=null}REJECTED@else{msg.DEDUPE_DEDUPSTATUS!=null && m(msg.DEDUPE_DEDUPSTATUS=='F' || msg.DEDUPE_DEDUPSTATUS=='R')}WAITING@else{}NA@end{}\",\"Electronic Verification\":\"@if{(msg.dist_channel=='40' || msg.dist_channel=='98') && msg.RVC_accepted!=null}ACCEPTED@else{(msg.dist_channel=='40' || msg.dist_channel=='98') && msg.RVC_rejected!=null}REJECTED@else{(msg.dist_channel=='40' || msg.dist_channel=='98')}WAITING@else{}NA@end{}\",\"Outbound Reference Call\":\"@if{msg.customer_status=='0005' && msg.CCI_STATUS=='2'}ACCEPTED@else{msg.customer_status=='0005' && msg.CCI_STATUS=='1'}REJECTED@else{msg.customer_status=='0005' && msg.CCI_STATUS=='0'}WAITING@else{}NA@end{}\"}", input));
    }
}
