import styles from './FaceRecognition.module.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className={styles.faceRecognition}>
            <div className={`absolute ${styles.faceRecognition__container}`}>
                <img alt='' src={imageUrl}/>
                {
                    boxes.map((box, index) => {
                        const {height, left, width, top} = box;
                        return (
                            <div className={styles.boundingBox}
                                 style={{height,
                                     left,
                                     width,
                                     top}} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default FaceRecognition