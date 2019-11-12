/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.in10s.commons;


import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONObject;

/**
 *
 * @author shivdeep.b
 */
public class WfPropertyManager {
    
   private static WfPropertyManager instance = null;

   private Map<String,JSONObject>  wfPropertyMap= null;

   private  Map<String,JSONObject>  wfComplexPropertyMap= null;

    private Map<String, String> wfResourceMap = null;

    public Map<String, String> getWfResourceMap() {
        return wfResourceMap;
    }

    public Map<String, JSONObject> getWfPropertyMap() {
        return Collections.unmodifiableMap(this.wfPropertyMap);
    }

   private Map<String,JSONObject> getWfComplexPropertyMap() {
        return Collections.unmodifiableMap(this.wfComplexPropertyMap);
    }

   private WfPropertyManager() throws Exception{
        wfPropertyMap = new HashMap<String, JSONObject>();
        wfComplexPropertyMap = new HashMap<String, JSONObject>();
        wfResourceMap = new HashMap<String, String>();
        buildPropertyManagerMaps();
        prInfo("WfPropertyManager::"+wfPropertyMap);
        prInfo("wfComplexPropertyMap::"+wfComplexPropertyMap);
   }

   public static synchronized WfPropertyManager getInstance() throws Exception{
       if (instance == null)
           instance = new WfPropertyManager();
       return instance;
   }

   private void buildPropertyManagerMaps() throws Exception{
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = null;
        con = CRSDBManager.getConnection();
        List<String> wfPropertyGroupList = null;
        try{
            ps = con.prepareStatement("SELECT DISTINCT GROUP_NAME FROM " +  CRSAppResources.DB_SCHEMA + ".WF_PROPERTY_MANAGER");
            rs = ps.executeQuery();
            wfPropertyGroupList = new ArrayList<String>();
            while (rs.next()) {
                wfPropertyGroupList.add(rs.getString("GROUP_NAME"));
            }
            if (ps != null) {
                ps.close();
                ps = null;
            }
            if (rs != null) {
                rs.close();
                rs = null;
            }
            ps = con.prepareStatement("SELECT NAME,VALUE,COMPLEX_VALUE FROM " +  CRSAppResources.DB_SCHEMA + ".WF_PROPERTY_MANAGER WHERE GROUP_NAME=?");
            for (int i = 0; i < wfPropertyGroupList.size(); i++) {
                JSONObject groupDataJSON  = new JSONObject();
                JSONObject groupComplexDataJSON  = new JSONObject();
                System.out.println("wfPropertyGroupList ::"  + wfPropertyGroupList.get(i));
                ps.setString(1, wfPropertyGroupList.get(i));
                rs = ps.executeQuery();
                while (rs.next()) {
                   groupDataJSON.put(rs.getString("NAME"),rs.getString("VALUE"));
                   groupComplexDataJSON.put(rs.getString("NAME"),rs.getCharacterStream("COMPLEX_VALUE")==null?"":rs.getString("COMPLEX_VALUE"));
                }
               wfPropertyMap.put(wfPropertyGroupList.get(i), groupDataJSON);
               wfComplexPropertyMap.put(wfPropertyGroupList.get(i), groupComplexDataJSON);
            }
			
			  if (ps != null) {
                ps.close();
                ps = null;
            }
            if (rs != null) {
                rs.close();
                rs = null;
            }

            ps = con.prepareStatement("SELECT NAME,VALUE,TYPE FROM " +  CRSAppResources.DB_SCHEMA+ ".WF_RESOURCES WHERE STATUS=1");
            rs = ps.executeQuery();
            while (rs.next()) {
                wfResourceMap.put(rs.getString("NAME"), rs.getCharacterStream("VALUE") == null ? "" : rs.getString("VALUE"));
            }

            if (ps != null) {
                ps.close();
                ps = null;
            }
            if (rs != null) {
                rs.close();
                rs = null;
            }
        }catch(SQLException sqlCause){
            prLog(":: An exception in buildPropertyManagerMap method  :: " , sqlCause);

        }finally{
           if(con!=null){
            con.close();
           }
        }   
   }

    public String getResource(String key) {
        if (key == null) {
            return null;
        }
        return this.getWfResourceMap().get(key);
    }

    public String getValue(String groupName, String key) {
        if (groupName == null || key == null) {
            return null;
        }
        return this.getWfPropertyMap().get(groupName).getString(key);
    }

   public Object getComplexValue(String groupName, String key){
       if(groupName==null || key==null)
        return null;
      return  this.getWfComplexPropertyMap().get(groupName).get(key);
   }
 
   private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prLog(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }
    
}
