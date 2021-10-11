import Box from "./Box/Box";
import styles from './HerramientaDetectarRostro.module.css'

const HerramientaDetectarRostro = ({btn_text, api_callback, onInputChange, onKeyPress, inputPlaceHolder}) => {
    return (
        <div className={styles.ai_tool_container}>
            <Box btn_text={btn_text}
                handle_btn_click={api_callback}
                handleInputChange={onInputChange}
                 onKeyPress={onKeyPress} inputPlaceHolder={inputPlaceHolder}/>
        </div>
    );
};

export default HerramientaDetectarRostro;