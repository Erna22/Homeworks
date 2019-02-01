
// ZADATAK 1

//const htmlString =
//    "<article>"+
//    "<b>London</b>"+
//    "<p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>"+
//    "<p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>"+
//    "<b>dddd</b>"+
//    "<h1>dddd</h1>"+
//    "</article>";
//
//
//function getTagContent(string,tagName){
//
//    var regExp = '<' + tagName + '>(.*?)' + '<\\/' + tagName +'>';
//
//    var regRemoveTag = '<\\/?' + tagName +'>';
//
//    var result = string.match(new RegExp(regExp,"g"));
//
//    if(result){
//        result.map(function(val) {
//            console.log(val.replace(new RegExp(regRemoveTag, "g"), ''));
//            //return val.replace(new RegExp(regRemoveTag, "g"), '');
//        });
//
//    }
//    else {
//        console.log(new Array);
//        //return [];
//    }
//}
//
//getTagContent(htmlString, 'h5');


// ZADATAK 2

//let str1 = domainName("http://github.com/carbonfive/raygun"); // => "github"
//let str2 = domainName("http://www.zombie-bites.com"); //=> "zombie-bites"
//let str3 = domainName("https://www.cnet.com"); //=>"cnet"
//
//function domainName(link){
//
//    let matches = link.split('/');
//    let fullDomainName = (matches[2]);
//    let checkIndex = fullDomainName.indexOf("www");
//
//    if(checkIndex !== -1){
//        fullDomainName = fullDomainName.substring(4);
//    }
//    let index = fullDomainName.indexOf(".");
//    if (index > 0)
//        fullDomainName = fullDomainName.substring(0, index);
//
//    console.log(fullDomainName);
//
//}


