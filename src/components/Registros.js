import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import logoutIcon from "../../src/assets/images/LogoutImage.svg";
import { AddCircleOutline } from 'react-ionicons';
import { RemoveCircleOutline } from 'react-ionicons';

import UserContext from '../contexts/UserContext';
import LoadingContext from '../contexts/LoadingContext';

import Operacao from './../components/Operacao.js';
import Saldo from './../components/Saldo.js';

export default function Registros(){
    const { token, setToken, transactions, setTransactions, setUser, user } = useContext(UserContext);
    const { loading, setLoading } = useContext(LoadingContext);

    const navigate = useNavigate();

    useEffect(()=>{  
        if (JSON.parse(localStorage.getItem('myWalletToken'))) {
            setLoading(true);      
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
                setTransactions(response.data);
                console.log(transactions);
                setLoading(false);      
            });
            promise.catch(error => {
                console.log(error.response);
                setLoading(false);      
            });    
        }else{
            setUser(null);
            setTransactions([]);
            navigate("/");
        }
    }, [token,setTransactions]);

    function logOut(){
        setUser(null);
        setTransactions([]);
        localStorage.removeItem('myWalletToken');
        navigate("/");
    };

    return(
        <PaginaRegistros>
            <BarraSuperior>
                <h1>{user===null?`Bem vindo(a) devolta!`:`Ol??, ${user}!`}</h1>
                <img src={logoutIcon} alt='logout icon' onClick={logOut}/>    
            </BarraSuperior>
            <BarraInterna>
                <div className='operationsList'>
                    {transactions.length<1?<p>N??o h?? registros de entrada ou sa??da</p>:
                            transactions.map(opr=><Operacao key={opr._id} data ={opr.date} descricao={opr.description} valor={opr.value} tipo={opr.type}/>)
                    }
                </div>
                {transactions.length<1?<></>:<Saldo transacoes={transactions}/>}
            </BarraInterna>
            <BarraInferior>
                <button className='registrarEntradaSaida' onClick={loading?()=>{}:()=>navigate("/entrada")}>
                    <AddCircleOutline
                        className="registroIcon"
                        color={'#ffffff'} 
                        height="20px"
                        width="20px"
                    />
                    <h3>Nova Entrada</h3>
                </button>
                <button className='registrarEntradaSaida' onClick={loading?()=>{}:()=>navigate("/saida")}>
                    <RemoveCircleOutline
                        className="registroIcon"
                        color={'#ffffff'} 
                        height="20px"
                        width="20px"
                    />
                    <h3>Nova Sa??da</h3>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: no-wrap;
    width: calc(100% - 56px);
    height: 70%;
    background-color: #FFFFFF;
    border: 1px solid #981DCA;
    border-radius: 5px;

    .operationsList::-webkit-scrollbar {
        display: none;
    }

    .operationsList{
        width: 100%;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    p{  
        width: 100%;
        position: absolute;
        top: 50%;
        text-align: center;
        font-family: 'Raleway', sans-serif;
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