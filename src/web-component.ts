import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('web-component')
export class LitWebComponent extends LitElement {

  @property({type: Boolean})
  isModalVisible = false;

  @property({type: String, attribute: true})
  title!: string;

  render() {
    return html`
      <div id="modalOverlay" class="overlay ${this.isModalVisible ? 'show' : 'hide'}">
        <div class="modal">
          <div class="modal_header">
            ${this.title ? html`<h2>${this.title}</h2>` : ''}
            <span class="close-btn" @click=${this.closeModal}>🅧</span>
          </div>
          <slot></slot>
        </div>
      </div>
      <div class="floating-button-container">
        <button @click=${this.showModal} class="floating-button">
          <span>🚀 GO!</span>
        </button>
      </div>`
  }

  static styles = css`
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }

    .floating-button-container {
      position: fixed;
      z-index: 999;
      bottom: 20px;
      right: 20px;
    }

    .floating-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #3498db;
      color: #fff;
      border: none;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 768px) {
        align-items: flex-start;
        padding-top: 1rem;
      }
    }

    .modal {
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      max-width: 80%;
      width: 300px; /* Optional, you can adjust this value based on your design */
    }
    
    .modal_header {
      display: flex;
      justify-content: space-between;
    }
    
    .modal_header h2 {
      margin: 0;
    }

    .close-btn {
      cursor: pointer;
      font-weight: bold;
      color: #333;
    }
    
    .show {
      display: flex;
    }
    
    .hide {
      display: none;
    }
  `

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('modal', this.handleCustomEvent)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('modal', this.handleCustomEvent);
  }

  handleCustomEvent(event: any) {
    const status = event.detail.modalStatus;
    console.log('Modal status:', status);
  }

  dispatchModalStatus() {
    const status = new CustomEvent('modal', {
      detail: {
        modalStatus: this.isModalVisible
      }
    });
    // you can dispatch an event either for the document or the element itself
    document.dispatchEvent(status);
  }

  showModal() {
    this.isModalVisible = true;
    this.dispatchModalStatus();
  }

  closeModal() {
    this.isModalVisible = false;
    this.dispatchModalStatus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'web-component': LitWebComponent
  }
}
