### <a name=”amp-bcvideo”></a> `amp-bcvideo`

BrightCove Video Support 

#### Behavior

The `amp-bcvideo` component uses the Brightcove API to find the best available source between all available renditions and sets the video source attribute to the related brightcove url    

For more information please refer to amp-video component description

For example:

    <amp-bcvideo width=400 height=300 videoid='123456789' token='ghjkfghjbkuijjhbkjn..' >
      <amp-img placeholder width=400 height=300 src=”myvideo-poster.jpg”></amp-img>
      <div fallback>
        <p>Your browser doesn’t support HTML5 video</p>
      </div>
      <source type="video/mp4" src="foo.mp4">
      <source type="video/webm" src="foo.webm">
    </amp-video>

#### Attributes

For more information please refer to amp-video component description
