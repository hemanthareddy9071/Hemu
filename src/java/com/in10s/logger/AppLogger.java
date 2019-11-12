package com.in10s.logger;

import com.in10s.config.CRSAppResources;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.RollingFileAppender;

/**
 *
 * @author chenchulu
 */
public class AppLogger {

    private static AppLogger objAppLogger;
    public static Logger logger = null;

    private AppLogger() {

    }

    static {
        getInstance();
    }

    public static void close() {

        objAppLogger = null;
    }

    public synchronized static AppLogger getInstance() {
        try {
            if (objAppLogger == null) {
                System.out.println("*******   AppLogger object initialization process started    *******");

                objAppLogger = new AppLogger();

                String strLogPath = CRSAppResources.LOG_PATH;
                String ConversionPattern = CRSAppResources.LOG_PATTERN;//"%d{dd MMM yyyy HH:mm:ss} %-5p:: %m  %n";
                String strLogLevel = CRSAppResources.LOG_LEVEL;//"DEBUG";
                String strMaxFileSize = CRSAppResources.LOG_MAX_FILESIZE;//"10000KB";
                String nMaxBackupIndex = (CRSAppResources.LOG_BACKUP_INDEX);//25;
                String logDatePattern = (CRSAppResources.LOG_DATE_PATTERN);//25;
//                int nMaxBackupIndex = Integer.parseInt(CRSAppResources.LOG_BACKUP_INDEX);//25;
                System.out.println("strLogPath :::: " + strLogPath);
                System.out.println("con pattern :::::" + ConversionPattern);
                System.out.println("strMaxFileSize :::: " + strMaxFileSize);
//                RollingFileAppender SCAppender = null;
                DailyFolderAppender SCAppender = null;
                logger = Logger.getLogger("BSNL");    //BSNL           
                logger.setLevel(Level.toLevel(strLogLevel));
//                SCAppender = new RollingFileAppender(new PatternLayout(ConversionPattern), strLogPath);
                SCAppender = new DailyFolderAppender();
                SCAppender.setMaxFileSize(strMaxFileSize);
                SCAppender.setLayout(new PatternLayout(ConversionPattern));
                SCAppender.setRootFolder(strLogPath);
                SCAppender.setFileName("BSNLWebPortal.log");
                SCAppender.setDatePattern(logDatePattern);
                SCAppender.setAppend(true);
                SCAppender.activateOptions();
                logger.addAppender(SCAppender);

            }//If AppLogger object not exist's

        } catch (Exception e) {
            System.out.println("Error in AppLogger object initialization...");
            e.printStackTrace();
        }

        return objAppLogger;
    }//End of getInstance method

    public static void debug(String strMsg) {
        //getInstance();
        logger.debug(CRSThreadLocalManager.getRequestId() + "::" + strMsg);
    }

    public static void info(String strMsg) {
        //getInstance(); 
        logger.info(CRSThreadLocalManager.getRequestId() + "::" + strMsg);
    }

    public static void warn(String strMsg) {
        //getInstance(); 
        logger.warn(CRSThreadLocalManager.getRequestId() + "::" + strMsg);
    }

    public static void error(String strMsg) {
        //getInstance();
        logger.error(CRSThreadLocalManager.getRequestId() + "::" + strMsg);
    }

    public static void fatal(String strMsg) {
        //getInstance();
        logger.fatal(CRSThreadLocalManager.getRequestId() + "::" + strMsg);

    }

}
