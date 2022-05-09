import styled from "styled-components";

export default function Saldo(props){
    let credito;
    const saldo = calcSaldo(props.transacoes,credito);

    function calcSaldo(arr,credito){    
        let saldo=0;
        arr.map(op => {
            if(op.type=='credit'){
                saldo += parseFloat((op.value).replace(',', '.'));
            }else{
                saldo -= parseFloat((op.value).replace(',', '.'));
            }
        });
        if (saldo>0){credito=true}else{credito=false};
        return [Math.abs(saldo.toFixed(2)),credito];
    }
    
    return(
        <BarraSaldo>
            <h2>SALDO</h2>
            <h4 className={saldo[1]?'credit':'debt'}>{saldo[0]}</h4>
        </BarraSaldo>
    )
}

const BarraSaldo = styled.div`
    display: flex;
    justify-content: space-between;
    width:100%;
    margin: auto 0 0 0;
    font-family: 'Raleway', sans-serif;

    h2{
        font-weight: 700;
        font-size: 16px;
        margin: 0 auto 5px 12px;
    }
    h4{
        margin: 0 12px 5px auto;
    }
    .debt{
        color: #C70000;
    }
    .credit{
        color: #03AC00;
    }
`