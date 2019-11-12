/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import com.in10s.config.CRSAppResources;
import java.security.cert.CertificateException;
import com.in10s.logger.AppLogger;
import java.util.Iterator;
import org.apache.commons.io.FileUtils;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.util.regex.Pattern;
import javax.net.ssl.HttpsURLConnection;
import net.sf.json.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import java.security.KeyStore;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.StringTokenizer;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import javax.net.ssl.SSLHandshakeException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import java.io.OutputStream;

/**
 *
 * @author ravikiran.r
 */
public class ServiceInvoker {

    private static class TrustManagerImpl implements X509TrustManager {

        private final X509TrustManager tm;
        private X509Certificate[] chain;

        TrustManagerImpl(X509TrustManager tm) {
            this.tm = tm;
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
            //throw new UnsupportedOperationException();
        }

        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
            throw new UnsupportedOperationException();
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
            this.chain = chain;
            tm.checkServerTrusted(chain, authType);
        }
    }

    public static X509Certificate installCertificate(KeyStore ks, String password, String host, int portnum) throws Exception {
        try {
            AppLogger.debug("START :: Starting  of  installCertificate method");
            char[] passphrase = password.equals("") ? "changeit".toCharArray() : password.toCharArray();
            int port = portnum == -1 ? 443 : portnum;
            SSLContext context = SSLContext.getInstance("SSL");
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ks);
            X509TrustManager defaultTrustManager = (X509TrustManager) tmf.getTrustManagers()[0];
            TrustManagerImpl tm = new TrustManagerImpl(defaultTrustManager);
            context.init(null, new TrustManager[]{tm}, null);
            SSLSocketFactory factory = context.getSocketFactory();
            SSLSocket socket = (SSLSocket) factory.createSocket(host, port);
            socket.setSoTimeout(10000);
            X509Certificate cert;
            AppLogger.debug("START :: Starting of installCertificate method");
            AppLogger.debug("KeyStore :: " + ks + " :: Password :: " + password + " :: Host :: " + host + " :: Port number :: " + portnum );
            try {
                socket.startHandshake();
            } catch (SSLException e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                AppLogger.error("Certificate is not trusted :: " + sw.toString());
            } finally {
                socket.close();
            }
            X509Certificate[] chain = tm.chain;
            if (chain == null) {
                AppLogger.debug("Could not obtain server certificate chain");
                return null;
            }
            cert = chain[0];
            String alias = host + "_" + 1;
            ks.setCertificateEntry(alias, cert);
            char SEP = java.io.File.separatorChar;
            String path = System.getProperty("java.home") + SEP + "lib" + SEP + "security" + SEP + "cacerts";
            File f = new File(path);
            OutputStream out = new FileOutputStream(f);
            ks.store(out, passphrase);
            AppLogger.debug(":: ceritificate installed successfully ::");
            out.close();
            AppLogger.debug("END :: Ending of installCertificate method");
            return cert;
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("" + sw.toString());
            return null;
        }
    }

    public JSONObject invokeService(JSONObject request) {
        prInfo("START :invokeService");        
       return invokeSecureService(request);
    }
    public JSONObject invokeService_old(JSONObject request) {
        prInfo("START :invokeService");
        JSONObject response = new JSONObject();
        prDebug("Request :" + request);
        int status = -1;
        String msg = "";
        try {

            String url = CRSAppResources.PYMT_URL;
            String input = "";
            String filename = WPContextListener.confgFilesPath + "payment.xml";
            prDebug("filename is ::" + filename);
            prDebug("url is ::" + url);

            input = FileUtils.readFileToString(new File(filename), "UTF-8");
            Iterator itrParams = request.keys();
            while (itrParams.hasNext()) {
                String key = (String) itrParams.next();
                input = input.replace("$$" + key + "$$", request.getString(key));
            }
            prDebug("input :" + input);
            URL url_webservice = new URL(url);
            HttpClient client = new DefaultHttpClient();
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                prInfo("****https***");
                int portnum = url_webservice.getPort();
                prInfo("portnum :" + portnum);
                portnum = portnum == -1 ? 443 : portnum;
                MyHttpClient httpclient1 = new MyHttpClient(portnum);
                client = httpclient1;
            }
            /*HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "text/xml");
            con.setConnectTimeout(3 * 1000);
            con.setReadTimeout(3 * 1000);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(input);
            wr.flush();
            wr.close();*/
            HttpPost postRequest = new HttpPost(url);
            postRequest.addHeader("Content-Type", "text/xml");
            prInfo("---set content type");
            StringEntity userEntity = new StringEntity(input);
            postRequest.setEntity(userEntity);
            HttpResponse httpresponse = client.execute(postRequest);
            int responseCode = -1;
            StringBuffer service_response = new StringBuffer();
            BufferedReader breader = null;
            if (httpresponse != null) {
                prInfo("Response code is : " + httpresponse.getStatusLine().getStatusCode());
                String inputLine;
                responseCode = httpresponse.getStatusLine().getStatusCode();
                if (responseCode == 200) {
                    breader = new BufferedReader(new InputStreamReader((httpresponse.getEntity().getContent())));
                    while ((inputLine = breader.readLine()) != null) {
                        service_response.append(inputLine);
                    }
                }
            }
            if (breader != null) {
                breader.close();
            }

            /*int responseCode = con.getResponseCode();
            prDebug("Response Code : " + responseCode);
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer service_response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                service_response.append(inputLine);
            }
            in.close();*/
            prDebug("Res from service :" + responseCode);
            if (responseCode == 200) {
                status = 0;
                msg = "Success";
                response.put("RESPONSE", service_response.toString());
            } else {
                status = -1;
                msg = "Error response from end service";
            }

        } catch (Exception e) {
            prErr("Error in [invokeService] :", e);
            msg = e.getMessage();
        } finally {
            response.put("STATUS", status);
            response.put("MESSAGE", msg);
            prInfo("Res from [invokeService] :" + response);
            prInfo("END :invokeService");
            return response;
        }

    }

    public JSONObject invokeSecureService(JSONObject request) {
        prInfo("START :invokeService");
        JSONObject response = new JSONObject();
        prDebug("Request :" + request);
        int status = -1;
        String msg = "";
        InputStream in = null;
        PrintStream out = null;
        try {            
            String pymturl = CRSAppResources.PYMT_URL;
            String input = "";
            String filename = WPContextListener.confgFilesPath + "payment.xml";
            prDebug("filename is ::" + filename);
            prDebug("url is ::" + pymturl);

            input = FileUtils.readFileToString(new File(filename), "UTF-8");
            Iterator itrParams = request.keys();
            while (itrParams.hasNext()) {
                String key = (String) itrParams.next();
                input = input.replace("$$" + key + "$$", request.getString(key));
            }
            prDebug("input :" + input);
            String tempURL = pymturl;
            boolean SSLExcepOccurFlag = false;
            tempURL = tempURL.substring(tempURL.indexOf("//") + 2, tempURL.length());
            tempURL = tempURL.substring(0, tempURL.indexOf("/"));
            String IpPort[] = tempURL.split(":");
            String ip = IpPort[0];
            ip = ip.replaceAll(Pattern.quote("."), "_");
            //String port = IpPort[1];
            String certFileName = "bsnl_wings";
            //String certFileName = ip + "_" + port;
            char SEP = java.io.File.separatorChar;
            String path = System.getProperty("java.home") + SEP + "lib" + SEP + "security" + SEP + "Wings" + SEP + certFileName;
            prInfo("path :" + path);
            File f = new File(path);
            prDebug("Setting javax.net.ssl.trustStrore path for Server ... " + f.getAbsolutePath() );
            System.setProperty("javax.net.debug", "all"); 
            System.setProperty("javax.net.ssl.trustStrore", f.getAbsolutePath());
            System.setProperty("javax.net.ssl.keyStorePassword", "changeit");
            System.setProperty("javax.net.ssl.trustStorePassword", "changeit");
            System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
            URL url = new URL(pymturl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "text/xml");
            connection.setConnectTimeout(3 * 1000);
            connection.setReadTimeout(3 * 1000);            
            try {
                out = new PrintStream(connection.getOutputStream());
            } catch (Exception ssloccur) {
                prInfo("SSL Exception:: Downloading certificates from the host.... ");
                prErr("SSL Exception :", ssloccur);
                SSLExcepOccurFlag = true;
            }
            prInfo("SSLExcepOccurFlag:" + SSLExcepOccurFlag);
            if (SSLExcepOccurFlag) {
                path = System.getProperty("java.home") + SEP + "lib" + SEP + "security" + SEP + "cacerts";
                f = new File(path);
                in = new FileInputStream(f);
                KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
                ks.load(in, "changeit".toCharArray());
                in.close();
                final X509Certificate cert;
                if (!ks.containsAlias(url.getHost() + "_1") || !ks.isCertificateEntry(url.getHost() + "_1")) {
                    /**
                     * Get the certificate from the server and install
                     */
                    prInfo("Certificates instalation started.... ");
                    cert = installCertificate(ks, "changeit", url.getHost(), url.getPort());
                } else {
                    prInfo("Certification already trusted.... ");
                    cert = (X509Certificate) ks.getCertificate(url.getHost() + "_1");
                }
                SSLContext context = SSLContext.getInstance("TLS");
                //SSLContext context = SSLContext.getInstance("SSL");
                TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
                tmf.init(ks);
                context.init(null, new TrustManager[]{new TrustManagerImpl((X509TrustManager) tmf.getTrustManagers()[0])}, null);
                SSLSocketFactory factory = context.getSocketFactory();
                HttpsURLConnection.setDefaultSSLSocketFactory(factory);
                HttpsURLConnection.setDefaultHostnameVerifier(new javax.net.ssl.HostnameVerifier() {

                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        if (this.getCNS(cert).contains(hostname)) {
                            return true;
                        } else if (hostname.equalsIgnoreCase(session.getPeerHost()) || hostname.equalsIgnoreCase("localhost")) {
                            return true;
                        }
                        return false;
                    }

                    /**
                     * @param cert the X509Certificate for which you want to get
                     * CNS
                     * @return ArrayList<String> of All the CNS from the cert
                     */
                    private ArrayList<String> getCNS(X509Certificate cert) {
                        ArrayList<String> cnList = new ArrayList();
                        String subjectPrincipal = cert.getSubjectX500Principal().toString();
                        prInfo("subjectPrincipal :" + subjectPrincipal);
                        subjectPrincipal = subjectPrincipal + cert.getSubjectDN().toString();
                        StringTokenizer st = new StringTokenizer(subjectPrincipal, ",");
                        while (st.hasMoreTokens()) {
                            String tok = st.nextToken();
                            int x = tok.indexOf("CN=");
                            int y = tok.indexOf("Issuer:");
                            if (x >= 0) {
                                cnList.add(tok.substring(x + 3));
                            } else if (y >= 0) {
                                cnList.add(tok.substring(y + 7));
                            }
                        }
                        if (!cnList.isEmpty()) {
                            return cnList;
                        } else {
                            return cnList;
                        }
                    }
                });
                prInfo("Certificates instalation Successfully.... ");
                connection.disconnect();
                connection = (HttpsURLConnection) url.openConnection();
                connection.setDoOutput(true);                 
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "text/xml");
                connection.setConnectTimeout(3 * 1000);
                connection.setReadTimeout(3 * 1000);
                out = new PrintStream(connection.getOutputStream());
            }
            out.print(input);
            out.flush();
            in = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(in));
            String line = "";
            StringBuffer service_response = new StringBuffer();
            while ((line = rd.readLine()) != null) {
                service_response = service_response.append(line);
            }
            prInfo("service_response :" + service_response.toString());            
            if ("SUCCESS".equalsIgnoreCase(service_response.toString())) {
                status = 0;
                msg = "Success";
                response.put("RESPONSE", service_response.toString());
            } else {
                status = -1;
                msg = "Error response from end service";
            }
            if (connection != null) {
                connection.disconnect();
            }            
        } catch (Exception e) {
            prErr("Error in [invokeService] :", e);

        } finally {
            response.put("STATUS", status);
            response.put("MESSAGE", msg);
            prInfo("Res from [invokeService] :" + response);
            prInfo("END :invokeService");
            return response;
        }

    }

    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }
}
