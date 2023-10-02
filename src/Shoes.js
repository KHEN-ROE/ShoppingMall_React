const Shoes = (props) => {
    return (
        <>
            {props.shoes.map((shoe) => (
                <div className={"col-md-4"} key={shoe.id}>
                    <img src={`https://codingapple1.github.io/shop/shoes${shoe.id+1}.jpg`} width="80%" alt={"이미지"}/>
                    <h4>{shoe.title}</h4>
                    <p>{shoe.price}</p>
                </div>
            ))}
        </>
    );
}

export default Shoes;
