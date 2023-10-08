import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {changeAge} from "../store/userSlice";
import {increase} from "../store";
import {memo, useMemo, useState} from "react";

//useMemo – 컴포넌트 렌더링 시 1회만 실행해줌. 오래걸리는 작업에 사용하면 좋음
function testUseMemo() {
    return null;
}

// 꼭 필요할 때만 재렌더링 하려면 Memo 사용
let Child = memo( function () {
    console.log('재렌더링됨');
    return <div>자식임</div>
})

export const Cart = () => {

    const resultMemo = useMemo(() => {

    }, []);

    //Redux store 가져옴
    let state = useSelector((state) => state);
    // store에 요청을 보내주는 함수
    let dispatch = useDispatch();
    const [count, setCount] = useState(0);

    return (
        <div>
            <Child count={count}/>
            <button onClick={() => {
                setCount(count + 1);}}></button>
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
