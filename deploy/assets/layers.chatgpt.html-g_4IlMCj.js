import{_ as s,c as a,f as p,o as e}from"./app-B8TszOv9.js";const t={};function c(l,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h3 id="图层和快照" tabindex="-1"><a class="header-anchor" href="#图层和快照"><span>图层和快照</span></a></h3><p>图层和快照共享一些共同特性，例如能够预渲染和缓存对象以提高性能。然而，它们也具有独特功能，使其更适合不同的使用场景。</p><hr><h4 id="snapshot-快照" tabindex="-1"><a class="header-anchor" href="#snapshot-快照"><span><strong><code>Snapshot</code>（快照）</strong></span></a></h4><p><code>Snapshot</code> 是一个可以添加到任意 <code>PositionComponent</code> 的混入。适用于以下场景：</p><ul><li>将其混入现有的游戏对象（<code>PositionComponents</code>）。</li><li>缓存复杂渲染的游戏对象，例如精灵图（sprites）。</li><li>在多次绘制同一对象时避免每次都重新渲染。</li><li>捕获图像快照，例如用于保存截图。</li></ul><hr><h4 id="layer-图层" tabindex="-1"><a class="header-anchor" href="#layer-图层"><span><strong><code>Layer</code>（图层）</strong></span></a></h4><p><code>Layer</code> 是一个类。可以直接使用或扩展该类，适用于以下场景：</p><ul><li>通过逻辑层次结构组织游戏（例如：UI、前景、主要场景、背景）。</li><li>将对象分组形成复杂场景并进行缓存（例如背景图层）。</li><li>支持处理器。图层允许用户定义的处理器在渲染之前或之后运行。</li></ul><hr><h3 id="图层" tabindex="-1"><a class="header-anchor" href="#图层"><span>图层</span></a></h3><p>图层允许根据上下文分组渲染，还可以预渲染内容。例如，可以在内存中渲染游戏中变化不大的部分（如背景），从而释放处理能力用于动态内容的渲染。</p><p>Flame 提供两种类型的图层：</p><ol><li><strong><code>DynamicLayer</code>（动态图层）：</strong> 用于移动或变化的内容。</li><li><strong><code>PreRenderedLayer</code>（预渲染图层）：</strong> 用于静态内容。</li></ol><hr><h4 id="动态图层" tabindex="-1"><a class="header-anchor" href="#动态图层"><span><strong>动态图层</strong></span></a></h4><p>动态图层每次在画布上绘制时都会重新渲染，适用于动态内容，特别是需要在相同上下文中分组渲染的对象。</p><p><strong>示例代码：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">GameLayer</span> <span class="token keyword">extends</span> <span class="token class-name">DynamicLayer</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> <span class="token class-name">MyGame</span> game<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">GameLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>game<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">drawLayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    game<span class="token punctuation">.</span>playerSprite<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span></span>
<span class="line">      canvas<span class="token punctuation">,</span></span>
<span class="line">      position<span class="token punctuation">:</span> game<span class="token punctuation">.</span>playerPosition<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    game<span class="token punctuation">.</span>enemySprite<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span></span>
<span class="line">      canvas<span class="token punctuation">,</span></span>
<span class="line">      position<span class="token punctuation">:</span> game<span class="token punctuation">.</span>enemyPosition<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    gameLayer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可以提供可选的 x 和 y 位置参数</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="预渲染图层" tabindex="-1"><a class="header-anchor" href="#预渲染图层"><span><strong>预渲染图层</strong></span></a></h4><p>预渲染图层仅渲染一次，内容会被缓存到内存中，随后直接复制到游戏画布。适合缓存游戏中不会变化的内容，例如背景。</p><p><strong>示例代码：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">BackgroundLayer</span> <span class="token keyword">extends</span> <span class="token class-name">PreRenderedLayer</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> <span class="token class-name">Sprite</span> sprite<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">BackgroundLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sprite<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">drawLayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    sprite<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span></span>
<span class="line">      canvas<span class="token punctuation">,</span></span>
<span class="line">      position<span class="token punctuation">:</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    backgroundLayer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="图层处理器" tabindex="-1"><a class="header-anchor" href="#图层处理器"><span><strong>图层处理器</strong></span></a></h4><p>Flame 提供了一种方式向图层添加处理器（processors），用于在整个图层上添加效果。目前，默认提供的处理器是 <code>ShadowProcessor</code>，它可以在图层上添加阴影效果。</p><p><strong>添加处理器示例：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">BackgroundLayer</span> <span class="token keyword">extends</span> <span class="token class-name">PreRenderedLayer</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> <span class="token class-name">Sprite</span> sprite<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">BackgroundLayer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sprite<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    preProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">ShadowProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">drawLayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 绘制逻辑省略</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过扩展 <code>LayerProcessor</code> 类来自定义处理器。</p><hr><h3 id="快照" tabindex="-1"><a class="header-anchor" href="#快照"><span>快照</span></a></h3><p>快照是图层的另一种替代方式。可以通过 <code>Snapshot</code> 混入应用到任何 <code>PositionComponent</code>。</p><hr><h4 id="渲染为快照" tabindex="-1"><a class="header-anchor" href="#渲染为快照"><span><strong>渲染为快照</strong></span></a></h4><p>将 <code>renderSnapshot</code> 设置为 <code>true</code>（默认值）时，快照组件的行为类似于 <code>PreRenderedLayer</code>，仅渲染一次并缓存结果，然后直接复制到画布。适合缓存游戏中不变化的内容，例如背景。</p><p><strong>示例代码：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">SnapshotComponent</span> <span class="token keyword">extends</span> <span class="token class-name">PositionComponent</span> <span class="token keyword">with</span> <span class="token class-name">Snapshot</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token punctuation">{</span></span>
<span class="line">  late <span class="token keyword">final</span> <span class="token class-name">SnapshotComponent</span> root<span class="token punctuation">;</span></span>
<span class="line">  late <span class="token keyword">final</span> <span class="token class-name">SpriteComponent</span> background1<span class="token punctuation">;</span></span>
<span class="line">  late <span class="token keyword">final</span> <span class="token class-name">SpriteComponent</span> background2<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    root <span class="token operator">=</span> <span class="token class-name">SnapshotComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">final</span> background1Sprite <span class="token operator">=</span> <span class="token class-name">Sprite</span><span class="token punctuation">(</span><span class="token keyword">await</span> images<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;background1.png&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    background1 <span class="token operator">=</span> <span class="token class-name">SpriteComponent</span><span class="token punctuation">(</span>sprite<span class="token punctuation">:</span> background1Sprite<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    root<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>background1<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">final</span> background2Sprite <span class="token operator">=</span> <span class="token class-name">Sprite</span><span class="token punctuation">(</span><span class="token keyword">await</span> images<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;background2.png&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    background2 <span class="token operator">=</span> <span class="token class-name">SpriteComponent</span><span class="token punctuation">(</span>sprite<span class="token punctuation">:</span> background2Sprite<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    root<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>background2<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="重新生成快照" tabindex="-1"><a class="header-anchor" href="#重新生成快照"><span><strong>重新生成快照</strong></span></a></h4><p>如果快照组件的内容（包括子对象）发生变化，可以通过调用 <code>takeSnapshot</code> 更新缓存的快照。如果内容频繁变化，则不适合使用 <code>Snapshot</code>，因为没有性能优势。</p><hr><h4 id="生成快照" tabindex="-1"><a class="header-anchor" href="#生成快照"><span><strong>生成快照</strong></span></a></h4><p>快照组件可以随时生成快照，即使 <code>renderSnapshot</code> 设置为 <code>false</code>。生成的快照可用于截屏或其他需要静态快照的场景。</p><p><strong>示例代码：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token punctuation">{</span></span>
<span class="line">  late <span class="token keyword">final</span> <span class="token class-name">SnapshotComponent</span> root<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    root <span class="token operator">=</span> <span class="token class-name">SnapshotComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>renderSnapshot <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">void</span> <span class="token function">takeSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    root<span class="token punctuation">.</span><span class="token function">takeSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">final</span> image <span class="token operator">=</span> root<span class="token punctuation">.</span><span class="token function">snapshotToImage</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="裁剪或偏移的快照" tabindex="-1"><a class="header-anchor" href="#裁剪或偏移的快照"><span><strong>裁剪或偏移的快照</strong></span></a></h4><p>如果快照图像出现裁剪或位置异常，通常是因为 <code>Picture</code> 内容可能与原点（<code>0,0</code>）存在偏移。在转换为 <code>Image</code> 时，内容总是从原点开始。因此，最好保持快照组件相对于游戏的位置始终为 <code>0,0</code>。</p><p><strong>使用变换矩阵调整快照：</strong></p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">void</span> <span class="token function">takeSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">final</span> matrix <span class="token operator">=</span> <span class="token class-name">Matrix4</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">200.0</span><span class="token punctuation">,</span> <span class="token number">50.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  root<span class="token punctuation">.</span><span class="token function">takeSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">final</span> image <span class="token operator">=</span> root<span class="token punctuation">.</span><span class="token function">snapshotToImage</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> transform<span class="token punctuation">:</span> matrix<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,52)]))}const i=s(t,[["render",c],["__file","layers.chatgpt.html.vue"]]),u=JSON.parse('{"path":"/guide/flame/rendering/layers.chatgpt.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"图层和快照","slug":"图层和快照","link":"#图层和快照","children":[]},{"level":3,"title":"图层","slug":"图层","link":"#图层","children":[]},{"level":3,"title":"快照","slug":"快照","link":"#快照","children":[]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/rendering/layers.chatgpt.md"}');export{i as comp,u as data};
