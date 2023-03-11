import "./Button.css"

export const Button = ({ type, btnText, disabled, title, htmlType }) => {
    return (
        <button
            type={htmlType}
            title={title}
            disabled={disabled}
            className={
                type === "outlined"
                    ? "outlined-button button-base"
                    : type === "success"
                    ? "success-button button-base"
                    : type === "danger"
                    ? "danger-button button-base"
                    : "button-base"
            }
        >
            {btnText}
        </button>
    )
}
