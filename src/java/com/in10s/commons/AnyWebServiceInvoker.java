/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;


//import com.in10s.commons.CRSAuthenticate;
//import com.in10s.resource.util.RMTextParser;
import com.in10s.logger.AppLogger;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.StringTokenizer;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.w3c.dom.Document;

/**
 * This class is used to Invoke <b>any webservice</b> whether it is <b>REST</b>
 * or <b>SOAP</b> whether the URL protocol is <b>http</b> or <b>https</b>
 *
 * @author prashanth.a
 */
public class AnyWebServiceInvoker {

    /**
     * @param inJosn JSONObject which contains the stored ReportId of the
     * webserver
     * @return JSONObject which contains the result from the server
     */
    public static JSONObject invokService(JSONObject inJson) {
        JSONObject result = new JSONObject();
        // Session session = HibernateUtil.getSession();
        try {
             AppLogger.debug("::: inside invokService :: " + inJson);
             if(inJson.optBoolean("isCYMNRequest",false) == false){
                decryptAadharData(inJson.getJSONObject("Params"));
             }
            //  String serviceId = inJson.getString("ReportId");
           
            JSONObject params = new JSONObject();
            if (inJson.containsKey("Params")) {
                params = inJson.getJSONObject("Params");
            }
            String request = null;
            String contentType = null;
            String requestType = null;
            String col_list = null;
            String xquery = null;
            String serviceURL = null;
            String soapAction = null;

            JSONObject recordForCache = inJson;
            contentType = recordForCache.containsKey("contentType") ? recordForCache.getString("contentType") : null;
            serviceURL = recordForCache.containsKey("serviceURL") ? recordForCache.getString("serviceURL") : null;
            requestType = recordForCache.containsKey("requestType") ? recordForCache.getString("requestType") : null;
            col_list = recordForCache.containsKey("col_list") ? recordForCache.getString("col_list") : null;
            xquery = recordForCache.containsKey("xquery") ? recordForCache.getString("xquery") : null;
            if (inJson.containsKey("isFile")) {
                request = FileUtils.readFileToString(new File(recordForCache.getString("requestFilePath")));
                JSONObject newParams = (JSONObject) JSONSerializer.toJSON(inJson);
                escapeXml(newParams);
              //   AppLogger.debug(request);

            } else if (inJson.containsKey("isFileAsString")) {
                request =recordForCache.containsKey("request") ? recordForCache.getString("request"):"";
                JSONObject newParams = (JSONObject) JSONSerializer.toJSON(inJson);
                escapeXml(newParams);
            }

            if (request != null) {
                // AppLogger.debug("inside request");
                Iterator itrParams = params.keys();
                while (itrParams.hasNext()) {
                    // AppLogger.debug(":: key found ::");
                    String key = (String) itrParams.next();
                    // AppLogger.debug("::: key is :: " + key);
                    request = request.replace("$$" + key + "$$", params.getString(key));
                }
            }

            //AppLogger.debug(":: BEFORE ::request :: " + request);
            //request = RMTextParser.parseText(request,(JSONObject)  JSONSerializer.toJSON(inJson));
            //AppLogger.debug(":: AFTER ::request :: " + request);

             AppLogger.debug(":: SERVICE_URL :: " + serviceURL);
            String uname = null;
            String pwd = null;
            if (serviceURL != null && serviceURL.contains("`")) {
                try {
                    String[] tk = serviceURL.split("`");
                    serviceURL = tk[0];
                    uname = tk[1];
                    pwd = tk[2];
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }           
             AppLogger.debug(":: content_type :: " + contentType);
             AppLogger.debug(":: REQUEST_TYPE :: " + requestType);
             AppLogger.debug(":: uname :: " + uname);
             AppLogger.debug(":: pwd :: " + pwd);
            if (serviceURL.contains("?wsdl") || serviceURL.contains("?WSDL")) {
                soapAction = serviceURL.substring(serviceURL.lastIndexOf("/") + 1, serviceURL.lastIndexOf("?"));
            }
	    soapAction = inJson.containsKey("SOAP_ACTION") ? inJson.getString("SOAP_ACTION") : soapAction;
            AppLogger.debug("::: soap action :: " + soapAction);
            URL url = new URL(serviceURL);
            if (url.getProtocol().equalsIgnoreCase("https")) {
                File file = new File("jssecacerts");
                if (file.isFile() == false) {
                    char SEP = File.separatorChar;
                    File dir = new File(System.getProperty("java.home") + SEP + "lib" + SEP + "security");

                    file = new File(dir, "jssecacerts");
                     AppLogger.debug(":: " + file.getAbsolutePath());
                    if (file.isFile() == false) {
                        file = new File(dir, "cacerts");
                    }
                }
                InputStream in = new FileInputStream(file);
                KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
                ks.load(in, "changeit".toCharArray());
                in.close();
                final X509Certificate cert;

                if (!ks.containsAlias(url.getHost() + "_1") || !ks.isCertificateEntry(url.getHost() + "_1")) {
                    /**
                     * Get the certificate from the server and install
                     */
                     AppLogger.debug("::: cert not found in keystore install it :::");
                    cert = installCertificate(ks, "changeit", url.getHost(), url.getPort());
                } else {
                     AppLogger.debug("::: cert already trusted :::");
                    cert = (X509Certificate) ks.getCertificate(url.getHost() + "_1");
                }

                SSLContext context = SSLContext.getInstance("SSL");
                TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
                tmf.init(ks);
                context.init(null, new TrustManager[]{new TrustManagerImpl((X509TrustManager) tmf.getTrustManagers()[0])}, null);
                SSLSocketFactory factory = context.getSocketFactory();
                //setting DefaultSSLSocketFactory to our own factory
                HttpsURLConnection.setDefaultSSLSocketFactory(factory);
                //Java by default verifies that the certificate CN (Common Name) is the same as host name in the URL
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
                        StringTokenizer st = new StringTokenizer(subjectPrincipal, ",");
                        while (st.hasMoreTokens()) {
                            String tok = st.nextToken();
                            int x = tok.indexOf("CN=");
                            if (x >= 0) {
                                cnList.add(tok.substring(x + 3));
                            }
                        }
                        if (!cnList.isEmpty()) {
                            return cnList;
                        } else {
                            return null;
                        }
                    }
                });
            }

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            if (uname != null && pwd != null) {
                pwd = new CRSAuthenticate().Decrypt(pwd);
                 AppLogger.debug(":::::::::: pwd " + pwd);
                String authorization = new sun.misc.BASE64Encoder().encode((uname + ":" + pwd).getBytes());
                connection.setRequestProperty("Authorization", "Basic " + authorization);
            }
            if (contentType.equalsIgnoreCase("xml")) {
                connection.setRequestProperty("Content-type", "text/xml;charset=UTF-8");
                //connection.setRequestProperty("Accept-Encoding", "gzip,deflate");
            } else if (contentType.equalsIgnoreCase("json")) {
                connection.setRequestProperty("Content-type", "application/json; charset=utf-8");
            } else if (contentType.equalsIgnoreCase("html")) {
                connection.setRequestProperty("Content-type", "text/html; charset=utf-8");
            } else if (contentType.equalsIgnoreCase("stream")) {
                connection.setRequestProperty("Content-type", "application/octet-stream; charset=utf-8");
            } else if (contentType.equalsIgnoreCase("plain")) {
                connection.setRequestProperty("Content-type", "text/plain; charset=utf-8");
            }
            connection.setDoOutput(true);
            if (requestType.equalsIgnoreCase("post")) {
                 AppLogger.debug("post::" + request.getBytes().toString());
                if (request != null) {
                    connection.setRequestProperty("Content-Length", Integer.toString(request.getBytes().length));                    
                }
                connection.setUseCaches(false);
            }            
            connection.setRequestMethod(requestType.toUpperCase());            
            if (soapAction != null) {
                
                if(inJson.optBoolean("isCYMNRequest",false) == false)
                    connection.setRequestProperty("SOAPAction", "/" + soapAction);
                else
                    connection.setRequestProperty("SOAPAction", soapAction);                    
            } else {
                connection.setRequestProperty("SOAPAction", serviceURL);                
            }            
            connection.setConnectTimeout(10 * 1000);
            AppLogger.debug("Connection timeout : "+  connection.getConnectTimeout());
            connection.setReadTimeout(10 * 1000);
            AppLogger.debug("********Other : " +  connection.getReadTimeout());
            
            
            if (request != null) {
                OutputStream out = connection.getOutputStream();
                AppLogger.debug("********After out");
                Writer wout = new OutputStreamWriter(out);
                wout.write(request);
                wout.flush();
                wout.close();
            }
            BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            AppLogger.debug("********Before disconnect");
            connection.disconnect();
            String res = new String(sb);
            res = res.replaceAll("&lt;", "<");
            res = res.replaceAll("&gt;", ">");
            AppLogger.debug("Response from server :: " + res);
            Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(res.getBytes()));
            DOMSource domSource = new DOMSource(doc);
            StringWriter writer = new StringWriter();
            StreamResult result1 = new StreamResult(writer);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            transformer.transform(domSource, result1);
            result.put("status", "success");
            result.put("Data", writer.toString());
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String strErrMsg = sw.toString();
            AppLogger.debug(strErrMsg);
            result.put("status", "fail");
            result.put("Data", " ");
            //e.printStackTrace();
            
        } finally {
//            if (session != null) {
//                try {
//                    session.close();
//                } catch (Exception cause) {
//                    cause.printStackTrace();
//                }
//            }
        }
        //AppLogger.debug("Final response from web service :: " + result);
        return result;
    }

    public static void escapeXml(Object input1) {
        if (input1 instanceof JSONObject) {
            JSONObject input = (JSONObject) input1;
            Iterator<String> itr = input.keys();
            while (itr.hasNext()) {
                String key = itr.next();
                Object value = input.get(key);
                if (value instanceof JSONObject || value instanceof JSONArray) {
                    escapeXml(value);
                } else {
                    input.put(key, StringEscapeUtils.escapeXml(value.toString()));
                }

            }
        } else if (input1 instanceof JSONArray) {
            JSONArray input = (JSONArray) input1;
            for (int i = 0; i < input.size(); i++) {
                Object value = input.get(i);
                if (value instanceof JSONObject || value instanceof JSONArray) {
                    escapeXml(value);
                } else {
                    input.set(i, StringEscapeUtils.escapeXml(value.toString()));
                }
            }
        }
    }

    /**
     *
     * @param ks KeyStore where the certificate to add
     * @param password KeyStore password
     * @param host Hostname
     * @param portnum Port number
     * @return installed Certificate
     * @throws java.lang.Exception
     */
    public static X509Certificate installCertificate(KeyStore ks, String password, String host, int portnum) throws Exception {
        try {
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
            try {
                socket.startHandshake();
                socket.close();
            } catch (SSLException e) {
                 AppLogger.debug(":: certificate is not trusted :: ");
            }
            X509Certificate[] chain = tm.chain;
            if (chain == null) {
                 AppLogger.debug("Could not obtain server certificate chain");
                return null;
            }
            cert = chain[0];
            String alias = host + "_" + 1;
            ks.setCertificateEntry(alias, cert);
            OutputStream out = new FileOutputStream("jssecacerts");
            ks.store(out, passphrase);
             AppLogger.debug(":: ceritificate installed successfully ::");
            out.close();
            return cert;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    /**
     * Our own trust manager which implements X509TrustManager
     */
    private static class TrustManagerImpl implements X509TrustManager {

        private final X509TrustManager tm;
        private X509Certificate[] chain;

        TrustManagerImpl(X509TrustManager tm) {
            this.tm = tm;
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            throw new UnsupportedOperationException();
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

    public static  JSONObject decryptAadharData(JSONObject inJson){
        AppLogger.info("[AnyWebServiceInvoker] [decryptAadharData] [START]");
//        CRSAuthenticate objAuthenticate = new CRSAuthenticate();
//        inJson.put("poa_number", objAuthenticate.Decrypt(inJson.getString("poa_number")));
//        inJson.put("aadhar_no", objAuthenticate.Decrypt(inJson.getString("aadhar_no")));
//        inJson.put("poi_number", objAuthenticate.Decrypt(inJson.getString("poi_number")));
        AppLogger.info("[AnyWebServiceInvoker] [decryptAadharData] [END]");
        return inJson;
      }    
}


