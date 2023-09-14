// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { useDispatch } from "react-redux";

// const TweetCard = ({ isOpen, setIsOpen }) => {
//   function closeModal() {
//     setIsOpen(false);
//   }



//   const dispatch = useDispatch();

  
//   return (
//     <>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           onClose={closeModal}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0" />
//             </Transition.Child>
//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span className="inline-block h-screen align-middle" aria-hidden="true">
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-3xl font-medium leading-6 text-blueT-100 pb-10"
//                 >
//                   Add your New Tweet
//                 </Dialog.Title>
//                 <div className="mt-2 flex flex-col gap-4">
//                   <form className="flex flex-col gap-5">
//                     <div className="flex items-center gap-3  ">
//                       <input
//                         type="text"
//                         name="content"
//                         onChange={handleChange}
//                         placeholder="Add your thoughts..."
//                         value={content}
//                         id="content"
//                         className="bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <div
//                         className="bg-zomatoRed-300py-2 rounded-lg  w-full text-center hover:cursor-pointer"
//                         onClick={submit}
//                       >
//                         Post
//                       </div>
//                     </div>
//                   </form>
                 
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default TweetCard;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { createTweet } from "../../Redux/Reducer/Tweet/tweet.action"; 

const TweetCard = ({ isOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user); 

  const [content, setContent] = useState(""); 

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const submit = () => {
    if (content.trim() === "") {
      return;
    }

    dispatch(createTweet(content, user)); 
    closeModal(); 
    setContent("");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-medium leading-6 text-blueT-100 pb-10"
                >
                  Add your New Tweet
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-4">
                  <form className="flex flex-col gap-5">
                    <div className="flex items-center gap-3  ">
                      <input
                        type="text"
                        name="content"
                        onChange={handleChange}
                        placeholder="Add your thoughts..."
                        value={content}
                        id="content"
                        className="bg-white border border-gray-400 py-2 w-full  rounded-lg md:text-lg px-6"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <div
                        className="bg-zomatoRed-300 py-2 rounded-lg  w-full text-center hover:cursor-pointer"
                        onClick={submit}
                      >
                        Post
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TweetCard;
