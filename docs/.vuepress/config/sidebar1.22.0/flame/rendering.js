import decorators from './rendering/decorators';
import images from './rendering/images';
import layers from './rendering/layers';
import palette from './rendering/palette';
import particles from './rendering/particles';
import text_rendering from './rendering/text_rendering';

export default {
    text: "| ▼ 渲染(颜色..)",
    collapsible: true,
    link: "/guide/flame/rendering/palette.chatgpt.md",
    children: [
        palette,
        decorators,
        images,
        layers,
        particles,
        text_rendering
   ]
}