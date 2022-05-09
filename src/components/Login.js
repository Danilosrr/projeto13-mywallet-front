import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';

import LoadingContext from '../contexts/LoadingContext';
import UserContext from '../contexts/UserContext';

export default function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { loading, setLoading } = useContext(LoadingContext);
    const { setToken,setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function efetuarLogin(event){
        event.preventDefault();
        setLoading(true);
        
        const promise = axios.post(
            "https://danilo-mywallet-api.herokuapp.com/login",
             {
                email: email,
                password: senha
            }
        );
        promise.then((response)=>{
            setToken(response.data.token);
            localStorage.setItem('myWalletToken', JSON.stringify(response.data.token));
            setUser(response.data.username);
            setLoading(false);
            navigate("/registros");    
        });
        promise.catch((error)=>{
            console.log(error.response)
            setLoading(false);
        });    
    };

    return(
        <PaginaLogin>
            <StyledForm>
                <h1>MyWallet</h1>
                <form className='loginForm' onSubmit={loading?()=>{}:efetuarLogin}>
                    <input type="email" placeholder='email'id='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder='senha' id='senha' value={senha} onChange={(e)=>setSenha(e.target.value)} disabled={loading}/>
                    {loading?
                        <button className='loadingButton'>
                            <ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={45}/>    
                        </button>
                        :<input type="submit" value='Entrar' id='enviarLogin'/>
                    }
                </form> 
                
                <Link to={`/cadastro`}>
                   <h3>Primeira vez? Cadastre-se!</h3>
                </Link>
            </StyledForm>
        </PaginaLogin>

    )
}

const PaginaLogin=styled.div`
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
    .loginForm input, .loginForm button{
        width: 100%;
        height: 45px;
        margin: 10px;
        border: 1px solid #981DCA;
        border-radius: 5px;
        font-size: 21px;
    }
    .loginForm ::placeholder{
        padding: 0px 10px;
        font-family: 'Raleway', sans-serif;
        color: gray;
    }
    .loadingButton{
        background-color: #A328D6;
        display: flex;
        justify-content: center;
        align-items: center;
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