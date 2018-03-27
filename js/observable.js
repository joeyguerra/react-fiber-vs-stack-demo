if(!module){
    var module = {
        exports: window
    }
}

((win)=>{
    win.makeObservable = (obj)=>{
        var observers = {}
        var self = {
            observe(key, observer){
                if(!observers[key]) observers[key] = []
                observers[key].push(observer)
            },
            changed(key, old, value){
                if(observers[key]){
                    observers[key].forEach(o => {
                        o.update(key, old, value, this)
                    })
                }
            }
        }
        var keys = Object.keys(obj)
        var ubounds = keys.length
        for(var i = 0; i < ubounds; i++){
            (()=>{
              var prop = keys[i]
              Object.defineProperty(self, prop, {
                get(){
                    return obj[prop]
                },
                set(v){
                    var old = obj[prop]
                    obj[prop] = v
                    self.changed(prop, old, v)
                },
                enumerable: true
              })
    
            })()
    
        }
        return self
    }
})(module.exports)
