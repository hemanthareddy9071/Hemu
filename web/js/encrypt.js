function encrypt(param)
{
    var Param1=param;
    
    var key="1COLD5";
    var dest2="";
    var len=key.length;
    var SrcAsc=-1, KeyPos=-1;
    var offset=((Math.random()*10000)%255)+1;
    dest2=decimalToHex(offset,2);
    var myarr=dest2.toString().split(".");
    var dest=myarr[0];
    if(dest.length==1)
        dest="0"+dest;
    //dest="4e";
    //offset=78;
    for(var SrcPos=0;SrcPos<Param1.length;SrcPos++)
    {
        var ascii=(Param1.substring(SrcPos,SrcPos+1)).charAt(0);
        ascii=ascii_value(ascii);
        SrcAsc=parseInt((ascii+offset)%255);

        if (KeyPos<len-1)
            KeyPos++;
        else KeyPos=0;

        ascii=(key.substring(KeyPos,KeyPos+1)).charAt(0);
        ascii=ascii_value(ascii);
        SrcAsc=SrcAsc^ascii;

        if(SrcAsc<=15)
        {
            dest2=decimalToHex(SrcAsc,2);
            myarr=dest2.toString().split(".");
            dest=dest+myarr[0];
        }
        else
        {
            dest2=decimalToHex(SrcAsc,2);
            myarr=dest2.toString().split(".");
            dest=dest+myarr[0];
        }
        offset=SrcAsc;
    }
    //alert(dest);
    dest=dest.toUpperCase();
    //alert(dest);
    return dest;
}
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }
    return hex;
}
function ascii_value (c)
{
    // restrict input to a single character
    c = c . charAt (0);

    // loop through all possible ASCII values
    var i;
    for (i = 0; i < 256; ++ i)
    {
        // convert i into a 2-digit hex string
        var h = i . toString (16);
        if (h . length == 1)
            h = "0" + h;

        // insert a % character into the string
        h = "%" + h;

        // determine the character represented by the escape code
        h = unescape (h);

        // if the characters match, we've found the ASCII value
        if (h == c)
            break;
    }
    return i;
}