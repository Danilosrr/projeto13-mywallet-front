import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';

import loadingContext from '../contexts/LoadingContext';
import UserContext from '../contexts/UserContext';

export default function NovaEntrada(props){

    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const { loading, setLoading } = useContext(loadingContext);
    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    function efetuarEntrada(event){
        event.preventDefault();
        setLoading(true);

        const userToken = {
            headers: { Authorization: `Bearer ${token || JSON.parse(localStorage.getItem('myWalletToken'))}` }
        };

        let operationType;
        if(props.entrada){operationType='credit'}else{operationType='debt'};
        
        let entry = {
            description: description,
            value: value,
            type: operationType
        };

        const promise = axios.post(
            "https://danilo-mywallet-api.herokuapp.com/balance",
            entry,
            userToken
        );
        promise.then(response => {
            console.log(response);
            setLoading(false);
            navigate("/registros");
        });
        promise.catch(error => {
            alert("utilize valores com até duas casa decimais separadas por vírgula");
            setLoading(false);    
        });
    };

    return(
        <PaginaNovaEntrada>
            <BarraSuperior>
                <h1>{(props.entrada)?'Nova entrada':'Nova saída'}</h1>
            </BarraSuperior>
            <StyledForm>
                <form className='loginForm' onSubmit={loading?()=>{}:efetuarEntrada}>
                    <input placeholder='valor' id='valor' value={value} onChange={(e)=>setValue(e.target.value)} disabled={loading}/>                    
                    <input type="text" placeholder='descrição'id='descrição' value={description} onChange={(e)=>setDescription(e.target.value)} disabled={loading}/>
                    {loading?
                        <button className='loadingButton'>
                            <ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={45}/>       
                        </button>
                        :<input type="submit" value={props.entrada?'Salvar entrada':'Salvar saída'} id='enviarLogin'/>
                    }
                </form> 
            </StyledForm>
        </PaginaNovaEntrada>
    )
}

const PaginaNovaEntrada=styled.div`
    box-sizing: border-box;
    background-color: #8C11BE;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    align-items: center;
    gap: 14px;
    
    h1{
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
`
const BarraSuperior=styled.div`
    box-sizing: border-box;
    height: 15%;
    width: calc(100% - 56px);
    display: flex;
    justify-content: space-between;
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