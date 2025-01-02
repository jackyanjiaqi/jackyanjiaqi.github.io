import{_ as s,c as a,f as e,o as t}from"./app-B8TszOv9.js";const p={};function l(i,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="指针事件-pointer-events" tabindex="-1"><a class="header-anchor" href="#指针事件-pointer-events"><span>指针事件 (Pointer Events)</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">本文档描述了新的事件 API。旧的（传统）方法仍然受支持，可参考 [](gesture_input.md)。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>指针事件</strong> 是 Flutter 中通用的“鼠标移动”类事件（适用于桌面或网页）。</p><p>如果您希望在组件或游戏中与鼠标移动事件交互，可以使用 <code>PointerMoveCallbacks</code> 混入。</p><p>例如：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">PositionComponent</span> <span class="token keyword">with</span> <span class="token class-name">PointerMoveCallbacks</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token class-name">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onPointerMove</span><span class="token punctuation">(</span><span class="token class-name">PointerMoveEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 在鼠标移动时响应，例如更新坐标</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该混入会为组件添加两个可覆盖的方法：</p><ul><li><code>onPointerMove</code>：当鼠标在组件内移动时调用</li><li><code>onPointerMoveStop</code>：当鼠标离开组件后首次调用</li></ul><p>默认情况下，这些方法什么都不做，您需要覆盖它们以执行所需功能。</p><p>此外，组件必须实现 <code>containsLocalPoint()</code> 方法（此方法已在 <code>PositionComponent</code> 中实现，因此大多数情况下无需额外操作）-- 该方法允许 Flame 确定事件是否发生在组件内。</p><p>请注意，只有发生在组件内的鼠标事件会被传递。然而，当鼠标离开组件时，<code>onPointerMoveStop</code> 将在首次鼠标移动时触发，您可以在此方法中处理退出条件。</p><h2 id="hovercallbacks" tabindex="-1"><a class="header-anchor" href="#hovercallbacks"><span>HoverCallbacks</span></a></h2><p>如果您希望明确知道组件是否被悬停（hovered），或者希望钩入悬停进入和退出事件，可以使用更专门的混入 <code>HoverCallbacks</code>。</p><p>例如：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">PositionComponent</span> <span class="token keyword">with</span> <span class="token class-name">HoverCallbacks</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span>double dt<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 使用 \`isHovered\` 判断组件是否被悬停</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onHoverEnter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 当鼠标进入组件时执行某些操作</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">onHoverExit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 当鼠标离开组件时执行某些操作</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您仍然可以监听原始的 <code>onPointerMove</code> 方法以实现额外功能，只需确保调用 <code>super</code> 版本以启用 <code>HoverCallbacks</code> 的行为。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><p>以下示例展示了指针悬停事件的实际效果。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">:sources: ../flame/examples</span>
<span class="line">:page: pointer_events</span>
<span class="line">:show: widget code</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19)]))}const o=s(p,[["render",l],["__file","pointer_events.chatgpt.html.vue"]]),d=JSON.parse('{"path":"/guide/flame/inputs/pointer_events.chatgpt.html","title":"指针事件 (Pointer Events)","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"HoverCallbacks","slug":"hovercallbacks","link":"#hovercallbacks","children":[{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/inputs/pointer_events.chatgpt.md"}');export{o as comp,d as data};
