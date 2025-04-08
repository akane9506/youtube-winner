import { Comment, VideoInfo } from "@/models";

const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

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
    const parsedComments: Comment[] = data.items.map((item: any) => new Comment(item));
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

export const getVideoInfo = async (videoId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${youtubeKey}&part=snippet&id=${videoId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `YouTube API Error: ${errorData.error?.message || response.statusText}`
      );
    }
    const data = await response.json();
    const videoInfo = new VideoInfo(data);
    return videoInfo;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch video info: Unknown error");
  }
};
