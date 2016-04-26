# AutoRenter Style Guide - Angular 1

This study guide is based mostly on the following:

+ [Google's JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

In this document, rather than repeating information available in these and other similar resources, or discussing
rules that are automatically enforced by our build process, we will focus on topics where we've had to resolve an ambiguity or disagreement.

The most important thing to remember is to be consistent. As stated in
[Google's JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml):
> If you're editing code, take a few minutes to look at the code around you and determine its style. If they use spaces
> around all their arithmetic operators, you should too. If their comments have little boxes of hash marks around them,
> make your comments have little boxes of hash marks around them too.
> The point of having style guidelines is to have a common vocabulary of coding so people can concentrate on what you're
> saying rather than on how you're saying it. We present global style rules here so people know the vocabulary, but local
> style is also important. If code you add to a file looks drastically different from the existing code around it, it
> throws readers out of their rhythm when they go to read it. Avoid this.

## Managing the `this` pointer

* If you must cache `this` (e.g., for use in a callback), use the variable name `self`. Although convention of using 
`that` is common in the JavaScript community, it's confusing. In all other contexts in the real world, "this" and "that"
are two different things. Let's not confuse the two...

## Naming

### Type naming

* Classes and interfaces are named using ```PascalCase```.
* Other types are named using ```camelCase```.

### File naming

* The file name should match the name of the [primary] type defined in the file.
* For tests, match the naming convention of the test target's file (e.g., FooControllerTest.ts corresponds with the FooController.ts it is testing).

### Other naming

* Variables that are considered constants should be UPPER\_SNAKE\_CASE

``` javascript
var DEFAULT_PORT = 3000;
var port = process.env.PORT || DEFAULT_PORT;
```

* Don't use abbreviations, unless it's a standard, well-established abbreviation.
* Please, unless it's for use in a simple non-nested loop, **no single-character variable names!**
* Do *not* prefix names with an underscore (`_`) unless required.
	* For example, certain third-party functions begin with an underscore, so overrides must also begin with an underscore.

```javascript
// Bad
var v; // a vehicle
var lnbr; // the number of locations
var _location;

// Good
var vehicle;
var locationCount;
var location;
}

```

## Inline comments

These should be rare. The code should be self-documenting. Most inline comments just add noise, as in the following example:

``` typescript
// Bad
clearUser(): void {
    // Log the operation
    this.$log.debug("Clearing user...");
    
    // Remove the current user from local storage
    this.localStorageService.remove(this.USERKEY);
    
    // set the user
    // to null
    this.user = null;
}
```

Where inline comments are necessary:

* Please write using proper sentence structure; i.e., begin with an uppercase letter and end with a period or question mark.
* Use `//`, not `/*...*/`.

## All async operations should return promises... where possible

Asynchronous operations should return promises, where possible (some libraries
use callbacks instead of promises, so promises aren't always possible). Promises make for much
easier result chaining than the callback pyramid.

## npm package versions

We do not require use of fixed format for npm packages versions. However, whenever you change (add/update/remove) one or more dependencies you must regenerate the appropriate `npm-shrinkwrap.json` file.

## Testing

### What to test

* If you change functionality, a test should break. If no test breaks, then the code has inadequate test coverage.
* If you need to fix a bug, prove that it's fixed by adding a test(s).

### Structuring tests

* The nested ```describe``` and ```it``` methods should form a sentence. That sentence should be descriptive enough so
that any developer (or tester, for that matter) should be able to read it and understand what is being tested... without
looking at the code. In the following example, the sentences are
"Token Interceptor isApiRequest returns false if not an api request" and
"Token Interceptor isApiRequest returns true if is an api request":

``` typescript
// Good
describe("TokenInterceptor", () => {

    // Details omitted for clarity...

    describe("isApiRequest", () => {

        it("returns false if not an api request", () => {
        	...
            expect(actualResult).to.be.false;
        });

        it("returns true if is an api request", () => {
        	...
            expect(actualResult).to.be.true;
        });

    });
```

* Try to have only one ```expect``` per test. The description of the test should match the expectation.


