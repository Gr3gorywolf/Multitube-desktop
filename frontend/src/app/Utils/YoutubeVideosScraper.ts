import * as cheerio from "cheerio";
import { YoutubeHomeResponse } from '../interfaces/YoutubeHomeResponse';
import { SearchResult, Kind, Thumbnails } from '../interfaces/SearchResult';
import { UrlHelper } from './UrlHelper';
export class YoutubeVideosScraper {


  HtmlContent: string = "";
  $: CheerioStatic = null;
  constructor(content: string) {
    this.HtmlContent = content;
    this.$ = cheerio.load(this.HtmlContent);

  }

  scrapRecommendedPage(): Array<SearchResult> {

    var parsedData: YoutubeHomeResponse;



    for (let data of this.$("script").toArray()) {
      for (let child of data.children) {
        if (child.type == "text") {
          if (child.data.includes(`window["ytInitialData"] =`)) {
            let jsonContent = child.data.split(`window["ytInitialData"] =`)[1].split("}}}}};")[0];
            jsonContent += "}}}}}";
            parsedData = (JSON.parse(jsonContent.trim()) as YoutubeHomeResponse);

          }
        }

      }
    }
    var results: Array<SearchResult> = [];
    console.log(parsedData);
    for (let tab of parsedData.contents.twoColumnBrowseResultsRenderer.tabs) {
      for (var cont of tab.tabRenderer.content.richGridRenderer.contents) {
        if (cont.richItemRenderer !== undefined) {

          var video = cont.richItemRenderer.content.videoRenderer;
          var videoUrl = new UrlHelper().getYoutubeUrlById(video.videoId);
          results.push({
            channelId: "",
            channelTitle: video.ownerText.runs[0].text,
            description: video.descriptionSnippet.runs[0].text,
            id: video.videoId,
            kind: Kind.YoutubeVideo,
            link: videoUrl,
            publishedAt: new Date(),
            title: video.title.runs[0].text,
            thumbnails: null
          } as SearchResult)

        }
      }
    }
    console.log(results);
    return results;


  }
}



