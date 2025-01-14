/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSCardLink from '../card-link/card-link';
import '../card-link/card-link-heading';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import DDSCardCTAFooter from './card-cta-footer';
import './card-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card CTA.
 *
 * @element dds-card-cta
 */
@customElement(`${ddsPrefix}-card-link-cta`)
class DDSCardLinkCTA extends VideoCTAMixin(CTAMixin(DDSCardLink)) {
  protected _renderHeading() {
    const {
      ctaType,
      videoName,
      formatVideoCaption: formatVideoCaptionInEffect,
    } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderHeading();
    }
    const caption = formatVideoCaptionInEffect({ name: videoName });
    return html`
      <slot name="heading"></slot
      ><dds-card-link-heading>${caption}</dds-card-link-heading>
    `;
  }

  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration?: typeof formatVideoDuration;

  /**
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  /**
   * The video name.
   */
  @property({ attribute: 'video-name' })
  videoName?: string;

  /**
   * The video custom description.
   */
  @property({ attribute: 'video-description' })
  videoDescription?: string;

  /**
   * The video thumbnail URL.
   */
  @property({ attribute: 'video-thumbnail-url' })
  videoThumbnailUrl?: string;

  updated(changedProperties) {
    super.updated(changedProperties);
    const footer = this.querySelector(
      (this.constructor as typeof DDSCardLinkCTA).selectorFooter
    );
    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('formatCaption') ||
      changedProperties.has('formatDuration') ||
      changedProperties.has('videoDuration') ||
      changedProperties.has('videoName')
    ) {
      const {
        ctaType,
        videoDuration,
        videoName,
        videoDescription,
        formatVideoCaption: formatVideoCaptionInEffect,
        formatVideoDuration: formatVideoDurationInEffect,
      } = this;
      const headingText = this.querySelector(
        `${ddsPrefix}-card-link-heading`
      )?.textContent;
      const copyText = this.textContent;
      if (footer) {
        (footer as DDSCardCTAFooter).altAriaLabel =
          videoName || headingText || copyText;
        (footer as DDSCardCTAFooter).ctaType = ctaType;
        (footer as DDSCardCTAFooter).videoDuration = videoDuration;
        (footer as DDSCardCTAFooter).videoName = videoName;
        (footer as DDSCardCTAFooter).videoDescription = videoDescription;
        if (formatVideoCaptionInEffect) {
          (footer as DDSCardCTAFooter).formatVideoCaption =
            formatVideoCaptionInEffect;
        }
        if (formatVideoDurationInEffect) {
          (footer as DDSCardCTAFooter).formatVideoDuration =
            formatVideoDurationInEffect;
        }
      }
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-link-cta`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardLinkCTA;
