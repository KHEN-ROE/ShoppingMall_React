import {Outlet} from "react-router-dom";

export const About = () => {
    return (
        <div>
            <h4>회사정보</h4>
            <Outlet></Outlet>
        </div>
    );
}
