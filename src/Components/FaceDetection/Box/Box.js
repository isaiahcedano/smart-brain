import BoxButton from "./Button/Button";
import Input from "./Input/Input";
import styles from './Box.module.css'

const Box = ({btn_text, handle_btn_click, handleInputChange, onKeyPress, inputPlaceHolder}) => {
    return (
        <div className={styles.box_container}>
            <Input handleInputChange={handleInputChange} onKeyPress={onKeyPress} inputPlaceHolder={inputPlaceHolder}/>
            <BoxButton btn_text={btn_text} handle_btn_click={handle_btn_click}/>
        </div>
    )
};

export default Box;