/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import com.jolbox.bonecp.BoneCP;
import com.jolbox.bonecp.BoneCPConfig;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.pool.HikariPool;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.*;
import javax.naming.*;

/**
 *
 * @author amar.budidha
 */
public class CRSDBManager {

    static BoneCP boneConnectionPool = null;
    static HikariPool hikariConnectionPool = null;

    public static synchronized void createBoneCPInstance() {
        AppLogger.info("Starting of createBoneCPInstance method of CRSDBManager class");

        String strServer = CRSAppResources.SERVER_NAME;
        String strConnectionPoolType = CRSAppResources.CONNECTION_POOL;

        if (boneConnectionPool == null) {

            String strDriver = CRSAppResources.BCP_DRIVER;
            String strURL = CRSAppResources.BCP_URL;
            String strDBName = CRSAppResources.BCP_DB_USERNAME;
            String strDBPassword = new CRSAuthenticate().Decrypt(CRSAppResources.BCP_DB_PWD);
            String strDBPoolMinCons = CRSAppResources.BCP_DB_MIN_CONN;
            String strDBPoolMaxCons = CRSAppResources.BCP_DB_MAX_CONN;
            String strDBPoolConTimeOut = CRSAppResources.BCP_DB_CON_TIMEOUT;
            String strDBPoolIdleTimeOut = CRSAppResources.BCP_DB_IDLE_AGE;
            boolean strDBPoolNullTimeOut =  CRSAppResources.BCP_DB_NULL_CON_TIME_OUT;

            AppLogger.debug("Server name :: " + strServer + ", Pool type :" + strConnectionPoolType + ", Driver :" + strDriver);
            AppLogger.debug("DB URL :: " + strURL + ", DB User name :" + strDBName + ", DB Min Connections :" + strDBPoolMinCons);
            AppLogger.debug("Pool Max connections :: " + strDBPoolMaxCons + ", Pool connection timeout :" + strDBPoolConTimeOut + ", Pool idle timeout :" + strDBPoolIdleTimeOut);

            try {

                if (strServer.equals("TOMCAT") && strConnectionPoolType.equalsIgnoreCase("BONECP")) {

                    Class.forName(strDriver);
                    BoneCPConfig config = new BoneCPConfig();
                    config.setJdbcUrl(strURL); // jdbc url specific to your database, eg jdbc:mysql://127.0.0.1/yourdb
                    config.setUsername(strDBName);
                    config.setPassword(strDBPassword);
                    config.setPartitionCount(1); //number of util threads internally connection pool uses
                    config.setMinConnectionsPerPartition(Integer.parseInt(strDBPoolMinCons)); //mininmum connections
                    config.setMaxConnectionsPerPartition(Integer.parseInt(strDBPoolMaxCons)); //maximum connections
                    config.setConnectionTimeoutInMs(1000 * Integer.parseInt(strDBPoolConTimeOut)); //connectin timeout in ms
                    config.setLazyInit(true);
                    config.setIdleMaxAgeInMinutes(Integer.parseInt(strDBPoolIdleTimeOut)); //max idle age of connection
                    config.setNullOnConnectionTimeout(strDBPoolNullTimeOut); 
                    boneConnectionPool = new BoneCP(config); // setup the connection pool

                }

                AppLogger.debug("Connection pool created with given properrties, Pool Object :" + boneConnectionPool);
            } catch (Exception ex) {
                ex.printStackTrace();
                AppLogger.error("Error in createBoneCPInstance method of CRSDBManager class");
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                ex.printStackTrace(pw);
                AppLogger.debug(sw.toString());
            }

            AppLogger.info("Ending of createBoneCPInstance method of CRSDBManager class, boneConnectionPool :" + boneConnectionPool);

        }

    }//End of createBoneCPInstance method
    
