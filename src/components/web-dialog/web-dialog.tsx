import { Component, Host, h, Prop, Method } from '@stencil/core';

@Component({
  tag: 'web-dialog',
  styleUrl: 'web-dialog.css',
  shadow: true,
})
export class WebDialog {
  @Prop({
    attribute: 'show',
    mutable: true,
    reflect: true,
  })
  show: boolean = false;

  @Prop() showMask: boolean = true;

  @Prop() maskClosable: boolean = true;
  @Prop() hideFooter: boolean = true;

  @Prop({
    attribute: 'width',
    reflect: true,
  })
  width: string = '50%';

  @Prop({ attribute: 'header', reflect: true }) header: string = '';

  handlerClose = (event: Event) => {
    this.show = false;
    event.stopPropagation();
  };

  handlerMaskClose = (event: Event) => {
    if (this.maskClosable) {
      this.handlerClose(event);
    }
  };

  render() {
    return (
      <Host show={this.show} class={this.showMask ? 'is-mask' : null} onClick={this.handlerMaskClose}>
        <div class="dialog" style={{ width: this.width }} part="dialog">
          <div class="dialog-header" part="header">
            <slot name="header">{this.header}</slot>
          </div>
          <div class="dialog-body" part="body">
            <slot></slot>
          </div>
          {this.hideFooter ? null : (
            <div class="dialog-footer" part="footer">
              <slot></slot>
            </div>
          )}
          <div class="dialog-close" onClick={() => this.handlerClose}>
            ×
          </div>
        </div>
      </Host>
    );
  }

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.show = false;
  }
}
