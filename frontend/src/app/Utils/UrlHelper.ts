export class UrlHelper{

  public getThumbnailFromUrl(url:string):string{
    let videoId = url.split("=")[1];
    let _image = "http://i3.ytimg.com/vi/"+videoId+"/mqdefault.jpg";
    return _image;
  }

  public getYoutubeUrlById(videoId:string):string{
     return "https://www.youtube.com/watch?v="+videoId;
  }

}
