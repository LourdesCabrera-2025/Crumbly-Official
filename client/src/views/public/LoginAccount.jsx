import "../../styles/public/sign.css";
import Shop from "../../assets/public/SignIn/Shop_dessert.jpg";
import { PersonFill, EnvelopeAtFill, KeyFill, BoxArrowInRight, Google } from "react-bootstrap-icons";
import { Button } from "@material-tailwind/react"
export function LoginAccount() {

    return (
        <>
            <div className="container-logs">
                <div className="container-format-right">
                    <img src={Shop} alt="shoping" />
                </div>
                <div className="container-format-left ">
                    <h1 className="type-logs">CRUMBLY</h1>
                    <div className="container-format mx-auto">
                        <h3 className="title-log">LOGIN TO YOUR ACCOUNT</h3>
                        <p className="subtitle">Login in to your account and browse all our products</p>
                    </div>
                    <form className="relative w-3/4 !mt-7 mx-auto" id="form-log">
                        <div className="relative">
                            <span className="absolute left-3 sm:left-5 md:left-10 top-1/2 -translate-y-1/2 text-[#3E2723] text-lg pointer-events-none ">
                                <PersonFill />
                            </span>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="
                        peer w-[325px]
                        border border-[#3E2723]
                        rounded-lg
                        !py-3 !pl-10 !pr-2
                        text-gray-900
                        placeholder-transparent
                        outline-none
                        transition-all
                        focus:border-[#333333]
                        focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"/>

                            <label htmlFor="username"
                                className="absolute  left-3 sm:left-5 md:left-10 text-[#3E2723]
                        pointer-events-none transition-all
                        bg-[#A5682A] px-1
                        top-1/2 -translate-y-1/2
                        
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:-translate-y-1/2

                        peer-focus:top-0
                        peer-focus:-translate-y-1/2
                        peer-focus:text-sm
                        peer-focus:text-[#333333]
                        " id="label-username">Enter your username </label>
                        </div>

                        <div className="relative !mt-5">
                            <span className="absolute  left-3 sm:left-5 md:left-10 top-1/2 -translate-y-1/2 text-[#3E2723] text-lg pointer-events-none ">
                                <KeyFill />
                            </span>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="
                        peer w-[325px]
                        border border-[#3E2723]
                        rounded-lg
                        !py-3 !pl-10 !pr-2
                        text-gray-900
                        placeholder-transparent
                        outline-none
                        transition-all
                        focus:border-[#333333]
                        focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"/>

                            <label htmlFor="password"
                                className="absolute   left-3 sm:left-5 md:left-10 text-[#3E2723]
                        pointer-events-none transition-all
                        bg-[#A5682A] px-1
                        top-1/2 -translate-y-1/2
                        
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:-translate-y-1/2

                        peer-focus:top-0
                        peer-focus:-translate-y-1/2
                        peer-focus:text-sm
                        peer-focus:text-[#333333]
                        " id="label-username">Enter your password </label>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                id="btn-login"
                                className="!mt-7 w-[325px] flex items-center justify-center gap-2"
                            >
                                <Google />
                                LOGIN ACCOUNT
                            </Button>
                        </div>
                        <div className="flex justify-center">

                            <hr className="!mt-6 w-[325px] border-gray-500 flex items-center justify-center gap-2" id="separator" />
                            <label htmlFor="separator" className="absolute !mt-4 bg-[#A5682A] w-[115px] " id="label">O Ingresar con </label>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                id="btn-login"
                                className="!mt-7 w-[325px] flex items-center justify-center gap-2"
                            >
                                <Google />
                                LOGIN ACCOUNT
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

}

export default LoginAccount