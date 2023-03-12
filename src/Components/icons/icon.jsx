import { faStar as regFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const fullStar = (
  <FontAwesomeIcon icon={faStar} style={{ color: '#017bfe' }} size="lg" />
);

export const hollowStar = (
  <FontAwesomeIcon
    icon={regFaStar}
    style={{
      color: '#017bfe',
    }}
    size="lg"
  />
);
