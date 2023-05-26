import { NotificationCardProps } from '../components/NotificationCard';
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

/*
action types:
1. REACTION
2. COMMENT
3. MENTION 

target types: 
1. POST 
2. COMMENT 

When action = REACTION and target = POST
then return just POST (from target)
When action = REACTION and target = COMMENT
then return both POST (target) and COMMENT (target)

When action = COMMENT and target = POST
then return POST (from target) and COMMENT (from action)
when action = COMMENT and target = COMMENT
then return COMMENT (from action) and COMMENT (from target)

When action = MENTION and target = POST
then return POST (from target)
When action = MENTION and target = COMMENT
then return POST (target) and COMMENT (from target)

*/

export const getNotificationCardContent = (
  action: Action,
  target: Target[],
): NotificationCardProps | undefined => {
  const cardContent: NotificationCardProps = {
    BottomCardContent: undefined,
    TopCardContent: undefined,
    image: undefined,
  };

  // If the action performed is a REACTION
  if (action.type === ActionType.REACTION) {
    // If the target has only one element, it means the reaction has been made on a POST
    if (target.length === 1) {
      cardContent.BottomCardContent = target[0].content;
      cardContent.image = target[0]?.image || undefined;
    }
    // If the target has two elements, it means that the reaction has been made on a COMMENT that is a part of a POST
    else if (target.length === 2) {
      cardContent.BottomCardContent = target[1].content;
      cardContent.TopCardContent = target[0].content;
      cardContent.image = target[0]?.image || undefined;
    }
    // #TODO If the target has three elements, (reply, comment, post), find out what to render
    // -> do you show the reply and comment?
    // -> or do you show the reply and post?
    // else if (target.length === 3)
  }

  // If the action performed is a COMMENT
  else if (action.type === ActionType.COMMENT) {
    // If the target has only one element, it means the comment was made on a POST
    if (target.length === 1) {
      cardContent.TopCardContent = action.content;
      cardContent.BottomCardContent = target[0].content;
      cardContent.image = target[0]?.image || undefined;
    }

    // If the target has two elements, it means the comment was made on a COMMENT i.e. the action is a reply to a comment
    // #TODO Do I show the reply and the comment here? Or the reply and the post? Or the comment and the post?
    // Currently assuming that I have to show the reply and the comment
    if (target.length === 2) {
      cardContent.TopCardContent = action.content;
      cardContent.BottomCardContent = target[0].content;
    }

    // #TODO AFAIK, there's no possibility for 3 items in target when action = COMMENT
  }

  // If the action performed is a MENTION
  else if (action.type === ActionType.MENTION) {
    // If the target has only one element, it means the user was mentioned in a post
    // #TODO confirm what the action object looks like when type = MENTION. Ensure that it does not have any content.
    if (target.length === 1) {
      cardContent.BottomCardContent = target[0].content;
      cardContent.image = target[0].image || undefined;
    }

    // If the target has two elements, it means the user was mentioned in a comment of a post
    if (target.length === 2) {
      cardContent.TopCardContent = target[0].content;
      cardContent.BottomCardContent = target[1].content;
      cardContent.image = target[1].image || undefined;
    }

    // #TODO check if you can have 3 elements here, [{reply}, {comment}, {post}] and see what needs to be rendered
  }
  return cardContent;
};

export const getNotificationMessage = (
  actorName: string,
  actionType: string,
  targetType: string,
) => {
  let message = actorName + ' ';
  if (targetType === TargetType[TargetType.POST]) {
    if (actionType === ActionType[ActionType.COMMENT]) {
      message += 'commented on your post';
    } else if (actionType === ActionType[ActionType.MENTION]) {
      message += 'mentioned you in a post';
    } else if (actionType === ActionType[ActionType.REACTION]) {
      message += 'reacted to your post';
    }
  } else if (targetType === TargetType[TargetType.COMMENT]) {
    if (actionType === ActionType[ActionType.COMMENT]) {
      message += 'replied to your comment';
    } else if (actionType === ActionType[ActionType.MENTION]) {
      message += 'mentioned you in a comment';
    } else if (actionType === ActionType[ActionType.REACTION]) {
      message += 'reacted to your comment';
    }
  }
  return message;
};
