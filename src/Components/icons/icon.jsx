import { faStar as regFaStar } from '@fortawesome/free-regular-svg-icons';
import { faBars, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const fullStar = (
  <FontAwesomeIcon
    icon={faStar}
    style={{ color: 'var(--colors-blue)' }}
    size="lg"
  />
);

export const hollowStar = (
  <FontAwesomeIcon
    icon={regFaStar}
    style={{
      color: 'var(--colors-blue)',
    }}
    size="lg"
  />
);

export const menuBars = (
  <FontAwesomeIcon
    icon={faBars}
    style={{
      color: 'var(--colors-blue)',
    }}
    size="lg"
  />
);

export const xMark = (
  <FontAwesomeIcon
    icon={faXmark}
    style={{
      color: 'var(--colors-blue)',
    }}
    size="lg"
  />
);
