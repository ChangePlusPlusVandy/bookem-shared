import { VolunteerProgramLocation } from '../types/database';

/**
 * Helper function to convert location to string
 * @param location The location of the program
 * @returns The location in string format
 */
export const convertLocationToString = (location: VolunteerProgramLocation) => {
  return `${location.street} ${location.city}, ${location.state} ${location.zip}`;
};
