import React, { PureComponent } from 'react';
import PdfViewer from './components/PdfViewer';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <PdfViewer
        startWith={0}
        files={[
          'testfiles/test-pdf-a.pdf',
          'testfiles/test-pdf-b.pdf',
          'testfiles/test-pdf-c.pdf',
        ]}
      />
    );
  }
}

export default App;
