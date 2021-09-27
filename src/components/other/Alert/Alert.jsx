import React from 'react';

export default function Alert({ text, vision }) {
  return (
    <div className={`alert alert-${vision}`} role="alert">
      {text}
    </div>
  )
}
