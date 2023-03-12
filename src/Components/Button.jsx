import './Button.css';

export const Button = ({
  type,
  btnText,
  disabled,
  title,
  htmlType,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      title={title}
      disabled={disabled}
      className={
        type === 'outlined'
          ? 'outlined-button button-base'
          : type === 'outlined-border'
          ? 'outlined-border-button button-base'
          : type === 'success'
          ? 'success-button button-base'
          : type === 'danger'
          ? 'danger-button button-base'
          : 'button-base'
      }
    >
      {btnText}
    </button>
  );
};
