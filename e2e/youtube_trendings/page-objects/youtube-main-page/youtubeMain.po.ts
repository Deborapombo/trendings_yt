import { element, by } from 'protractor'; 

export class MainPage{
    getDismissButton(){
        return element(by.xpath('/html/body/ytd-app/ytd-popup-container/paper-dialog/yt-upsell-dialog-renderer/div/div[3]/div[1]/yt-button-renderer/a/paper-button/yt-formatted-string'));
    }
    getInitialIframe(){
        return element(by.id('iframe'));
    }
    getAgreeCookiesButton(){
        return element(by.id('introAgreeButton'));
    }
    getTrendingButton(){
        return element(by.xpath('/html/body/ytd-app/div/tp-yt-app-drawer/div[2]/div/div[2]/div[2]/ytd-guide-renderer/div[1]/ytd-guide-section-renderer[1]/div/ytd-guide-entry-renderer[2]/a'));
     }

}