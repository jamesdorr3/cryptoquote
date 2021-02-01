import React from 'react';

import './Letter.scss'

const Letter = ({letter, mapping, handleChange}) => {

  const letterInfo = mapping.find(x => x.answer === letter);

  if(!letterInfo) return;

  return(
    <div className='letter'>
      <div className='encryption'>{letterInfo.encryption}</div>
      <input
        className='guess'
        name={letterInfo.id}
        onChange={handleChange}
        maxLength='1'
        placeholder={letterInfo.guess}
      />
    </div>
  )
};

export default Letter;