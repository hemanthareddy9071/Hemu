function sessionCheck(data) {
    var responseObj = JSON.parse(JSON.stringify(data));
    var message = responseObj.response.message;
    if (message == 'InvalidSession') {
        parent.document.location.href = "InvalidSession.do";
    }

    var responseBrowserId = responseObj.response.browserId;
    if (responseBrowserId != '' || responseBrowserId != null) {
        var browserId = parent.fGetBID();
        if (browserId != responseBrowserId) {
            parent.document.location.href = "ErrorPage.do";
        }
    }
}
