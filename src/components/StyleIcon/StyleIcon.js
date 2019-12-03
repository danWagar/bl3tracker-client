import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styleIconMap = {
  collapse: <FontAwesomeIcon icon="angle-right" />,
  expand: <FontAwesomeIcon icon="angle-down" />,
  collapseBig: (
    <FontAwesomeIcon icon="chevron-up" style={{ fontSize: '25px', color: 'rgba(255,255,255,.5' }} />
  ),
  expandBig: (
    <FontAwesomeIcon icon="chevron-down" style={{ fontSize: '25px', color: 'rgba(255,255,255,.5' }} />
  ),
  select: <FontAwesomeIcon icon="caret-down" style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translate(0%, -50%)' }} />,
  corrosive: <FontAwesomeIcon className="corrosive" icon="biohazard" />,
  fire: <FontAwesomeIcon className="fire" icon="fire" />,
  shock: <FontAwesomeIcon className="shock" icon="bolt" />,
  cryo: <FontAwesomeIcon className="cryo" icon="snowflake" />,
  radiation: <FontAwesomeIcon className="radiation" icon="radiation" />,
  default: null
};

export default function StyleIcon({ style = 'default' }) {
  return styleIconMap[style];
}
