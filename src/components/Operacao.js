import styled from 'styled-components';

export default function Operacao(props){
    return(
        <ComponenteOperacao>
            <h5>{props.data}</h5>
            <h3>{props.descricao}</h3>
            <h4 className={props.tipo==='credit'?'credit':'debt'}>{props.valor}</h4>
        </ComponenteOperacao>
    )
}

const ComponenteOperacao=styled.div`
    display: flex;
    height: fit-content;
    width: 100%;
    margin: 12px 0 0 0;
    h5{
        margin: 0 15px 0 12px;
    }
    h3{
        margin: 0  0 0 15px;
    }
    h3, h4{
        font-family: 'Raleway', sans-serif;
    }
    h4{
        margin: 0 12px 0 auto;
        font-weight: 400;
        font-size: 16px;
    }
    .debt{
        color: #C70000;
    }
    .credit{
        color: #03AC00;
    }
`