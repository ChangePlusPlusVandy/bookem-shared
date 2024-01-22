import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import {
  AdminStatus,
  QueriedTagData,
  QueriedVolunteerProgramData,
  TagData,
  VolunteerEventData,
  VolunteerProgramData,
} from '../types/database';
import { AdminData, UserData } from '../types/database';
import { ETHNICITY, EVENTS, GENDERS, SOURCES } from './constants';
import Tags from '../models/Tags';

const generatePhone = (): string => {
  const phone = `(${faker.string.numeric(3)}) ${faker.string.numeric(
    3
  )} ${faker.string.numeric(4)}`;
  return phone;
};

// ------------------ insert-accounts.ts ------------------
export const generateUser = async ({
  name = 'Test User',
  email = 'test_user@bookem.org',
}: {
  name?: string;
  email?: string;
}): Promise<UserData> => ({
  name,
  email,
  password: await hash(process.env.TEST_USER_PASSWD || '', 12),
  phone: generatePhone(),
  address: faker.location.streetAddress(),
  birthday: faker.date.past().toISOString(),
  emergencyName: faker.person.firstName(),
  emergencyPhone: generatePhone(),
  emergencyRelationship: faker.person.jobTitle(),
  members: [],
  volunteerReason: faker.lorem.paragraph(),
  occupation: faker.person.jobType(),
  occupationTitle: faker.person.jobTitle(),
  occupationOrg: faker.company.name(),
  joinNewsletter: true,
  sourceHeardFrom: faker.helpers.arrayElement(SOURCES),
  ethnicity: faker.helpers.arrayElement(ETHNICITY),
  gender: faker.helpers.arrayElement(GENDERS),
  backgroundCheck: {
    passed: true,
    expirationDate: new Date(),
  },
  events: [],
});

export const generateAdmin = async (): Promise<AdminData> => ({
  firstName: 'Test',
  lastName: 'Admin',
  email: 'test_admin@bookem.org',
  password: await hash(process.env.TEST_USER_PASSWD || '', 12),
  phone: '(615) 555 5555',
  status: AdminStatus.Admin,
});

// ------------------ insert-events.ts ------------------
export const generateEvent = (
  i: number,
  tags: QueriedTagData[],
  programs: QueriedVolunteerProgramData[]
): VolunteerEventData => {
  // get index of event
  const indexOfEvent = i % EVENTS.length;

  // get event
  const chosenEvent = EVENTS[indexOfEvent];

  // get an array containing just the tag id of this event
  const tagIds = (
    tags.filter(
      tag => chosenEvent.tags && chosenEvent.tags.includes(tag.tagName)
    ) as QueriedTagData[]
  ).map(tag => tag._id);

  // get an array containing just the program id of this event
  const programIds = (
    programs.filter(
      program => chosenEvent.program && chosenEvent.program === program.name
    ) as QueriedVolunteerProgramData[]
  ).map(program => program._id);

  // get the start and end dates
  let startDate, endDate;
  if (chosenEvent.isMultipleDays) {
    startDate = faker.date.between({
      from: '2022-01-01T00:00:00.000Z',
      to: '2025-01-01T00:00:00.000Z',
    });
    endDate = faker.date.future({ years: 1, refDate: startDate });
  } else {
    startDate = new Date();
    endDate = startDate;
  }

  return {
    name: chosenEvent.name,
    description: faker.lorem.paragraph(),
    startDate,
    endDate,
    maxSpot: faker.number.int({ min: 5, max: 100 }),
    location: {
      city: faker.location.city(),
      state: faker.location.state(),
      street: faker.location.streetAddress(),
      zip: parseInt(faker.location.zipCode()),
    },
    phone: generatePhone(),
    email: faker.internet.email(),
    program: programIds[0] || null,
    requireApplication: false,
    tags: tagIds,
    volunteers: [],
  };
};

export const generateProgram = (program: any): VolunteerProgramData => {
  return {
    name: program.name,
    events: [],
  };
};

// Fill tag.events field with events
export const fillTagEvents = async (events: any) => {
  for (const event of events) {
    for (const tagId of event.tags) {
      const tag = await Tags.findById(tagId);
      if (tag.events) {
        tag.events.unshift(event._id);
      }
      await tag.save();
    }
  }
};

export const generateTag = (tag: any): TagData => {
  return {
    events: [],
    tagName: tag.tagName,
  };
};
