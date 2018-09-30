const tenses = {
  1: {
    id: 1,
    name: 'Present Simple',
  },
  2: {
    id: 2,
    name: 'Present Continuous',
  },
};

const sentences = {
  1: {
    title: 'I (think) she\'s rich',
    answer: 1,
  },
  2: {
    title: 'I (think) about your plan',
    answer: 2,
  },
  3: {
    title: 'The milk (taste) awful',
    answer: 1,
  },
  4: {
    title: 'He (taste) sauce; it might need some salt',
    answer: 2,
  },
  5: {
    title: 'He (have) a pet dog',
    answer: 1,
  },
  6: {
    title: 'He\'s (have) dinner now',
    answer: 2,
  },
  7: {
    title: 'This clothe (feel) like velvet',
    answer: 1,
  },
  8: {
    title: 'She (feel) her way in the dark',
    answer: 2,
  },
};


const state = {
  currentQuestion: null,
};

const getters = {

};

const mutations = {

};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
