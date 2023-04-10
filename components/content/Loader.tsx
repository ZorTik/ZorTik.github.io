import {Circles} from "react-loader-spinner";
import {Row} from "react-bootstrap";
import styled from "styled-components";

const LoaderRow = styled(Row)`
  padding: 20px 0;
  justify-content: center !important;
`;
const Loader = () => {
    return <LoaderRow>
        <Circles wrapperStyle={{maxWidth: "fit-content", justifySelf: "center"}} height="80" width="80" color="gray" ariaLabel="loading" />
    </LoaderRow>
}
export default Loader;
