import React, { PureComponent } from 'react';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import PdfDefaultRenderer from './PdfDefaultRenderer';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

export default class PdfViewer extends PureComponent {
  state = {
    currentDocIndex: null,
    currentDocPages: null,
    currentPage: 1,
    documentProxys: null,
  };

  constructor(props) {
    super(props);
    this.worker = new pdfjsLib.PDFWorker('pdf-viewer');
  }

  changeFile = index => {
    this.setState(() => ({ currentPage: 1, currentDocIndex: index }));
  };

  setCurrentPages = currentDocPages =>
    this.setState(() => ({ currentDocPages }));

  nextPage = () => {
    if (this.state.currentPage >= this.state.currentDocPages) return;

    return this.setState(state => ({
      ...state,
      currentPage: state.currentPage + 1,
    }));
  };

  prevPage = () => {
    if (this.state.currentPage <= 1) return;

    return this.setState(state => ({
      ...state,
      currentPage: state.currentPage - 1,
    }));
  };

  async componentDidMount() {
    const currentDocIndex = this.props.startWith || 0;
    this.setState(() => ({ currentDocIndex }));

    const documentProxys = await Promise.all(
      this.props.files.map(file =>
        pdfjsLib.getDocument({ url: file, worker: this.worker }),
      ),
    );

    this.setState(() => ({
      documentProxys,
      currentDocPages: documentProxys[currentDocIndex].numPages,
    }));
  }

  componentWillUnmount() {
    this.worker.destroy();
  }

  render() {
    const {
      currentDocIndex,
      currentPage,
      currentDocPages,
      documentProxys,
    } = this.state;

    const { files } = this.props;

    return (
      <div className="pdf-viewer">
        <div className="pdf-viewer-list">
          <ul>
            {files.map((file, index) => (
              <li
                className={index === currentDocIndex ? 'active' : ''}
                onClick={() => this.changeFile(index)}
                key={`${file}-${index}`}
              >
                {file}
              </li>
            ))}
          </ul>
        </div>

        <div className="pdf-renderer-container" id="pdf-renderer-container">
          {!documentProxys && (
            <div>{`Loading ${files.length} Pdf-Documents`}</div>
          )}
          {documentProxys !== null && (
            <PdfDefaultRenderer pdfDoc={documentProxys[currentDocIndex]} />
          )}
        </div>
      </div>
    );
  }
}
