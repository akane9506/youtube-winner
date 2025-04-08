class Comment {
  public createdAt: number;
  public textDisplay: string;
  public autherDisplayName: string;
  public autherProfileImageUrl: string;
  public autherChannelUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    // parse the createdAt date to the number timestamp
    this.createdAt = new Date(data.snippet.topLevelComment.snippet.publishedAt).getTime();
    this.textDisplay = data.snippet.topLevelComment.snippet.textDisplay;
    this.autherDisplayName = data.snippet.topLevelComment.snippet.authorDisplayName;
    this.autherProfileImageUrl =
      data.snippet.topLevelComment.snippet.authorProfileImageUrl;
    this.autherChannelUrl = data.snippet.topLevelComment.snippet.authorChannelUrl;
  }
}

class VideoInfo {
  public title: string;
  public description: string;
  public publishedAt: string;
  public imageUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.title = data.items[0].snippet.title;
    this.description = data.items[0].snippet.description;
    this.publishedAt = data.items[0].snippet.publishedAt;
    this.imageUrl = data.items[0].snippet.thumbnails.medium.url;
  }
}

export { Comment, VideoInfo };
