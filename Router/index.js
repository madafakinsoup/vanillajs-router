class Router {
    
    constructor() {
        this.routes = [];
    }

    get(uri, callback){
        if(!uri || !callback) throw new Error('Uri and callback must be given');
        if(typeof uri !== "string") throw new TypeError('Uri must be a string');
        if(typeof callback !== "function") throw new TypeError('Callback must be a function');

        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        });
        
        const route = {
            uri,
            callback
        }
        this.routes.push(route);
    }


    init(){
        this.routes.some(route=>{

            let regEx = new RegExp(`^${route.uri}$`);
            let path = window.location.pathname;

            if(path.match(regEx)){
                let req = { path };
                return route.callback.call(this, req);
            }
        })
    }
}