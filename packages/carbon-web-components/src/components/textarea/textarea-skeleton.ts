/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './textarea.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Skeleton of text area.
 */
@customElement(`${prefix}-textarea-skeleton`)
class BXTextareaSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--label ${prefix}--skeleton"></span>
      <div class="${prefix}--skeleton ${prefix}--text-area"></div>
    `;
  }

  static styles = styles;
}

export default BXTextareaSkeleton;
