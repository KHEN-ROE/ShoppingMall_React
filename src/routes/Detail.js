import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap"
import {Context1} from "../App";
import {useDispatch} from "react-redux";
import {add} from "../store";

export const Detail = (props) => {

    let dispatch = useDispatch();

    let {item, shoes} = useContext(Context1);

    let [modal, setModal] = useState(true);
    let [input, setInput] = useState(0);
    let [tab, setTab] = useState(0);
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
                    <button onClick={() => {
                        dispatch(add(props.shoes[id - 1].title))
                    }} className="btn btn-danger">주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
        </div>
    );
}

const TabContent = ({tab}) => {

    let [fade, setFade] = useState('');

    useEffect(() => {
        // 시간차가 필요하다. react의 auto batching 때문에 setFade() 함수를 실행하고 한번만 재랜더링함
        setTimeout(() => {
            setFade('end');
        },100)
        //클린업 코드. 이거 먼저 동작
        return (() => {
            setFade('');
        });
    }, [tab]);

    return (<div className={`start ${fade}`}>
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>);
}
