import {
  Action,
  ActionType,
  Target,
  TargetType,
} from '../components/NotificationsList';

const convertUTCDateToLocalDate = (date: Date) => {
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);
};

export const getTimeSinceActedAt = (actedAt: string) => {
  // Convert string time to a Date object
  const targetDatetime = convertUTCDateToLocalDate(new Date(actedAt));

  // Calculate the time difference between now and 'actedAt'
  const now = new Date();
  const difference = now.getTime() - targetDatetime.getTime();

  // Calculate the time differences in various units
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  // Return the biggest non-zero unit
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `Less than a minute ago`;
  }
};

export const getTargetContentByTargetType = (
  target: Target[],
  targetType: TargetType,
) => {
  return target.find((item) => item.type === TargetType[targetType]);
};

export const getNotificationMessage = (
  actorName: string,
  actionType: string,
  targetType: string,
) => {
  let message = actorName;
  if (targetType === TargetType.POST) {
    if (actionType === ActionType.COMMENTED) {
      message += 'commented on your post';
    } else if (actionType === ActionType.MENTIONED) {
      message += 'mentioned you in a post';
    } else if (actionType === ActionType.REACTED) {
      message += 'reacted to your post';
    } else if (actionType === ActionType.REPOSTED) {
      message += 'reposted your post';
    }
  } else if (targetType === TargetType.COMMENT) {
    if (actionType === ActionType.COMMENTED) {
      message += 'replied to your comment';
    } else if (actionType === ActionType.MENTIONED) {
      message += 'mentioned you in a comment';
    } else if (actionType === ActionType.REACTED) {
      message += 'reacted to your comment';
    }
  }
  return message;
};
