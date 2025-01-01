import camera_component from './camera_component';
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
import structure from './structure';

export default {
    text: "▼ Flame（文件结构..）",
    link: "/guide/flame/structure.chatgpt.md",
    collapsible: true,
    children: [
        structure,
        game_widget,
        game_loop,
        components,
        router,
        platforms,
        collision_detection,
        effects,
        camera_component,
        inputs,
        rendering,
        layout,
        overlays,
        other,
    ]
}