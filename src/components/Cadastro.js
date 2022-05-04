import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';

import loadingContext from '../contexts/LoadingContext';

export default function Cadastro(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { loading, setLoading } = useContext(loadingContext);

    const navigate = useNavigate();

    function efetuarLogin(event){
        event.preventDefault();

        setLoading(true);
        setTimeout(()=>{setLoading(false)},3000);
    }


    return(
        <PaginaCadastro>
            <StyledForm>
                <h1>MyWallet</h1>
                <form className='loginForm' onSubmit={loading?()=>{}:efetuarLogin}>
                    <input type="text" placeholder='nome' id='nome' value={name} onChange={(e)=>setName(e.target.value)} disabled={loading}/>                    
                    <input type="email" placeholder='email'id='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder='senha' id='senha' value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder='Confirme a senha' id='senhaConfirmar' value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} disabled={loading}/>
                    {loading?
                        <ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={45}/>
                        :<input type="submit" value='Entrar' id='enviarLogin'/>
                    }
                </form> 
                
                <Link to={`/`}>
                   <h3>Já tem uma conta? Entre agora!</h3>
                </Link>
            </StyledForm>
        </PaginaCadastro>
    )
}

const PaginaCadastro=styled.div`
    box-sizing: border-box;
    background-color: #8C11BE;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const StyledForm=styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    
    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
    }
    .loginForm{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loginForm input{
        width: 100%;
        height: 45px;
        padding: 0px 10px;
        margin: 10px;
        border: 1px solid #981DCA;
        border-radius: 5px;
        font-size: 21px;
    }
    .loginForm ::placeholder{
        font-family: 'Raleway', sans-serif;
        color: gray;
    }
    #enviarLogin{
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        background-color: #A328D6;
        color: #FFFFFF;
    }
    a{
        font-family: 'Raleway', sans-serif;
        color: #FFFFFF;
        text-decoration: none;
    }
`