# Artwork Gallery

A React + TypeScript application that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and persistent row selection.

**Assignment for:** GrowMe Organic Private Limited - React.JS Development Internship (First Round)

## Live Demo

🚀 **Live Application:** [https://artworkgallery1.netlify.app](https://artworkgallery1.netlify.app)

📦 **GitHub Repository:** [https://github.com/abishek-palanivel/artwork_gallery](https://github.com/abishek-palanivel/artwork_gallery)

## Features

- **Server-side pagination**: Fetches data only for the current page
- **Persistent row selection**: Maintains selection state when navigating between pages
- **Custom row selection**: Select a specific number of rows from the current page
- **Responsive DataTable**: Displays artwork information in a clean table format

## Technologies Used

- React 18
- TypeScript
- Vite
- PrimeReact DataTable
- Art Institute of Chicago API

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5174`

## Key Implementation Details

- Only fetches data for the current page (no prefetching)
- Stores only artwork IDs for selection tracking (not full objects)
- Custom selection panel validates input and prevents selecting more rows than available
- Maintains selection state across page navigation
- Uses proper TypeScript types for API responses

## API Endpoint

Uses the Art Institute of Chicago API:
`https://api.artic.edu/api/v1/artworks?page={page}&limit={limit}`

## Project Structure

```
src/
├── components/
│   ├── ArtworkTable.tsx       # Main table component with pagination
│   └── CustomSelectionPanel.tsx # Custom row selection overlay
├── types/
│   └── Artwork.ts             # TypeScript type definitions
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```