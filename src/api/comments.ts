const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

// step 1: get first page video comments, store the number of total results
// step 2: parse and store the comments
// step 3: while curr_comments < total_results, get next page comments

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

export const getComments = async (videoId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${youtubeKey}&part=snippet&videoId=${videoId}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `YouTube API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    // const totalResults = data.pageInfo.totalResults;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedComments = data.items.map((item: any) => new Comment(item));
    let nextPageToken = data.nextPageToken;
    let queries = 1;
    while (nextPageToken && queries < 500) {
      const nextResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${youtubeKey}&part=snippet&videoId=${videoId}&pageToken=${nextPageToken}`
      );

      if (!nextResponse.ok) {
        const errorData = await response.json();
        throw new Error(
          `YouTube API Error: ${errorData.error?.message || response.statusText}`
        );
      }
      const nextData = await nextResponse.json();
      nextPageToken = nextData.nextPageToken;
      queries += 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nextData.items.forEach((item: any) => {
        parsedComments.push(new Comment(item));
      });
    }
    return parsedComments;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch comments: Unknown error");
  }
};
