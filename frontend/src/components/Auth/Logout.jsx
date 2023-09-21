import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';


function Logout() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("isAuth", "false")
        enqueueSnackbar('User Logged Out successfully', { variant: 'success' });
        navigate("/")
    }

    return (
        <div className='flex justify-center items-center gap-x-4'>
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={handleLogout}
        >
            Logout
        </button>
      </div >
    );
}

export default Logout;