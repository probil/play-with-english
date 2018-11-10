/* eslint-disable no-param-reassign,no-shadow */
import {
  GENERATE_QUESTIONS,
  SETUP_DATASET,
  SET_QUESTION_ANSWER,
  RESET_ANSWERS,
} from './mutation-types';

const getRandomInt = (start = 0, end = 10) => Math.round(Math.random() * (end - start)) + start;
const getRandomObjKey = obj => getRandomInt(1, Object.keys(obj).length);

const state = {
  numberOfQuestions: 10,
  currentQuestionsIds: [],
  currentUserAnswerIds: [],
  dataset: {
    conditions: {},
    questions: {},
  },
};

const getters = {
  questionById: ({ dataset }) => id => dataset.questions[id],
  currentQuestions: ({ currentQuestionsIds }, { questionById }) => (
    currentQuestionsIds.map(questionById)
  ),
  currentAnsweredQuestions: ({ currentQuestionsIds, currentUserAnswerIds }, { questionById }) => (
    currentUserAnswerIds.map((_, index) => questionById(currentQuestionsIds[index]))
  ),
  isFinished: ({ currentUserAnswerIds, currentQuestionsIds }) => (
    currentUserAnswerIds.length >= currentQuestionsIds.length
  ),
  currentQuestion: ({ currentUserAnswerIds, currentQuestionsIds }, { questionById }) => (
    questionById(currentQuestionsIds[currentUserAnswerIds.length])
  ),
  countCorrect: ({ currentUserAnswerIds, currentQuestionsIds }, { questionById }) => (
    currentUserAnswerIds.filter((userAnswerId, index) => (
      questionById(currentQuestionsIds[index]).answer === userAnswerId
    )).length
  ),
  countUnanswered: ({ currentUserAnswerIds, currentQuestionsIds }, { questionById }) => (
    currentUserAnswerIds.filter((userAnswerId, index) => (
      questionById(currentQuestionsIds[index]).answer === 0
    )).length
  ),
  countIncorrect: ({ currentUserAnswerIds }, { countCorrect, countUnanswered }) => (
    currentUserAnswerIds.length - countCorrect - countUnanswered
  ),
  getAnswerByIndex: ({ currentUserAnswerIds }) => index => currentUserAnswerIds[index],
  conditions: ({ dataset }) => Object.values(dataset.conditions),
};

const mutations = {
  [GENERATE_QUESTIONS](state) {
    state.currentQuestionsIds = Array
      .from(Array(state.numberOfQuestions))
      .map(() => getRandomObjKey(state.dataset.questions));
  },
  [SETUP_DATASET](state, dataset) {
    state.dataset = dataset;
  },
  [SET_QUESTION_ANSWER](state, answerId) {
    state.currentUserAnswerIds.push(answerId);
  },
  [RESET_ANSWERS](state) {
    state.currentUserAnswerIds = [];
  },
};

const actions = {
  start({ commit }, dataset) {
    commit(RESET_ANSWERS);
    commit(SETUP_DATASET, dataset);
    commit(GENERATE_QUESTIONS);
  },
  setAnswer({ commit }, answerId) {
    commit(SET_QUESTION_ANSWER, answerId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
