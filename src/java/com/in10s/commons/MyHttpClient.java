package com.in10s.commons;

import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.FileInputStream;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpParams;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

public class MyHttpClient extends DefaultHttpClient {

    // private static Context appContext = null;
    private static HttpParams params = null;
    private static SchemeRegistry schmReg = null;
    private static Scheme httpsScheme = null;
    private static Scheme httpScheme = null;
    private static String TAG = "MyHttpClient";

    public MyHttpClient(int HTTPs) {

        if (httpsScheme == null) {
            httpsScheme = new Scheme("https", setUpHttpsConnection(), HTTPs);
        }
        getConnectionManager().getSchemeRegistry().register(httpsScheme);
    }

    public static SSLSocketFactory setUpHttpsConnection() {
        SSLSocketFactory ret = null;
        AppLogger.info("STarting of SSLSocketFactory in MyHttpClient");
        try {
            // Load CAs from an InputStream
            // (could be from a resource or ByteArrayInputStream or ...)
            CertificateFactory cf = CertificateFactory.getInstance("X.509");

            // My CRT file that I put in the assets folder
            // I got this file by following these steps:
            // * Go to https://littlesvr.ca using Firefox
            // * Click the padlock/More/Security/View Certificate/Details/Export
            // * Saved the file as littlesvr.crt (type X.509 Certificate (PEM))
            // The MainActivity.context is declared as:
            // public static Context context;
            // And initialized in MainActivity.onCreate() as:
            // MainActivity.context = getApplicationContext();
            //  AssetManager assetManager = ObjectAssetManager.getAssetManager();
            //D:\BSNL\Client files\Client files\ONBOARDAPPSRV.crt
//            File file=new File("D:\\BSNL\\Client files\\Client files\\D:\\keerthi\\swaroop27-sep-2016\\oraclelinux1.crtONBOARDAPPSRV.crt");
//            File file = new File(CRSSession.getInstance().getAttribute("WorkingFolder")+"//cert//oraclelinux1.crt");
//            File file = new File("C:\\Users\\pardha.s\\AppData\\Local\\UniServeThickClient\\cert\\cert\\oraclelinux1.crt");
            InputStream caInput = new FileInputStream(CRSAppResources.CERT_PATH);
            //InputStream caInput = new BufferedInputStream(MainActivity.context.getAssets().open("littlesvr.crt"));
            Certificate ca = cf.generateCertificate(caInput);
            System.out.println("ca=" + ((X509Certificate) ca).getSubjectDN());

            // Create a KeyStore containing our trusted CAs
            String keyStoreType = KeyStore.getDefaultType();
            KeyStore keyStore = KeyStore.getInstance(keyStoreType);
            keyStore.load(null, null);
            keyStore.setCertificateEntry("ca", ca);

            // Create a TrustManager that trusts the CAs in our KeyStore
            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keyStore);

            // Create an SSLContext that uses our TrustManager
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, tmf.getTrustManagers(), null);
            //SSLSocketFactory ret = new SSLSocketFactory(SSLContext.getInstance("TLS"), SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
            ret = new SSLSocketFactory(keyStore);
            ret.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

            // Tell the URLConnection to use a SocketFactory from our SSLContext
            /* URL url = new URL(urlString);
             HttpsURLConnection urlConnection = (HttpsURLConnection)url.openConnection();
             urlConnection.setHostnameVerifier(DO_NOT_VERIFY);

             urlConnection.setSSLSocketFactory(context.getSocketFactory());
            
             return urlConnection;*/
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in  setUpHttpsConnection method::::  " + sw.toString());
            return null;
        }
        return ret;
    }
}
