### <a name=”amp-pixel”></a> `amp-pixel`

The `amp-pixel` element is meant to be used as a typical tracking pixel - to count page views.

#### Behavior

The `amp-pixel` component behaves like a simple tracking pixel `img`. It takes a single URL, but provides variables that can be replaced by the component in the URL string when making the request. See the `src` attribute for more information.

#### Attributes

**src**

A simple URL to send a GET request to when the tracking pixel is loaded.

The variables listed under the Substitutions paragraph can be used to interpolate certain values into the pixel URL.

#### Substitutions

**$RANDOM**

Use the special string `$RANDOM` to add a random number to the URL if required.

For instance:

    <amp-pixel src="https://foo.com/pixel?$RANDOM">

may make a request to something like `https://foo.com/pixel?0.8390278471201` where the $RANDOM value is randomly generated upon each impression.

**$CANONICAL_URL**

Use the special string `$CANONICAL_URL` to add the canonical URL of the current document to the URL

For instance:

     <amp-pixel src="https://foo.com/pixel?href=$CANONICAL_URL">

may make a request to something like `https://foo.com/pixel?href=https%3A%2F%2Fpinterest.com%2F`.

#### Styling

`amp-pixel` should not be styled.
