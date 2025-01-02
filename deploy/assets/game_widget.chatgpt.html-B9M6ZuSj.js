import{_ as s,c as a,f as t,o as e}from"./app-B8TszOv9.js";const p={};function o(l,n){return e(),a("div",null,n[0]||(n[0]=[t(`<h1 id="游戏小部件-game-widget" tabindex="-1"><a class="header-anchor" href="#游戏小部件-game-widget"><span>游戏小部件 (Game Widget)</span></a></h1><h2 id="class-gamewidget-t-extends-game-extends-statefulwidget" tabindex="-1"><a class="header-anchor" href="#class-gamewidget-t-extends-game-extends-statefulwidget"><span><code>class GameWidget&lt;T extends Game&gt; extends StatefulWidget</code></span></a></h2><p>GameWidget 是一个 Flutter 小部件，用于将 Game 实例插入到 Flutter 的小部件树中。</p><p>GameWidget 功能丰富，可以作为 Flutter 应用的根小部件运行。因此，使用 GameWidget 的最简单方法如下：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">runApp</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name">GameWidget</span><span class="token punctuation">(</span>game<span class="token punctuation">:</span> <span class="token class-name">MyGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，GameWidget 是一个常规的 Flutter 小部件，可以被任意插入到小部件树中的任何位置，包括在一个应用中使用多个 GameWidget。</p><p>该小部件的布局行为是，它会扩展以填充所有可用空间。因此，当它作为根小部件使用时，它会使应用全屏。在任何其他布局小部件内部时，它会尽可能占用更多的空间。</p><p>除了托管一个 Game 实例，GameWidget 还提供了一些结构性支持，具备以下功能：</p><ul><li><strong>loadingBuilder</strong>：在游戏加载时显示某些内容；</li><li><strong>errorBuilder</strong>：如果游戏抛出错误时显示；</li><li><strong>backgroundBuilder</strong>：在游戏后面绘制一些装饰；</li><li><strong>overlayBuilderMap</strong>：在游戏上绘制一个或多个小部件。</li></ul><p>需要注意的是，GameWidget 不会剪裁其画布的内容，这意味着游戏可能会在其边界外绘制内容（并非总是如此，取决于使用的相机）。如果不希望发生这种情况，可以考虑将小部件包装在 Flutter 的 <code>ClipRect</code> 中。</p><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数"><span>构造函数</span></a></h2><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">GameWidget</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>game<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textDirection<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>loadingBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>errorBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>backgroundBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>overlayBuilderMap<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>initialActiveOverlays<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>focusNode<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>autofocus <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mouseCursor<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>addRepaintBoundary <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>渲染提供的游戏实例。</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">GameWidget</span><span class="token punctuation">.</span><span class="token function">controlled</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>gameFactory<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textDirection<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>loadingBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>errorBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>backgroundBuilder<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>overlayBuilderMap<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>initialActiveOverlays<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>focusNode<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>autofocus <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mouseCursor<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>addRepaintBoundary <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>一个 GameWidget，会创建并拥有一个游戏实例，使用提供的 <code>gameFactory</code>。</p><p>此构造函数在您想要将 GameWidget 放入另一个小部件中，但又不想自己存储游戏实例时非常有用。例如：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyWidget</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token class-name">Container</span><span class="token punctuation">(</span></span>
<span class="line">      padding<span class="token punctuation">:</span> <span class="token class-name">EdgeInsets</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      child<span class="token punctuation">:</span> <span class="token class-name">GameWidget</span><span class="token punctuation">.</span><span class="token function">controlled</span><span class="token punctuation">(</span></span>
<span class="line">        gameFactory<span class="token punctuation">:</span> <span class="token class-name">MyGame</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性"><span>属性</span></a></h2><ul><li><p><strong>game : T?</strong><br> 游戏实例，这个小部件将渲染它。如果使用默认构造函数提供的游戏实例，则会渲染该游戏实例。如果使用 <code>GameWidget.controlled</code> 构造函数，则该值始终为 null。</p></li><li><p><strong>gameFactory : <code>GameFactory&lt;T&gt;</code>?</strong><br> 创建游戏实例的函数，这个小部件将渲染该游戏。</p></li><li><p><strong>textDirection : TextDirection?</strong><br> 用于游戏中文本元素的文本方向。</p></li><li><p><strong>loadingBuilder : GameLoadingWidgetBuilder?</strong><br> 提供一个小部件，在游戏加载时显示。默认情况下，这个是一个空的 <code>Container</code>。</p></li><li><p><strong>errorBuilder : GameErrorWidgetBuilder?</strong><br> 如果设置了此属性，当游戏加载过程中发生错误时，会显示该小部件。如果未提供此属性，则错误会正常传播。</p></li><li><p><strong>backgroundBuilder : WidgetBuilder?</strong><br> 提供一个小部件树，在游戏元素与通过 <code>Game.backgroundColor</code> 提供的背景颜色之间构建。</p></li><li><p><strong>overlayBuilderMap : <code>Map&lt;String, OverlayWidgetBuilder&lt;T&gt;&gt;</code>?</strong><br> 一个可以显示在游戏表面上的小部件集合。这些小部件可以通过游戏中的 <code>Game.overlays</code> 属性动态打开或关闭。</p></li></ul><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">runApp</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name">GameWidget</span><span class="token punctuation">(</span></span>
<span class="line">      game<span class="token punctuation">:</span> <span class="token class-name">MyGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      overlayBuilderMap<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-literal"><span class="token string">&#39;PauseMenu&#39;</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>context<span class="token punctuation">,</span> game<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> <span class="token class-name">Container</span><span class="token punctuation">(</span></span>
<span class="line">            color<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Color</span><span class="token punctuation">(</span><span class="token number">0xFF000000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">            child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;暂停菜单&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><strong>initialActiveOverlays : <code>List&lt;String&gt;</code>?</strong><br> 游戏启动时（但在加载后）将显示的小部件列表。</p></li><li><p><strong>focusNode : FocusNode?</strong><br> 用于控制游戏焦点以接收事件输入的 <code>FocusNode</code>。如果省略，则默认使用内部控制的焦点节点。</p></li><li><p><strong>autofocus : bool</strong><br> 是否在游戏加载完成后请求焦点。默认值为 <code>true</code>。</p></li><li><p><strong>mouseCursor : MouseCursor?</strong><br> 鼠标光标在游戏画布上悬停时的形状。此属性可以通过 <code>Game.mouseCursor</code> 动态更改。</p></li><li><p><strong>addRepaintBoundary : bool</strong><br> 是否让游戏具有 <code>RepaintBoundary</code> 的行为，默认值为 <code>true</code>。</p></li></ul>`,21)]))}const i=s(p,[["render",o],["__file","game_widget.chatgpt.html.vue"]]),u=JSON.parse('{"path":"/guide/flame/game_widget.chatgpt.html","title":"游戏小部件 (Game Widget)","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"class GameWidget<T extends Game> extends StatefulWidget","slug":"class-gamewidget-t-extends-game-extends-statefulwidget","link":"#class-gamewidget-t-extends-game-extends-statefulwidget","children":[]},{"level":2,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":2,"title":"属性","slug":"属性","link":"#属性","children":[]}],"git":{"updatedTime":1735588798000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/game_widget.chatgpt.md"}');export{i as comp,u as data};