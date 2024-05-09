import axios from 'axios';

const GeocodingService = async (address) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null;
  }
};

export default GeocodingService;
