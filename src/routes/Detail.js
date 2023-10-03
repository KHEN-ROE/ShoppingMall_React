import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Detail = (props) => {

    let [modal, setModal] = useState(true);
    let [input, setInput] = useState(0);
    let {id} = useParams();

    useEffect(() => {
        let timer = setTimeout(() => {
            setModal(false);
        }, 2000);

        // return이 먼저 동작. unmount시 1회 동작
        return () => {
            clearTimeout(timer);
        }
    }, []);

    function isNumeric(input) {
        return /^[0-9]+$/.test(input) ? null : alert("숫자만 입력");
    }

    useEffect(() => {
        isNumeric(input);
    }, [input]);


    function inputText(e) {
        setInput(e);
    }

    return (
        <div className="container">
            {modal ? <div className={"alert alert-warning"}>
                2초이내 구매시 할인
            </div> : null}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${id}.jpg`} width="100%" alt={"images"}/>
                </div>
                <div>
                    <input type={"text"} onChange={(e) => inputText(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id - 1].title}</h4>
                    <p>{props.shoes[id - 1].content}</p>
                    <p>{props.shoes[id - 1].price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}
