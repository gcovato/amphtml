/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {isLayoutSizeDefined} from '../../../src/layout';
import {loadPromise} from '../../../src/event-helper';


class AmpBCVideo extends AMP.BaseElement {
  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }
  /** @override */
  layoutCallback() {
    var width = this.element.getAttribute('width');
    var height = this.element.getAttribute('height');
    var bcVideoid = AMP.assert(this.element.getAttribute('data-bcVideoid'),
        'The data-bcVideoid attribute is required for <amp-bcvideo> %s',
        this.element);
    var bcAuthToken = AMP.assert(this.element.getAttribute('data-bcAuthToken'),
        'The data-bcAuthToken attribute is required for <amp-bcvideo> %s',
        this.element);

    var bcURLrequest = 'https://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + encodeURIComponent(bcVideoid) + '&video_fields=videoFullLength&media_delivery=http&callback=BCL.onSearchResponse&token=' + encodeURIComponent(bcAuthToken);
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    window["BCL"] = new Object;
    BCL.onSearchResponse = function(data) {
      var VideoURL = data.videoFullLength.url;
//      var bcURLrequest = VideoURL.replace('http://','https://');
      var bcURLrequest = VideoURL;
      iframe.src = bcURLrequest;
    };

    var script = document.createElement('script');
    script.src = bcURLrequest + (bcURLrequest.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    this.applyFillContent(iframe);
    iframe.width = width;
    iframe.height = height;
    this.element.appendChild(iframe);
    return loadPromise(iframe);
  }
};

AMP.registerElement('amp-bcvideo', AmpBCVideo);
