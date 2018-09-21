import React, { Fragment, PureComponent } from 'react';
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
import './PdfDefaultRenderer.css';

class PdfDefaultRenderer extends PureComponent {
  state = {
    pdfDoc: null,
  };

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.pdfViewer = null;
  }

  componentDidMount() {
    this.pdfViewer = new PDFViewer({
      container: this.container.current,
    });

    this.pdfViewer.setDocument(this.props.pdfDoc);
  }

  render() {
    if (this.pdfViewer) {
      this.pdfViewer.setDocument(this.props.pdfDoc);
    }

    return (
      <Fragment>
        <div className="viewerControls">
          <button
            onClick={() => {
              this.pdfViewer.currentScaleValue = 0.5;
            }}
          >
            Zoom Out
          </button>
          <button
            onClick={() => {
              this.pdfViewer.currentScaleValue = 1;
            }}
          >
            Zoom In
          </button>
        </div>
        <div ref={this.container} id="viewerContainer">
          <div id="viewer" className="pdfViewer" />
        </div>
      </Fragment>
    );
  }
}

export default PdfDefaultRenderer;
