# Favorites Feature

## Overview
The Favorites feature allows users to save gigs they're interested in for easy access later. This feature enhances user experience by providing a way to bookmark and organize gigs of interest.

## Features
- **Save Favorites**: Users can mark gigs as favorites by clicking the heart icon on any gig card
- **View Favorites**: A dedicated page at `/favorites` displays all saved favorites
- **Toggle View**: Users can switch between grid and list views on the favorites page
- **Persistent Storage**: Favorites are saved to localStorage and persist between sessions
- **Filter by Favorites**: On the main gigs page, users can filter to show only their favorites

## Implementation Details

### Storage
Favorites are stored in the browser's localStorage under the key `favoriteGigs` as an array of gig IDs.

### Components
1. **Favorites Page** (`/favorites`): Displays all saved favorites with options to toggle between grid and list views
2. **GigCard Component**: Includes a heart icon that toggles favorite status
3. **Header Navigation**: Includes a link to the favorites page

### Data Flow
1. When a user clicks the heart icon on a gig:
   - The gig ID is added to or removed from the favorites array in localStorage
   - The UI updates to reflect the change in favorite status

2. When loading the favorites page:
   - The system retrieves favorite IDs from localStorage
   - It fetches the full gig data for those IDs from the API
   - If the API fails, sample data is used as a fallback

## Future Enhancements
- User account integration to sync favorites across devices
- Categorization of favorites into collections
- Email notifications for price changes on favorite gigs
- Share favorites with others 