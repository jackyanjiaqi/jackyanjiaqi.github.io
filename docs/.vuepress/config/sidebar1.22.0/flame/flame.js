import camera from './camera_component';
import collision_detection from './collision_detection';
import components from './components';
import effects from './effects';
import game_loop from './game_loop';
import game_widget from './game_widget';
import inputs from './inputs';
import layout from './layout';
import other from './other';
import overlays from './overlays';
import platforms from './platforms';
import rendering from './rendering';
import router from './router';
import assets_structure from './structure';

export default {
    text: "▼ Flame（文件结构..）",
    link: "/guide/flame/structure.chatgpt.md",
    collapsible: true,
    children: [
        game_widget,
        game_loop,
        components,
        camera,
        assets_structure,
        router,
        platforms,
        collision_detection,
        effects,
        inputs,
        rendering,
        layout,
        overlays,
        other,
    ]
}