import { Text } from "../Text";
import { HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export interface BackLinkProps {
    text: string
}

export const BackLink = ({
    text
}: BackLinkProps) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(-1)}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                borderBottom: '2px solid #000',
                justifySelf: 'flex-start',
            }}>
            <HiArrowSmLeft className="text-2xl" />
            <Text >{text}</Text>
        </div>
    )
};