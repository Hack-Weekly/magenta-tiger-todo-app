import "./Button.css";

export const Button = ({ type, btnText }) => {
  return (
    <button className="button" type={type}>
      {btnText}
    </button>
  );
};
