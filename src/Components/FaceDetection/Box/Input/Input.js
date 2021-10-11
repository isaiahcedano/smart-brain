import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core";

const css = makeStyles(() => ({
    textField: {
        '& .MuiInputLabel-formControl': {
            position: 'relative'
        }
    }
}));

const Input = ({handleInputChange, onKeyPress, inputPlaceHolder}) => {
    const clase_css = css();

    return (
        <TextField label={inputPlaceHolder}
                   onChange={handleInputChange} className={clase_css.textField}
                   onKeyPress={onKeyPress}/>
    );
};

export default Input