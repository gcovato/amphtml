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

import {BaseElement} from '../src/base-element';
import {assertHttpsUrl} from '../src/url';
import {getLengthNumeral, isLayoutSizeDefined} from '../src/layout';
import {loadPromise} from '../src/event-helper';
import {registerElement} from '../src/custom-element';

function GetVideoData(videoid, apitoken)
{
    var bcURLrequest = 'https://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + videoid + '&video_fields=videoFullLength&media_delivery=http&callback=BCL.onSearchResponse&token=' + apitoken ;
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = bcURLrequest + (bcURLrequest.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

var BCL = new Object;
BCL.onSearchResponse = function(data) {
	var VideoData = JSONvideoData[0].url;
	this.element.setAttribute('src') =  VideoData.replace('http://','https://')
};

/**
 * @param {!Window} win Destination window for the new element.
 */
export function installVideo(win) {
  class AmpVideo extends BaseElement {

    /** @override */
    isLayoutSupported(layout) {
      return isLayoutSizeDefined(layout);
    }

    /** @override */
    layoutCallback() {
      // TODO(dvoytenko): Add re-layout as well.
      var width = this.element.getAttribute('width');
      var height = this.element.getAttribute('height');


      var video = document.createElement('video');

      if (this.element.getAttribute('videoid') && this.element.getAttribute('token') ) {

        var videoid = this.element.getAttribute('videoid');
        var token = this.element.getAttribute('token');
        var JSONvideoData = GetVideoData(videoid,token);
      }
      this.propagateAttributes(
          ['src', 'controls', 'autoplay', 'muted', 'loop'],
          video);
      video.width = getLengthNumeral(width);
      video.height = getLengthNumeral(height);
      this.applyFillContent(video);
      this.getRealChildNodes().forEach(child => {
        if (child.getAttribute && child.getAttribute('src')) {
          assertHttpsUrl(child.getAttribute('src'), child);
        }
        video.appendChild(child);
      });
      this.element.appendChild(video);
      return loadPromise(video);
    }
  }

  registerElement(win, 'amp-bcvideo', AmpVideo);
}
