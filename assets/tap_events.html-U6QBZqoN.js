import{_ as e,c as a,f as s,o as t}from"./app-B8TszOv9.js";const o={};function p(i,n){return t(),a("div",null,n[0]||(n[0]=[s(`<h1 id="tap-events" tabindex="-1"><a class="header-anchor" href="#tap-events"><span>Tap Events</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">This document describes the new events API. The old (legacy) approach,</span>
<span class="line">which is still supported, is described in [](gesture_input.md).</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Tap events</strong> are one of the most basic methods of interaction with a Flame game. These events occur when the user touches the screen with a finger, or clicks with a mouse, or taps with a stylus. A tap can be &quot;long&quot;, but the finger isn&#39;t supposed to move during the gesture. Thus, touching the screen, then moving the finger, and then releasing -- is not a tap but a drag. Similarly, clicking a mouse button while the mouse is moving will also be registered as a drag.</p><p>Multiple tap events can occur at the same time, especially if the user has multiple fingers. Such cases will be handled correctly by Flame, and you can even keep track of the events by using their <code>pointerId</code> property.</p><p>For those components that you want to respond to taps, add the <code>TapCallbacks</code> mixin.</p><ul><li>This mixin adds four overridable methods to your component: <code>onTapDown</code>, <code>onTapUp</code>, <code>onTapCancel</code>, and <code>onLongTapDown</code>. By default, each of these methods does nothing, they need to be overridden in order to perform any function.</li><li>In addition, the component must implement the <code>containsLocalPoint()</code> method (already implemented in <code>PositionComponent</code>, so most of the time you don&#39;t need to do anything here) -- this method allows Flame to know whether the event occurred within the component or not.</li></ul><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">PositionComponent</span> <span class="token keyword">with</span> <span class="token class-name">TapCallbacks</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token class-name">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onTapUp</span><span class="token punctuation">(</span><span class="token class-name">TapUpEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Do something in response to a tap event</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tap-anatomy" tabindex="-1"><a class="header-anchor" href="#tap-anatomy"><span>Tap anatomy</span></a></h2><h3 id="ontapdown" tabindex="-1"><a class="header-anchor" href="#ontapdown"><span>onTapDown</span></a></h3><p>Every tap begins with a &quot;tap down&quot; event, which you receive via the <code>void onTapDown(TapDownEvent)</code> handler. The event is delivered to the first component located at the point of touch that has the <code>TapCallbacks</code> mixin. Normally, the event then stops propagation. However, you can force the event to also be delivered to the components below by setting <code>event.continuePropagation</code> to true.</p><p>The <code>TapDownEvent</code> object that is passed to the event handler, contains the available information about the event. For example, <code>event.localPosition</code> will contain the coordinate of the event in the current component&#39;s local coordinate system, whereas <code>event.canvasPosition</code> is in the coordinate system of the entire game canvas.</p><p>Every component that received an <code>onTapDown</code> event will eventually receive either <code>onTapUp</code> or <code>onTapCancel</code> with the same <code>pointerId</code>.</p><h3 id="onlongtapdown" tabindex="-1"><a class="header-anchor" href="#onlongtapdown"><span>onLongTapDown</span></a></h3><p>If the user holds their finger down for some time (as configured by the <code>.longTapDelay</code> property in <code>MultiTapDispatcher</code>), &quot;long tap&quot; will be triggered. This event invokes the <code>void onLongTapDown(TapDownEvent)</code> handler on those components that previously received the <code>onTapDown</code> event.</p><p>By default, the <code>.longTapDelay</code> is set to 300 milliseconds, what may be different of the system default. You can change this value by setting the <code>TapConfig.longTapDelay</code> value. It may also be useful for specific accessibility needs.</p><h3 id="ontapup" tabindex="-1"><a class="header-anchor" href="#ontapup"><span>onTapUp</span></a></h3><p>This event indicates successful completion of the tap sequence. It is guaranteed to only be delivered to those components that previously received the <code>onTapDown</code> event with the same pointer id.</p><p>The <code>TapUpEvent</code> object passed to the event handler contains the information about the event, which includes the coordinate of the event (i.e. where the user was touching the screen right before lifting their finger), and the event&#39;s <code>pointerId</code>.</p><p>Note that the device coordinates of the tap-up event will be the same (or very close) to the device coordinates of the corresponding tap-down event. However, the same cannot be said about the local coordinates. If the component that you&#39;re tapping is moving (as they often tend to in games), then you may find that the local tap-up coordinates are quite different from the local tap-down coordinates.</p><p>In extreme case, when the component moves away from the point of touch, the <code>onTapUp</code> event will not be generated at all: it will be replaced with <code>onTapCancel</code>. Note, however, that in this case the <code>onTapCancel</code> will be generated at the moment the user lifts or moves their finger, not at the moment the component moves away from the point of touch.</p><h3 id="ontapcancel" tabindex="-1"><a class="header-anchor" href="#ontapcancel"><span>onTapCancel</span></a></h3><p>This event occurs when the tap fails to materialize. Most often, this will happen if the user moves their finger, which converts the gesture from &quot;tap&quot; into &quot;drag&quot;. Less often, this may happen when the component being tapped moves away from under the user&#39;s finger. Even more rarely, the <code>onTapCancel</code> occurs when another widget pops over the game widget, or when the device turns off, or similar situations.</p><p>The <code>TapCancelEvent</code> object contains only the <code>pointerId</code> of the previous <code>TapDownEvent</code> which is now being canceled. There is no position associated with a tap-cancel.</p><h3 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h3><p>Play with the demo below to see the tap events in action.</p><p>The blue-ish rectangle in the middle is the component that has the <code>TapCallbacks</code> mixin. Tapping this component would create circles at the points of touch. Specifically, <code>onTapDown</code> event starts making the circle. The thickness of the circle will be proportional to the duration of the tap: after <code>onTapUp</code> the circle&#39;s stroke width will no longer grow. There will be a thin white stripe at the moment the <code>onLongTapDown</code> fires. Lastly, the circle will implode and disappear if you cause the <code>onTapCancel</code> event by moving the finger.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">:sources: ../flame/examples</span>
<span class="line">:page: tap_events</span>
<span class="line">:show: widget code</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mixins" tabindex="-1"><a class="header-anchor" href="#mixins"><span>Mixins</span></a></h2><p>This section describes in more details several mixins needed for tap event handling.</p><h3 id="tapcallbacks" tabindex="-1"><a class="header-anchor" href="#tapcallbacks"><span>TapCallbacks</span></a></h3><p>The <code>TapCallbacks</code> mixin can be added to any <code>Component</code> in order for that component to start receiving tap events.</p><p>This mixin adds methods <code>onTapDown</code>, <code>onLongTapDown</code>, <code>onTapUp</code>, and <code>onTapCancel</code> to the component, which by default don&#39;t do anything, but can be overridden to implement any real functionality. There is no need to override all of them either: for example, you can override only <code>onTapUp</code> if you wish to respond to &quot;real&quot; taps only.</p><p>Another crucial detail is that a component will only receive tap events that occur <em>within</em> that component, as judged by the <code>containsLocalPoint()</code> function. The commonly-used <code>PositionComponent</code> class provides such an implementation based on its <code>size</code> property. Thus, if your component derives from a <code>PositionComponent</code>, then make sure that you set its size correctly. If, however, your component derives from the bare <code>Component</code>, then the <code>containsLocalPoint()</code> method must be implemented manually.</p><p>If your component is a part of a larger hierarchy, then it will only receive tap events if its parent has implemented the <code>containsLocalPoint</code> correctly.</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token keyword">with</span> <span class="token class-name">TapCallbacks</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> _rect <span class="token operator">=</span> <span class="token keyword">const</span> <span class="token class-name">Rect</span><span class="token punctuation">.</span><span class="token function">fromLTWH</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">final</span> _paint <span class="token operator">=</span> <span class="token class-name">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  bool _isPressed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  bool <span class="token function">containsLocalPoint</span><span class="token punctuation">(</span><span class="token class-name">Vector2</span> point<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> _rect<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>point<span class="token punctuation">.</span><span class="token function">toOffset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onTapDown</span><span class="token punctuation">(</span><span class="token class-name">TapDownEvent</span> event<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> _isPressed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onTapUp</span><span class="token punctuation">(</span><span class="token class-name">TapUpEvent</span> event<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> _isPressed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onTapCancel</span><span class="token punctuation">(</span><span class="token class-name">TapCancelEvent</span> event<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> _isPressed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    _paint<span class="token punctuation">.</span>color <span class="token operator">=</span> _isPressed<span class="token operator">?</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>red <span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>white<span class="token punctuation">;</span></span>
<span class="line">    canvas<span class="token punctuation">.</span><span class="token function">drawRect</span><span class="token punctuation">(</span>_rect<span class="token punctuation">,</span> _paint<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="doubletapcallbacks" tabindex="-1"><a class="header-anchor" href="#doubletapcallbacks"><span>DoubleTapCallbacks</span></a></h3><p>Flame also offers a mixin named <code>DoubleTapCallbacks</code> to receive a double-tap event from the component. To start receiving double tap events in a component, add the <code>DoubleTapCallbacks</code> mixin to your <code>PositionComponent</code>.</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">PositionComponent</span> <span class="token keyword">with</span> <span class="token class-name">DoubleTapCallbacks</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onDoubleTapUp</span><span class="token punctuation">(</span><span class="token class-name">DoubleTapEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/// Do something</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onDoubleTapCancel</span><span class="token punctuation">(</span><span class="token class-name">DoubleTapCancelEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/// Do something</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onDoubleTapDown</span><span class="token punctuation">(</span><span class="token class-name">DoubleTapDownEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/// Do something</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="migration" tabindex="-1"><a class="header-anchor" href="#migration"><span>Migration</span></a></h2><p>If you have an existing game that uses <code>Tappable</code>/<code>Draggable</code> mixins, then this section will describe how to transition to the new API described in this document. Here&#39;s what you need to do:</p><p>Take all of your components that uses these mixins, and replace them with <code>TapCallbacks</code>/<code>DragCallbacks</code>. The methods <code>onTapDown</code>, <code>onTapUp</code>, <code>onTapCancel</code> and <code>onLongTapDown</code> will need to be adjusted for the new API:</p><ul><li>The argument pair such as <code>(int pointerId, TapDownDetails details)</code> was replaced with a single event object <code>TapDownEvent event</code>.</li><li>There is no return value anymore, but if you need to make a component to pass-through the taps to the components below, then set <code>event.continuePropagation</code> to true. This is only needed for <code>onTapDown</code> events -- all other events will pass-through automatically.</li><li>If your component needs to know the coordinates of the point of touch, use <code>event.localPosition</code> instead of computing it manually. Properties <code>event.canvasPosition</code> and <code>event.devicePosition</code> are also available.</li><li>If the component is attached to a custom ancestor then make sure that ancestor also have the correct size or implement <code>containsLocalPoint()</code>.</li></ul>`,42)]))}const l=e(o,[["render",p],["__file","tap_events.html.vue"]]),d=JSON.parse('{"path":"/guide/flame/inputs/tap_events.html","title":"Tap Events","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Tap anatomy","slug":"tap-anatomy","link":"#tap-anatomy","children":[{"level":3,"title":"onTapDown","slug":"ontapdown","link":"#ontapdown","children":[]},{"level":3,"title":"onLongTapDown","slug":"onlongtapdown","link":"#onlongtapdown","children":[]},{"level":3,"title":"onTapUp","slug":"ontapup","link":"#ontapup","children":[]},{"level":3,"title":"onTapCancel","slug":"ontapcancel","link":"#ontapcancel","children":[]},{"level":3,"title":"Demo","slug":"demo","link":"#demo","children":[]}]},{"level":2,"title":"Mixins","slug":"mixins","link":"#mixins","children":[{"level":3,"title":"TapCallbacks","slug":"tapcallbacks","link":"#tapcallbacks","children":[]},{"level":3,"title":"DoubleTapCallbacks","slug":"doubletapcallbacks","link":"#doubletapcallbacks","children":[]}]},{"level":2,"title":"Migration","slug":"migration","link":"#migration","children":[]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":2,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/inputs/tap_events.md"}');export{l as comp,d as data};