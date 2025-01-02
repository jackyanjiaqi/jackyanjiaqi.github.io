import{_ as l,c as o,f as e,a,b as s,d as i,e as p,r as c,o as u}from"./app-B8TszOv9.js";const r={};function d(m,n){const t=c("RouteLink");return u(),o("div",null,[n[18]||(n[18]=e('<h1 id="小部件-widgets" tabindex="-1"><a class="header-anchor" href="#小部件-widgets"><span>小部件（Widgets）</span></a></h1><p>使用 Flutter 开发游戏的一个优势是可以利用 Flutter 强大的 UI 构建工具集，Flame 通过引入专门为游戏设计的小部件来进一步扩展这一点。</p><p>在这里，您可以找到 Flame 提供的所有可用小部件。</p><p>您还可以查看所有在 <a href="https://github.com/bluefireteam/dashbook" target="_blank" rel="noopener noreferrer">Dashbook</a> 沙盒中展示的小部件，详细信息请访问 <a href="https://github.com/flame-engine/flame/tree/main/examples/lib/stories/widgets" target="_blank" rel="noopener noreferrer">这里</a>。</p><h2 id="ninetileboxwidget" tabindex="-1"><a class="header-anchor" href="#ninetileboxwidget"><span>NineTileBoxWidget</span></a></h2><p>Nine Tile Box 是一种使用网格精灵绘制的矩形。</p><p>该网格精灵是一个 3x3 的网格，由 9 个方块组成，代表 4 个角、4 条边和中间部分。</p><p>角落部分保持相同大小，边缘部分会在水平方向或垂直方向上拉伸，中间部分则会在两个方向上扩展。</p>',8)),a("p",null,[n[1]||(n[1]=a("code",null,"NineTileBoxWidget",-1)),n[2]||(n[2]=s(" 实现了一个使用这一标准的 ")),n[3]||(n[3]=a("code",null,"Container",-1)),n[4]||(n[4]=s("。这种模式也作为 ")),n[5]||(n[5]=a("code",null,"NineTileBoxComponent",-1)),n[6]||(n[6]=s(" 被实现为一个组件，您可以将此功能直接添加到您的 ")),n[7]||(n[7]=a("code",null,"FlameGame",-1)),n[8]||(n[8]=s(" 中。有关此功能的更多信息，请查阅组件文档 ")),i(t,{to:"/guide/flame/components.html#ninetileboxcomponent"},{default:p(()=>n[0]||(n[0]=[s("这里")])),_:1}),n[9]||(n[9]=s("。"))]),n[19]||(n[19]=e(`<p>以下是一个如何使用它的示例（不使用 <code>NineTileBoxComponent</code>）：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/widgets&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">NineTileBoxWidget</span><span class="token punctuation">(</span></span>
<span class="line">    image<span class="token punctuation">:</span> image<span class="token punctuation">,</span> <span class="token comment">// dart:ui 图像实例</span></span>
<span class="line">    tileSize<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token comment">// 网格图像中每个瓦片的宽度/高度</span></span>
<span class="line">    destTileSize<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token comment">// 绘制瓦片时使用的尺寸</span></span>
<span class="line">    child<span class="token punctuation">:</span> <span class="token class-name">SomeWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 任何 Flutter 小部件</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spritebutton" tabindex="-1"><a class="header-anchor" href="#spritebutton"><span>SpriteButton</span></a></h2><p><code>SpriteButton</code> 是一个简单的小部件，用于基于 Flame 精灵创建按钮。当您希望创建看起来不同于默认按钮的按钮时，这非常有用。例如，当您更容易通过图形编辑器绘制按钮，而不是直接在 Flutter 中创建时，使用它会更方便。</p><p>如何使用它：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">SpriteButton</span><span class="token punctuation">(</span></span>
<span class="line">    onPressed<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;Pressed&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    label<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;Sprite Button&#39;</span></span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Color</span><span class="token punctuation">(</span><span class="token number">0xFF5D275D</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    sprite<span class="token punctuation">:</span> _spriteButton<span class="token punctuation">,</span></span>
<span class="line">    pressedSprite<span class="token punctuation">:</span> _pressedSprite<span class="token punctuation">,</span></span>
<span class="line">    height<span class="token punctuation">:</span> _height<span class="token punctuation">,</span></span>
<span class="line">    width<span class="token punctuation">:</span> _width<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spritewidget" tabindex="-1"><a class="header-anchor" href="#spritewidget"><span>SpriteWidget</span></a></h2>`,7)),a("p",null,[n[11]||(n[11]=a("code",null,"SpriteWidget",-1)),n[12]||(n[12]=s(" 是一个用于在小部件树中显示 ")),i(t,{to:"/guide/flame/rendering/images.html#sprite"},{default:p(()=>n[10]||(n[10]=[s("Sprite")])),_:1}),n[13]||(n[13]=s(" 的小部件。"))]),n[20]||(n[20]=e(`<p>如何使用它：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">SpriteWidget</span><span class="token punctuation">(</span></span>
<span class="line">    sprite<span class="token punctuation">:</span> yourSprite<span class="token punctuation">,</span></span>
<span class="line">    anchor<span class="token punctuation">:</span> <span class="token class-name">Anchor</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spriteanimationwidget" tabindex="-1"><a class="header-anchor" href="#spriteanimationwidget"><span>SpriteAnimationWidget</span></a></h2>`,3)),a("p",null,[n[15]||(n[15]=a("code",null,"SpriteAnimationWidget",-1)),n[16]||(n[16]=s(" 是一个用于在小部件树中显示 ")),i(t,{to:"/guide/flame/rendering/images.html#animation"},{default:p(()=>n[14]||(n[14]=[s("SpriteAnimations")])),_:1}),n[17]||(n[17]=s(" 的小部件。"))]),n[21]||(n[21]=e(`<p>如何使用它：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">SpriteAnimationWidget</span><span class="token punctuation">(</span></span>
<span class="line">    animation<span class="token punctuation">:</span> _animation<span class="token punctuation">,</span></span>
<span class="line">    animationTicker<span class="token punctuation">:</span> _animationTicker<span class="token punctuation">,</span></span>
<span class="line">    playing<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    anchor<span class="token punctuation">:</span> <span class="token class-name">Anchor</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2))])}const g=l(r,[["render",d],["__file","widgets.chatgpt.html.vue"]]),v=JSON.parse('{"path":"/guide/flame/other/widgets.chatgpt.html","title":"小部件（Widgets）","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"NineTileBoxWidget","slug":"ninetileboxwidget","link":"#ninetileboxwidget","children":[]},{"level":2,"title":"SpriteButton","slug":"spritebutton","link":"#spritebutton","children":[]},{"level":2,"title":"SpriteWidget","slug":"spritewidget","link":"#spritewidget","children":[]},{"level":2,"title":"SpriteAnimationWidget","slug":"spriteanimationwidget","link":"#spriteanimationwidget","children":[]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/other/widgets.chatgpt.md"}');export{g as comp,v as data};
