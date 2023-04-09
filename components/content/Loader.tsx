import {Circles} from "react-loader-spinner";
import {Row} from "react-bootstrap";
import styled from "styled-components";

const LoaderRow = styled(Row)`
  padding: 20px 0;
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
`;
const Loader = () => {
    return <LoaderRow>
        <Circles wrapperStyle={{maxWidth: "fit-content"}} height="80" width="80" color="gray" ariaLabel="loading" />
    </LoaderRow>
}
export default Loader;
