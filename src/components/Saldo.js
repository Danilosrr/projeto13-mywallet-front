import styled from "styled-components";

export default function Saldo(props){
    let credito;
    const saldo = calcSaldo(props.transacoes,credito);

    function calcSaldo(arr,credito){    
        let saldo=0;
        arr.map(op => {
            if(op.type==='credit'){
                return saldo += parseFloat((op.value).replace(',', '.'));
            }else{
                return saldo -= parseFloat((op.value).replace(',', '.'));
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
    background-color: #FFFFFF;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width:100%;
    font-family: 'Raleway', sans-serif;
    padding-top: 4px;
    border-radius: 5px;

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