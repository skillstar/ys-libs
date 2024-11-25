import React, { FC } from 'react';

export interface TextDisplayProps {
  text: string;
  color?: string;
  fontSize?: string;
}

const TextDisplay: FC<TextDisplayProps> = ({ text, color, fontSize }) => {
  return (
    <div
      style={{
        color: color || 'black',
        fontSize: fontSize || '16px',
      }}
    >
      {text}
    </div>
  );
};

export default TextDisplay;
