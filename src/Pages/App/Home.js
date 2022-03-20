import Header from "../../Containers/Header/Header";
import Kraken from 'kraken';
import FormData from "form-data";
import FaceRecognition from "../../Components/FaceRecognition/FaceRecognition";
import {useState, useEffect} from 'react';
import HerramientaDetectarRostro from "../../Components/FaceDetection/HerramientaDetectarRostro";
import {Fragment} from 'react';
import Particles from "react-tsparticles";
import {Redirect} from 'react-router-dom';
import URLS from "../../URLS";
import {connect} from 'react-redux';
import {requestUserData} from '../../redux/actions/signinpage';

const mapStateToProps = state => ({
  name: state.changeUserData.name,
  ranking: state.changeUserData.ranking
});

const mapDispatchToProps = dispatch => ({
  setData: id => dispatch(requestUserData(id))
});

const Home = ({signout, loggedin, id, name, ranking, setData}) => {
    let convertedImgWidth = window.innerWidth/2;
    const [faceInputField, setFaceInputField] = useState({
        value: ""
    });

    const [convertedUrl, setConvertedUrl] = useState({
        url: ""
    });

    const [detectedFaces, setDetectedFaces] = useState({
        faces: []
    });

    const [foundFaces, setFoundFaces] = useState({
        found: false
    });

    const [findFaces, setFindFaces] = useState({
        find: false
    });

    const onFaceInputChange = e => {
        setFaceInputField({
            value: e.target.value
        });

        setFindFaces({
            find: false
        });

        setFoundFaces({
            found: false
        });

        setDetectedFaces({
            faces: []
        });

        setConvertedUrl({
            url: ""
        })
    };

    const resizeImage = (imgUrl, imgWidth) => {
        let converted_url = "";
        const kraken = new Kraken({
            api_key: "7a20d22ae0fc8b6315eeff138002a99f",
            api_secret: "08129aaf86f7afc4181618e596167e75a0839788",
        });

        const krakenData = {
            url: imgUrl,
            wait: true,
            resize: {
                width: imgWidth,
                strategy: "landscape"
            }
        };

        kraken.url(krakenData, (err, resp) => {
            if (typeof(resp) !== "undefined") {
                converted_url = resp.kraked_url
            }
        });

        setTimeout(() => {
            setConvertedUrl({
                url: converted_url
            })
        }, 4000)
    };

    const detectFaces = () => {
        resizeImage(faceInputField.value, convertedImgWidth);
        setFindFaces({
            find: true
        })
    };

    const onFaceKeyPress = e => {
        if (e.which === 13) {
            detectFaces()
        }
    };

    useEffect(()=> {
      console.log(id);
        setData(id);

        if (findFaces.find) {
            const faceFormData = new FormData();
            faceFormData.append("api_key", "M-vc3wXc1iAHDKyPURtUYA4ih7vq0Rbt");
            faceFormData.append("api_secret", "57EkRLUPeopzqHNFOk4_Z6ub_vxpySED");
            faceFormData.append("image_url", convertedUrl.url);
            const formDataConfig = {
                method: "POST",
                body: faceFormData,
                redirect: "follow"
            };
            fetch("https://api-us.faceplusplus.com/facepp/v3/detect", formDataConfig)
                .then(resp => resp.text())
                .then(data => {
                    const faces = JSON.parse(data).faces.map((data_Face) => {
                        const {face_rectangle} = data_Face;
                        return face_rectangle
                    });

                    if (faces.length === 0) {
                        alert("Your screen's too small according to the selected image, so it couldn't detect faces!")
                    } else {
                        setDetectedFaces({
                            faces: faces
                        });

                        setFoundFaces({
                            found: true
                        });

                        setFindFaces({
                            find: false
                        });

                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const raw = JSON.stringify({
                            userID: id
                        });
                        const requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
                        fetch(`http://192.168.1.38:3002/image`, requestOptions)
                            .then(response => response.text())
                            .then(result => {
                                if (JSON.parse(result)[0]==="success") {
                                    setData({
                                        name: JSON.parse(result)[1].name,
                                        ranking: JSON.parse(result)[1].ranking,
                                    })
                                }
                            }).catch(error => console.log);
                    }
                })
                .catch(() => {
                    alert("Something went wrong! Try again with another url image.")
                })
        }
        // eslint-disable-next-line
    }, [convertedUrl]);

    const api_tool = {
        btn_text: "Detect",
        api_callback: detectFaces,
        onInputChange: onFaceInputChange,
        onKeyPressAction: onFaceKeyPress,
        inputPlaceHolder: "Image Url"
    };
    return (
        loggedin ?
        <Fragment>
            <Particles id="tsparticles"
                       options={{
                           particles: {
                               number: {
                                   value: 100,
                                   density: {
                                       enable: true,
                                       valueArea: 500
                                   }
                               },
                               color: {
                                   value: "#ffffff"
                               },
                               size: {
                                   value: 3,
                                   random: true,
                               },
                               links: {
                                   enable: true,
                                   distance: 150,
                                   color: "#ffffff",
                                   opacity: 0.4,
                                   width: 1
                               },
                               move: {
                                   enable: true,
                                   speed: {
                                       value: 6
                                   },
                               }
                           },
                           detectRetina: true
                       }}
                       className={'particles'}/>
            <Header type={'loggedin'} signout={signout}/>
            <p className={"white tc f3"}>{`${name}`}, your current ranking is...</p>
            <p className={"white tc f2"}>#{`${ranking}`}</p>
            <p className={"black tc f5"}>This magic brain will detect faces in your pictures. Give it a try.</p>
            <HerramientaDetectarRostro btn_text={api_tool.btn_text}
                                       api_callback={api_tool.api_callback}
                                       onInputChange={api_tool.onInputChange}
                                       onKeyPress={api_tool.onKeyPressAction}
                                       inputPlaceHolder={api_tool.inputPlaceHolder}/>
            {
                foundFaces.found ?
                    <FaceRecognition imageUrl={convertedUrl.url} boxes={detectedFaces.faces}/> :
                    null
            }
        </Fragment> : <Redirect to={URLS.SIGNIN}/>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
