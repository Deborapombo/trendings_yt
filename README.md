# Youtube Trending Videos

The scope of this project is to test the Trending page of Youtube using the protractor framework. 

## Installation
To run the tests, you will need to have Node.js installed:

### Install Node.js on Mac OS
Make sure you have homebrew on your Mac OS (a package manager for Mac OS) and run:
```
brew install node

```
### Install Node.js on Linux
```
sudo apt install nodejs

```
### Install Node.js on Windows

Download Node.js Installer from: https://nodejs.org/en/download/

## Setup
To run the project some dependencies are needed, to install them you need to run: 

```
npm install --global package.json
```

Also you will need to install a selenium server and browser driver manager, to install them you need to run:

```
node node_modules/protractor/bin/webdriver-manager update
```

## Run the tests
To run the tests you just need to run one of the following commands inside automation-youtube-trending folder:

### Run the tests opening the browser
```
npm run protractor-youtube-trending
```

## Test Suites

The project is covering 1 test suite, with 5 test cases :

- Youtube Trending Page
    ✓ Go to Youtube page  
    ✓ Open Trending Videos
    ✓ Verify there are exactly 50 videos in Top section 
    ✓ Find the most 5 viewed videos 
    ✓ Display total number of visualizations for the 50 videos in Top section 
   
## Reports
In this project you will have 2 ways to check the test results: 

1. A Report is displayed in the console where you run the tests. 
   The output will show the Test Suite name and the Test cases (specs) names. In case of failure will show where is the failure.

2. Also a HTML report will be generated and stored on _reports folder. There screenshots of each spec will be available. 

## Fix for error 199 lauching the webdriver - Chromedriver version not compatible
npm install -f protractor

## Fix for error 135 lauching the webdriver
node node_modules/protractor/bin/webdriver-manager update

## Fix TSError: ⨯ Unable to compile TypeScript: TS2593: Cannot find name 'describe'
npm install --save-dev @types/jasmine
