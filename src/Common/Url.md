
The Url facility provides an API that can help you deal with urls.

```js


var Url = require("divhide").Url;

var url = new Url("http://divhide.com/about?t=1");

url.isAbsolute();       // return true
url.baseUrl();          // return "http://divhide.com/"
url.protocol();         // return "http"
url.path();             // return "about"
url.filename();         // return "about"
url.setPath("/");       // sets the url to "http://divhide.com?t=1"
url.toString();         // return "http://divhide.com/about?t=1"

```
