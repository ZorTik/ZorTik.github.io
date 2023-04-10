import styled from "styled-components";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const QuillComponent = styled(ReactQuill)`
  > * {
    border: none !important;
  }
  .ql-toolbar {
    
  }
  .ql-container {
    background-color: var(--color-input);
    border-radius: 5px;
  }
`;

export default QuillComponent;
