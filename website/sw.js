self.addEventListener('install', function(event){
 console.log(event);
 //TODO: SUGGESTION - It's better to precache all your important files here. Issue #19
})

self.addEventListener('fetch', function(event){

    event.respondWith(
        caches.match(event.request.url).then(function(cacheResponse){
            if(cacheResponse){
                console.log('Found ');
                console.log(cacheResponse);
                return cacheResponse;
            } 
            if(event.request.url.includes('map')) return fetch(event.request);
            console.log('not cached: ');
            console.log(event.request);
            fetch(event.request).then(function(newResponse){
                caches.open('mws-restaurant-static-v2').then(function(cache) {
                        cache.put(event.request, newResponse);
                    }).catch(function(){console.log('Cache failed')});
                console.log(`stored ${event.request.url}`)
                //return fetch(event.request);
               
            }).catch(function(){console.log('Fetch Failed')})
            return fetch(event.request);
        }).catch(function(){
            console.log('request not cached and offline');
            
        })
        
    );
    /*
    if(event.request.url.endsWith('.jpg')){
        console.log(event.request);
        let imgResponse = cache.match(event.request);
        if (!(imgResponse)){
            imgResponse = fetch(event.request);
            cache.put(event.request, imgResponse);
        }
        event.respondWith(imgResponse);
        
    }
    else if(event.request.url.endsWith('.json')){
        console.log(event.request);
        event.respondWith(fetch('/data/restaurants.json'))
    }*/
})