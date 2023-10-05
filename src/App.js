import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import {createContext, useState} from "react";
import data from './data.js';
import Shoes from "./Shoes";
import {Routes, Route, useNavigate} from 'react-router-dom'
import {Detail} from "./routes/Detail";
import {About} from "./routes/About";
import {Event} from "./routes/Event";
import axios from "axios";
import {Cart} from "./routes/Cart";

export let Context1 = createContext();

function App() {

    let [shoes, setShoes] = useState(data);
    let [item, setItem] = useState([10, 11, 12]);
    let navigate = useNavigate();

    const getData = async () => {
        await axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
                let copy = [...data];
                let moreData = result.data;
                for (let i = 0; i < moreData.length; i++) {
                    copy.push(moreData[i]);
                }
                setShoes(copy);
            })
            .catch(() => {
                console.log('실패');
            })
    }

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate('/')
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/detail')
                        }}>Detail</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/about')
                        }}>About</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/event')
                        }}>Event</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate(('/cart'));
                        }}>Cart
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path={"/"} element={
                    <>
                        <div className="main-bg"></div>
                        <div className="container">
                            <div className="row">
                                <Shoes shoes={shoes}/>
                            </div>
                        </div>
                        <button onClick={getData}>더보기</button>
                    </>
                }/>
                <Route path={"/detail/:id"} element={
                    <Context1.Provider value={{item, shoes}}>>
                        <Detail shoes={shoes}/>
                    </Context1.Provider>
                }/>

                <Route path={"/about"} element={<About/>}>
                    <Route path={"member"} element={<div>멤버임</div>}/>
                    <Route path={"location"} element={<div>위치정보임</div>}/>
                </Route>

                <Route path={"/cart"} element={<Cart/>}/>

                <Route path={"/event"} element={<Event/>}>
                    <Route path={"one"} element={<div>첫 주문 시 양배추즙 서비스</div>}/>
                    <Route path={"two"} element={<div>생일기념 쿠폰받기</div>}/>
                </Route>

                <Route path={"*"} element={<div>없는 페이지에요~</div>}/>
            </Routes>
        </div>
    );
}

export default App;
