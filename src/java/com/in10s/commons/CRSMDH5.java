package com.in10s.commons;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.security.MessageDigest;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author harish.singh
 */
public class CRSMDH5 {

    FileInputStream fis = null;

    public String getHashKey(File fileObj, String alogName) {
        String HashKey = "";
        try {
            if (fileObj.exists()) {
                MessageDigest md = MessageDigest.getInstance(alogName);
                fis = new FileInputStream(fileObj);
                byte[] dataBytes = new byte[1024];
                int nread = 0;
                while ((nread = fis.read(dataBytes)) != -1) {
                    md.update(dataBytes, 0, nread);
                }
                byte[] mdbytes = md.digest(); //convert the byte to hex format method 1                
                StringBuffer sb = new StringBuffer();
                for (int i = 0; i < mdbytes.length; i++) {
                    sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
                }
                //System.out.println("Hash Key Value :: " + sb.toString());
                HashKey = sb.toString();
            }
        } catch (Exception ae) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ae.printStackTrace(pw);
            AppLogger.error("Exception in getHashKey method : "+sw.toString());
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException ex) {
                }
                fis = null;
            }
        }

        return HashKey;
    }
}
