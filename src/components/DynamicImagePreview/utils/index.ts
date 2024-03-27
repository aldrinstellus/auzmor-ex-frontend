export const updateEditorValue = (users: any, label: any) => {
  const userMentions = users.map((user: any) => ({
    id: user.id,
    value: user.fullName,
    denotationChar: '@',
  }));

  const hashtag = 'kudos';

  const text =
    userMentions.map((mention: any) => `@${mention.value}`).join(' ') +
    ` #${hashtag} ${label}`;

  const mentionSpans = userMentions
    .map(
      (mention: any) =>
        `<span class="mention" data-testid="createpost-at-item" "data-denotation-char="${mention.denotationChar}" data-id="${mention.id}" data-value="${mention.value}"><span contenteditable="false"><span class="ql-mention-denotation-char">${mention.denotationChar}</span>${mention.value}</span></span>`,
    )
    .join(' ');

  const html = `<p>${mentionSpans} <span class="mention" data-testid="createpost-hashtag-item"  data-denotation-char="#" data-value="${hashtag}"><span contenteditable="false"><span class="ql-mention-denotation-char">#</span>${hashtag}</span></span> ${label}</p>`;

  const ops = userMentions
    .map((mention: any) => ({
      insert: {
        mention: {
          testid: 'createpost-at-item',
          denotationChar: mention.denotationChar,
          id: mention.id,
          value: `${mention.value} `,
        },
      },
    }))
    .concat([
      { insert: ' ' },
      {
        insert: {
          mention: {
            testid: 'createpost-hashtag-item',
            denotationChar: '#',
            value: hashtag,
          },
        },
      },
      { insert: ' ' },
      { insert: `${label} \n` },
    ]);

  return { text, html, editor: { ops } };
};
