import {appendChilds} from '../components/BaseComponent/BaseComponent';
import router from './Router';

export default function RouterRegister(className, componentsRoutes, defaultComponents) {

    appendChilds(className, defaultComponents);

    componentsRoutes.forEach(route => router.use(route.path, route.component));

    router.connectRouting(window);
    router.start();

}
