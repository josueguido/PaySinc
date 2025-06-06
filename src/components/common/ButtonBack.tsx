import { useNavigate } from "react-router";

function ButtonBack() {
    const navigate = useNavigate();
    return ( 
        <div className="px-6 py-4">
        <button
            className="text-blue-600 hover:underline flex items-center"
            onClick={() => navigate("/app")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
            >
                <path
                    fill="currentColor"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                />
                <path
                    fill="currentColor"
                    d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                />
            </svg>
        </button>
    </div>
     );
}

export default ButtonBack;