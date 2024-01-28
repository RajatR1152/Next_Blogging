import BeatLoader from "react-spinners/BeatLoader";

const overrides = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Spinner({ size, color }) {

    return (

        <div className="sweet-loading w-fit mx-auto text-center">
            <BeatLoader size={size} color={color} />
        </div>
    );
}