     public static synchronized void createHicariCPInstance() {
        AppLogger.info("Starting of createHicariCPInstance method of CRSDBManager class");

        String strServer = CRSAppResources.SERVER_NAME;
        String strConnectionPoolType = CRSAppResources.CONNECTION_POOL;

        if (boneConnectionPool == null) {

            String strDriver = CRSAppResources.HCP_DRIVER;
            String strURL = CRSAppResources.HCP_URL;
            String strDBName = CRSAppResources.HCP_DB_USERNAME;
            String strDBPassword = new CRSAuthenticate().Decrypt(CRSAppResources.HCP_DB_PWD);
            String strDBPoolMinCons = CRSAppResources.HCP_DB_MIN_CONN;
            String strDBPoolMaxCons = CRSAppResources.HCP_DB_MAX_CONN;
            String strDBPoolConTimeOut = CRSAppResources.HCP_DB_CON_TIMEOUT;
            String strDBPoolIdleTimeOut = CRSAppResources.HCP_DB_IDLE_AGE;
            String cachePrepStmts = CRSAppResources.cachePrepStmts;
            String prepStmtCacheSize = CRSAppResources.prepStmtCacheSize;
            String prepStmtCacheSqlLimit = CRSAppResources.prepStmtCacheSqlLimit;

            AppLogger.debug("Server name :: " + strServer + ", Pool type :" + strConnectionPoolType + ", Driver :" + strDriver);
            AppLogger.debug("DB URL :: " + strURL + ", DB User name :" + strDBName + ", DB Min Connections :" + strDBPoolMinCons);
            AppLogger.debug("Pool Max connections :: " + strDBPoolMaxCons + ", Pool connection timeout :" + strDBPoolConTimeOut + ", Pool idle timeout :" + strDBPoolIdleTimeOut);

            try {

                if (strServer.equals("TOMCAT") && strConnectionPoolType.equalsIgnoreCase("HICARI")) {
                    HikariConfig config = new HikariConfig();
                    config.setDriverClassName(strDriver);
                    config.setJdbcUrl(strURL); // jdbc url specific to your database, eg jdbc:mysql://127.0.0.1/yourdb
                    config.setUsername(strDBName);
                    config.setPassword(strDBPassword);
                    config.setMaximumPoolSize(Integer.parseInt(strDBPoolMaxCons)); //maximum connections
                    config.setConnectionTimeout(1000 * Integer.parseInt(strDBPoolConTimeOut)); //connectin timeout in ms
                    config.setIdleTimeout(Integer.parseInt(strDBPoolIdleTimeOut)); //max idle age of connection
                    config.addDataSourceProperty("cachePrepStmts", cachePrepStmts);
                    config.addDataSourceProperty("prepStmtCacheSize", prepStmtCacheSize);
                    config.addDataSourceProperty("prepStmtCacheSqlLimit", prepStmtCacheSqlLimit);
                    config.setConnectionTestQuery("select 1 from dual");
                    hikariConnectionPool = new HikariPool(config); // setup the connection pool

                }

                AppLogger.debug("Connection pool created with given properrties, Pool Object :" + hikariConnectionPool);
            } catch (Exception ex) {
                ex.printStackTrace();
                AppLogger.error("Error in createHicariCPInstance method of CRSDBManager class");
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                ex.printStackTrace(pw);
                AppLogger.debug(sw.toString());
            }

            AppLogger.info("Ending of createHicariCPInstance method of CRSDBManager class, boneConnectionPool :" + boneConnectionPool);

        }
    }

    public static Connection getConnection() {
        Connection conn = null;
        try {
            AppLogger.info("Starting of getConnection method");
            String strServer = CRSAppResources.SERVER_NAME;
            String strConnectionPoolType = CRSAppResources.CONNECTION_POOL;

            AppLogger.debug("Server name >> " + strServer + ", Pool type >> " + strConnectionPoolType);

            if (strServer.equals("TOMCAT")) {
                
                if (strConnectionPoolType.equalsIgnoreCase("HICARI")) {

                    createHicariCPInstance();

//                    AppLogger.debug("ConnectionPool :: DB Status(DOWN/Running) :: " + hikariConnectionPool.+ ": Total Created Connections :: " + hikariConnectionPool.getTotalCreatedConnections() + ": Free Available Connections:: " + hikariConnectionPool.getTotalFree());
                    conn = hikariConnectionPool.getConnection(); // fetch a connection

                } else if (strConnectionPoolType.equalsIgnoreCase("BONECP")) {

                    createBoneCPInstance();

                    AppLogger.debug("ConnectionPool :: DB Status(DOWN/Running) :: " + boneConnectionPool.getDbIsDown() + ": Total Created Connections :: " + boneConnectionPool.getTotalCreatedConnections() + ": Free Available Connections:: " + boneConnectionPool.getTotalFree());
                    conn = boneConnectionPool.getConnection(); // fetch a connection

                } else {

                    AppLogger.debug("Taking connection from Server Pool");

                    Context initContext = new InitialContext();
                    Context envContext = (Context) initContext.lookup("java:/comp/env");
                    javax.sql.DataSource ds = (javax.sql.DataSource) envContext.lookup(CRSAppResources.JNDI_NAME);
                    if (envContext == null) {
                        throw new Exception("Error: No Context");
                    }
                    if (ds == null) {
                        throw new Exception("Error: No DataSource");
                    }
                    if (ds != null) {
                        conn = ds.getConnection();
                    }
                }//Else if connection pool is not bone CP

            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception :: getConnection :: " + sw.toString());
        }
        AppLogger.debug("End of getConnection method, Connection :" + conn);
        return conn;
    }//End of getConnection method
    
    public static void closeCon(Connection con) {
        try {
            if (con != null) {
                con.close();
            }
        } catch (SQLException e) {
            prLog("closeCon:", e);
        }
    }

    public static void closeRS(ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }

        } catch (SQLException e) {
            prLog("closeRS:", e);
        }
    }

    public static void closePS(PreparedStatement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
        } catch (SQLException e) {
            prLog("closePS:", e);

        }
    }

    public static void closeCS(CallableStatement cs) {
        try {
            if (cs != null) {
                cs.close();
            }
        } catch (SQLException e) {
            prLog("closeCS:", e);
        }
    }

    private static void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private static void prErr(String strMsg) {
        AppLogger.error(strMsg);
    }

    private static void prLog(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }

   
}
