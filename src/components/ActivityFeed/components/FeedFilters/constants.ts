import { FeedFilterContentType, FeedFilterOption } from '.';

export const feedFilterOptions: FeedFilterOption[] = [
  {
    label: 'Content (type)',
    value: 'content-type',
    checked: false,
    type: FeedFilterContentType.Section,
  },
  {
    label: 'Updates',
    value: 'updates',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Events',
    value: 'events',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Documents',
    value: 'documents',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Shoutouts',
    value: 'shoutouts',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Birthdays',
    value: 'birthdays',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Work anniversary',
    value: 'work-anniversary',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Welcome new hire',
    value: 'welcome-new-hire',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Polls',
    value: 'polls',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Preference',
    value: 'preference',
    checked: false,
    type: FeedFilterContentType.Section,
  },
  {
    label: 'My posts',
    value: 'my-posts',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Mentions',
    value: 'mentions',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
  {
    label: 'Bookmarked by me',
    value: 'bookmarked-by-me',
    checked: false,
    type: FeedFilterContentType.Filter,
  },
];
