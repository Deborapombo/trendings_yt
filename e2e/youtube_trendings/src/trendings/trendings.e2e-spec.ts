import { browser, ExpectedConditions } from 'protractor';
import { MainPage } from '../../page-objects/youtube-main-page/youtubeMain.po';
import { TrendingPage } from '../../page-objects/trending-page/trendingPage.po';

describe('Youtube Trending Videos', function() {
    let mainPage: MainPage;
    let trendingPage: TrendingPage;
    let EC = ExpectedConditions;
    let timeout = 1000;
    let totalNumberOfViewsTrending;

    beforeAll(() => {
      mainPage = new MainPage();
      trendingPage = new TrendingPage();
      browser.waitForAngularEnabled(false);
      browser.get('/');
    });

    it('Youtube main page is displayed', async ()=> {
      browser.sleep(timeout);
      browser.wait(EC.presenceOf(mainPage.getDismissButton()), timeout*2, '1 - Dismiss Session Button taking too long to appear in the DOM');
      mainPage.getDismissButton().click();
      browser.sleep(timeout);
      browser.switchTo().frame(mainPage.getInitialIframe().getWebElement());
      browser.sleep(timeout);
      mainPage.getAgreeCookiesButton().click();
      browser.sleep(timeout);
      browser.switchTo().defaultContent();
    });

    it('Go to Trending Page', async ()=> {
      browser.wait(EC.presenceOf(mainPage.getTrendingButton()), timeout*2, '2 - Trending Button taking too long to appear in the DOM');
      mainPage.getTrendingButton().click();
      browser.sleep(timeout*3);
    });

    it('Verify there are 50 Videos on Top', async ()=> {
      let count = await trendingPage.getAllTrendingVideos().count();
      expect(count).toBe(50);
      browser.sleep(timeout);
    });

    it('Find 5 most viewed videos and display result', async ()=> {
      var listNrOfViews :number[] = new Array(50);
      var listName: String [] = new Array(50);
      var listID: String[] = new Array(50);

      var listTopNrOfViews :number[] = new Array(5);
      var listTopName: String [] = new Array(5);
      var listTopID: String[] = new Array(5);

      totalNumberOfViewsTrending = 0;

      for (let i = 0; i<50; i++){
        await trendingPage.getVideoName(i).getText().then(function async(text) {
          listName[i] = text;
        }); 
        await trendingPage.getVideoNumberOfViews(i+32).getText().then(function async(text) {
          var nrOfViews = text;
          let videoNrOfViews;
          var lenght_nrOfViews = nrOfViews.length;
          var nrOfViews_final = nrOfViews.substring(0, lenght_nrOfViews-7);

          if (nrOfViews.includes('K')){
              videoNrOfViews = Number(nrOfViews_final)*1000;
          }
          else if(text.includes('M')){
              videoNrOfViews = Number(nrOfViews_final)*1000000;
          } 
          listNrOfViews[i] = videoNrOfViews;
          totalNumberOfViewsTrending += videoNrOfViews; 
         });   
        await trendingPage.getVideoID(i+32).getAttribute('href').then(function async(id) {
          var id_string = String(id);
          var id = id_string.substring(32, 43);
          listID[i] = id;
        });}
        console.log('5 most viewed videos: ');
        for (let top = 0; top < 5; top ++){
          console.log('---------------------------');  
          console.log('Number: '+ (top+1));
          var maxView = Math.max(...listNrOfViews);
          var index = listNrOfViews.indexOf(maxView);
          listNrOfViews[index] = 0;
          listTopNrOfViews[top] = maxView;
          console.log('Number of views: '+ listTopNrOfViews[top]);
          listTopName[top] = listName[index];
          console.log('Name of Video: '+ listTopName[top]);
          listTopID[top] = listID[index];
          console.log('Video ID: '+ listTopID[top]);
      }
    });

    it('Display total number of views of 50 most Trending Videos', async () =>{
      console.log('Total number of views of 50 Trending videos: ');
      console.log(totalNumberOfViewsTrending);
    });
});