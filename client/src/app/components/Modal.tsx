"use client";
import { useAppContext } from "../context/AppContext";
import AddProducts from "./AddProducts";

const Modal = () => {
  const { showModal, setShowModal } = useAppContext();

  const renderModalContent = () => {
    switch (showModal) {
      case "addProducts":
        return (
          <section className="w-[100%] md:w-[70vw] bg-white px-[1rem] py-[2rem] rounded-[1rem]">
            <h2 className="text-[#252C32] font-bold  text-[1.15rem] md:text-[1.5rem]">
              Add new Product
            </h2>
            <AddProducts />
          </section>
        );
      case "editProducts":
        return <div>Edit Products Component</div>;
      case "deleteProducts":
        return <div>Delete Products Component</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {showModal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50 overflow-auto  flex justify-center items-center">
          <div className="m-auto py-[2rem] lg:p-8">
            <div className="relative flex flex-col items-center">
              <div className="top-[1rem] right-[2rem] text-primary_black z-10 absolute">
                <button type="button" onClick={() => setShowModal(null)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7L17 17M7 17L17 7"
                      stroke="#363636"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {renderModalContent()}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
