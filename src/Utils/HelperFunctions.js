import { toast } from "react-toastify";

const clearWaitingQueue = () => {
  // Easy, right 😎
  toast.dismiss()
};


export const handleInputError = (msg) => {
  clearWaitingQueue();
  toast.warn(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const handleApiError = (msg) => {
  clearWaitingQueue();
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
