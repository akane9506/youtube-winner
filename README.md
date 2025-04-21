<h1 align="center">YouTube-Winner</h1>
<div align="center">
  [English]
  <a href="./README_CN.md">[中文]</a>
</div>
<br/>
<img src="./public/demo.gif">
<br/>
<br/>
YouTube-Winner is a web application designed to randomly select winners from YouTube video comments and likes. It provides a user-friendly interface for filtering comments, managing user pools, and conducting tiered or numbered draws.

## Features

- **Search YouTube Videos**: Fetch comments and likes from a YouTube video using its URL or ID.
- **Filter Comments**: Filter comments by date range, keywords, and duplicate users.
- **Random Winner Selection**: Conduct tiered draws (Gold, Silver, Bronze) or numbered draws.
- **Multi-language Support**: Currently available in English and Chinese.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **UI Components**: HeroUI
- **YouTube API**: Fetch comments and video details using YouTube Data API v3

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akane9506/youtube-winner.git
   ```
    ```
   cd youtube-winner
    ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your YouTube API key:
   ```env
   VITE_YOUTUBE_API_KEY=<your_youtube_api_key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Project Structure

```plaintext
src/
├── api/                   # API calls to YouTube
├── components/            # React components
│   ├── routes/            # Route-specific components
│   ├── Header.tsx         # Header component
│   ├── Main.tsx           # Main router component
├── contexts/              # React Context for state management
├── models/                # Data models (e.g., User, Comment, VideoInfo)
├── consts.ts              # Constants and configurations
├── App.tsx                # Main application component
├── main.tsx               # Entry point
├── index.css              # Global styles
```

## Environment Variables

The following environment variable is required:

- `VITE_YOUTUBE_API_KEY`: Your YouTube Data API v3 key.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
