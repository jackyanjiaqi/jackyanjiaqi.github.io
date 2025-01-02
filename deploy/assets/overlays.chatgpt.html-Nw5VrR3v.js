import{_ as s,c as a,f as e,o as t}from"./app-B8TszOv9.js";const p={};function l(c,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="悬浮层-overlays" tabindex="-1"><a class="header-anchor" href="#悬浮层-overlays"><span>悬浮层（Overlays）</span></a></h1><p>由于 Flame 游戏可以被包装在一个 Flutter 小部件中，因此将其与其他 Flutter 小部件一起使用非常简单。然而，如果你想在 Flame 游戏的上方轻松显示小部件，比如消息、菜单屏幕或类似内容，可以使用 Widgets 悬浮层（Overlay）API 使操作更加简便。</p><p><code>Game.overlays</code> 允许任何 Flutter 小部件显示在游戏实例的上方。这样可以很容易地创建诸如暂停菜单或物品栏界面等内容。</p><p>该功能可以通过 <code>game.overlays.add</code> 和 <code>game.overlays.remove</code> 方法来使用，这两个方法分别标记一个悬浮层为显示或隐藏。你可以通过传递一个 <code>String</code> 参数来标识悬浮层。然后，你可以通过提供 <code>overlayBuilderMap</code> 来将每个悬浮层与其相应的 Widget 映射到 <code>GameWidget</code> 声明中。</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">  <span class="token comment">// 在游戏中：</span></span>
<span class="line">  <span class="token keyword">final</span> pauseOverlayIdentifier <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&#39;PauseMenu&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">final</span> secondaryOverlayIdentifier <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&#39;SecondaryMenu&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 标记 &#39;SecondaryMenu&#39; 为可渲染。</span></span>
<span class="line">  overlays<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>secondaryOverlayIdentifier<span class="token punctuation">,</span> priority<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 标记 &#39;PauseMenu&#39; 为可渲染。默认优先级为 0，表示 &#39;PauseMenu&#39; 会显示在 &#39;SecondaryMenu&#39; 下方。</span></span>
<span class="line">  overlays<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pauseOverlayIdentifier<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 标记 &#39;PauseMenu&#39; 不可渲染。</span></span>
<span class="line">  overlays<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>pauseOverlayIdentifier<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token comment">// 在 widget 声明中：</span></span>
<span class="line"><span class="token keyword">final</span> game <span class="token operator">=</span> <span class="token class-name">MyGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token class-name">GameWidget</span><span class="token punctuation">(</span></span>
<span class="line">    game<span class="token punctuation">:</span> game<span class="token punctuation">,</span></span>
<span class="line">    overlayBuilderMap<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&#39;PauseMenu&#39;</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">,</span> <span class="token class-name">MyGame</span> game<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;暂停菜单&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&#39;SecondaryMenu&#39;</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">,</span> <span class="token class-name">MyGame</span> game<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;辅助菜单&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>悬浮层的渲染顺序由 <code>overlayBuilderMap</code> 中键的顺序决定。</p><p>可以查看 <a href="https://github.com/flame-engine/flame/blob/main/examples/lib/stories/system/overlays_example.dart" target="_blank" rel="noopener noreferrer">Overlays 特性示例</a>。</p>`,8)]))}const o=s(p,[["render",l],["__file","overlays.chatgpt.html.vue"]]),u=JSON.parse('{"path":"/guide/flame/overlays.chatgpt.html","title":"悬浮层（Overlays）","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1735588798000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/overlays.chatgpt.md"}');export{o as comp,u as data};
