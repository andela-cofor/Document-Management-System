import React, {PropTypes} from 'react';
import TinyMCE from 'react-tinymce';

const DocumentMarkdown = ({document, onChange}) => {
    return (
      <div>
        <TinyMCE
          content={document.content}
          config={{
            plugins: 'link image preview',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
          }}
          onChange={onChange}
        />
      </div>);
};

export default DocumentMarkdown;
