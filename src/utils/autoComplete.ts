import { Geo } from 'aws-amplify';

export const getPlaceById = async (placeId: string) => {
  try {
    const place = await Geo.searchByText(placeId);
    return place;
  } catch (e) {
    console.error(e, 'ERROR GETTING ADDRESS DATA BY PLACE ID');
  }
};

export const getSuggestions = async (searchTerm: string) => {
  try {
    return await Geo.searchForSuggestions(searchTerm, {
      countries: ['AUS'],
      maxResults: 5
    });
  } catch (e) {
    console.error(e, 'ERROR GETTING ADDRESS SUGGESTIONS');
  }
};
