
The Assert facility provides an assertion expression builder with some pre-built functions.

**Methods**

* `.required()`
<br />
Set the expected value to be defined

* `.string()`
<br />
Set the expected value to be a string

* `.array()`
<br />
Set the expected value to be an array

* `.object()`
<br />
Set the expected value to be an object

* `.number()`
<br />
Set the expected value to be a number

* `.max(number)`
<br />
Set the expected value to have a specified maximum. In the case of String or Array the context will be the value length. In the case of an object will be the number of keys

* `.min(number)`
<br />
Set the expected value to have a specified minimum. In the case of String or Array the context will be the value length. In the case of an object will be the number of keys

* `.instanceOf(fn)`
<br />
Set the expected value to be an instance of the given function.

* `.regex(value)`
<br />
Set the expected value to pass the regex

* `.isValid(value)`
<br />
Test if the given value is valid within the current assertion

* `.assert(value)`
<br />
Return the given value if valid; otherwise will throw an Exception

**Example**

```js

{%= _.include("Assert/AssertExample.js") %}

```
