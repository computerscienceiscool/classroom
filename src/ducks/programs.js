import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post, put, httpDelete } from '../lib/edu-api';

// testing mocks
const i2a = {
  id: '2',
  name: 'Astro 101 with Galaxy Zoo',
  description: 'Classroom tools for teaching Astronomy.',
  slug: '/astro-101-with-galaxy-zoo',
  metadata: {
    backgroundImage: 'astro-background.jpg',
    cardImage: 'home-card-intro-to-astro.jpg',
    redirectOnJoin: false,
    assignments: {
      // workflow_id: { assignmentMetadata }
      // used to relate the assignment resource that has a workflow id property
      // back to a project without having to request that from Panoptes
      // to then build the URL to the project in the UI.
      // These are just test projects on staging...
      1315: {
        assignment: "Hubble's Law",
        slug: 'srallen086/intro2astro-hubble-testing'
      },
      1771: {
        assignment: 'Galaxy Zoo 101',
        slug: 'srallen086/galaxy-zoo-in-astronomy-101'
      },
      3038: {
        assignment: 'Introduction',
        slug: 'srallen086/introduction-to-platform'
      }
    }
  }
};

const darian = {
  id: '3',
  name: 'Wildcam Darien Lab',
  description: 'A map for exploring camera trap data from the WildCam Darien project.',
  slug: '/darien',
  metadata: {
    backgroundImage: '',
    cardImage: 'home-card-wildcam-darien.jpg',
    redirectOnJoin: true,
  }
};


const programsArray = [
  i2a,
  darian
];

// Constants
const PROGRAMS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  CREATING: 'creating',
  UPDATING: 'updating',
  DELETING: 'deleting',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const PROGRAMS_INITIAL_STATE = {
  error: null,
  programs: programsArray, // temporary
  selectedProgram: null,
  status: PROGRAMS_STATUS.IDLE
};

const programPropTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string
};

const PROGRAMS_PROPTYPES = {
  selectedProgram: PropTypes.shape(programPropTypes),
  programs: PropTypes.arrayOf(PropTypes.shape(programPropTypes)),
  error: PropTypes.object,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.programs.setStatus(PROGRAMS_STATUS.ERROR);
  Actions.programs.setError(error);
  Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
  console.error(error);
}

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const selectProgram = (state, selectedProgram) => {
  return { ...state, selectedProgram };
};

const setPrograms = (state, programs) => {
  return { ...state, programs };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getPrograms', () => {
  Actions.programs.setStatus(PROGRAMS_STATUS.FETCHING);

  return get('/programs/') // TODO replace with actual. Only guess at endpoint
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/programs/getPrograms): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return response.body.data;
      }
      throw 'ERROR (ducks/programs/getPrograms): Invalid response';
    })
    .then((data) => {
      Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
      Actions.programs.setClassrooms(data);
      return data;
    }).catch(error => handleError(error));
});

Effect('getProgram', (data) => {
  Actions.programs.setStatus(PROGRAMS_STATUS.FETCHING);

  return Promise.resolve(data.programs.filter(program => program.slug === `/${data.param}`))
    .then(([program]) => {
      Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
      Actions.programs.selectProgram(program);
      return program;
    }).then((program) => {
      // Actions.getClassroomsAndAssignments(program.id);
    }).catch(error => handleError(error));
});

const programs = State('programs', {
  // Initial state
  initial: PROGRAMS_INITIAL_STATE,
  // Actions
  setError,
  setPrograms,
  selectProgram,
  setStatus
});

export default programs;
export {
  PROGRAMS_STATUS,
  PROGRAMS_INITIAL_STATE,
  PROGRAMS_PROPTYPES
};
