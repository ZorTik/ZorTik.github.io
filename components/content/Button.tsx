import styled, {css} from "styled-components";
import {Button} from "react-bootstrap";

const buttonStyle = css`
  background-color: unset !important;
  border: 1px solid #686c72 !important;
  color: #686c72;
  border-radius: 15px;
  padding: 1px 20px;
  align-self: end;
  margin-top: 10px;
  
  :hover, .active {
    background-color: #686c72 !important;
    color: #cdcccc;
  }
`;
const ButtonComponent = styled(Button)`${buttonStyle}`;

export {
    buttonStyle,
    ButtonComponent
}
