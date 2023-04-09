import {Circles} from "react-loader-spinner";
import {Row} from "react-bootstrap";
import styled from "styled-components";

const LoaderRow = styled(Row)`
  padding: 20px 0;
`;

export default function Loader() {
    return <LoaderRow className="d-flex flex-row justify-content-center align-items-center">
        <Circles wrapperStyle={{maxWidth: "fit-content"}} height="80" width="80" color="gray" ariaLabel="loading" />
    </LoaderRow>;
}
