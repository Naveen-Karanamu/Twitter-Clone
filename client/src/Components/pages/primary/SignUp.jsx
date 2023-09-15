import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import tx_image from "../../../assets/images/tx.png";

// Icons
import { signUp } from "../../../Redux/Reducer/Auth/auth.action";

const SignUp = () => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/signin`;
    history.push(path);
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const dispatch = useDispatch();

  const submit = async () => {
    setUserData({
      email: "",
      password: "",
      fullname: "",
      username: "",
    });

    try {
      const dispatchData = await dispatch(signUp(userData));
      // console.log("Response from signUp:", dispatchData);

      if (dispatchData.status === "registered") {
        history.push("/signin");
      } else {
        alert("An error occurred during sign-up. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="flex gap-10 justify-center items-center mx-44">
      <div className="w-full h-full justify-center items-center">
        <img src={tx_image} alt="logo" />
      </div>
      <div className=" w-full flex flex-col">
        <h1 className="text-5xl font-bold my-10 mx-16">Happening Now</h1>
        <div className=" h-full bg-signBg-100h-screen flex justify-center items-center">
          <div className="inline-block w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white  rounded-lg ">
            <div
              as="h3"
              className="text-3xl font-medium leading-6 text-gray-700 pb-10 text-center"
            >
              Join Today.
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <form className="flex flex-col gap-5">
                <div>
                  <p>Name</p>
                  <div className="flex  items-center gap-3 ">
                    <input
                      type="text"
                      name="review"
                      onChange={handleChange}
                      placeholder="Full Name"
                      id="fullname"
                      value={userData.fullname}
                      className=" bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
                    />
                  </div>
                </div>
                <div>
                  <p>Username</p>
                  <div className="flex items-center gap-3  ">
                    <input
                      type="text"
                      name="review"
                      onChange={handleChange}
                      placeholder="UserName"
                      id="username"
                      value={userData.username}
                      className="bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
                    />
                  </div>
                </div>
                <div>
                  <p>Email</p>
                  <div className="flex items-center gap-3  ">
                    <input
                      type="email"
                      name="review"
                      onChange={handleChange}
                      placeholder="Email"
                      id="email"
                      value={userData.email}
                      className="bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
                    />
                  </div>
                </div>
                <div>
                  <p>Password</p>
                  <div className="flex items-center gap-3  ">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                      id="password"
                      value={userData.password}
                      className="bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
                    />
                  </div>
                </div>

                <div className="flex items-top gap-2">
                  <input type="checkbox" id="terms" className="md:w-5 md:h-5" />
                  <lable htmlFor="terms" className="text-gray-500 text-xs ">
                    Remember me
                  </lable>
                </div>

                <div className="flex items-center justify-center">
                  <div
                    className=" text-white py-2 rounded-3xl  w-full text-center hover:cursor-pointer bg-blueT-100"
                    onClick={submit}
                  >
                    Create Account
                  </div>
                </div>
              </form>

              <div className="md:text-lg text-black flex justify-center">
                Already have an account? &nbsp;
                <span
                  className="text-blueT-100 font-bold hover:cursor-pointer"
                  onClick={routeChange}
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
