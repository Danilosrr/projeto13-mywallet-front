import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import logoutIcon from "../../src/assets/images/LogoutImage.svg";
import { AddCircleOutline } from 'react-ionicons'
import { RemoveCircleOutline } from 'react-ionicons'

import UserContext from '../contexts/UserContext';
import LoadingContext from '../contexts/LoadingContext';

export default function Registros(){
    const { token, setToken, transactions, setTransactions, setUser, user } = useContext(UserContext);
    const { loading } = useContext(LoadingContext)

    const navigate = useNavigate();

    useEffect(()=>{

        if (JSON.parse(localStorage.getItem('myWalletToken'))) {
            setToken(JSON.parse(localStorage.getItem('myWalletToken')));
            console.log(token,"local token:",JSON.parse(localStorage.getItem('myWalletToken')));

            const userToken = {
                headers: { Authorization: `Bearer ${token || JSON.parse(localStorage.getItem('myWalletToken'))}` }
            };

            const promise = axios.get(
                "https://danilo-mywallet-api.herokuapp.com/balance",
                userToken
            );
            promise.then(response => {
                console.log(response);
                setTransactions(response.data);
            });
            promise.catch(error => 
                console.log(error.response)
            );    
            console.log(promise)
        }else{
            setUser(null);
            setTransactions([]);
            navigate("/");
        }
    }, [token,loading]);

    function logOut(){
        setUser(null);
        setTransactions([]);
        localStorage.removeItem('myWalletToken');
        navigate("/");
    };

    return(
        <PaginaRegistros>
            <BarraSuperior>
                <h1>Olá, {user}</h1>
                <img src={logoutIcon} alt='logout icon' onClick={logOut}/>    
            </BarraSuperior>
            <BarraInterna>
                <p>Não há registros de entrada ou saída</p>
                {transactions.map(transaction=><h1>uma operação</h1>)}
            </BarraInterna>
            <BarraInferior>
                <button className='registrarEntradaSaida'>
                    <AddCircleOutline
                        className="registroIcon"
                        color={'#ffffff'} 
                        height="20px"
                        width="20px"
                    />
                    <h3>Nova Entrada</h3>
                </button>
                <button className='registrarEntradaSaida'>
                    <RemoveCircleOutline
                        className="registroIcon"
                        color={'#ffffff'} 
                        height="20px"
                        width="20px"
                    />
                    <h3>Nova Entrada</h3>
                </button>
            </BarraInferior>
        </PaginaRegistros>
    )
}

const PaginaRegistros=styled.div`
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
const BarraInterna=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 56px);
    height: 70%;
    background-color: #FFFFFF;
    border: 1px solid #981DCA;
    border-radius: 5px;

    p{
        font-family: 'Raleway', sans-serif;
        margin: 10px 0px;
        color: #868686;
    }
`
const BarraInferior=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 56px);
    height: 15%;
    margin-bottom: 14px;
    
    .registrarEntradaSaida{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        background-color: #A328D6;
        border: 1px solid #981DCA;
        border-radius: 5px;
        width: calc(50% - 10px);
        height: 100%;

        h3{
            margin: 8px;
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            color: #FFFFFF;
        }

        .registroIcon{
            margin: 8px;
        }
    }
`