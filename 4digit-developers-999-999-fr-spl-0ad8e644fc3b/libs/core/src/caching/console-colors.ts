// https://getbootstrap.com/docs/4.0/components/badge/
// https://stackoverflow.com/questions/7505623/colors-in-javascript-console

const BADGE = [
  'display: inline-block;',
  'padding: .25em .4em;',
  'font-size: 80%;',
  'font-weight: 700;',
  'line-height: 1;',
  'text-align: center;',
  'white-space: nowrap;',
  'vertical-align: baseline;',
  'border-radius: .25rem;'
].join('');

const BADGE_PILL = BADGE + ['padding-right: .6em;', 'padding-left: .6em;', 'border-radius: 10rem;'].join('');

export const BADGE_PRIMARY = BADGE + ['color: #fff;', 'background-color: #007bff;'].join('');

export const BADGE_SECONDARY = BADGE + ['color: #fff;', 'background-color: #868e96;'].join('');

export const BADGE_SUCCESS = BADGE + ['color: #fff;', 'background-color: #28a745;'].join('');

export const BADGE_DANGER = BADGE + ['color: #fff;', 'background-color: #dc3545;'].join('');

export const BADGE_WARNING = BADGE + ['color: #111;', 'background-color: #ffc107;'].join('');

export const BADGE_INFO = BADGE + ['color: #fff;', 'background-color: #17a2b8;'].join('');
