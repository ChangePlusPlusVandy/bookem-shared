import { VolunteerEventLocation } from '../types/database';

/**
 * Helper function to convert location to string
 * @param location The location of the event
 * @returns The location in string format
 */
export const convertLocationToString = (location: VolunteerEventLocation) => {
  // if at least state or zip is missing, don't include it
  if (!location.state || !location.zip)
    return `${location.street} ${location.city}`;
  else
    return `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
};
