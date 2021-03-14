import { element, browser, by } from 'protractor';

export class TrendingPage{
    getAllTrendingVideos(){
        let list = element.all(by.css('.style-scope ytd-section-list-renderer'));
        let trending= list.all(by.css('.style-scope ytd-expanded-shelf-contents-renderer')).get(0);
        let videos = trending.all(by.tagName('ytd-video-renderer'));
        return videos;
    }
    getVideoNumberOfViews(i){
        return element.all(by.xpath('//*[@id="metadata-line"]/span[1]')).get(i); 
    }   

    getVideoName(i){
        return element.all(by.xpath('//*[@id="video-title"]/yt-formatted-string')).get(i);
    }

    getVideoID(i){
        return element.all(by.xpath('//*[@id="video-title"]')).get(i);      
    }

/*     getVideoTime(i){
        return element.all(by.xpath('//*[@id="overlays"]/ytd-thumbnail-overlay-time-status-renderer/span')).get(i);
    } */
    getVideoTime(i){  
        return element(by.xpath('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-shelf-renderer/div[1]/div[2]/ytd-expanded-shelf-contents-renderer/div/ytd-video-renderer['+(i)+']/div[1]/ytd-thumbnail/a/div[1]/ytd-thumbnail-overlay-time-status-renderer/span'));
       }
    
}
