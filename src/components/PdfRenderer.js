import React, { PureComponent } from 'react';

class PdfRenderer extends PureComponent {
  state = {
    pdfDoc: null,
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.viewport = null;
    this.scale = 0.8;
  }

  async renderPage(num) {
    const { pdfDoc } = this.props;
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport(this.scale);

    this.canvas.current.height = viewport.height;
    this.canvas.current.width = viewport.width;

    var renderContext = {
      canvasContext: this.ctx,
      viewport: viewport,
    };

    await page.render(renderContext);
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
  }

  render() {
    this.renderPage(this.props.page);

    return (
      <div className="pdf-renderer">
        <canvas ref={this.canvas} style={{ border: '1px solid black' }} />
      </div>
    );
  }
}

export default PdfRenderer;
