import "../../styles/public/sign.css";
import Shop from "../../assets/public/SignIn/Shop.jpeg";

export function CreateAccount() {

    return (
        <>
        <div className="container">
            <div className="container-format-left ">
                <h1>CRUMBLY</h1>
                <div className="container-format">
                    <h3>CREATE TO YOUR ACCOUNT</h3>
                    <P></P>
                </div>
            </div>
            <div className="container-format-right">
                 <img src={Shop} alt="shoping" /> 
            </div>
        </div>
        </>
    );

}

export default CreateAccount