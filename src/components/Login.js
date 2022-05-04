import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import loadingContext from '../contexts/LoadingContext';

export default function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { loading, setLoading } = useContext(loadingContext);

    const navigate = useNavigate();

    return(
        <PaginaLogin>
            <StyledForm>
                <h1>MyWallet</h1>
                <form className='loginForm'>
                    <input type="email" placeholder='email'id='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder='senha' id='senha' value={senha} onChange={(e)=>setSenha(e.target.value)} disabled={loading}/>
                    {loading?
                        <input type="submit" value="carregando" disabled={loading}/>   
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
        color: gray;
    }
    #enviarLogin{
        background-color: #A328D6;
        color: #FFFFFF;
    }
    a{
        color: #FFFFFF;
        text-decoration: none;
    }
`