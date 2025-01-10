import{_ as t,c as p,a,b as s,d as l,e as i,f as c,r as o,o as r}from"./app-BZlJFCNj.js";const d={};function u(v,n){const e=o("RouteLink");return r(),p("div",null,[n[12]||(n[12]=a("h1",{id:"手势输入-gesture-input",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#手势输入-gesture-input"},[a("span",null,"手势输入 (Gesture Input)")])],-1)),a("p",null,[n[2]||(n[2]=s("以下是直接附加到游戏类的手势输入的文档。不过，大多数情况下，您可能更希望在组件上检测输入。例如，可以参考 ")),l(e,{to:"/guide/flame/inputs/tap_events.html"},{default:i(()=>n[0]||(n[0]=[s("TapCallbacks")])),_:1}),n[3]||(n[3]=s(" 和 ")),l(e,{to:"/guide/flame/inputs/drag_events.html"},{default:i(()=>n[1]||(n[1]=[s("DragCallbacks")])),_:1}),n[4]||(n[4]=s(" 的用法。"))]),n[13]||(n[13]=a("p",null,"其他输入相关文档：",-1)),a("ul",null,[a("li",null,[l(e,{to:"/guide/flame/inputs/keyboard_input.html"},{default:i(()=>n[5]||(n[5]=[s("键盘输入")])),_:1}),n[6]||(n[6]=s("：处理按键事件"))]),a("li",null,[l(e,{to:"/guide/flame/inputs/other_inputs.html"},{default:i(()=>n[7]||(n[7]=[s("其他输入")])),_:1}),n[8]||(n[8]=s("：处理摇杆、游戏手柄等输入"))])]),n[14]||(n[14]=c(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>在 <code>package:flame/gestures.dart</code> 中，提供了一整套可以混入到游戏类实例中的 <code>mixin</code>，用于接收触摸输入事件。以下是这些 <code>mixin</code> 和对应方法的完整列表：</p><h2 id="触摸和鼠标检测器" tabindex="-1"><a class="header-anchor" href="#触摸和鼠标检测器"><span>触摸和鼠标检测器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">- TapDetector</span>
<span class="line">  - onTap</span>
<span class="line">  - onTapCancel</span>
<span class="line">  - onTapDown</span>
<span class="line">  - onLongTapDown</span>
<span class="line">  - onTapUp</span>
<span class="line"></span>
<span class="line">- SecondaryTapDetector</span>
<span class="line">  - onSecondaryTapDown</span>
<span class="line">  - onSecondaryTapUp</span>
<span class="line">  - onSecondaryTapCancel</span>
<span class="line"></span>
<span class="line">- TertiaryTapDetector</span>
<span class="line">  - onTertiaryTapDown</span>
<span class="line">  - onTertiaryTapUp</span>
<span class="line">  - onTertiaryTapCancel</span>
<span class="line"></span>
<span class="line">- DoubleTapDetector</span>
<span class="line">  - onDoubleTap</span>
<span class="line"></span>
<span class="line">- LongPressDetector</span>
<span class="line">  - onLongPress</span>
<span class="line">  - onLongPressStart</span>
<span class="line">  - onLongPressMoveUpdate</span>
<span class="line">  - onLongPressUp</span>
<span class="line">  - onLongPressEnd</span>
<span class="line"></span>
<span class="line">- VerticalDragDetector</span>
<span class="line">  - onVerticalDragDown</span>
<span class="line">  - onVerticalDragStart</span>
<span class="line">  - onVerticalDragUpdate</span>
<span class="line">  - onVerticalDragEnd</span>
<span class="line">  - onVerticalDragCancel</span>
<span class="line"></span>
<span class="line">- HorizontalDragDetector</span>
<span class="line">  - onHorizontalDragDown</span>
<span class="line">  - onHorizontalDragStart</span>
<span class="line">  - onHorizontalDragUpdate</span>
<span class="line">  - onHorizontalDragEnd</span>
<span class="line">  - onHorizontalDragCancel</span>
<span class="line"></span>
<span class="line">- ForcePressDetector</span>
<span class="line">  - onForcePressStart</span>
<span class="line">  - onForcePressPeak</span>
<span class="line">  - onForcePressUpdate</span>
<span class="line">  - onForcePressEnd</span>
<span class="line"></span>
<span class="line">- PanDetector</span>
<span class="line">  - onPanDown</span>
<span class="line">  - onPanStart</span>
<span class="line">  - onPanUpdate</span>
<span class="line">  - onPanEnd</span>
<span class="line">  - onPanCancel</span>
<span class="line"></span>
<span class="line">- ScaleDetector</span>
<span class="line">  - onScaleStart</span>
<span class="line">  - onScaleUpdate</span>
<span class="line">  - onScaleEnd</span>
<span class="line"></span>
<span class="line">- MultiTouchTapDetector</span>
<span class="line">  - onTap</span>
<span class="line">  - onTapCancel</span>
<span class="line">  - onTapDown</span>
<span class="line">  - onTapUp</span>
<span class="line"></span>
<span class="line">- MultiTouchDragDetector</span>
<span class="line">  - onReceiveDrag</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仅鼠标事件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"> - MouseMovementDetector</span>
<span class="line">  - onMouseMove</span>
<span class="line"> - ScrollDetector</span>
<span class="line">  - onScroll</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无法同时混用同类型的高级检测器 (<code>MultiTouch*</code>) 和基本检测器，因为高级检测器会在 <em>手势竞争区</em> 中获胜，而基本检测器将无法触发。例如，不能同时使用 <code>MultiTouchTapDetector</code> 和 <code>PanDetector</code>，否则后者将不会接收到任何事件（Flame 也会对此抛出断言错误）。</p><p>Flame 的手势 API 基于 Flutter 的手势组件，包括 <a href="https://api.flutter.dev/flutter/widgets/GestureDetector-class.html" target="_blank" rel="noopener noreferrer">GestureDetector 组件</a>、<br><a href="https://api.flutter.dev/flutter/widgets/RawGestureDetector-class.html" target="_blank" rel="noopener noreferrer">RawGestureDetector 组件</a> 和 <a href="https://api.flutter.dev/flutter/widgets/MouseRegion-class.html" target="_blank" rel="noopener noreferrer">MouseRegion 组件</a>。<br> 可以阅读更多关于 Flutter 手势的内容 <a href="https://api.flutter.dev/flutter/gestures/gestures-library.html" target="_blank" rel="noopener noreferrer">这里</a>。</p><h2 id="pandetector-和-scaledetector" tabindex="-1"><a class="header-anchor" href="#pandetector-和-scaledetector"><span>PanDetector 和 ScaleDetector</span></a></h2><p>如果同时添加了 <code>PanDetector</code> 和 <code>ScaleDetector</code>，Flutter 会抛出一条看似难以理解的断言：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">同时存在平移手势检测器和缩放手势检测器是多余的；缩放是平移的超集。</span>
<span class="line"></span>
<span class="line">只需使用缩放手势检测器即可。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看似奇怪，但实际上 <code>onScaleUpdate</code> 不仅在需要调整缩放时触发，还会在所有平移/拖动事件中触发。因此，如果需要同时处理这两种检测器，则必须在 <code>onScaleUpdate</code>（加上 <code>onScaleStart</code> 和 <code>onScaleEnd</code>）中处理两者的逻辑。</p><p>例如，如果希望在平移事件中移动摄像机，在缩放事件中调整缩放，可以这样实现：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">  late double startZoom<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onScaleStart</span><span class="token punctuation">(</span>_<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    startZoom <span class="token operator">=</span> camera<span class="token punctuation">.</span>zoom<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onScaleUpdate</span><span class="token punctuation">(</span><span class="token class-name">ScaleUpdateInfo</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">final</span> currentScale <span class="token operator">=</span> info<span class="token punctuation">.</span>scale<span class="token punctuation">.</span>global<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>currentScale<span class="token punctuation">.</span><span class="token function">isIdentity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      camera<span class="token punctuation">.</span>zoom <span class="token operator">=</span> startZoom <span class="token operator">*</span> currentScale<span class="token punctuation">.</span>y<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      camera<span class="token punctuation">.</span><span class="token function">translateBy</span><span class="token punctuation">(</span><span class="token operator">-</span>info<span class="token punctuation">.</span>delta<span class="token punctuation">.</span>global<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      camera<span class="token punctuation">.</span><span class="token function">snap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上示例中，平移事件使用 <code>info.delta</code> 处理，而缩放事件使用 <code>info.scale</code> 处理，尽管它们理论上都来自底层的缩放事件。</p><p>您可以在 <a href="https://github.com/flame-engine/flame/blob/main/examples/lib/stories/camera_and_viewport/zoom_example.dart" target="_blank" rel="noopener noreferrer">缩放示例</a> 中查看更多内容。</p><h2 id="鼠标光标" tabindex="-1"><a class="header-anchor" href="#鼠标光标"><span>鼠标光标</span></a></h2><p>可以更改 <code>GameWidget</code> 区域显示的鼠标光标。以下代码可以在 <code>Game</code> 类中实现：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">mouseCursor<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token class-name">SystemMouseCursors</span><span class="token punctuation">.</span>move<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>也可以在初始化 <code>GameWidget</code> 时直接设置自定义光标：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">GameWidget</span><span class="token punctuation">(</span></span>
<span class="line">  game<span class="token punctuation">:</span> <span class="token class-name">MouseCursorGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  mouseCursor<span class="token punctuation">:</span> <span class="token class-name">SystemMouseCursors</span><span class="token punctuation">.</span>move<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件坐标系" tabindex="-1"><a class="header-anchor" href="#事件坐标系"><span>事件坐标系</span></a></h2><p>对于包含位置的事件（如 <code>Tap*</code> 或 <code>Drag</code>），<code>eventPosition</code> 属性包括两个字段：<code>global</code> 和 <code>widget</code>。以下是它们的简要说明：</p><h3 id="global" tabindex="-1"><a class="header-anchor" href="#global"><span>global</span></a></h3><p>事件在整个屏幕上的位置，与 Flutter 原生事件的 <code>globalPosition</code> 相同。</p><h3 id="widget" tabindex="-1"><a class="header-anchor" href="#widget"><span>widget</span></a></h3><p>事件相对于 <code>GameWidget</code> 的位置和尺寸的坐标，与 Flutter 原生事件的 <code>localPosition</code> 相同。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token keyword">with</span> <span class="token class-name">TapDetector</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 省略其他方法</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  bool <span class="token function">onTapDown</span><span class="token punctuation">(</span><span class="token class-name">TapDownInfo</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;玩家点击位置 </span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">info<span class="token punctuation">.</span>eventPosition<span class="token punctuation">.</span>widget</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  bool <span class="token function">onTapUp</span><span class="token punctuation">(</span><span class="token class-name">TapUpInfo</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;玩家抬起点击位置 </span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">info<span class="token punctuation">.</span>eventPosition<span class="token punctuation">.</span>widget</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多完整示例可以查看 <a href="https://github.com/flame-engine/flame/tree/main/examples/lib/stories/input/" target="_blank" rel="noopener noreferrer">这里</a>。</p><h3 id="gesturehitboxes" tabindex="-1"><a class="header-anchor" href="#gesturehitboxes"><span>GestureHitboxes</span></a></h3><p><code>GestureHitboxes</code> 混入用于更准确地识别组件上的手势。例如，如果您有一个相当圆的 <code>SpriteComponent</code> 岩石，<br> 不希望在图像的角落（岩石未显示）注册输入，因为 <code>PositionComponent</code> 默认是矩形的。<br> 在这种情况下，可以使用 <code>GestureHitboxes</code> 混入定义更准确的圆形、多边形（或其他形状）输入区域，以便事件只在组件的指定区域内注册。</p><p>可以像下面的 <code>Collidable</code> 示例一样，将新的检测区域添加到具有 <code>GestureHitboxes</code> 混入的组件中。</p>`,33)),a("p",null,[n[10]||(n[10]=s("有关如何定义检测区域的更多信息，请参阅 ")),l(e,{to:"/guide/flame/collision_detection.html#shapehitbox"},{default:i(()=>n[9]||(n[9]=[s("碰撞检测")])),_:1}),n[11]||(n[11]=s(" 文档的相关部分。"))]),n[15]||(n[15]=a("p",null,[s("您可以在 "),a("a",{href:"https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/gesture_hitboxes_example.dart",target:"_blank",rel:"noopener noreferrer"},"示例"),s(" 中查看具体用法。")],-1))])}const b=t(d,[["render",u],["__file","gesture_input.chatgpt.html.vue"]]),k=JSON.parse('{"path":"/guide/flame/inputs/gesture_input.chatgpt.html","title":"手势输入 (Gesture Input)","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"触摸和鼠标检测器","slug":"触摸和鼠标检测器","link":"#触摸和鼠标检测器","children":[]},{"level":2,"title":"PanDetector 和 ScaleDetector","slug":"pandetector-和-scaledetector","link":"#pandetector-和-scaledetector","children":[]},{"level":2,"title":"鼠标光标","slug":"鼠标光标","link":"#鼠标光标","children":[]},{"level":2,"title":"事件坐标系","slug":"事件坐标系","link":"#事件坐标系","children":[{"level":3,"title":"global","slug":"global","link":"#global","children":[]},{"level":3,"title":"widget","slug":"widget","link":"#widget","children":[]}]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[{"level":3,"title":"GestureHitboxes","slug":"gesturehitboxes","link":"#gesturehitboxes","children":[]}]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/inputs/gesture_input.chatgpt.md"}');export{b as comp,k as data};
