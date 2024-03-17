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

    > [!NOTE] In case REST APIs are new to you, it might also be useful to read up on those too. We will only be making use of GET request endpoints in this assignment; however.
    
    - Specifically of interest to us for this assignment are the [List Users](https://docs.github.com/en/rest?apiVersion=2022-11-28) and [Get a User](https://docs.github.com/en/rest?apiVersion=2022-11-28) endpoints.

## Preliminaries

At this point, this should be your first (in DevCamp, if not in your entire programming life) experience with SvelteKit. 

Upon locally cloning this repository, please execute

```
npm install
```
Inside the repository's directory in order to install the SvelteKit framework.

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
