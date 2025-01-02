import{_ as p,c as t,f as s,a as e,b as a,d as c,e as l,r as i,o as d}from"./app-B8TszOv9.js";const r={};function u(m,n){const o=i("RouteLink");return d(),t("div",null,[n[5]||(n[5]=s(`<h1 id="相机组件" tabindex="-1"><a class="header-anchor" href="#相机组件"><span>相机组件</span></a></h1><p>相机即组件（Camera-as-a-component）是游戏结构的一种新方式，这种做法允许你在游戏中更灵活地放置相机，甚至可以同时使用多个相机。</p><p>为了理解这种方法的工作原理，想象一下你的游戏世界是一个独立于应用程序存在的实体<em>某处</em>。想象你的游戏只是一个窗口，通过它可以观察这个世界。你可以随时关闭这个窗口，而游戏世界仍然存在。或者反过来，你可以打开多个窗口，它们同时查看同一个（或不同的）世界。</p><p>有了这种思维方式，我们现在可以理解相机即组件的工作原理。</p><p>首先，有一个<a href="#world">World</a>类，它包含你游戏世界中的所有组件。<code>World</code>组件可以挂载在任何地方，例如你的游戏类的根部，就像内置的<code>World</code>一样。</p><p>然后是一个<a href="#cameracomponent">CameraComponent</a>类，它“观察”<a href="#world">World</a>。<code>CameraComponent</code>内部有一个<a href="#viewport">Viewport</a>和一个<a href="#viewfinder">Viewfinder</a>，允许你在屏幕上的任何位置渲染世界，并且控制视图的位置和角度。<code>CameraComponent</code>还包含一个静态渲染在世界下方的<a href="#backdrop">backdrop</a>组件。</p><h2 id="world" tabindex="-1"><a class="header-anchor" href="#world"><span>World</span></a></h2><p>这个组件用于托管构成你游戏世界的其他所有组件。<code>World</code>类的主要属性是它不通过传统方式渲染——而是由一个或多个<a href="#cameracomponent">CameraComponent</a>“观察”世界来渲染。在<code>FlameGame</code>类中有一个名为<code>world</code>的默认<code>World</code>实例，与默认的<code>CameraComponent</code>（名为<code>camera</code>）配对。</p><p>游戏可以有多个<code>World</code>实例，这些实例可以同时或不同时间进行渲染。例如，如果你有两个世界A和B以及一个相机，那么将该相机的目标从A切换到B会立即切换视图至世界B而无需卸载A再挂载B。</p><p>与大多数<code>Component</code>一样，可以通过在其构造函数中使用<code>children</code>参数或使用<code>add</code>或<code>addAll</code>方法将子组件添加到<code>World</code>中。</p><p>对于许多游戏，你可能希望扩展世界并在其中创建逻辑，这种游戏结构可以如下所示：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">runApp</span><span class="token punctuation">(</span><span class="token class-name">GameWidget</span><span class="token punctuation">(</span><span class="token class-name">FlameGame</span><span class="token punctuation">(</span>world<span class="token punctuation">:</span> <span class="token class-name">MyWorld</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyWorld</span> <span class="token keyword">extends</span> <span class="token class-name">World</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token metadata function">@override</span></span>
<span class="line">  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 加载在这个世界中所需的所有资源</span></span>
<span class="line">    <span class="token comment">// 并添加组件等。</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cameracomponent" tabindex="-1"><a class="header-anchor" href="#cameracomponent"><span>CameraComponent</span></a></h2><p>这是一个通过<code>World</code>进行渲染的组件。在构造时需要引用一个<code>World</code>实例；然而，稍后可以将目标世界替换为另一个世界。多个相机可以同时观察同一个世界。</p><p>在<code>FlameGame</code>类中有一个名为<code>camera</code>的默认<code>CameraComponent</code>与默认的<code>world</code>配对，因此如果你的游戏不需要，你无需创建或添加自己的<code>CameraComponent</code>。</p><p>一个<code>CameraComponent</code>内部有两个其他组件：<a href="#viewport">Viewport</a>和<a href="#viewfinder">Viewfinder</a>。不同于<code>World</code>对象，相机拥有视口和取景器，这意味着这些组件是相机的子组件。</p><p>还有静态属性<code>CameraComponent.currentCamera</code>，它仅在渲染阶段不为空，并返回当前正在执行渲染的相机对象。这仅用于某些高级用例，其中组件的渲染依赖于相机设置。例如，某些组件可能会决定如果它们超出了相机视口，则跳过自身及其子组件的渲染。</p><p><code>FlameGame</code>类在其构造函数中有一个<code>camera</code>字段，因此你可以设置你想要的默认相机类型，如下所示：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">runApp</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name">GameWidget</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token class-name">FlameGame</span><span class="token punctuation">(</span></span>
<span class="line">        camera<span class="token punctuation">:</span> <span class="token class-name">CameraComponent</span><span class="token punctuation">.</span><span class="token function">withFixedResolution</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">800</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cameracomponent-withfixedresolution" tabindex="-1"><a class="header-anchor" href="#cameracomponent-withfixedresolution"><span>CameraComponent.withFixedResolution()</span></a></h3><p>这个工厂构造函数允许你假装用户的设备具有你选择的固定分辨率。例如：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">final</span> camera <span class="token operator">=</span> <span class="token class-name">CameraComponent</span><span class="token punctuation">.</span><span class="token function">withFixedResolution</span><span class="token punctuation">(</span></span>
<span class="line">  world<span class="token punctuation">:</span> myWorldComponent<span class="token punctuation">,</span></span>
<span class="line">  width<span class="token punctuation">:</span> <span class="token number">800</span><span class="token punctuation">,</span></span>
<span class="line">  height<span class="token punctuation">:</span> <span class="token number">600</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将创建一个视口，居中显示在屏幕上，并尽可能多地占据空间同时保持800:600的纵横比，并显示800x600的游戏世界区域。</p><p>“固定分辨率”非常简单易用，但如果设备的像素比例与你选择的尺寸不同，则会浪费用户的可用屏幕空间。</p><h2 id="viewport" tabindex="-1"><a class="header-anchor" href="#viewport"><span>Viewport</span></a></h2><p><code>Viewport</code>是观察<code>World</code>的一个窗口。这个窗口在屏幕上具有一定的大小、形状和位置。有多种类型的视口可用，你可以随时实现自己的视口。</p><p><code>Viewport</code>是一个组件，这意味着你可以向其添加其他组件。这些子组件会受到视口位置的影响，但不受剪辑遮罩的影响。因此，如果视口是游戏世界的“窗口”，那么它的子组件就是可以放在窗口顶部的东西。</p><p>将元素添加到视口中是一种实现“HUD”组件的便捷方式。</p><p>以下可用的视口包括：</p><ul><li><code>MaxViewport</code>（默认）——此视口会扩展到游戏允许的最大大小，即其大小等于游戏画布的大小。</li><li><code>FixedResolutionViewport</code>——保持分辨率和纵横比固定，在不匹配纵横比时在两侧显示黑条。</li><li><code>FixedSizeViewport</code>——一个具有预定义尺寸的简单矩形视口。</li><li><code>FixedAspectRatioViewport</code>——一个矩形视口，扩展以适应游戏画布但保留其纵横比。</li><li><code>CircularViewport</code>——圆形、固定大小的视口。</li></ul><p>如果你向<code>Viewport</code>添加子组件，它们将作为位于世界前面的静态HUD出现。</p><h2 id="viewfinder" tabindex="-1"><a class="header-anchor" href="#viewfinder"><span>Viewfinder</span></a></h2><p>相机的这一部分负责知道我们当前正在观察的游戏世界的哪个位置。<code>Viewfinder</code>还控制缩放级别和视图的角度。</p><p><code>Viewfinder</code>的<code>anchor</code>属性允许你指定视口中哪个点充当相机的“逻辑中心”。例如，在侧滚动作游戏中，通常会将相机焦点放在显示在屏幕左下角而不是中央的主要角色上。这个偏心位置就是由<code>Viewfinder</code>的<code>anchor</code>控制的相机“逻辑中心”。</p><p>如果你向<code>Viewfinder</code>添加子组件，它们将位于世界前面但视口后面，并且应用了与世界相同的变换，因此这些组件不是静态的。</p>`,35)),e("p",null,[n[1]||(n[1]=a("你还可以向视图器添加行为组件作为子组件，例如")),c(o,{to:"/guide/flame/effects.html"},{default:l(()=>n[0]||(n[0]=[a("effects")])),_:1}),n[2]||(n[2]=a("或其他控制器。例如，如果你添加了一个")),n[3]||(n[3]=e("code",null,"ScaleEffect",-1)),n[4]||(n[4]=a("，就可以在游戏实现平滑缩放。"))]),n[6]||(n[6]=s(`<h2 id="backdrop" tabindex="-1"><a class="header-anchor" href="#backdrop"><span>Backdrop</span></a></h2><p>为了在世界后面添加静态组件，可以将它们添加到<code>backdrop</code>组件中或替换<code>backdrop</code>组件。例如，如果你想在游戏中有一个位于世界下方的静态<code>ParallaxComponent</code>，可以自由地移动它。</p><p>示例：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">camera<span class="token punctuation">.</span>backdrop<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">MyStaticBackground</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>或者</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">camera<span class="token punctuation">.</span>backdrop <span class="token operator">=</span> <span class="token class-name">MyStaticBackground</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="相机控制" tabindex="-1"><a class="header-anchor" href="#相机控制"><span>相机控制</span></a></h2><p>有几种方法可以在运行时修改相机的设置：</p><ol><li><p>手动进行。你总是可以重写<code>CameraComponent.update()</code>方法（或视图器或视口上的相同方法），并在其中更改视图器的位置或缩放，根据需要来调整。在某些情况下这种方法可能是可行的，但通常不推荐。</p></li><li><p>将效果和/或行为应用于相机的<code>Viewfinder</code>或<code>Viewport</code>。效果和行为是特殊类型的组件，其目的是修改所附加组件的一些属性。</p></li><li><p>使用特殊的相机函数，如<code>follow()</code>、<code>moveBy()</code>和<code>moveTo()</code>。在内部，这种方法使用的是（2）中的相同的效果/行为。</p></li></ol><p>相机有几种方法用于控制其行为：</p><ul><li><p><code>Camera.follow()</code>会强制相机跟踪提供的目标。 可选地可以限制相机移动的最大速度，或仅允许水平/垂直移动。</p></li><li><p><code>Camera.stop()</code>会撤销先前调用的效果并使相机停在当前位置。</p></li><li><p><code>Camera.moveBy()</code>可用于按指定偏移量移动相机。 如果相机已经在跟随另一个组件或正向某个方向移动，则这些行为会被自动取消。</p></li><li><p><code>Camera.moveTo()</code>可用于将相机移动到世界地图上的指定点。 如果相机已经在跟随另一个组件或正向另一个点移动，则这些行为会被自动取消。</p></li><li><p><code>Camera.setBounds()</code>允许你添加相机可以去的地方的限制。这些限制以<code>Shape</code>的形式出现，通常是矩形，也可以是任何其他形状。</p></li></ul><h3 id="visibleworldrect" tabindex="-1"><a class="header-anchor" href="#visibleworldrect"><span>visibleWorldRect</span></a></h3><p>相机暴露了一个名为<code>visibleWorldRect</code>的属性，它描述了当前通过相机可见的游戏区域。 此区域可用于避免渲染屏幕外的组件或较少地更新远离玩家的对象。</p><p><code>visibleWorldRect</code>是一个缓存属性，并在相机移动或视口更改其大小时自动更新。</p><h3 id="检查从相机视角是否可以看到某个组件" tabindex="-1"><a class="header-anchor" href="#检查从相机视角是否可以看到某个组件"><span>检查从相机视角是否可以看到某个组件</span></a></h3><p><code>CameraComponent</code>有一个名为<code>canSee</code>的方法，可以用来检查从相机视角是否可以看到某个组件。 这在剔除不可见的组件时非常有用。</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>camera<span class="token punctuation">.</span><span class="token function">canSee</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   component<span class="token punctuation">.</span><span class="token function">removeFromParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 剔除该组件</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17))])}const v=p(r,[["render",u],["__file","camera_component.qwen.html.vue"]]),h=JSON.parse('{"path":"/guide/flame/camera_component.qwen.html","title":"相机组件","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"World","slug":"world","link":"#world","children":[]},{"level":2,"title":"CameraComponent","slug":"cameracomponent","link":"#cameracomponent","children":[{"level":3,"title":"CameraComponent.withFixedResolution()","slug":"cameracomponent-withfixedresolution","link":"#cameracomponent-withfixedresolution","children":[]}]},{"level":2,"title":"Viewport","slug":"viewport","link":"#viewport","children":[]},{"level":2,"title":"Viewfinder","slug":"viewfinder","link":"#viewfinder","children":[]},{"level":2,"title":"Backdrop","slug":"backdrop","link":"#backdrop","children":[]},{"level":2,"title":"相机控制","slug":"相机控制","link":"#相机控制","children":[{"level":3,"title":"visibleWorldRect","slug":"visibleworldrect","link":"#visibleworldrect","children":[]},{"level":3,"title":"检查从相机视角是否可以看到某个组件","slug":"检查从相机视角是否可以看到某个组件","link":"#检查从相机视角是否可以看到某个组件","children":[]}]}],"git":{"updatedTime":1735588798000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/camera_component.qwen.md"}');export{v as comp,h as data};
