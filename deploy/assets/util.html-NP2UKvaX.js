import{_ as e,c as s,f as a,o as t}from"./app-B8TszOv9.js";const o={};function c(i,n){return t(),s("div",null,n[0]||(n[0]=[a(`<h1 id="util" tabindex="-1"><a class="header-anchor" href="#util"><span>Util</span></a></h1><p>On this page you can find documentation for some utility classes and methods.</p><h2 id="device-class" tabindex="-1"><a class="header-anchor" href="#device-class"><span>Device Class</span></a></h2><p>This class can be accessed from <code>Flame.device</code> and it has some methods that can be used to control the state of the device, for instance you can change the screen orientation and set whether the application should be fullscreen or not.</p><h3 id="flame-device-fullscreen" tabindex="-1"><a class="header-anchor" href="#flame-device-fullscreen"><span><code>Flame.device.fullScreen()</code></span></a></h3><p>When called, this disables all <code>SystemUiOverlay</code> making the app full screen. When called in the main method, it makes your app full screen (no top nor bottom bars).</p><p><strong>Note:</strong> It has no effect when called on the web.</p><h3 id="flame-device-setlandscape" tabindex="-1"><a class="header-anchor" href="#flame-device-setlandscape"><span><code>Flame.device.setLandscape()</code></span></a></h3><p>This method sets the orientation of the whole application (effectively, also the game) to landscape and depending on operating system and device setting, should allow both left and right landscape orientations. To set the app orientation to landscape on a specific direction, use either <code>Flame.device.setLandscapeLeftOnly</code> or <code>Flame.device.setLandscapeRightOnly</code>.</p><p><strong>Note:</strong> It has no effect when called on the web.</p><h3 id="flame-device-setportrait" tabindex="-1"><a class="header-anchor" href="#flame-device-setportrait"><span><code>Flame.device.setPortrait()</code></span></a></h3><p>This method sets the orientation of the whole application (effectively, also the game) to portrait and depending on operating system and device setting, it should allow for both up and down portrait orientations. To set the app orientation to portrait for a specific direction, use either <code>Flame.device.setPortraitUpOnly</code> or <code>Flame.device.setPortraitDownOnly</code>.</p><p><strong>Note:</strong> It has no effect when called on the web.</p><h3 id="flame-device-setorientation-and-flame-device-setorientations" tabindex="-1"><a class="header-anchor" href="#flame-device-setorientation-and-flame-device-setorientations"><span><code>Flame.device.setOrientation()</code> and <code>Flame.device.setOrientations()</code></span></a></h3><p>If a finer control of the allowed orientations is required (without having to deal with <code>SystemChrome</code> directly), <code>setOrientation</code> (accepts a single <code>DeviceOrientation</code> as a parameter) and <code>setOrientations</code> (accepts a <code>List&lt;DeviceOrientation&gt;</code> for possible orientations) can be used.</p><p><strong>Note:</strong> It has no effect when called on the web.</p><h2 id="timer" tabindex="-1"><a class="header-anchor" href="#timer"><span>Timer</span></a></h2><p>Flame provides a simple utility class to help you handle countdowns and timer state changes like events.</p><p>Countdown example:</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/components.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/game.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/input.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/material.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> <span class="token class-name">TextPaint</span> textPaint <span class="token operator">=</span> <span class="token class-name">TextPaint</span><span class="token punctuation">(</span></span>
<span class="line">    style<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>white<span class="token punctuation">,</span> fontSize<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">final</span> countdown <span class="token operator">=</span> <span class="token class-name">Timer</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span>double dt<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    countdown<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>dt<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>countdown<span class="token punctuation">.</span>finished<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// Prefer the timer callback, but this is better in some cases</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    textPaint<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span></span>
<span class="line">      canvas<span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;Countdown: </span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">countdown<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Interval example:</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/components.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/game.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/input.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/material.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> <span class="token class-name">TextPaint</span> textPaint <span class="token operator">=</span> <span class="token class-name">TextPaint</span><span class="token punctuation">(</span></span>
<span class="line">    style<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>white<span class="token punctuation">,</span> fontSize<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token class-name">Timer</span> interval<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  int elapsedSecs <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">MyGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    interval <span class="token operator">=</span> <span class="token class-name">Timer</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">      onTick<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> elapsedSecs <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">      repeat<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span>double dt<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    interval<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>dt<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    textPaint<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>canvas<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Elapsed time: </span><span class="token interpolation"><span class="token punctuation">$</span><span class="token expression">elapsedSecs</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Timer</code> instances can also be used inside a <code>FlameGame</code> game by using the <code>TimerComponent</code> class.</p><p><code>TimerComponent</code> example:</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/timer.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/components.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/game.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyFlameGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token class-name">MyFlameGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">add</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token class-name">TimerComponent</span><span class="token punctuation">(</span></span>
<span class="line">        period<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span></span>
<span class="line">        repeat<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        onTick<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;10 seconds elapsed&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="time-scale" tabindex="-1"><a class="header-anchor" href="#time-scale"><span>Time Scale</span></a></h2><p>In many games it is often desirable to create slow-motion or fast-forward effects based on some in game events. A very common approach to achieve these results is to manipulate the in game time or tick rate.</p><p>To make this manipulation easier, Flame provides a <code>HasTimeScale</code> mixin. This mixin can be attached to any Flame <code>Component</code> and exposes a simple get/set API for <code>timeScale</code>. The default value of <code>timeScale</code> is <code>1</code>, implying in-game time of the component is running at the same speed as real life time. Setting it to <code>2</code> will make the component tick twice as fast and setting it to <code>0.5</code> will make it tick at half the speed as compared to real life time. This mixin also provides <code>pause</code> and <code>resume</code> methods, which can be used instead of manually setting the timeScale to 0 and 1 respectively.</p><p>Since <code>FlameGame</code> is a <code>Component</code> too, this mixin can be attached to the <code>FlameGame</code> as well. Doing so will allow controlling time scale for all the component of the game from a single place.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">HasTimeScale cannot control the movement of BodyComponent from flame_forge2d individually.</span>
<span class="line">It is only useful if the whole Game or Forge2DWorld is to be time scaled.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">:sources: ../flame/examples</span>
<span class="line">:page: time_scale</span>
<span class="line">:show: widget code infobox</span>
<span class="line">:width: 180</span>
<span class="line">:height: 160</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/components.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/game.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyFlameGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token keyword">with</span> <span class="token class-name">HasTimeScale</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">speedUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    timeScale <span class="token operator">=</span> <span class="token number">2.0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">slowDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    timeScale <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extensions" tabindex="-1"><a class="header-anchor" href="#extensions"><span>Extensions</span></a></h2><p>Flame bundles a collection of utility extensions, these extensions are meant to help the developer with shortcuts and conversion methods, here you can find the summary of those extensions.</p><p>They can all be imported from <code>package:flame/extensions.dart</code></p><h3 id="canvas" tabindex="-1"><a class="header-anchor" href="#canvas"><span>Canvas</span></a></h3><p>Methods:</p><ul><li><code>scaleVector</code>: Just like <code>canvas scale</code> method, but takes a <code>Vector2</code> as an argument.</li><li><code>translateVector</code>: Just like <code>canvas translate</code> method, but takes a <code>Vector2</code> as an argument.</li><li><code>renderPoint</code>: renders a single point on the canvas (mostly for debugging purposes).</li><li><code>renderAt</code> and <code>renderRotated</code>: if you are directly rendering to the <code>Canvas</code>, you can use these functions to easily manipulate coordinates to render things on the correct places. They change the <code>Canvas</code> transformation matrix but reset afterwards.</li></ul><h3 id="color" tabindex="-1"><a class="header-anchor" href="#color"><span>Color</span></a></h3><p>Methods:</p><ul><li><code>darken</code>: Darken the shade of the color by an amount between 0 to 1.</li><li><code>brighten</code>: Brighten the shade of the color by an amount between 0 to 1.</li></ul><p>Factories:</p><ul><li><code>ColorExtension.fromRGBHexString</code>: Parses an RGB color from a valid hex string (e.g. #1C1C1C).</li><li><code>ColorExtension.fromARGBHexString</code>: Parses an ARGB color from a valid hex string (e.g. #FF1C1C1C).</li></ul><h3 id="image" tabindex="-1"><a class="header-anchor" href="#image"><span>Image</span></a></h3><p>Methods:</p><ul><li><code>pixelsInUint8</code>: Retrieves the pixel data as a <code>Uint8List</code>, in the <code>ImageByteFormat.rawRgba</code> pixel format, for the image.</li><li><code>getBoundingRect</code>: Get the bounding rectangle of the <code>Image</code> as a <code>Rect</code>.</li><li><code>size</code>: The size of an <code>Image</code> as <code>Vector2</code>.</li><li><code>darken</code>: Darken each pixel of the <code>Image</code> by an amount between 0 to 1.</li><li><code>brighten</code>: Brighten each pixel of the <code>Image</code> by an amount between 0 to 1.</li></ul><h3 id="offset" tabindex="-1"><a class="header-anchor" href="#offset"><span>Offset</span></a></h3><p>Methods;</p><ul><li><code>toVector2</code>; Creates an <code>Vector2</code> from the <code>Offset</code>.</li><li><code>toSize</code>: Creates a <code>Size</code> from the <code>Offset</code>.</li><li><code>toPoint</code>: Creates a <code>Point</code> from the <code>Offset</code>.</li><li><code>toRect</code>: Creates a <code>Rect</code> starting in (0,0) and its bottom right corner is the [Offset].</li></ul><h3 id="rect" tabindex="-1"><a class="header-anchor" href="#rect"><span>Rect</span></a></h3><p>Methods:</p><ul><li><code>toOffset</code>: Creates an <code>Offset</code> from the <code>Rect</code>.</li><li><code>toVector2</code>: Creates a <code>Vector2</code> starting in (0,0) and goes to the size of the <code>Rect</code>.</li><li><code>containsPoint</code> Whether this <code>Rect</code> contains a <code>Vector2</code> point or not.</li><li><code>intersectsSegment</code>; Whether the segment formed by two <code>Vector2</code>s intersects this <code>Rect</code>.</li><li><code>intersectsLineSegment</code>: Whether the <code>LineSegment</code> intersects the <code>Rect</code>.</li><li><code>toVertices</code>: Turns the four corners of the <code>Rect</code> into a list of <code>Vector2</code>.</li><li><code>toFlameRectangle</code>: Converts this <code>Rect</code> into a Flame <code>Rectangle</code>.</li><li><code>toMathRectangle</code>: Converts this <code>Rect</code> into a <code>math.Rectangle</code>.</li><li><code>toGeometryRectangle</code>: Converts this <code>Rect</code> into a <code>Rectangle</code> from flame-geom.</li><li><code>transform</code>: Transforms the <code>Rect</code> using a <code>Matrix4</code>.</li></ul><p>Factories:</p><ul><li><code>RectExtension.getBounds</code>: Construct a <code>Rect</code> that represents the bounds of a list of <code>Vector2</code>s.</li><li><code>RectExtension.fromCenter</code>: Construct a <code>Rect</code> from a center point (using <code>Vector2</code>).</li></ul><h3 id="math-rectangle" tabindex="-1"><a class="header-anchor" href="#math-rectangle"><span>math.Rectangle</span></a></h3><p>Methods:</p><ul><li><code>toRect</code>: Converts this math <code>Rectangle</code> into an ui <code>Rect</code>.</li></ul><h3 id="size" tabindex="-1"><a class="header-anchor" href="#size"><span>Size</span></a></h3><p>Methods:</p><ul><li><code>toVector2</code>; Creates an <code>Vector2</code> from the <code>Size</code>.</li><li><code>toOffset</code>: Creates a <code>Offset</code> from the <code>Size</code>.</li><li><code>toPoint</code>: Creates a <code>Point</code> from the <code>Size</code>.</li><li><code>toRect</code>: Creates a <code>Rect</code> starting in (0,0) with the size of <code>Size</code>.</li></ul><h3 id="vector2" tabindex="-1"><a class="header-anchor" href="#vector2"><span>Vector2</span></a></h3><p>This class comes from the <code>vector_math</code> package and we have some useful extension methods on top of what is offered by that package.</p><p>Methods:</p><ul><li><code>toOffset</code>: Creates a <code>Offset</code> from the <code>Vector2</code>.</li><li><code>toPoint</code>: Creates a <code>Point</code> from the <code>Vector2</code>.</li><li><code>toRect</code>: Creates a <code>Rect</code> starting in (0,0) with the size of <code>Vector2</code>.</li><li><code>toPositionedRect</code>: Creates a <code>Rect</code> starting from [x, y] in the <code>Vector2</code> and has the size of the <code>Vector2</code> argument.</li><li><code>lerp</code>: Linearly interpolates the <code>Vector2</code> towards another Vector2.</li><li><code>rotate</code>: Rotates the <code>Vector2</code> with an angle specified in radians, it rotates around the optionally defined <code>Vector2</code>, otherwise around the center.</li><li><code>scaleTo</code>: Changes the length of the <code>Vector2</code> to the length provided, without changing direction.</li><li><code>moveToTarget</code>: Smoothly moves a Vector2 in the target direction by a given distance.</li></ul><p>Factories:</p><ul><li><code>Vector2Extension.fromInts</code>: Create a <code>Vector2</code> with ints as input.</li></ul><p>Operators:</p><ul><li><code>&amp;</code>: Combines two <code>Vector2</code>s to form a Rect, the origin should be on the left and the size on the right.</li><li><code>%</code>: Modulo/Remainder of x and y separately of two <code>Vector2</code>s.</li></ul><h3 id="matrix4" tabindex="-1"><a class="header-anchor" href="#matrix4"><span>Matrix4</span></a></h3><p>This class comes from the <code>vector_math</code> package. We have created a few extension methods on top of what is already offered by <code>vector_math</code>.</p><p>Methods:</p><ul><li><code>translate2</code>: Translate the <code>Matrix4</code> by the given <code>Vector2</code>.</li><li><code>transform2</code>: Create a new <code>Vector2</code> by transforming the given <code>Vector2</code> using the <code>Matrix4</code>.</li><li><code>transformed2</code>: Transform the input <code>Vector2</code> into the output <code>Vector2</code>.</li></ul><p>Getters:</p><ul><li><code>m11</code>: The first row and first column.</li><li><code>m12</code>: The first row and second column.</li><li><code>m13</code>: The first row and third column.</li><li><code>m14</code>: The first row and fourth column.</li><li><code>m21</code>: The second row and first column.</li><li><code>m22</code>: The second row and second column.</li><li><code>m23</code>: The second row and third column.</li><li><code>m24</code>: The second row and fourth column.</li><li><code>m31</code>: The third row and first column.</li><li><code>m32</code>: The third row and second column.</li><li><code>m33</code>: The third row and third column.</li><li><code>m34</code>: The third row and fourth column.</li><li><code>m41</code>: The fourth row and first column.</li><li><code>m42</code>: The fourth row and second column.</li><li><code>m43</code>: The fourth row and third column.</li><li><code>m44</code>: The fourth row and fourth column.</li></ul><p>Factories:</p><ul><li><code>Matrix4Extension.scale</code>: Create a scaled <code>Matrix4</code>. Either by passing a <code>Vector4</code> or <code>Vector2</code> as it&#39;s first argument, or by passing x y z doubles.</li></ul>`,76)]))}const p=e(o,[["render",c],["__file","util.html.vue"]]),d=JSON.parse('{"path":"/guide/flame/other/util.html","title":"Util","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Device Class","slug":"device-class","link":"#device-class","children":[{"level":3,"title":"Flame.device.fullScreen()","slug":"flame-device-fullscreen","link":"#flame-device-fullscreen","children":[]},{"level":3,"title":"Flame.device.setLandscape()","slug":"flame-device-setlandscape","link":"#flame-device-setlandscape","children":[]},{"level":3,"title":"Flame.device.setPortrait()","slug":"flame-device-setportrait","link":"#flame-device-setportrait","children":[]},{"level":3,"title":"Flame.device.setOrientation() and Flame.device.setOrientations()","slug":"flame-device-setorientation-and-flame-device-setorientations","link":"#flame-device-setorientation-and-flame-device-setorientations","children":[]}]},{"level":2,"title":"Timer","slug":"timer","link":"#timer","children":[]},{"level":2,"title":"Time Scale","slug":"time-scale","link":"#time-scale","children":[]},{"level":2,"title":"Extensions","slug":"extensions","link":"#extensions","children":[{"level":3,"title":"Canvas","slug":"canvas","link":"#canvas","children":[]},{"level":3,"title":"Color","slug":"color","link":"#color","children":[]},{"level":3,"title":"Image","slug":"image","link":"#image","children":[]},{"level":3,"title":"Offset","slug":"offset","link":"#offset","children":[]},{"level":3,"title":"Rect","slug":"rect","link":"#rect","children":[]},{"level":3,"title":"math.Rectangle","slug":"math-rectangle","link":"#math-rectangle","children":[]},{"level":3,"title":"Size","slug":"size","link":"#size","children":[]},{"level":3,"title":"Vector2","slug":"vector2","link":"#vector2","children":[]},{"level":3,"title":"Matrix4","slug":"matrix4","link":"#matrix4","children":[]}]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":2,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/other/util.md"}');export{p as comp,d as data};
