# GitHub Users and User Histories

Hello, DevCampers, and welcome to **Assignment 7 + 8** for this iteration of UP CSI's DevCamp!

## Coverage

By this point, you should have finished reading up on Modules 7 + 8 covering the following topics:

```
7 - Welcome to SvelteKit
	
    Routing
		* Pages
		* Layouts
		* Route Parameters
	Shared Modules
		* The $lib alias

8 - Endpoints
	
    Headers and cookies
		* Setting headers
		* Reading and writing cookies
	Forms 
		* The <form> element
		* Named form actions
		* Validation
		* Progressive enhancement
		* Customizing use:enhance
	API Routes
		* GET handlers
		* POST handlers
		* Other handlers
```

It is also advised that, in addition to these topics, you familiarize yourself with these additional topics which will be helpful in this exercise

- [The Javascript `fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [The GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28) (Note that we will be using the public API without authentication)
	- Specifically of interest to us for this assignment are the [List Users](https://docs.github.com/en/rest?apiVersion=2022-11-28) and [Get a User](https://docs.github.com/en/rest?apiVersion=2022-11-28) endpoints.
- TypeScript (a variant of JavaScript that introduces the notion of types), specifially the [type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) feature
	- It should be noted for those unfamiliar with TypeScript, that it is practically like programming with JavaScript. Type aliases (as in declarations with the keyword `type`) were mainly used to solidly define certain types of objects during the development of this project.

> [!TIP]
> In case REST APIs are new to you, it might also be useful to read up on those too. We will only be making use of GET request endpoints in this assignment; however.

## Preliminaries

At this point, this should be your first (in DevCamp, if not in your entire programming life) experience with SvelteKit. 

Upon locally cloning this repository, please execute

```
npm install
```
Inside the repository's directory in order to install the SvelteKit framework.

Then, you'll need to install [Playwright](https://playwright.dev/) using 

```
npx playwright install
```

In order to run your project locally (with your system running as a server and allowing you to access it via browser through a localhost port), run the following command:

```
npm run dev
```

The tests for this assignment are implemented with [Playwright](https://playwright.dev/) and can be run with the following command:

```
npm test
```

## The Assignment

Your assignment, if you choose to accept it, is to complete this simple website that loads and displays GitHub users and keeps track of the users you have previously visited, along with providing you the option to clear this history.

The finished project should look like the GIF demonstration below.

![GIF demonstrating the functionality of the completed assignment](https://github.com/VeeIsForVanana/dcasgt4/assets/95967340/a3c636eb-130c-4c45-955e-336312deb382)

## Specifications

Formally, your finished assignment should accomplish the following:

1. Load and link to **at least 10 GitHub users** on the homepage
2. Be capable of generating **a page for *any* publicly visible GitHub user** consisting of their *username* (as a header) and their *avatar* (as an image) 
3. Keep track of all previously visited users (a *history*, if you will), storing this information as **a comma-delimited string** in a *cookie* (note that repeat visits are repeated in history)
4. Display the history on every user page as a ' >> ' delimited *paragraph*, where every username in the history is a link to the corresponding user page
5. Provide a **button** to clear this history, displayed on all user pages

> [!CAUTION]
> Note that the requirements stated or demonstrated in this README may be incomplete or ambiguous. The tests, as implemented in `tests/test.ts` of this repository will be the final reference for correctness.

You may implement additional features, as long as they do not conflict with the test cases. For reasons detailed below, it is recommended to somehow keep track of your current **Rate Limit**.

## The Rate Limit

It should be noted that the GitHub Public API, like most APIs, is not solely for our consumption. Much less so for unauthenticated users. Thus, there is a [limit to the number of API calls we can perform in a given period of time](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28). 

All API calls such as those we will be using for this assignment, **including the calls that the tests themselves make (~20 per full test run)** are included in this limit. Please budget your calls wisely.

Furthermore, while it is not prohibited to use authentication tokens to take advantage of a higher rate limit (though it should be noted this assignment was made without taking advantage of this), [please be careful with your sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository), *especially when pushing to GitHub*.
