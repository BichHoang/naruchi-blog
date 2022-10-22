import React from 'react';

export const grpahCMSImageLoader = ({ src }) => src;

export const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = (<b key={index}>{text}</b>);
    }

    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }

    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
  }

  switch (type) {
    case 'heading-three':
      return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
    case 'paragraph':
      return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
    case 'heading-four':
      return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      );
    default:
      return modifiedText;
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
