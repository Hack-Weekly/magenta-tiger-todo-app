import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar } from '@fortawesome/free-regular-svg-icons';

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
