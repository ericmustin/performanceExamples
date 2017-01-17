# performanceExamples
##A few examples of different ways to improve web performance

  These are a couple basic examples of methods to improve web performance and response times for a single page web application.

  The basic implementations use node, expressjs, and jquery

1. Using redis to cache expensive database queries and operations(like an api call)

  * from [expressjs.com/en/advanced/best-practice-performance.html](https://expressjs.com/en/advanced/best-practice-performance.html)

   Since the app instances run as separate processes, they do not share the same memory space. That is, objects are local to each instance of the app. Therefore, you cannot maintain state in the application code. However, you can use an in-memory datastore like Redis to store session-related data and state. This caveat applies to essentially all forms of horizontal scaling, whether clustering with multiple processes or multiple physical servers.

2. setting http response cache-headers on static assets for browser caching

  * from [developers.google.com](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

   Fetching something over the network is both slow and expensive. Large responses require many roundtrips between the client and server, which delays when they are available and when the browser can process them, and also incurs data costs for the visitor. As a result, the ability to cache and reuse previously fetched resources is a critical aspect of optimizing for performance.

   The good news is that every browser ships with an implementation of an HTTP cache. All you need to do is ensure that each server response provides the correct HTTP header directives to instruct the browser on when and for how long the browser can cache the response.

3. css media querys for image resizing

  *from [developers.google.com](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)

   As a result, one of the simplest and most effective image optimization techniques is to ensure that we are not shipping any more pixels than needed to display the asset at its intended size in the browser. Sounds simple, right? Unfortunately, most pages fail this test for many of their image assets: typically, they ship larger assets and rely on the browser to rescale them - which also consumes extra CPU resources - and display them at a lower resolution.

4. using localstorage to maintain information between sessions

  * from [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

   The Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using cookies.

   localStorage maintains a separate storage area for each given origin that's available even when the browser is closed and reopened.


