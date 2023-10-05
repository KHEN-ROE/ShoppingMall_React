import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {changeAge} from "../store/userSlice";
import {increase} from "../store";


export const Cart = () => {

    //Redux store 가져옴
    let state = useSelector((state) => state);
    // store에 요청을 보내주는 함수
    let dispatch = useDispatch();

    return (
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={() => {
                dispatch(changeAge(100));
            }}>+
            </button>

            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.wishList.map((wishList, index) => (
                        <tr key={index}>
                            <td>{wishList.id}</td>
                            <td>{wishList.name}</td>
                            <td>{wishList.count}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(increase(wishList.id));
                                }}>+
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};
