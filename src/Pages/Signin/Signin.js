import Header from "../../Containers/Header/Header";
import {Fragment, useState} from 'react';
import Particles from "react-tsparticles";
import URLS from "../../URLS";
import {Redirect} from 'react-router-dom';

const Signin = ({loggedin, login}) => {
    const [submittedEmail, submitEmail] = useState("");

    const [submittedPassword, submitPassword] = useState("");

    const onEmailChange = (e) => {
        submitEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        submitPassword(e.target.value);
    };

    const signin = (e) => {
        e.preventDefault();
        if (submittedEmail !== "" && submittedPassword !== "") {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                email: submittedEmail,
                password: submittedPassword
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://cedano-smart-brain-api.herokuapp.com/signin", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (JSON.parse(result)[0]==="success") {
                        login(true, JSON.parse(result)[1].id);
                    } else {
                        alert("Incorrect email or password.");
                    }
                }).catch(error => console.log);
        } else {
            alert("Incorrect email or password.");
        }
    };


    return (
        !loggedin ?
        <Fragment>
            <Header type={"loggedout"}/>
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
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure center" onSubmit={signin}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0 center">
                            <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address" onChange={onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 tc" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password" onChange={onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="center flex">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center"
                                   defaultValue={"Sign in"} type={'submit'}/>
                        </div>
                        <div className="lh-copy mt3 center">
                            <a href={URLS.REGISTER} className="f6 link dim black db tc">Register</a>
                        </div>
                    </form>
                </main>
            </article>
        </Fragment> : <Redirect to={URLS.HOME}/>
    );
};

export default Signin;
