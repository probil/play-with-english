import { keyBy } from '@/utils/array';

export const conditions = keyBy('id')([
  {
    id: 1,
    name: 'Present Simple',
  },
  {
    id: 2,
    name: 'Present Continuous',
  },
]);

export const questions = keyBy('id')([
  {
    id: 1,
    title: 'I (think) she\'s rich',
    answer: 1,
  },
  {
    id: 2,
    title: 'I (think) about your plan',
    answer: 2,
  },
  {
    id: 3,
    title: 'The milk (taste) awful',
    answer: 1,
  },
  {
    id: 4,
    title: 'He (taste) sauce; it might need some salt',
    answer: 2,
  },
  {
    id: 5,
    title: 'He (have) a pet dog',
    answer: 1,
  },
  {
    id: 6,
    title: 'He\'s (have) dinner now',
    answer: 2,
  },
  {
    id: 7,
    title: 'This clothe (feel) like velvet',
    answer: 1,
  },
  {
    id: 8,
    title: 'She (feel) her way in the dark',
    answer: 2,
  },
  {
    id: 9,
    title: 'I (see) your\'re in trouble',
    answer: 1,
  },
  {
    id: 10,
    title: 'I (see) my lawyer tonight',
    answer: 2,
  },
  {
    id: 11,
    title: 'The kitchen (smell) of burnt meat.',
    answer: 1,
  },
  {
    id: 12,
    title: 'Why are you (smell) your food?',
    answer: 2,
  },
  {
    id: 13,
    title: 'He (come) from Spain. He was born in there.',
    answer: 1,
  },
  {
    id: 14,
    title: 'He (come) from Spain. He is travelling from there.',
    answer: 2,
  },
  {
    id: 15,
    title: 'I (love) holidays.',
    answer: 1,
  },
  {
    id: 16,
    title: 'I (love) this holiday.',
    answer: 2,
  },
  {
    id: 17,
    title: 'You hair (look) great.',
    answer: 1,
  },
  {
    id: 18,
    title: 'She (look) at some old photographs.',
    answer: 2,
  },
  {
    id: 19,
    title: 'The baby (weigh) 5 kilos',
    answer: 1,
  },
  {
    id: 20,
    title: 'I (weigh) myself on my new scales',
    answer: 2,
  },
  {
    id: 21,
    title: 'Ann (be) very tall',
    answer: 1,
  },
  {
    id: 22,
    title: 'Ann (be) very kind to me these days',
    answer: 2,
  },
]);
