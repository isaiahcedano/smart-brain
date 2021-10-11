import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: '30px',
    }
});

const BoxButton = ({btn_text, handle_btn_click}) => {
    const clase_css = useStyles();

    return (
        <Button variant={"outlined"} className={clase_css.root}
                onClick={handle_btn_click}>{btn_text}</Button>
    )
};

export default BoxButton;