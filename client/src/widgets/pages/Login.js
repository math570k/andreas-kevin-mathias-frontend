import React from "react";
import {useAuth} from "../../services/providers/AuthProvider";
import * as Template from "../../ui/templates";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login} = useAuth();

    return (
        <Template.Page>
            <div>
                Login Form
                <form onSubmit={e => {
                    e.preventDefault()
                    console.log(email, password)
                    login({email, password})
                }}>
                    <input value={email} type="text" onChange={e => setEmail(e.target.value)}/>
                    <input value={password} type={'password'} onChange={e => setPassword(e.target.value)}/>
                    <button type={'submit'}>Submit</button>
                </form>
            </div>
        </Template.Page>
    );
}