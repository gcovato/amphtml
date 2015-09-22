<!---
Copyright 2015 Itedi S.p.A. Authors All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

### <a name=”amp-bcvideo”></a> `amp-bcvideo`

The `amp-bcvideo` component uses the Brightcove API to find the best available source between all available renditions and sets the video source attribute to the related BrightCove url    

For more information please refer to amp-video component description

Example:
    <amp-bcvideo 
    	width=486 
    	height=657
        layout="responsive"
        data-bcVideoid="4498825223001"
        data-bcAuthToken="yourBrightcoveAuthToken"
        controls>

**CAVEATS**



#### Attributes

**data-bcVideoid**

The ID of the video.

**data-bcAuthToken**

The authorization token of your Brightcove account
