import {Tabs} from "react-bootstrap";
import styled from "styled-components";

const TabsComponent = styled(Tabs)`
  border-bottom: none !important;
  .nav-item {
    button {
      color: var(--color-secondary) !important;
      background-color: unset !important;
      border: none;
    }
    button:hover {
      color: var(--color-shade) !important;
    }
    button.active {
      color: var(--color-primary) !important;
      border-bottom: 1px solid var(--color-primary-dark) !important;
    }
  }
`;

export {
    TabsComponent
}
