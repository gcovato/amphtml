/**
 * Copyright 2015 Itedi S.p.A. All Rights Reserved.
 *
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

import {BaseElement} from '../../../src/base-element';
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
    var layout = this.element.getAttribute('layout');
    var bcVideoid = AMP.assert(this.element.getAttribute('data-bcVideoid'),
        'The data-bcVideoid attribute is required for <amp-bcvideo> %s',
        this.element);
    var bcAuthToken = AMP.assert(this.element.getAttribute('data-bcAuthToken'),
        'The data-bcAuthToken attribute is required for <amp-bcvideo> %s',
        this.element);

    var bcURLrequest = 'https://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + encodeURIComponent(bcVideoid) + '&video_fields=videoFullLength,videoStillURL&media_delivery=http&callback=BCL.onSearchResponse&token=' + encodeURIComponent(bcAuthToken);
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };
    var _this = this;

    window["BCL"] = new Object;
    BCL.onSearchResponse = function(data) {
      var VideoURL = data.videoFullLength.url;
      var VideoURL = VideoURL.replace('http://','https://');
      var PosterURL = data.videoStillURL;
//      var PosterURL = VideoURL.replace('http://','https://');
      video.setAttribute("src", VideoURL);
      var poster = document.createElement('amp-img');
      poster.setAttribute("width", data.videoFullLength.frameWidth);
      poster.setAttribute("height", data.videoFullLength.frameHeight);
      poster.setAttribute("placeholder","");
      poster.setAttribute("src", PosterURL);
      _this.element.appendChild(poster);
    };

    var script = document.createElement('script');
    script.src = bcURLrequest + (bcURLrequest.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    var video = document.createElement('video');
    if (this.element.getAttribute('src')) {
      assertHttpsUrl(this.element.getAttribute('src'), this.element);
    }
    this.propagateAttributes(
        ['controls', 'autoplay', 'muted', 'loop'],
        video);
    video.width = width;
    video.height = height;
    this.applyFillContent(video);
    this.getRealChildNodes().forEach(child => {
      if (child.getAttribute && child.getAttribute('src')) {
        assertHttpsUrl(child.getAttribute('src'), child);
      }
      video.appendChild(child);
    });
    this.element.appendChild(video);
//javascritp    <amp-img placeholder width=\"" + pageContext.getAttribute("w") + "\" height=\"" + pageContext.getAttribute("h") + "\" src=\"" + pageContext.getAttribute("thumbUrl") + "\"></amp-img>
    return loadPromise(video);
  }
};

AMP.registerElement('amp-bcvideo', AmpBCVideo);
