import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
    routeCacheMap: { parent: string, child: string }[] = [
        { parent: 'parent', child: 'parent/:name' }
    ];

    storedRouteHandles = new Map<string | undefined, DetachedRouteHandle>();
    allowRetrieveCache: Map<string | undefined, boolean> = new Map(
        this.routeCacheMap.map(kv => [kv.parent, true])
    );

    shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const beforePath = this.getPath(before);
        const currPath = this.getPath(curr);

        this.routeCacheMap.forEach(kv => {
            this.allowRetrieveCache.set(kv.parent, currPath === kv.child && beforePath === kv.parent)
        });

        return before.routeConfig === curr.routeConfig;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.storedRouteHandles.get(this.getPath(route)) ?? null;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        return (this.allowRetrieveCache.get(path) ?? false) && this.storedRouteHandles.has(path);
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.allowRetrieveCache.has(this.getPath(route));
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        this.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        return route.routeConfig?.path ?? '';
    }
}
