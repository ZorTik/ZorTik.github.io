import styled from "styled-components";
import {Form} from "react-bootstrap";

const FormComponent = styled(Form)`
  .form-label {
    color: var(--color-secondary);
    margin-top: 20px;
  }
  .form-control, input {
    border: none;
    outline: none;
    padding-left: 10px;
    border-radius: 5px;
    background-color: #475561;
    box-shadow: none;
    color: var(--color-secondary);

    :focus {
      border-radius: 0;
    }
  }
  button[type="submit"] {
    margin-top: 30px !important;
  }
`;

export {
    FormComponent
}
